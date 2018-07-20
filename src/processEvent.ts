import { logger } from './config'

export interface IProcessEvent {
  data: any;
  eventName: string;
  workFn(data: any): Promise<void>;
}

export default async function ProcessEvent({ workFn, data, eventName }: IProcessEvent) {
  const { transactionHash, blockNumber } = data
  const context = {
    logger: logger.child({ tx: transactionHash, eventName, blockNumber })
  }
  context.logger.info(`Started working on event ${eventName}`)
  try {
    await workFn.call(context, data)
    context.logger.info(`Completed working on event ${eventName}`)
  } catch (e) {
    context.logger.error(e)
  }
}
