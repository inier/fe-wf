const path = require('path');

module.exports = function getAssetPath(options, filePath) {
    return options.assets.path ? path.posix.join(options.assets.path, filePath) : filePath;
};
