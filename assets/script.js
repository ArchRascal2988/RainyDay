// openWeather api key: 56de1eb517b3c48fb6839f0e3a51dbfb
var formEl= $("#cityPicker");
var listContainer= $(".cityDrop");
var titleContainer= $(".cCityTitle");
var fivedayContainer= $(".cCity");






function grabLocation(str){
    var city= str;
    var lat;
    var lon;
    //city.replaceAll(" ","");
    var url= "//api.openweathermap.org/geo/1.0/direct?q=Orlando,FL,&appid=56de1eb517b3c48fb6839f0e3a51dbfb";
    fetch(url,{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        lat= data[0].lat;
        lon= data[0].lon;
    });
    console.log(lat, lon);
    parseCurrent(lat,lon);
    parseHistoric(lat,lon);
}

function parseCurrent(x,y){

}

function parseHistoric(x,y){

}

function makeDate(x){

}

function constructObjs(str1, str2, str3, a, b, c, d){

}

function displayContent(x){

}

formEl.on("submit", function(event){
    event.preventDefault();
    var city= $(formEl).children().eq(0).val();
    grabLocation(city);
    formEl.children().eq(0).val("");
});

grabLocation();