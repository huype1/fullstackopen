import globals from 'globals'
import js from '@eslint/js'

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': {}
    },
    rules: {
      '@/indent': ['error', 4],
      '@/linebreak-style': ['error', 'unix'],
      '@/quotes': ['error', 'single'],
      '@/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    }
  },
]