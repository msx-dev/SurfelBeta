export const getWeatherString = (weatherStatus) => {
    var digit = weatherStatus.toString()[0]; 
    let weatherString = "";

    if(weatherStatus === 800){
        weatherString="Clear";
    }else if(801 <= weatherStatus && weatherStatus <= 804){
        weatherString="Cloudy";
    }else if(digit == 2){
        weatherString="Stormy";
    }else if(digit == 3){
        weatherString="Rainy";
    }else if(digit==5){
        weatherString="Rainy";
    }else if(digit==6){
        weatherString="Snowy";
    }else{
        weatherString="Dust"
    }
    

    return weatherString;
}