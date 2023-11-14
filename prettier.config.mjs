/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
const config = {
	printWidth: 120,
	useTabs: true,
	tabWidth: 4,
	trailingComma: "all",
	endOfLine: "crlf",
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrder: ["^~/(.*)$", "^\\.(.*)$", "^next(.*)$", "^@(.*)$", "<THIRD_PARTY_MODULES>", "^[./]"],
	plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;

