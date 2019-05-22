const request = require("request")


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1Ijoic3VtbW9uNDEiLCJhIjoiY2p2djB3Yzl3MDZnZDQzczJodGZkeHpkaiJ9.c6_N1-6HEHw9bTgmFouMvQ"
    request({url, json: true,}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('unable to find location, try another search')
        } else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode