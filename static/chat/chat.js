var API_ENDPOINT = 'https://discordapp.com/api/v6';
var CLIENT_ID = '431276338138316801';
var CLIENT_SECRET = 'C-wWEDuH3Wb9TXEzpuUm6ZhBkkwJmV1X';
var REDIRECT_URI = 'http://localhost:5000/chat.html';
var AUTH_URL = API_ENDPOINT + '/oauth2/token';
var CHANNEL_ID = '441369877714960396';

//exchanges code from signing in for access_token
function exchange_code(code) {
	var data = {
		'client_id': CLIENT_ID,
		'client_secret': CLIENT_SECRET,
		'grant_type': 'authorization_code',
		'code': code,
		'redirect_uri': REDIRECT_URI,
	};
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	$.ajax({
		type: "POST",
		url: AUTH_URL,
		data: data,
		headers: headers,
		success: function(response) {
			document.cookie = `access_token=${response.access_token}; max-age=${response.expires_in}`;
			console.log(response);
		}		
	});
}

//parses query string
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.href);

    return results[1] || 0;
}

//change UI depending on token or not
if (document.cookie) {
	document.getElementById('login').style.display = 'none';
	document.getElementById('messages').innerHTML += "You're signed in!";
} else {
	exchange_code($.urlParam('code'));
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
        	console.log(cookie.substring(name.length, cookie.length));
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function getMessages(access_token) {
	$.ajax({
		url: API_ENDPOINT + '/channels/' + CHANNEL_ID + '/messages',
		headers: {'Authorization': 'Bearer ' + access_token},
		type: 'GET',
		success: function(data) {
			console.log(data);
		}
	});
}

document.getElementById('getMessages').addEventListener('click', function() {
	getMessages(getCookie('access_token'));
});


//deletes a cookie for debugging purps
function deleteToken(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	window.location.reload();
};
//debugging
document.getElementById('checkToken').addEventListener('click', function() {
	alert(document.cookie);
});
document.getElementById('deleteToken').addEventListener('click', function() {
	deleteToken('access_token');
});