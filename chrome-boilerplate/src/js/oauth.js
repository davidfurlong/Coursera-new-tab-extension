chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				
				if (details.requestHeaders[i].name === 'Origin') {
				  	details.requestHeaders[i].value = 'https://www.coursera.org';
				}
				if (details.requestHeaders[i].name === 'Host') {
				  	details.requestHeaders[i].value = 'https://www.coursera.org';
				}
				if (details.requestHeaders[i].name === 'Accept') {
				  	details.requestHeaders[i].value = 'application/json, text/javascript, */*; q=0.01';
				}	
			}
			details.requestHeaders.push({'name': 'X-Requested-With', 'value': 'XMLHttpRequest'});
			return {requestHeaders: details.requestHeaders};		
	}, {urls: ["https://*/*"]}, ["blocking", 'requestHeaders']);

function launchOAuth(){
	chrome.identity.launchWebAuthFlow({
	  	'url': URL, 
	  	'interactive': true
	}, function(redirect_url) { 
		CODE = getParameterByName('code', redirect_url);
		// todo store code
		storeData({'CODE': CODE });
		var params = {
			'code': CODE,
			'client_id': 'W_NN1oUeu1cMtQjSg5-KgA',
			'client_secret': 'avGpo9MsjMJpYYW2A3QbEw', // todo?
			'redirect_uri': 'https://oggmggbmpdkmbonekoaopclgcoopbnpg.chromiumapp.org/provider_cb',
			'grant_type': 'authorization_code'
		};
		var parsed = $.param(params);
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			// console.log(xhr.status);
			// console.log(xhr.responseText);
			var o = JSON.parse(xhr.responseText);
			ACCESS_TOKEN = o['access_token'];
			storeData({'ACCESS_TOKEN': ACCESS_TOKEN });
			getUserId();
		};
		xhr.open('POST', 'https://accounts.coursera.org/oauth2/v1/token', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.send(parsed);
	});
}

function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}