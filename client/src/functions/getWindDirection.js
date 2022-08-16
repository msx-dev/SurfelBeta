export const getWindDirection = (degrees) => {
    let direction = "";
    if(degrees >= 345 && degrees <=360){
        direction = "N";
    }else if(degrees >= 0 && degrees <= 15){
        direction = "N";
    }else if(degrees > 285 && degrees < 345){
        direction="NW";
    }else if(degrees >= 255 && degrees <= 285){
        direction="W";
    }else if(degrees > 195 && degrees < 255){
        direction="SW";
    }else if(degrees >= 165 && degrees <= 195){
        direction="S";
    }else if(degrees > 105 && degrees < 165){
        direction="SE";
    }else if(degrees >= 75 && degrees <= 105){
        direction="E";
    }else{
        direction="NE";
    }

    return direction;
}