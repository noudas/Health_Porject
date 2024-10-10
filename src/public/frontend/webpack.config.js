const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const { DefinePlugin } = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  devServer: {
    static: path.join(__dirname, 'src'),
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    host: '0.0.0.0',  // Adicione esta linha para expor para conexões externas
    client: {
      webSocketURL: {
        hostname: 'localhost', // Nome do host do WebSocket (pode ser 'react-dev' no Docker Compose)
        pathname: '/ws',
        port: 3000,
        protocol: 'ws',
      },
    },
  },  
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(), // Plugin para Hot Reload no React

    new DefinePlugin({
        'process.env': {
          REACT_APP_API_BASE_URL: JSON.stringify(process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000')
        }
      })
    ].filter(Boolean),

    watchOptions: {
      poll: 1000, // Verificar alterações nos arquivos a cada segundo
      ignored: /node_modules/, // Ignorar node_modules para evitar lentidão
    },
    
};
