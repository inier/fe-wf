// 分离 runtimeChunk到 Manifest
// https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: "manifest"
      })
  }
}