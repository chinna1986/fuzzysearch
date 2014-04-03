chrome.app.runtime.onLaunched.addListener(function(){
	chrome.app.window.create("search.html", {
		"bounds": {
			"width": 500,
			"height": 500
		}
	});
});