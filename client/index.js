'use strict';

var fields;
var items;

$(document).ready(function(){
  var data = 'https://dl.dropboxusercontent.com/u/59995695/input.json';
  $.getJSON(data, function(response){
    fields = response.fields;
    items = response.values;

    displayFields(fields);
    displayItems(items);
  })

  function displayFields(fields) {
    var $tr = $('#tabel-head-row');
    fields.forEach(function(field) {
      var category = field.label;
      var $th = $('<th></th>');
      $th.addClass('headers');
      $th.text(category);
      $tr.append($th);
    })
  }

  function displayItems(items) {
    var $tableBody = $('#table-body');
    items.forEach(function(item) {
      var $tr = $('<tr></tr>');
      $tr.addClass('item-table-row');
      item.forEach(function(data) {
        var $td = $('<td></td>');
        $td.text(data);
        $tr.append($td);
      });
      $tableBody.append($tr);
    });
    customFilter()
  }

  function customFilter() {
    var $tableHeaders = $('.headers');
    $('table')
    .tablesorter({
      widthFixed: true,
      widgets: ['zebra']
      })
    .tablesorterPager({
      container: $("#pager"),
      size:50
      });
  }
});
