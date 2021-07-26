jQuery(document).ready(function($) {
  let url_woeid = "https://www.metaweather.com/api/location/search/?query="
  let url_info = "https://www.metaweather.com/api/location/"
  let url_img = "https://www.metaweather.com/static/img/weather/"

  let location = document.querySelector('.city_value');
  let boton_clima = document.querySelector('.button_weather');
  let ubicacion = document.querySelector('.ubicacion');
  let pais = document.querySelector('.pais');
  let city_card = document.querySelector('.city_card');
  let temperatura = document.querySelector('.temperatura');
  let temp_min = document.querySelector('.temp_min');
  let temp_max = document.querySelector('.temp_max');
  let clima = document.querySelector('.clima');
  let weather_card = document.querySelector('.weather_card');
  let fecha = document.querySelector('.fecha_hoy');
  let weather_code;

  let div = document.createElement('div');

  let woeid;
  let img_code;

  boton_clima.addEventListener('click', function() {
    $('.button_weather').html('FIND')
    img_code;
    fetch(`${url_woeid}${location.value}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        woeid = parseInt(data[0].woeid);
        console.log(woeid);
      })
      .then(() => fetch(`${url_info}${woeid}/`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          pais.innerHTML = `| ${data.parent.title} |`;
          city_card.innerHTML = `| ${data.title} |`;
          img_code = data.consolidated_weather[0].weather_state_abbr;
          temperatura.innerHTML = `TEMPERATURA: ${parseInt(data.consolidated_weather[0].the_temp)}°C`;
          temp_min.innerHTML = `MÍNIMA: ${parseInt(data.consolidated_weather[0].min_temp)}°C`;
          temp_max.innerHTML = `MÁXIMA: ${parseInt(data.consolidated_weather[0].max_temp)}°C`
          fecha.innerHTML = `${data.consolidated_weather[0].applicable_date}`
          weather_code = data.consolidated_weather[0].weather_state_abbr;
          console.log(weather_code);
          setTimeout(mostrarTarjetas, 300);
          cambioFondos()
        }))
      .then(() => fetch(`${url_img}${img_code}.svg`)
        .then(data => {
          console.log(data);
          div.innerHTML = `<img src="${url_img}${img_code}.svg" alt="icono_clima">`;
          clima.prepend(div)
        }))
      .catch(function() {
        Swal.fire({
          icon: 'error',
          title: 'CIUDAD NO ENCONTRADA',
          text: 'TEXT IN ENGLISH PLEASE',
        })
      });

  })



  function mostrarTarjetas(){
    $('.card_2').toggle('slow');
    $('.fecha').toggle('fast');
    if ($('.card2').is(':none')) {
      $('.button_weather').html('FIND');
    }else {
      $('.button_weather').html('HIDE');
    }
    }
  function cambioFondos(){
    if (weather_code == "sn") {
      $('video').attr('src', './video/nieve.mp4');
    }else if (weather_code == "sl" || weather_code == "h") {
      $('video').attr('src', './video/granizo.mp4');
    }else if (weather_code == "t") {
      $('video').attr('src', './video/tormenta.mp4');
    }else if (weather_code == "hr" || weather_code == "lr") {
      $('video').attr('src', './video/lluvia.mp4');
    }else if (weather_code == "s") {
      $('video').attr('src', './video/llovizna.mp4');
    }else if (weather_code == "lc" || weather_code == "c") {
      $('video').attr('src', './video/soleado.mp4');
    }else if (weather_code == "hc") {
      $('video').attr('src', './video/nublado.mp4');
    }else {
      $('video').attr('src', './video/default.mp4');
    }
  }


});
