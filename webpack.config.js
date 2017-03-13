var webpack = require ('webpack');
var config = {
    entry: './js/main.js',

    output: {
        path: '/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8001
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-1']
            }
        }, 
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, 
        { 
        test: /\.(png|jpg)$/,
        include: './images',
        loader: 'url-loader' 
     }]
    }
}

module.exports = config;
