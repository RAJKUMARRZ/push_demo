var express = require('express')
var app = express()
const cors = require('cors')
const webpush = require('web-push')

require('dotenv').config()

app.use(cors())
app.use(express.json())


//static directory, public 
app.use(express.static('public'))


const dummyDb = { subscription: null }
const saveToDatabase = async subscription => {
  	dummyDb.subscription = subscription
}

// web push
const vapidKeys = {
  	publicKey: process.env.PUBLIC_KEY,
  	privateKey: process.env.PRIVATE_KAY,
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
