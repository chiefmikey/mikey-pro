#!/usr/bin/env zsh
# Test zsh script for ESLint validation

set -e

echo "Hello from zsh script"
NAME="test"
echo "Name: $NAME"

function greet() {
  echo "Greeting: $1"
}

greet "World"
