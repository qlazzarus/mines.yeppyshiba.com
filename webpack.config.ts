import path from "path";
import fs from "fs";
import { Configuration, DefinePlugin } from "webpack";

// plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

export default <Configuration>{
    entry: "./src/index.ts",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
        ],
    },

    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                "assets/**",
                /*
                {
                    from: "assets/**",
                    // if there are nested subdirectories , keep the hierarchy
                    transformPath(targetPath: string, absolutePath: string) {
                        const assetsPath = path.resolve(__dirname, "assets");
                        const endpPath = absolutePath.slice(assetsPath.length);

                        return Promise.resolve(`assets/${endpPath}`);
                    },
                },
                */
            ],
        }),
        new DefinePlugin({
            GAME_WIDTH: 800,
            GAME_HEIGHT: 600,
            VERSION: JSON.stringify(pkg.version),
        }),
    ],
};
