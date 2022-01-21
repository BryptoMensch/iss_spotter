const request = require("request");

const nextISSTimesForMyLocation = function (callback) {
	fetchMyIP((error, ip) => {
		if (error) {
			return callback(error, null);
		}

		fetchCoordsByIP(ip, (error, loc) => {
			if (error) {
				return callback(error, null);
			}

			fetchISSFlyOverTimes(loc, (error, nextPasses) => {
				if (error) {
					return callback(error, null);
				}

				callback(null, nextPasses);
			});
		});
	});
};

module.exports = { nextISSTimesForMyLocation };

//*******************************************/
// const request = require("request");

// // FETCH MY IP ************
// const fetchMyIP = function (callback) {
// 	request("https://api.ipify.org?format=json", (error, response, body) => {
// 		if (error) return callback(error, null);

// 		if (response.statusCode !== 200) {
// 			callback(
// 				Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
// 				null
// 			);
// 			return;
// 		}

// 		const ip = JSON.parse(body).ip;
// 		callback(null, ip);
// 	});
// };

// // FETCH COORD BY IP ************
// const fetchCoordsByIP = (IP, callback) => {
// 	const request = require("request");
// 	request(`https://freegeoip.app/json/${IP}`, function (error, response, body) {
// 		if (error) return callback(error, null);

// 		if (response.statusCode !== 200) {
// 			callback(
// 				Error(`Status code ${response.statusCode} when fetching lat and long: ${body}`),
// 				null
// 			);
// 			return;
// 		}

// 		const result = JSON.parse(body);
// 		const latitude = result.latitude;
// 		const longitude = result.longitude;

// 		const latLong = { latitude, longitude };
// 		console.log("Tag", result);

// 		callback(null, latLong);
// 	});
// };

// // FETCH FLY OVER FUNC ************
// const fetchISSFlyOverTimes = (coords, callback) => {
//   const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }

//     const passes = JSON.parse(body).response;
//     callback(null, passes);
//   });
// };
// });
// };

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
