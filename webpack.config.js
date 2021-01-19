const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = [
	{
		mode: "development",
		entry: "./src/index.ts",
		target: "node",
		module: {
			rules: [
				{
					test: /\.ts$/,
          include: /src/,
          exclude: /node_modules/,
					use: [{ loader: "babel-loader" }],
				},
			],
		},
		output: {
			path: `${__dirname}/dist`,
			filename: "index.js",
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
			plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    },
    // watch: true,
    watchOptions: {
      ignored: [`${__dirname}/node_modules/`]
    }
	},
];
