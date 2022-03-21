const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");  // for minifying


module.exports = {
  mode: 'development',  // or production
  entry: {
    main: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',  // for images, etc
    clean: true,  // empty the dist folder on run of webpack
  },

  // dev server & HMR
  devtool: 'inline-source-map',  // tell the browser where a file came from
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),  // depricated
    static: path.resolve(__dirname, 'dist'),  // new way
    port: 5001,  // default 8080
    open: true,
    hot: true,  // HMR
    // watchContentBase: true,  // watches the 'dist' folder too
    watchFiles: [path.resolve(__dirname, 'src')]
  },

  // loaders
  module: {
    rules: [
      // if you come accross a file that ends with .css, use this array of loaders
      // css-loader looks for the file and turns it into the js module
      // style-loader will take the js import and inject it into the html file
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },  // order is important, reading right to left
      // immages
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },  // no installations needed, built in to webpack5
      // js for babel
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ]
  },

  // plugins
  plugins: [
    // creates an html file in the dist folder
    new HtmlWebpackPlugin({
      title: 'Just a Demo',
      filename: 'index.html',
      template: 'src/template.html',  // you may start your html with a template (or not)
    }),
    // To generate more than one HTML file, declare the plugin more than once in your plugins array
    new HtmlWebpackPlugin({
      title: 'Contact Us',
      filename: 'contact.html',
    }),

  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}

