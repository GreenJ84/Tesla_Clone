/** @format */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");



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
    filename: 'bundle.[contenthash].js', // Output filename
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Resolve these extensions
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"], // Use Babel to transpile TypeScript/JSX files
    },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
        use: [
          'file-loader', // or 'url-loader'
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 80,
                progressive: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              }
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public', to: '',
          globOptions: {
            ignore: ['**.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip', // Use gzip compression
      filename: '[path][base].gz', // Output filename pattern
      test: /\.(js|css|html)$/, // Apply compression to JavaScript, CSS, and HTML files
      threshold: 10240, // Only compress files larger than 10KB
      minRatio: 0.8, // Only compress files with a compression ratio of at least 0.8 (80%)
    }),
    // new BundleAnalyzerPlugin(),
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
          compress: {
            dead_code: true, // Remove dead code from the output
            drop_console: true,
            drop_debugger: true,
            warnings: true
          }
        },
        extractComments: false,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
            ]
          },
        },
      }),
    ],
    splitChunks: {
        chunks: "all", // Enable code splitting for all chunks
        minSize: 244 * 1024,
    },
    runtimeChunk: 'single',
  },
};
