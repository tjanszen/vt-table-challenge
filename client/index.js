'use strict';

var fields;
var items;

$(document).ready(function(){
  //Get data
  var data = 'https://dl.dropboxusercontent.com/u/59995695/input.json';
  $.getJSON(data, function(response){
    //Save fields to global variable *fields*
    fields = response.fields;
    //Save item arrays to global variable *items*
    items = response.values;
    //Call function to create and display table headers
    displayFields(fields);
    //Call function to create and display all table rows
    displayItems();
    //Setup function for collection form input data
    getFormData();
    //Setup function for showing and hiding the 'add new items' form
    showHideForm()
  })

  function getFormData() {
    var newItem = [];
    $('#form-row').submit(function(event) {
      //Prevent page from reloading
      event.preventDefault();
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

  function showHideForm() {
    $('#show-form').click(function() {
      $('#new-item-form').toggleClass('show');
    })
  }
});
