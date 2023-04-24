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

  const listAmenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listAmenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(listAmenities).join(', '));
  });
});
