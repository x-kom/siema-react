import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
    entry: [
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/demo/index'),
    ],

    output: {
        filename: 'siema-react.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },

    target: 'web',

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
            '~': path.resolve(__dirname, '../src'),
        },
    },

    module: {
        rules: [
            {
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src'),
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader',
                ],
                test: /\.tsx?$/,
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [/node_modules/] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.png$/, loader: 'url-loader?limit=1000' },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/demo/index.html',
            inject: true,
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../src'),
        // disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
    },
};

export default config;
