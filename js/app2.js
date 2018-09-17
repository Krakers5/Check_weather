$(() => {
    initMap = () => {

        const mapContainer = document.querySelector('#map');
        const mapOptions = {
            zoom: 8,
            center: {lat: 53.123482, lng: 18.008438}
        };
        const APP_ID = 'b7cc90162f2139d3df7c7c8769fc17ac';
        const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
        const map = new google.maps.Map(mapContainer, mapOptions);
        let marker;

        const getMarkerText = resp => {
            return (
            `
            <h3>${resp.name}</h3>
            <p><b>Temperatura:</b>${resp.main.temp} stopni Celsjusza</p>
            <p><b>Ciśnienie: </b>${resp.main.pressure} hPa</p>
            `
            )
        };

        const fetchWeather = event => {
            const latLng = event.latLng;
            const lat = latLng.lat();
            const lng = latLng.lng();
            const coords = `${BASE_URL}?lat=${lat}&lon=${lng}&APPID=${APP_ID}&units=metric`;


            fetch(coords)
                .then(resp => resp.json())
                .then(resp => addMarker(latLng, getMarkerText(resp)))
        };

        const addMarker = (coordination, content) => {
            if (marker && marker.setMap) {
                marker.setMap(null);
            }

            marker = new google.maps.Marker({
                position: coordination,
                map: map,

            });

            const infoWindow = new google.maps.InfoWindow({
                content
            }).open(map,marker)
        };

        google.maps.event.addListener(map, 'click', fetchWeather);

    }
});

