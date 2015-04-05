'use strict';

var fields;
var items;

$(document).ready(function(){
  var data = 'https://dl.dropboxusercontent.com/u/59995695/input.json';
  $.getJSON(data, function(response){
    fields = response.fields;
    items = response.values;

    displayFields(fields);
    displayItems();
    getFormData();
    // customFilter();
  })

  function getFormData() {
    var newItem = [];
    $('#form-row').submit(function(event) {
      //Prevent page from reloading
      event.preventDefault();
      //
      var $inputs = $('#new-item-form :input');
      $inputs.each(function() {
        if(this.value !== ""){
          if(this.type === "number"){
            newItem.push(parseInt(this.value));
            this.value = ""
          }else{
            newItem.push(this.value);
            this.value = ""
          }
        }
      })
      addItemToPage(newItem);
      newItem = [];
    })
  }

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

  function displayItems() {
    var $tableBody = $('#table-body');
    items.forEach(function(item) {
      var $tr = $('<tr></tr>');
      $tr.addClass('item-table-row');
      $tr.attr("role", "row");
      item.forEach(function(data) {
        var $td = $('<td></td>');
        $td.text(data);
        $tr.append($td);
      });
      $tableBody.append($tr);
    });
    customFilter();
  }

  function addItemToPage(item) {
    // items.push(item);
    // $('.item-table-row').remove();
    // console.log('the new array ite array items', items);
    // displayItems();

    var $tableBody = $('#table-body');
    var $tr = $('<tr></tr>');
    $tr.addClass('item-table-row odd');
    $tr.attr("role", "row");
    $tr.attr("style", "display: none");
    item.forEach(function(data) {
      var $td = $('<td></td>');
      $td.text(data);
      $tr.append($td);
    });
    $tableBody.append($tr);
    $('table').trigger("update"); 
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
