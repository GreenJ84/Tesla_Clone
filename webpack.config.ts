/** @format */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');



module.exports = {
    mode: "production", // Set the mode to 'production' for optimized builds
    entry: {
        main: "./src/index.tsx",
        home: "./src/pages/HomePage.tsx",
        login: "./src/pages/LoginPage.tsx",
        registration: "./src/pages/RegistrationPage.tsx",
        product: "./src/pages/DisplayPage.tsx",
        cart: "./src/pages/CartPage.tsx",
        order: "./src/pages/OrderPage.tsx",
        confirmation: "./src/pages/ConfirmationPage.tsx"
    }, // Entry point of your application
  output: {
    path: path.resolve(__dirname, "build"), // Output directory
    filename:'bundle.[contenthash].js', // Output filename
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Resolve these extensions
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"], // Use Babel to transpile TypeScript/JSX files
    },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader', // or 'url-loader'
          {
            loader: 'image-webpack-loader',
            options: {
              // Configure the options for image-webpack-loader
              // For example, you can set optimization options or specify plugins
              mozjpeg: {
                progressive: true,
                quality: 80,
              },
              // ... other options
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template file
    }),
    new MiniCssExtractPlugin(),
    new CompressionPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    usedExports: true,
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments from the output
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
        chunks: "all", // Enable code splitting for all chunks
        minSize: 244 * 1024,
    },
    runtimeChunk: 'single',
  },
};
