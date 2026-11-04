#!/usr/bin/env bash
# Local CI reproduction script
# Mirrors the CI workflow to catch issues before pushing

set -e

echo "🔧 Starting local CI reproduction..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check Node.js version (prioritize latest - Node 25+)
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"
echo "Note: Latest Node (25+) is prioritized for latest features. Minimum: Node 20."
echo ""

# Step 1: Install root dependencies
echo "📦 Step 1: Installing root dependencies..."
if npm ci; then
    print_status "Root dependencies installed"
else
    print_warning "npm ci failed, falling back to npm install"
    npm install
    print_status "Root dependencies installed (via npm install)"
fi
echo ""

# Step 2: Install peer dependencies
echo "📦 Step 2: Installing peer dependencies..."
# --no-save keeps tracked package.json / package-lock.json untouched
npm install --no-save eslint-plugin-import eslint-plugin-n eslint-plugin-jest eslint-plugin-jest-dom
print_status "Peer dependencies installed"
echo ""

# Step 3: Install config package dependencies
echo "📦 Step 3: Installing config package dependencies..."
for config in eslint-config eslint-config-react eslint-config-vue eslint-config-svelte eslint-config-angular prettier-config stylelint-config; do
    echo "Installing $config dependencies..."
    if (cd "configs/$config" && npm install --no-package-lock); then
        print_status "$config dependencies installed"
    else
        print_error "Failed to install $config dependencies"
        exit 1
    fi
done
echo ""

# Steps 4-9 do not abort the run: each result is recorded and a summary table
# is printed at the end (exit non-zero if any step failed).
#
# Known environmental failures on a clean checkout (not regressions):
#   - Step 6: the consumer-simulation tests fail (3-4 seen) because the simulated consumer
#     resolves TypeScript 7.
#   - Step 8: prettier --check reports warnings on pre-existing files.
#   - Step 9: `eslint` flags jest/* rules (and others) on tests/.
STEP_NAMES=()
STEP_RESULTS=()

# run_step <label> <command...>: run a command, record pass/fail, keep going
run_step() {
    local label="$1"
    shift
    if "$@"; then
        print_status "$label passed"
        STEP_RESULTS+=("pass")
    else
        print_error "$label failed"
        STEP_RESULTS+=("FAIL")
    fi
    STEP_NAMES+=("$label")
    echo ""
}

# Step 4: Run validation checks
echo "🧪 Step 4: Running validation checks..."
run_step "Step 4: Validation checks" npm run test:validate

# Step 5: Run manual tests
echo "🧪 Step 5: Running manual tests..."
run_step "Step 5: Manual tests" npm run test:manual

# Step 6: Run full test suite (serial: parallel runs starve workers and time out)
echo "🧪 Step 6: Running full test suite (serial)..."
run_step "Step 6: Full test suite" npx vitest run --no-file-parallelism

# Step 7: Verify ESLint configs can lint (findings are reported, not fatal)
verify_configs() {
    local rc=0
    echo "Testing core config..."
    npx eslint test-files/test.js test-files/test.ts --config eslint.config.js || rc=1
    echo "Testing React config..."
    npx eslint test-files/test-react.jsx --config configs/eslint-config-react/index.js || rc=1
    echo "Testing Vue config..."
    npx eslint test-files/test-vue.vue --config configs/eslint-config-vue/index.js || rc=1
    echo "Testing Svelte config..."
    npx eslint test-files/test-svelte.svelte --config configs/eslint-config-svelte/index.js || rc=1
    echo "Testing Angular config..."
    npx eslint test-files/test-angular.ts --config configs/eslint-config-angular/index.js || rc=1
    return $rc
}
echo "🔍 Step 7: Verifying ESLint configs can lint..."
run_step "Step 7: ESLint config verification" verify_configs

# Step 8: Check code formatting
echo "🎨 Step 8: Checking code formatting..."
run_step "Step 8: Code formatting" npx prettier --check "**/*.{js,ts,json,md,yml,yaml}"

# Step 9: Run ESLint
echo "🔍 Step 9: Running ESLint..."
run_step "Step 9: ESLint" npx eslint "**/*.{js,ts}" --max-warnings 0

# Summary
echo "=============================="
echo "CI summary"
echo "=============================="
FAILED=0
for i in "${!STEP_NAMES[@]}"; do
    printf '%-40s %s\n' "${STEP_NAMES[$i]}" "${STEP_RESULTS[$i]}"
    [ "${STEP_RESULTS[$i]}" = "FAIL" ] && FAILED=1
done
echo ""
if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}✅ All CI checks passed locally!${NC}"
    echo "You can safely push your changes."
    exit 0
fi
echo -e "${RED}One or more steps failed (see table above).${NC}"
exit 1
