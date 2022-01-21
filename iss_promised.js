const request = require("request-promise-native");

const fetchMyIp = () => {
	return request("https://api.ipify.org?format=json");
};

//***********************************************//

const fetchCoordsByIp = (body) => {
	const IP = JSON.parse(body).IP;
	return request(`https://freegeoip.app/json/${IP}`);
};
``;
//***********************************************//

const fetchISSFlyOverTimes = (body) => {
	const { latitude, longitude } = JSON.parse(body);
	const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
	return request(url);
};

//***********************************************//

const nextISSTimesForMyLocation = () => {
	return fetchMyIp()
		.then(fetchCoordsByIp)
		.then(fetchISSFlyOverTimes)
		.then((data) => {
			const { response } = JSON.parse(data);
			return response;
		});
};

//***********************************************//

module.exports = { nextISSTimesForMyLocation };
