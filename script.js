$(function(){
    console.log("DOM LOADED");
})

var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries(){
    console.log("searchCountries");
    var countryNameUserInput = $('#country-name').val();
    if(!countryNameUserInput.length) countryNameUserInput = 'Poland';
    $.ajax({
        url: url + countryNameUserInput,
        method: 'GET',
        success: showCountriesList
    });
}

function showCountriesList(resp){  
    countriesList.empty();
    resp.forEach(function(item){
        var countryFullName = item.name.toLowerCase();
        var countryNameUserInput = $('#country-name').val();
        if(countryFullName.includes(countryNameUserInput)){
        $('<li class="list-group-item">').html('<img class="country-img" src="' + item.flag + '">' + item.name + ' <em>[' + item.alpha3Code + ']</em>').appendTo(countriesList).click(function() {
            showCountriesDetails(item);
        })};
    });
}

function showCountriesDetails(item){
    $('#country-description-flag').attr('src', item.flag);
    $('#country-description-name').html(item.name +  ' ' + '<em>' + item.nativeName + '</em>');
    $('#country-description-region').html(item.region + ' / ' + item.subregion);

    var table = $('#country-description-table');
    table.html('');
    table.append('<tr><td>Capital</td><td>' + item.capital + '</td></tr>');
    table.append('<tr><td>Population</td><td>' + item.population + '</td></tr>');
    table.append('<tr><td>Area</td><td>' + item.area + ' sqm</td></tr>');
    item.currencies.forEach(function(subitem, index){
        console.log(subitem);
        var blankSpace = '';
        if(index == 0) blankSpace = "Currencies: ";
        table.append('<tr><td>' + blankSpace + '</td><td>' + subitem.code + ' ' + subitem.name +  '</td></tr>');
    });

    item.languages.forEach(function(subitem, index){
        console.log(subitem);
        var blankSpace = '';
        if(index == 0) blankSpace = "Languages: ";
        table.append('<tr><td>' + blankSpace + '</td><td>' + subitem.name +  '</td></tr>');
    });
}

