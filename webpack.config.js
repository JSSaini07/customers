
const path = require('path');

module.exports = {
    entry: './main.tsx',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, './build/js/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./build/")
    }
};