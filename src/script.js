function getApi(ville){
    let request = "http://api.openweathermap.org/data/2.5/weather?q="+ville+"&APPID=ee07e2bf337034f905cde0bdedae3db8";
    fetch(request)
    .then(response => response.json())
    .then(json => console.log(json))
}

getApi("vannes");