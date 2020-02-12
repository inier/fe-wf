// 分离 runtimeChunk到 runtime.[hash].js
// https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk
module.exports = ({config, resolve}) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: "runtime"
      })
  }
}