#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

API="$PROJECT_ROOT/web/app/api"
SPEC_FILE="$API/api.json"

mkdir -p "$API"

cd "$PROJECT_ROOT" || exit 1

if wget http://localhost:8080/api/api-docs -O "$SPEC_FILE"; then
  CFG_OPTS=()
  if [ -f "$API/.openapi-generator-configuration.json" ]; then
    CFG_OPTS=(-c "$API/.openapi-generator-configuration.json")
  fi

  npx @openapitools/openapi-generator-cli@latest generate \
    -g typescript-axios \
    -i "$SPEC_FILE" \
    "${CFG_OPTS[@]}" \
    -o "$API" \
    --api-package apis \
    --model-package models \
    --type-mappings integer=number \
    --language-specific-primitives "string,number" \
    --skip-validate-spec \
    --additional-properties=generateMarkdown=false,generateGitPush=false
else
  echo "run server first"
  exit 1
fi