import bunyan from 'bunyan'

const logger = bunyan.createLogger({
  name: 'overseer-runner', // Todo make this configurable upon initialization
  serializers: {
    err: bunyan.stdSerializers.err
  }
})

export {
  logger
}
