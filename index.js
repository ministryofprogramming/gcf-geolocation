const cors = require('cors')
const cityTimezones = require('city-timezones');

// Set `useWhitelist` to `false` if you want to accept all requests.
const config = {
  useWhitelist: false
}

// Define from which origins requests are allowed.
const whitelist = [
  // 'https://fiddle.jshell.net',
  'https://ministryofprogramming.com',
  'https://mop.ba'
];

// Parse the whitelist and decide if the request is allowed.
const corsOptionsWhitelist = function (req, callback) {
  var corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }

  callback(null, corsOptions);
}

// Options when not using the whitelist.
const corsOptions = {
  origin: true
}

// Handle the response within this function. It can be extended to include more data.
function _geolocation(req, res) {
  // res.header('Cache-Control','no-cache');

  const data = {
    country: req.headers["x-appengine-country"],
    region: req.headers["x-appengine-region"],
    city: req.headers["x-appengine-city"],
    cityLatLong: req.headers["x-appengine-citylatlong"],
    userIP: req.headers["x-appengine-user-ip"],
    cityData: cityTimezones.lookupViaCity(req.headers["x-appengine-city"])
  }

  res.json(data)
};

// Export the cloud function.
exports.geolocation = (req, res) => {
  const corsHandler = config.useWhitelist ? cors(corsOptionsWhitelist) : cors(corsOptions);

  return corsHandler(req, res, function() {
    return _geolocation(req, res);
  });
};
