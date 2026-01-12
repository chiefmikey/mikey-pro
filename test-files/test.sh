#!/usr/bin/env bash
# Test bash script for ESLint validation

set -e

echo "Hello from bash script"
NAME="test"
echo "Name: $NAME"

function greet() {
  echo "Greeting: $1"
}

greet "World"
