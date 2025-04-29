module.exports = {
    extends: 'next/core-web-plugins/eslint-config',
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      'react-hooks/exhaustive-deps': 'warn'
    }
  };