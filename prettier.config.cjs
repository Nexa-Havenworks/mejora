/** @type {import('prettier').Config} */
module.exports = {
    arrowParens: 'avoid',
    printWidth: 120,
    endOfLine: 'lf',
    bracketSpacing: true,
    bracketSameLine: true,
    jsxSingleQuote: true,
    tabWidth: 4,
    useTabs: false,
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    proseWrap: 'preserve',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    overrides: [{ files: '*.json', options: { parser: 'json' } }],

    // prettier-plugin-sort-imports config
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^types$',
        '^@/types/(.*)$',
        '^@/config/(.*)$',
        '^@/lib/(.*)$',
        '^@/hooks/(.*)$',
        '^@/components/ui/(.*)$',
        '^@/components/(.*)$',
        '^@/registry/(.*)$',
        '^@/styles/(.*)$',
        '^@/app/(.*)$',
        '',
        '^[./]'
    ],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderBuiltinModulesToTop: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderMergeDuplicateImports: true,
    importOrderCombineTypeAndValueImports: true
}
