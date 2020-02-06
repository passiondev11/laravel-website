$(document).ready(function () {
    
    $("input").attr("autocomplete", "off")
    $(".loader").hide();

    var searchPlayerUrl = BASE_URL + "/admin/promocode/searchPlayer";
    $("#select_player").tokenInput(searchPlayerUrl, {
        // preventDuplicates: true,
        tokenLimit: 1,
        onResult: function (results) {
            var selectedPlayer = $('#selected_player').val();
            var selectedPlayerArr = new Array();
            if (selectedPlayer.indexOf(',') > -1) { 
                selectedPlayerArr = selectedPlayer.split(',') 
            } else {
                selectedPlayerArr.push(selectedPlayer);
            }
            var indexArr = new Array();
            $.each(results, function (index, value) {
                var valueId = value.id;
                if(($.inArray(valueId.toString(), selectedPlayerArr) >= 0)) {
                    indexArr.push(index);
                }                    
            });
            for (var i = indexArr.length -1; i >= 0; i--) {
                results.splice(indexArr[i],1);
            }
            return results;
        },
        hintText: "Search player with name",
        noResultsText: "No player found",
        onAdd: function (item) {
            var selectedPlayer = $('#selected_player').val();
            if(selectedPlayer != '') {
                selectedPlayer += ','+item.id;
            } else {
                selectedPlayer = item.id;
            }
            setPromoPlayerAutoComplateValue('selected_player',selectedPlayer);
            getPlayerOpponents(item.name);
        },
        onDelete: function (item) {
            var selectedPlayer = $('#selected_player').val();
            var selectedPlayerArr = new Array();
            if (selectedPlayer.indexOf(',') > -1) { 
                selectedPlayerArr = selectedPlayer.split(',') 
            } else {
                selectedPlayerArr.push(selectedPlayer);
            }
            $.each(selectedPlayerArr, function(index, value) {
                if(value == item.id) {
                    selectedPlayerArr.splice($.inArray(value, selectedPlayerArr),1);
                }
            })
            selectedPlayer = selectedPlayerArr.join(',');
            setPromoPlayerAutoComplateValue('selected_player',selectedPlayer);
            removePlayerOpponents();
        },
        prePopulate: playersList,
    });
});

/**
* set the autocomplete value for player
*/
function setPromoPlayerAutoComplateValue(input, value) {
    $("#"+input).val(value);
}

/**
* get player opponents
*/
function getPlayerOpponents(playerName) {
    if(playerName != '') {
        var data = {playerName: playerName};
        var url = BASE_URL + '/admin/getPlayerOpponents';

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            beforeSend: function () {
                $(".loader").show();
            },
            success: function (result) {
                $(".loader").hide();
                result = JSON.parse(result);
                $('#opponent').html(result);
                return false;
            },
            error: function() {
                $(".loader").hide();  
            }
        });
    } 
}

/**
* remove opponents
*/
function removePlayerOpponents() {
    var selectedPlayer = $('#selected_player').val();
    if(selectedPlayer == '') {
        var dropdown = '<option value="">Select Opponent</option>';
        $('#opponent').html(dropdown);
    }
}

