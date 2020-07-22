const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const getWeather = require('./utils/weather')

const app = express()
viewPath = path.join(__dirname,'../templates/views');
partailPath = path.join(__dirname,'../templates/partials')

// app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partailPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help Page'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitute,longitute}={})=>{
        if(error){
            return res.send({error});    
        }
        getWeather(latitute,longitute,(error,{temp,pressure}={})=>{
            if(error){
                return res.send({error});   
            }
            
            res.send({
                address: req.query.address,
                temp: temp,
                pressure:pressure
            })

        })
    })
})

app.get('*',(req,res)=>{
    res.send("404 Page Not Found");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})