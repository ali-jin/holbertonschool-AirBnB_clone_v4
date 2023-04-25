#!/usr/bin/node
$('document').ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  const urlPlaces = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';

  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: urlPlaces,
    method: 'POST',
    ContentType: 'application/json',
    dataType: "json",
    data: "{}",
    success: function (data) {
      data.forEach(place => $('.places').append(newPlaces(place)));
    },
    error: function (error) {
      console.log(error);
    }
  });

  function newPlaces(place) {
    return `
    <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
      </div>
      <div class="user">
        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>`;
  };

  let amenitiesChecked = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenitiesChecked[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesChecked[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenitiesChecked).join(', '));
  });

  $('button').click(function () {
    $.ajax({
      url: urlPlaces,
      method: 'POST',
      ContentType: 'application/json',
      dataType: "json",
      data: JSON.stringify({ amenities: Object.keys(amenitiesChecked) }),
      success: function (data) {
        $('.places').empty();
        data.forEach(place => $('.places').append(newPlaces(place)));
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});
