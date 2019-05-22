const request = require("request")


const forecast = (latitude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/6a5ca3563939b682790facf35328b815/"+latitude+","+longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to forecast services')
        } else if (body.error) {
            callback('unable to find forecast, try another search')
        } else {
            callback(undefined, {
                summary : body.daily.data[0].summary,
                temperature : body.currently.temperature
                        })
        }
    })
}

module.exports = forecast