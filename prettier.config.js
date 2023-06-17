module.exports = {
  $schema: "https://json.schemastore.org/prettierrc",
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  printWidth: 100,
  trailingComma: "es5",
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^@core/(.*)$", "<THIRD_PARTY_MODULES>", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
