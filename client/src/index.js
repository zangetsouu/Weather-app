import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class MeteoPage extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      weather:{
        city: 'Braga',
        forecast: []
      },
      value: ''};

   // this.handleChange = this.handleChange.bind(this);

  }


//handleChange(event) {
//    this.setState({value: event.target.value});
//  }

  componentDidMount(){
    this.getWeather();
  }

  getWeather =  _ => {
    if(this.state.value)
      fetch('http://localhost:4000/forecast?city='+this.state.value)
        .then(response => response.json())
        .then(response => this.setState({weather:{ city: response.city, forecast: response.data}}))
        .catch(err => console.error(err));
      else

      fetch('http://localhost:4000/forecast?city='+this.state.weather.city)
        .then(response => response.json())
        .then(response => this.setState({weather:{ city: response.city, forecast: response.data}}))
        .catch(err => console.error(err));


    }





  render() {

    const weather = this.state.weather.forecast;
    let forecast;

    if(weather === 'err'){
      forecast = <div> Unable to get weather data! City not found! </div>
    } else{

      forecast = weather.map(function({code, date, day, high, low, text}){


            const low_1 = Math.round((low-32)*5/9);
            const high_1 = Math.round((high-32)*5/9);
            let img;

            if(text==='Scattered Thunderstorms')
              img = <img src={require('./img/scatter_thunder.png')} alt="scatter_thunder"/>
            if(text==='Thunderstorms')
              img = <img src={require('./img/thunder.png')} alt="thunder"/>
            if(text==='Mostly Cloudy')
              img = <img src={require('./img/cloudy.png')} alt="cloudy"/>
            if(text==='Cloudy')
              img = <img src={require('./img/cloudy.png')} alt="cloudy"/>
            if(text==='Rain')
              img = <img src={require('./img/rain.png')} alt="rain"/>
            if(text==='Showers')
              img = <img src={require('./img/showers.png')} alt="showers"/>
            if(text==='Scattered Showers')
              img = <img src={require('./img/showers.png')} alt="showers"/>
            if(text==='Partly Cloudy')
              img = <img src={require('./img/partly_cloudy.png')} alt="partly_cloudy"/>
            if(text==='Mostly Sunny')
              img = <img src={require('./img/clear.png')} alt="clear"/>
            if(text==='Sunny')
              img = <img src={require('./img/clear.png')} alt="clear"/>
            if(text==='Breezy')
              img = <img src={require('./img/wind.png')} alt="wind"/>

          return <div key={date} className='col-sm'> {day}<br/><br/>{date}<br/><br/>{low_1}-{high_1}ºC<br/><br/>{text} <br/> {img}</div>;}
          )
    }
    return (
      <div className="App">
        <div className="headerimg">
        <br/>
        <br/>
        <br/>
          <h1> Meteo APP </h1>
        </div>

        <div className="col-6">
          <h3> Weather forecast for the next 10 days in {this.state.weather.city}</h3>
          <div  className="container">
            <div className="row">
          {forecast}
            </div>
          </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


        <label>
          Name:
          <input type="text" value={this.state.value} onChange={(e) => this.setState({value:e.target.value})} />
        </label>
        <button  type="button" onClick={this.getWeather}>Click Me!</button>


        </div>
      </div>
    );
  }
}





ReactDOM.render(
  <MeteoPage />,
  document.getElementById('root')
);

