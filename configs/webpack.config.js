const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

// Configure filepaths here
const paths = {
	entryPoint: './src/app.js',
	buildFolder: 'build',
	jsFilename: 'js/main.js',
	cssFilename: 'css/main.css'
};

// ADD ROUTES TO BE PRE-RENDERED TO THE ARRAY BELOW
const routesToPrerender = [ '/hello', '/' ];

const preferences = {
	lintDuringDevelopment: true,
	openDevServerInBrowser: true
};

module.exports = function(env, argv) {
	process.env.NODE_ENV = argv.mode || 'development'; // Default to development mode unless specified otherwise;
	const productionMode = (process.env.NODE_ENV === 'production');
	const prerender = (argv.prerender === 'true');

	if (prerender) {
		console.log('PRE-RENDERING');
	}

	return {
		entry: [
			paths.entryPoint // Entry point for our actual JS
		],
		output: { // This where output will be generated
			publicPath:'/',
			path: path.resolve(__dirname, '../build/'),
			filename: paths.jsFilename,
		},

		devtool: productionMode ? 'inline-cheap-module-source-map' : 'source-map', // Create sourcemap for JS

		devServer: { // Configure the local web server
			contentBase: path.resolve(process.cwd(), paths.buildFolder), // Serve files from the build directory
			open: preferences.openDevServerInBrowser, // Launch served content in the browser once ready
			writeToDisk: true, // Actual create output files (rather than doing it all in memory)
			clientLogLevel: 'error', // Minimising logs in the browser
			historyApiFallback: true
		},

		module: {
			rules: [
				{
					test: /\.js$/, // JavaScript files
					exclude: /(node_modules)/,
					use: [
						{
							loader: 'babel-loader', // Transpile through Babel
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											modules: false, // Tell Babel to leave modules alone (since Webpack's handling them)
											useBuiltIns: 'usage',
											corejs: 3
										}
									]
								],
								plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime']
							}
						},
						(productionMode || preferences.lintDuringDevelopment) ? 'eslint-loader' : false // JavaScript linting
					].filter(Boolean) // Wee trick to not include loaders (see the ternary)
				},
				{
					test: /\.vue$/,
					use: 'vue-loader'
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader'
					]
				},
				{
					test: /\.(sc|sa|c)ss$/, // CSS and SCSS
					use: [
						{ // Creates style nodes from JS strings
							loader: 'vue-style-loader',
							options: { sourceMap: true, url: false }
						},
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: !productionMode
							}
						},
						{  // Translates CSS into CommonJS
							loader: 'css-loader',
							options: { sourceMap: true, url: false }
						},
						{ // Do PostCSS (autoprefixing, minificaiton)
							loader: 'postcss-loader',
							options: {
								config: { path: './configs/postcss.config.js' } // Got out config file in non-default location
							}
						},
						{  // Compiles Sass to CSS, using Node Sass by default
							loader: 'sass-loader',
							options: { sourceMap: true }
						}
					].filter(Boolean)
				}
			]
		},

		plugins: [
			new VueLoaderPlugin(),
			new WriteFilePlugin(),
			new webpack.ProgressPlugin(), // Display percentage progress in the console
			new CleanWebpackPlugin(), // Clean the output directory first
			new MiniCssExtractPlugin({ // Actually write CSS as seperate files
				publicPath:'/',
				filename: paths.cssFilename,
			}),
			new CopyPlugin([
				// Copy files directly to the output folder
				(!prerender) ? { from: './src/index.html', to: './' } : false,
				{ from: './src/html', to: './' },
				{ from: './src/images', to: './images' },
				{ from: './src/static', to: './' }
			].filter(Boolean)),
			(!prerender) ? new ImageminPlugin({ // Image minification
				disable: !productionMode, // Disable during development
				test: /\.(jpe?g|png|gif|svg)$/i,
				optipng: ({ optimizationLevel: 4 }), // Optimise PNGs slightly more than default
				plugins: [
					imageminMozjpeg({ quality: 80 }) // Use the much better Mozjpeg plugin for JPEGs
				]
			}) : false,
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
			(prerender) ? new PrerenderSpaPlugin({
				staticDir: path.join(__dirname, '../build'),
				routes: routesToPrerender,
				renderer: new Renderer({
					inject: {
						foo: 'bar'
					},
					headless: true,
					renderAfterDocumentEvent: 'render-event'
				})
			}) : false,
			(productionMode || preferences.lintDuringDevelopment) ? new StyleLintPlugin() : false // S/CSS linting
		].filter(Boolean)
	};
};
