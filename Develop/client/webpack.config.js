const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// const index = require(`../client/src/images/logo.png`)

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '../client/src/js/index',
      install: '../client/src/js/index'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '../client/index.html', 
        title: 'PWA Text Editor',
      }),
      new InjectManifest({
        swSrc: '../client/src-sw', 
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'PWA-Text_Editor',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#000',
        crossorigin: '', 
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve('../client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
