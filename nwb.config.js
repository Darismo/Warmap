var path = require('path');

module.exports = function(nwb) {
  return {
    type: 'react-app',
    webpack: {
      module: {
        loaders: [
          { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "graphics" }
        ]
      },

      extra: {
        // Allow the use of require('images/blah.png') to require from an
        // src/images from anywhere in the the app.
        resolve: {
          alias: {
            'images': path.resolve(__dirname, 'src/images')
          }
        }
      },
      plugins: [
        new nwb.webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 1024
        })
      ]
    }
  }
};