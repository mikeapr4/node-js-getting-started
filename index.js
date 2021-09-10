const { MongoMemoryServer } = require('mongodb-memory-server')
const { spawn } = require('child_process')
const { strategy } = require('./conf')
const strip = require('strip-color')
const { Buffer } = require('buffer')

async function kickoff() {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  const env = {
    ...process.env,
    ZENBOT_MONGODB_CONNECTION_STRING: `${uri}zenbot4?`,
  }

  const status = {}

  const pairs = [
    'binance.BTC-BUSD',
    'binance.ETH-BUSD',
    // 'binance.LTC-BUSD',
    // 'binance.DOT-BUSD',
    // 'binance.FIL-BUSD',
    // 'binance.XLM-BUSD',
    // 'binance.XMR-BUSD',
  ]

  const minsInDay = 60 * 24

  pairs.forEach((selector) => {
    const bot = spawn(
      'node',
      ['zenbot.js', 'trade', selector, '--conf=../../conf.js', '--paper', '--period=15m'],
      { cwd: 'node_modules/zenbot4', env },
    )
    bot.stdout.on('data', (data) => {
      console.log(strip(Buffer.from(data).toString()));
    })
    status[selector] = true
  
    bot.on('close', async () => {
      delete status[selector]
      if (Object.keys(status).length === 0) {
        await mongod.stop()
      }
    })  
  })
}

kickoff()
