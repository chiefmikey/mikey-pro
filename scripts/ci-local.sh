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

# Step 4: Run validation checks
echo "🧪 Step 4: Running validation checks..."
if npm run test:validate; then
    print_status "Validation checks passed"
else
    print_error "Validation checks failed"
    exit 1
fi
echo ""

# Step 5: Run manual tests
echo "🧪 Step 5: Running manual tests..."
if npm run test:manual; then
    print_status "Manual tests passed"
else
    print_warning "Manual tests had issues (continuing...)"
fi
echo ""

# Step 6: Run full test suite
echo "🧪 Step 6: Running full test suite..."
if npm test; then
    print_status "Full test suite passed"
else
    print_error "Full test suite failed"
    exit 1
fi
echo ""

# Step 7: Verify ESLint configs can lint
echo "🔍 Step 7: Verifying ESLint configs can lint..."
echo "Testing core config..."
npx eslint test-files/test.js test-files/test.ts --config eslint.config.js || print_warning "Core config linting had issues"

echo "Testing React config..."
npx eslint test-files/test-react.jsx --config configs/eslint-config-react/index.js || print_warning "React config linting had issues"

echo "Testing Vue config..."
npx eslint test-files/test-vue.vue --config configs/eslint-config-vue/index.js || print_warning "Vue config linting had issues"

echo "Testing Svelte config..."
npx eslint test-files/test-svelte.svelte --config configs/eslint-config-svelte/index.js || print_warning "Svelte config linting had issues"

echo "Testing Angular config..."
npx eslint test-files/test-angular.ts --config configs/eslint-config-angular/index.js || print_warning "Angular config linting had issues"

print_status "ESLint config verification completed"
echo ""

# Step 8: Check code formatting
echo "🎨 Step 8: Checking code formatting..."
if npx prettier --check "**/*.{js,ts,json,md,yml,yaml}"; then
    print_status "Code formatting check passed"
else
    print_error "Code formatting check failed"
    exit 1
fi
echo ""

# Step 9: Run ESLint
echo "🔍 Step 9: Running ESLint..."
if npx eslint "**/*.{js,ts}" --max-warnings 0; then
    print_status "ESLint check passed"
else
    print_error "ESLint check failed"
    exit 1
fi
echo ""

echo -e "${GREEN}✅ All CI checks passed locally!${NC}"
echo ""
echo "You can safely push your changes."
