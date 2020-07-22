console.log('adsda');
fetch('http://localhost:3000/weather?address=india').then(res=>{
    res.json().then(data=>{
        console.log(data);
    })
})