const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry: path.join(__dirname, './src/index.tsx'),
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },  // to inject the result into the DOM as a style block
                    // { loader: "css-modules-typescript-loader" },  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:16]'
                            },
                            importLoaders: 1,

                        }
                    },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "sass-loader" },  // to convert SASS to CSS
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },  // to inject the result into the DOM as a style block
                    // { loader: "css-modules-typescript-loader" },  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:4]'
                            },
                            importLoaders: 1,

                        }
                    },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "sass-loader" },  // to convert SASS to CSS
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',

        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "index.[name].js.map"
        }),
    ],
    output: {
        filename: 'index.[name].js',
        path: path.resolve(__dirname, 'build/static/js'),
        publicPath: "/"
    },
}