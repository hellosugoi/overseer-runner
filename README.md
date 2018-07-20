# Overseer-runner

A Web3 event manager that accepts an array of work functions and event names and binds them to an event listener. Instead of wriging your own web3 event emitter logic, you pass the logic and functionality to this runner. It will process Events written from your Solidity/Serpet code for Ethereum.

# Installation
1. Install --> `npm install overseer-runner`

# Usage
To use this package, you need to create an array of objects with the following keys:

1. `workFn` --> The funtion to run for a specific event
2. `eventName` --> The name of the event to listen to
3. `blockNumber` --> The blocknumber to start listening from
4. `providerUrl` --> The providerURL to connect to for a given event. **Must be a Websocket URL**
5. `contractArtifict` --> This is the Artitifact created by truffle. It contians the ABI and network information

Then you just have to pass the array to our initilization function.

```javascript
initialize(source) // source = [{workFn, eventName, ...}, {workFn, eventName, ...}]
  .then(() => {
    logger.info('Will begin listening to events')
  })
  .catch( error => {
    logger.error(error, 'Wrapper Error')
  })
```

You are done setting up the package. As events are triggered from the blocknumber, your workFn will be executed. We suggest the workFn encapuslate lifecycle of the event.


## Example
```javascript
const { initialize } = require('overseer-runner')
const workFn = require('./Your/WorkFn/Path')
const contractArtifact = require('./Your/Contract/Path')
const blockNumber = 4000000 // Blocknumber to start processing from
const providerUrl = 'wss://your.websocket.domain/ws'
const eventName = 'anEvent'

const source = [{
  workFn,
  eventName,
  blockNumber,
  contractArtifact,
  providerUrl
}]

initialize(source)
  .then(() => {
    console.log('Will begin listening to events')
  })
  .catch( error => {
    console.log(error, 'overseer-runner: Unhandled Error in workfn.')
  })
```


# Todo

Need to add the following features/bugs. Come and contribute!

1. Add  load balancing
2. Allow for global overrides on initilize fn
3. Allow for defining the type of providerUrl