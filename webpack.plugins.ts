import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// reference: https://stackoverflow.com/a/65556946
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new NodePolyfillPlugin(),

  // To fix the compilation error with the missing optional dependencies `original-fs` and `zipfile`
  // Reference:
  // 1. https://webpack.js.org/plugins/ignore-plugin/
  // 2. https://github.com/cthackers/adm-zip/issues/242#issuecomment-1024440114
  new webpack.IgnorePlugin({resourceRegExp: /original-fs/}),
  new webpack.IgnorePlugin({resourceRegExp: /zipfile/}),
];
