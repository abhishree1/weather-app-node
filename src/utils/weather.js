const request = require('request')
const getWeather =(latitute,longitute,callback)=>{
    
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitute+"&lon="+longitute+"&units=metric&appid=yourId"

    request({url:url , json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to internet",undefined);
        }
        else if(response.body.error){
            callback("Unable to get location",undefined);
            
        }
        else{
            callback(undefined,{
                temp:response.body.main.temp,
                pressure:response.body.main.pressure
            });
        }
        
})
}
module.exports=getWeather;