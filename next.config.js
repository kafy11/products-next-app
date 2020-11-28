module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty',
                "aws-sdk": 'empty'
            }
        }
  
      return config
    }
}