#!/usr/bin/node
$('document').ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const urlPlaces = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
  const listAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listAmenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(listAmenities).join(', '));
  });

  $('button').click(function () {
    $.ajax({
      url: urlPlaces,
      method: 'POST',
      ContentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(listAmenities) }),
      success: function (dictData) {
        $('.places').empty();
        dictData.forEach(data => $('.places').append(newPlaces(data)));
      },
    });
  });

  function newPlaces(place) {
    return `
    <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest</div>
        <div class="number_rooms">${place.number_rooms} Bedroom</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
      </div>
      <div class="user">
        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>`;
  };
});
