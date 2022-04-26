const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // webpack that creates html files and adds the bundles to them.
      new HtmlWebpackPlugin({
        title: "JATE",
        template: "./index.html",
      }),
      new MiniCssExtractPlugin(),
      // adds the custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        // may not need swDest
        swDest: "src-sw.js",
      }),

      // Creates the Manifest.JSON file.
      new WebpackPwaManifest({
        fingerprints: false,
        // may not or may not need inject: true
        // inject: true,
        name: "JATE",
        short_name: "JATE",
        description: "A text editor",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
