const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const buildConfig = require('./package.json');

process.argv.forEach((val, index, array) => {
    console.log(`${index}: ${val}`);
});

const buildName = buildConfig.name;
const buildVersion = buildConfig.version;
const buildDes = buildConfig.description;
const isBeta = false;
const isVar = false;
const useSourceMap = true;

module.exports = {
    devtool: 'eval',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9999',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '/static'),
        publicPath: '/static',
        hashDigestLength: 5,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader?limit=1000000'
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=50000'
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: useSourceMap ? 'inline' : false,
                            // Necessary for external CSS imports to work
                            ident: 'postcss',
                            plugins: () => [
                                /*  require('postcss-flexbugs-fixes'), */
                                // require('postcss-urlrewrite')({
                                //     rules: [
                                //         { from: '../fonts/', to: '../src/fonts/' },
                                //         { from: '../image/', to: '../src/image/' }
                                //     ]
                                // }),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'ie >= 10' // React doesn't support IE8 anyway
                                    ]
                                    /* flexbox: 'no-2009' */
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: useSourceMap,
                            // data: '@import "utility/index";',
                            includePaths: ['./src/scss']
                        }
                    }
                ]
            },
            {
                test: /\.wasm$/,
                loaders: ['wasm-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        'babel-polyfill': 'babel-polyfill',
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        'redux-thunk': 'ReduxThunk',
        jQuery: 'jQuery',
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_',
            var: '_'
        }
    },
    context: __dirname,
    target: 'web',
    devServer: {
        host: 'localhost',
        port: 9999,
        hot: true,
        overlay: true,
        historyApiFallback: false,
        watchContentBase: true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:9999'
        }
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BABEL_ENV': JSON.stringify('development'),
        }),
        new WebpackAutoInject({
            SHORT: buildDes,
            SILENT: false,
            PACKAGE_JSON_PATH: './package.json',
            components: {
                InjectAsComment: true
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: `Version: ${buildVersion} ${isVar ? '(ES5)' : '(ES6)'} ${isBeta ? '- beta ' : ''}- {date}`
                }
            },
            LOGS_TEXT: {
                AIS_START: 'Zoom JSSDK build started',
            }
        }),
    ],
};