var API_ENDPOINT = 'https://discordapp.com/api/v6';
var CLIENT_ID = '431276338138316801';
var CLIENT_SECRET = 'C-wWEDuH3Wb9TXEzpuUm6ZhBkkwJmV1X';
var REDIRECT_URI = 'http://localhost:5000/chat.html';
var AUTH_URL = API_ENDPOINT + '/oauth2/token';

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
			document.cookie = `refresh_token=${response.refresh_token}; max-age=${response.expires_in}`;
			console.log(response);
			document.getElementById('login').style.display = 'none';
			getUser(response.access_token);
			document.getElementById('welcome').innerHTML = 'Welcome, <strong>' + localStorage.getItem('username') + '</strong>!';
		}		
	});
}

//parses query string
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.href);

    return results[1] || 0;
}

//change UI depending on token or naw
if (getCookie('access_token') == "") {
	exchange_code($.urlParam('code'));
}

/*
	User Section
*/

function getUser(access_token) {
	$.ajax({
		url: API_ENDPOINT + '/users/@me',
		headers: {'Authorization': 'Bearer ' + access_token},
		type: 'GET',
		success: function(data) {
			console.log(data);
			localStorage.setItem('username', data.username);
			//document.cookie = `username=${data.username}`;
		},
		error: function(jqXHR, status, errorThrown) {
			console.log("Error code: " + jqXHR.status);
		}
	});
}

document.getElementById('getUser').addEventListener('click', function() {
	getUser(getCookie('access_token'));
});

/*
	Utilities section
*/

//retrieves cookie value
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

//debugging stuff
function deleteToken(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	window.location.reload();
};

document.getElementById('checkTokens').addEventListener('click', function() {
	console.log(document.cookie);
});
document.getElementById('deleteTokens').addEventListener('click', function() {
	deleteToken('access_token');
	deleteToken('refresh_token');
});
document.getElementById('login').addEventListener('click', function() {
	deleteToken('access_token');
	deleteToken('refresh_token');
});