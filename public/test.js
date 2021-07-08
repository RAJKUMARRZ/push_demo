let globalUrl = ""

async function checkResult () {
	console.log("hi")
	var a = frames[0].document.getElementById('test');
	if (!a) return

	// let para = document.getElementById('test');
	let compStyles = window.getComputedStyle(frames[0].document.getElementById('test'));

	console.log(frames)
	console.log(compStyles.color)
	var color;
	if (compStyles) {
		color = compStyles.color;
		console.log('if')
	} else {
		color = frames[0].getComputedStyle(a, '').color;
		console.log('else')
	}

	var visited = true;
	if (color == 'rgb(51, 102, 153)' || color == '#336699') {
		visited = false;
	}
	console.log(visited)
	alert('mode is ' + (visited ? 'NOT Private' : 'Private'))
	// sleep(2000)
	console.log(color)
	console.log(compStyles.color)
	console.log(compStyles.size)
	console.log('calling has been visited')
	// hasLinkBeenVisited(globalUrl)
	// let iframe = document.getElementById("testFrame")
	// console.log(iframe)
	// let src = await iframe.contentWindow.document.getElementById("test")
	// let styles = window.getComputedStyle(src)
	// console.log(styles.color)
	// var b = frames[0].document.getElementById('test')
	// let cc = window.getComputedStyle(frames[0].document.getElementById('test'))
	// console.log(cc.color)
	// console.log(document)
	// hasLinkBeenVisited(compStyles)
}

function setUniqueSource (frame) {
	frame.src = "test.html?" + Math.random();
	frame.onload = '';
	globalUrl = frame.src
}

function sleep (milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function hasLinkBeenVisited (url) {
	var link = document.createElement('a');
	link.href = url;
	document.body.appendChild(link);

	if (link.currentStyle) { //IE
		console.log('if')
		var color = link.currentStyle.color;
		//alert("[IE] url:"+url+", color:"+color)
		if (color == '#800080') {
			console.log('Visited')
			// return true;
		}
	} else { // Firefox
		console.log('else')
		link.setAttribute("href", url);
		var computed_style = document.defaultView.getComputedStyle(link, null);
		if (computed_style) {
			//alert("[FIREFOX] url:"+url+", computed_style.color:"+computed_style.color)
			if (computed_style.color == 'rgb(128, 0, 128)') {
				console.log('visited')
				// return true;
			}
		}
	}
	console.log('not visited')
	// return false;
}