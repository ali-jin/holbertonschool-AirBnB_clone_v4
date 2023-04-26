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
  $.ajax({
    url: urlPlaces,
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: newPlaces
  });

  function newPlaces(data) {
    $('SECTION.places').empty();
    $('SECTION.places').append(data.map(place => {
      return `<ARTICLE>
              <DIV class="title">
                <H2>${place.name}</H2>
                  <DIV class="price_by_night">
                    $${place.price_by_night}
                  </DIV>
                </DIV>
                <DIV class="information">
                  <DIV class="max_guest">
                    <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.max_guest} Guests
                  </DIV>
                  <DIV class="number_rooms">
                    <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_rooms} Bedrooms
                  </DIV>
                  <DIV class="number_bathrooms">
                    <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_bathrooms} Bathrooms
                  </DIV>
                </DIV>
                <DIV class="description">
                  ${place.description}
                </DIV>
              </ARTICLE>`;
    }));

    const listAmenities = {};
    const amenities_names = [];
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete listAmenities[$(this).attr('data-id')];
      }
      $('.amenities H4').text(Object.values(listAmenities).join(', '));
    });

  }
});
