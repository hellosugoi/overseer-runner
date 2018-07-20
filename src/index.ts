import { logger } from './config'
import createEthereumEventListener from './createEthereumEventListener'

export interface InputParams {
  eventName: string;
  providerUrl: string;
  blockNumber: number | 'pending' | 'latest' | 'genesis' | undefined
  contractArtifact: {
    networks: {
      [key: number]: {
        address: string;
      }
    },
    abi: any
  };
  workFn(data: any): Promise<void>;
}

async function startConnectors(source: [InputParams]): Promise<void> {
  source.map((item) => {
    createEthereumEventListener(item)
  })
}

export async function initialize(source: [InputParams]): Promise<void> {
  try {
    startConnectors(source)
    logger.info('Will begin processing events')
  } catch (error) {
    logger.error(error, 'Wrapper Error')
  }
}
