import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// reference: https://stackoverflow.com/a/65556946
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new NodePolyfillPlugin(),
];
