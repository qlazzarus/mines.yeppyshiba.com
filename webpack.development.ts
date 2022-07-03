import { Configuration } from "webpack";
import merge from "webpack-merge";
import path from "path";

// plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

// common configuration
import common from "./webpack.config";

export default merge(common, <Configuration>{
    mode: "development",

    devtool: "inline-source-map",

    devServer: {
        open: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                            },
                        },
                    },
                },
            },
        ],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new ESLintPlugin(),
    ],
});
