const apiKey = `9989e3bda94842dd822c437195ac6063`;
const localZone = document.querySelector('.local-info');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async function(currentPosition){
        const lat = currentPosition.coords.latitude;
        const long = currentPosition.coords.longitude;
        console.log(long);
        let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        
        if(data.length !== 0){
            let name = data.results[0].timezone.name;
            let std = data.results[0].timezone.offset_STD;
            let stdsec = data.results[0].timezone.offset_STD_seconds;
            let dst = data.results[0].timezone.offset_DST;
            let dstsec = data.results[0].timezone.offset_DST_seconds;
            let country = data.results[0].country;
            let city = data.results[0].city;
            let countrytcode = data.results[0].country_code;
            console.log(countrytcode);

            localZone.innerHTML = `<div>Name of Time Zone: ${name}</div>
                                    <div class="lati"><span>Lat: ${lat}</span><span>Long: ${long}</span></div>
                                    <div>Offset STD:  ${std}</div>
                                    <div>Offset STD Seconds:  ${stdsec}</div>
                                    <div>Offset DST:  ${dst}</div>
                                    <div>Offset DST Seconds:  ${dstsec}</div>
                                    <div>Country:  ${country}</div>
                                    <div>Country Code:  ${countrytcode}</div>
                                    <div>City:  ${city}</div>`;
        }
    });
}
else{
    alert("Geolocation is not supported by this browser.");
}

document.getElementById('btn').addEventListener('click',async function(){
    const input = document.getElementById('inp');
    const err = document.querySelector('.err');
    const result = document.querySelector('.address-info');

    if(input.value){
        if(err.style.display == "block"){
            err.style.display = "none";
        }
    let address = input.value;
    let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if(data.features.length !== 0){
        result.innerHTML="";
        result.style.display = "block";
        let name = data.features[0].properties.timezone.name;
        let lat = data.features[0].properties.lat;
        let long = data.features[0].properties.lon;
        let std = data.features[0].properties.timezone.offset_STD;
        let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
        let dst = data.features[0].properties.timezone.offset_DST;
        let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
        let country = data.features[0].properties.country;
        let city = data.features[0].properties.city;

        result.innerHTML = `<div>Name of Time Zone: ${name}</div>
        <div class="lati"><span>Lat: ${lat}</span><span>Long: ${long}</span></div>
        <div>Offset STD:  ${std}</div>
        <div>Offset STD Seconds:  ${stdsec}</div>
        <div>Offset DST:  ${dst}</div>
        <div>Offset DST Seconds:  ${dstsec}</div>
        <div>Country:  ${country}</div>
        <div>City:  ${city}</div>`;
    }
    else{
        err.style.display = "block";
        result.style.display = "none"
      }
    }
    else{
        if(result.style.display==="block"){
            result.style.display = "none";
        }
          err.style.display = "block";
        
    }
})