module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-console': 0,
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'newline-before-return':1,
        'newline-per-chained-call':1,
        'no-mixed-spaces-and-tabs': 2,
        'no-multiple-empty-lines': [2, { 'max': 2 }],
    },
}
