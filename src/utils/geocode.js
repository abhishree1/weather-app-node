const request = require('request')

const geoCode = (address,callback)=>{
    const laturl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=token"

    request({url:laturl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to internet',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to get Location. Please try another location',undefined)
        }
        else{
            callback(undefined,{
                latitute: response.body.features[0].center[1],
                longitute: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports= geoCode;