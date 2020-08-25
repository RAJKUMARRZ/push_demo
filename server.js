var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')

app.use(cors())
app.use(bodyParser.json())


//static directory, public 
app.use(express.static('public'))


const dummyDb = { subscription: null }
const saveToDatabase = async subscription => {
  	dummyDb.subscription = subscription
}

// web push
const vapidKeys = {
  	publicKey: 'BCfwcINd85VE5EkCYRGQlVMH4UsLo0Ljd8lHxno83yq3gLVae_949zYc3tdnKb_qlFmxfS_WP84Dalv8lB7XpTE',
  	privateKey: 'wGcqpX3rJLW0sMoCh0U43pYVxini7Lcx0s0lDBI0ys0',
}

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  	'mailto:raj.kumar@webklipper.com',
  	vapidKeys.publicKey,
  	vapidKeys.privateKey
)

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}


//routes
app.get('/', (req, res) => {
	res.render('index.html')
})

// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
  	const subscription = req.body
  	await saveToDatabase(subscription) //Method to save the subscription to Database
  	res.json({ message: 'success' })
})

//route to test send notification
app.get('/send-notification', (req, res) => {
  	const subscription = dummyDb.subscription //get subscription from your databse here.
  	const message = 'Hello World'
  	sendNotification(subscription, message)
  	res.json({ message: 'message sent' })
})

const port=process.env.PORT || 3000
server = app.listen(port);
console.log("App listening on port " + port);

/**

Public Key:
BCfwcINd85VE5EkCYRGQlVMH4UsLo0Ljd8lHxno83yq3gLVae_949zYc3tdnKb_qlFmxfS_WP84Dalv8lB7XpTE

Private Key:
wGcqpX3rJLW0sMoCh0U43pYVxini7Lcx0s0lDBI0ys0

*/
