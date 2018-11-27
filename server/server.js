const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());

app.get('/forecast', (req,res) => {

    const {city} = req.query;

    let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%22"+city+"%22)&format=json";
    request(url, function (err, response, body) {
        if(err){
          console.log('error:', err);
        } else {
          let weather = JSON.parse(body);
          let message = '';

          if (weather.query.results != null){
            if(weather.query.results.channel.item !=null){
            message = weather.query.results.channel.item.forecast;
          } else{
            message = 'unavailable';
          }
        }
          else
            message = 'err';
          console.log('done: city==>',city);
          console.log('message==>', message);
          res.json({
            data: message,
            city: city
          })
        }
    });

});


app.listen(4000, () => {
  console.log('Server listening at http://127.0.0.0:4000')
})
