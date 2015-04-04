'use strict';

$(document).ready(init);

function init() {
  var data = 'https://dl.dropboxusercontent.com/u/59995695/input.json';
  displayLabels(data);
  displayData(data);
}

function displayLabels(data) {
  var $tr = $('#tabel-head-row');
  $.getJSON(data, function(response){
    var fields = response.fields;
    fields.forEach(function(field){
      var $th = $('<th></th>');
      var $a = $('<a></a>');
      $a.text(field.label)
      $th.append($a);
      $tr.append($th);
    })
  })
}

function displayData(data) {
  var $table = $('#table-body');
  $.getJSON(data, function(response){
    var values = response.values
    var numValues = values.length
    values.forEach(function(value){
      var $tr = $('<tr></tr>');
      $tr.addClass('items')
      value.forEach(function(prop){
        var $td = $('<td></td>');
        $td.text(prop);
        $tr.append($td);
      })
      $table.append($tr);
    })
    customPaginate(numValues);
  })
}

//
// function paginate() {
//   $('.pagination').customPaginate({
//     itemsToPaginate : '.items'
//   });
// }

function customPaginate(num) {
  var paginationContainer = $('#paginationContainer')
  // console.log('totals items numbers passed into customPaginator', num);
  // console.log('total items on the page', itemsToPaginate.length)

  var defaults = {
    itemsPerPage: 10,
    itemsToPaginate: $('.items')
  };

  // var settings = {};
  // $.extend(settings, defaults, options);

  var itemsToPaginate = $(defaults.itemsToPaginate);
  var numberOfPaginationLinks = Math.ceil(itemsToPaginate.length / defaults.itemsPerPage)
  console.log('number of pagination links', numberOfPaginationLinks)

  var $div = $('<div></div>');
  $div.addClass('col-sm-offset-2 col-sm-8')

  $div.prependTo(paginationContainer)

  for(var i = 0; i < numberOfPaginationLinks; i++){
    paginationContainer.find('.col-sm-offset-2').append('<button class="btn btn-default">'+ (i+1) + '</button>')
  }

  itemsToPaginate.filter(":gt(" + (defaults.itemsPerPage - 1) + ")").hide();

  paginationContainer.find('button').on('click', function(){
    var linkNumber = $(this).text();
    var itemsToHide = itemsToPaginate.filter(":lt(" + ((linkNumber-1) * defaults.itemsPerPage) + ")");
    $.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((linkNumber * defaults.itemsPerPage) - 1) + ")"));
    itemsToHide.hide();

    var itemsToShow = itemsToPaginate.not(itemsToHide);
    itemsToShow.show();
  })
}
