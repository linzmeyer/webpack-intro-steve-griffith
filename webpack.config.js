const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");  // for minifying


module.exports = {
  mode: 'development',  // or production
  entry: {
    "index": path.resolve(__dirname, 'src/pages/index/index.js'),
    "about": path.resolve(__dirname, 'src/pages/about/index.js'),
    "contact-us": path.resolve(__dirname, 'src/pages/contact-us/index.js'),
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
    // contentBase: path.resolve(__dirname, 'dist'),  // depricated, don't use contentBase
    // watchContentBase: true,  // don't use watchContentBase
    static: path.resolve(__dirname, 'dist'),  // new way
    port: 5001,  // default 8080
    open: false,  // opens the app in a new tab
    hot: true,  // adds HMR
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
  /*** HtmlWebpackPlugin Notes
   * title: The html's <title> content
   * template: The input html file path
   * filename: The output html filename in the dist folder
   * chunks:
      • Array of js file names
      • The names are they keys of the 'entry' object in this config file
      • only include these input js files when injecting the <script> tags into the output html files
  */
  plugins: [
    // creates an html file in the dist folder
    new HtmlWebpackPlugin({
      title: 'Just a Demo',
      filename: 'index.html',
      template: 'src/pages/index/index.html',
      chunks: ['index'],
    }),
    // To generate more than one HTML file, declare the plugin more than once in your plugins array
    new HtmlWebpackPlugin({
      title: 'About',
      filename: 'about.html',
      template: 'src/pages/about/index.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Us',
      filename: 'contact-us.html',
      template: 'src/pages/contact-us/index.html',
      chunks: ['contact-us'],
    }),
  ],

  optimization: {
    // this TerserPlugin handles minimizing the code
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}

