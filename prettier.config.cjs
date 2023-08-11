/** @type {import('prettier').Config} */
module.exports = {
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    jsxSingleQuote: true,
    overrides: [{ files: '*.json', options: { parser: 'json' } }],
    printWidth: 120,
    proseWrap: 'preserve',
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false
}
