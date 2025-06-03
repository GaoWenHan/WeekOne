import vuePlugin from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueEslintParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: true,
        browser: true,
        es2021: true
      },
      parser: vueEslintParser,
      parserOptions: {
        parser: {
          ts: '@typescript-eslint/parser',
          js: 'espree',
          '<template>': 'espree'
        },
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2, {
        baseIndent: 1
      }],
      'semi': ['error', 'never']
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  }
]
