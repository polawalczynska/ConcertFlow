API="../web/app/api"
SPEC_FILE="../web/app/api/api.json"

mkdir -p "$API"

if wget http://localhost:8080/api/api-docs -O "$SPEC_FILE"; then
  CFG_OPTS=()
  if [ -f "$API/.openapi-generator-configuration.json" ]; then
    CFG_OPTS=(-c "$API/.openapi-generator-configuration.json")
  fi
  npx openapi-generator-cli generate \
    -g typescript-axios \
    -i "$SPEC_FILE" \
    "${CFG_OPTS[@]}" \
    -o "$API" \
    --api-package apis \
    --model-package models \
    --type-mappings integer=number \
    --language-specific-primitives "string,number"
else
 echo run server first
fi