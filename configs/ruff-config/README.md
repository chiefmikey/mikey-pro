# @mikey-pro/ruff-config

AI agent code quality guardrails for Python. Strict Ruff configuration enforcing clean, secure, maintainable Python code.

## Install

**PyPI:**

```bash
pip install mikey-pro-ruff-config
```

**npm:**

```bash
npm i -D @mikey-pro/ruff-config
```

## Usage

Extend in your `pyproject.toml`:

```toml
[tool.ruff]
extend = "./node_modules/@mikey-pro/ruff-config/ruff.toml"
```

Or copy `ruff.toml` to your project root.

## What's Enforced

- PEP 8 style (pycodestyle)
- Import sorting (isort)
- Security checks (bandit)
- Complexity limit: 12 (mccabe)
- Max function arguments: 3
- Bug detection (bugbear)
- Modern Python idioms (pyupgrade, ruff-specific)
- No print statements (use logging)
- No commented-out code
- Pathlib over os.path
