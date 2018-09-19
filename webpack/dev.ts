import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config = {
    mode: 'development',

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
                    {
                       loader: 'ts-loader',
                       options: {
                          configFile: path.resolve(__dirname, '../tsconfig.json'),
                          // disable type checker - we will use it in fork plugin
                          transpileOnly: true,
                       },
                    },
                ],
                test: /\.tsx?$/,
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [/node_modules/, /siema\.min/] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.png$/, loader: 'url-loader?limit=1000' },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
           tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        }),
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
