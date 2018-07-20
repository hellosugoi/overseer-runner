import Web3 from 'web3'
import { logger } from './config'
import ProcessEvent from './ProcessEvent'

export interface IgetFnEvent {
  contractArtifact: {
    networks: {
      [key: number]: {
        address: string;
      }
    },
    abi: any
  };
  providerUrl: string;
  eventName: string;
  blockNumber: number | 'pending' | 'latest' | 'genesis' | undefined
  workFn(data: any): Promise<void>
}

const createEthereumEventListener = (input: IgetFnEvent) => {
  const { contractArtifact, blockNumber, workFn, providerUrl, eventName } = input
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl))
  return web3.eth.net.getId()
    .then( (networkId: number) => {
      const contractAddr = contractArtifact.networks[networkId].address
      const CurrentContract = new web3.eth.Contract(contractArtifact.abi, contractAddr)
      CurrentContract.events[eventName]({ fromBlock: blockNumber })
        .on('data', (data: any) => {
          return ProcessEvent({ workFn, data, eventName })
        })
        .on('changed', (data: any) => {
          logger.info(`Changed: ${data}`)
        })
        .on('error', (err: any) => {
          logger.error(err)
        })
      })
}

export default createEthereumEventListener
