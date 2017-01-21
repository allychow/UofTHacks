const path = require('path');
const webpack = require('webpack');


var config = {
   entry: './main.js',

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 7070
   },

   module: {
      loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react']
        }
        },
        {   test: /\.json$/, loader: 'json-loader' },
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src'),
        },
        {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: /node_modules/,
        },
        {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
        exclude: path.join(__dirname, 'static'),
        },
      ]
   }
}

module.exports = config;
