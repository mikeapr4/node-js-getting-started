// Explanation of Bollinger Bands - https://www.youtube.com/watch?v=2G9fHBEsauE
// Default deviation of 2 worked well, the safer 3 option isn't gonna help
// Tested 1h, 15m and 5m periods - 15min much better than 1hr, but 5m poor
// Default period length of 20 worked well, longer might flatten averages
// Tried profit_stop_enable_pct=10, didn't change much, happy to go without it
// Setup pushbullet on my phone for notifications (free)

var c = module.exports = {}

// default selector. only used if omitting [selector] argument from a command.
c.selector = 'binance.BTC-BUSD'
// name of default trade strategy
c.strategy = 'bollinger'

// Exchange API keys:

// to enable Binance trading, enter your API credentials:
c.binance = {}
c.binance.key = process.env.ZENBOT_BINANCE_API_KEY || 'YOUR-API-KEY'
c.binance.secret = process.env.ZENBOT_BINANCE_SECRET || 'YOUR-API-SECRET'
// Optional stop-order triggers:

// become a market taker (high fees) or a market maker (low fees)
c.order_type = 'taker'
// Misc options:
c.currency_capital = 200

// Notifiers:
c.notifiers = {}

//common

c.notifiers.only_completed_trades = process.env.ZENBOT_NOTIFY_ONLY_COMPLETED_TRADES || false // Filter to notifier's messages for getting Commpleted Trades info.

// pushbullets configs
c.notifiers.pushbullet = {}
c.notifiers.pushbullet.on = process.env.ZENBOT_PUSHBULLET_ENABLE || true // false pushbullets disabled; true pushbullets enabled (key should be correct)
c.notifiers.pushbullet.key = process.env.ZENBOT_PUSHBULLET_API_KEY || 'o.e5zD71Shc3yQxM49VMlnRIFxCNEsHEv6'
c.notifiers.pushbullet.deviceID = process.env.ZENBOT_PUSHBULLET_DEVICE_ID || 'ujCXG62B7QGsjzBHcvd5Q4'
// end pushbullets configs

// output
c.output = {}

// REST API
c.output.api = {}
c.output.api.on = false