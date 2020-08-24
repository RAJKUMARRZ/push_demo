const urlB64ToUint8Array = base64String => {
  	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  	const rawData = atob(base64)
  	const outputArray = new Uint8Array(rawData.length)
  	for (let i = 0; i < rawData.length; ++i) {
    	outputArray[i] = rawData.charCodeAt(i)
  	}
  	return outputArray
}

const saveSubscription = async subscription => {
  	const SERVER_URL = 'http://localhost:3000/save-subscription'
  	const response = await fetch(SERVER_URL, {
    	method: 'post',
    	headers: {
      		'Content-Type': 'application/json',
    	},
    	body: JSON.stringify(subscription),
  	})
  	return response.json()
}

const showLocalNotification = (title, body, swRegistration) => {
  	const options = {
    	body
    	// here you can add more properties like icon, image, vibrate, etc.
  	};
  	swRegistration.showNotification(title, options);
};

self.addEventListener("push", function(event) {
  	if (event.data) {
    	console.log("Push event!! ", event.data.text());
    	showLocalNotification("Yolo", event.data.text(),  self.registration);
  	} else {
    	console.log("Push event but no data");
  	}
});

self.addEventListener('activate', async () => {
	console.log('service worker activate')
  	// This will be called only once when the service worker is activated.
  	try {
    	const applicationServerKey = urlB64ToUint8Array(
      		'BCfwcINd85VE5EkCYRGQlVMH4UsLo0Ljd8lHxno83yq3gLVae_949zYc3tdnKb_qlFmxfS_WP84Dalv8lB7XpTE'
    	)
    	const options = { 
    		applicationServerKey, 
    		userVisibleOnly: true
    	}

    	const subscription = await self.registration.pushManager.subscribe(options)
    	const response = await saveSubscription(subscription)
    	console.log(JSON.stringify(response))
  	} catch (err) {
    	console.log('Error', err)
  	}
})