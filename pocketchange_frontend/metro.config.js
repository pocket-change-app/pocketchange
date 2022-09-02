
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const path = require('path');
 const extraNodeModules = {
      'backend': path.resolve(__dirname + '/../backend'),
    };
    const watchFolders = [
      path.resolve(__dirname + '/../backend')
    ];module.exports = {
      transformer: {
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
          },
        }),
      }, 
      resolver: {
        extraNodeModules
      },
      watchFolders,
};