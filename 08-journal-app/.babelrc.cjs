const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons',
  ],
]

const presets = [
  ['@babel/preset-env', { targets: { esmodules: true } }],
  ['@babel/preset-react', { runtime: 'automatic' }],
]

module.exports = { plugins, presets }
