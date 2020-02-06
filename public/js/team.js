$(document).ready(function () {

    const ONE = 1;
    const ZERO = 0
    $("#team_status").select2({
        minimumResultsForSearch: 10
    });
    /**
     * Script to validate team while adding
     */
    $("#frmAddTeam").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            team_name: {
                required: true,
                maxlength: validationError.teamName.maxLengthLimit,
                lettersOnly: true,
                duplicateTeam: true
            },
            team_image: {
                required: true,
            },

        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
        },
        submitHandler: function (form, event) {
            if ($(form).valid()) {
                $("#team_players").val(checkPlayerExists().toString())
                var data = new FormData(form);
                var url = $(form).attr("action");
                $.ajax({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    data: data,
                    mimeType: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        $(".loader").show();
                    },
                    success: function () {
                        $(".loader").hide();
                        $("#modalAddTeam .success-text").text(validationError.popUpMessages.addTeamAdmin);
                        $("#modalAddTeam").modal("show");
                        return false;
                    },
                    error: function (response) {
                        $(".loader").hide();
                        $("#page_error_team_image").text(response.responseJSON.errors.team_image[0]);
                        $("#page_error_team_image").show();
                        return false;
                    }
                });
                return false;
            }

        },
        messages: {
            team_name: {
                required: validationError.teamName.required,
                maxlength: validationError.teamName.maxlength,
            },
            team_image: {
                required: validationError.teamImage.required,

            },
            team_players: {
                maxlength: validationError.teamPlayers.maxlength,
            }

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    /**
     * Script to valid minimum players
     */
    $.validator.addMethod("maxPlayers", function (value, element)
    {
        return getCheckedPlayers().length <= validationError.teamPlayers.maxLengthLimit;
    }, validationError.teamPlayers.maxlength);

    /**
     * Script to check duplicate team
     */
    $.validator.addMethod("duplicateTeam", function (value, element)
    {
        var status = false;
        var teamId = $('#frmEditTeam #id').val();
        var formData = (teamId) ? {'name': value, 'id': teamId} : {'name': value}
        $.ajax({
            url: '/admin/team/checkTeamName',
            type: "GET",
            async: false,
            data: formData,
            success: function (data) {
                status = data.status;
            },
        });
        return status;
    }, validationError.teamName.duplicate);

    //get checked players ids
    var getCheckedPlayers = function () {
        var ids = [];
        $(".players-check").each(function () {
            var playerId = (this.checked ? $(this).val() : "");
            if (playerId)
                ids.push(playerId)
        })
        return ids
    }

    $("#add-player-popup").click(function () {
        $("#search-players").val('')
    })

    //fetch players from server
    var getPlayers = function () {
//        if ($(".players-length").length > validationError.constantFields.zero)
//            return false
        var url = '/admin/team/getPlayers'
        $.ajax({
            url: url,
            type: "GET",
            success: function (response) {
                $("#players-list").html(response.data);
                if (response.count == ZERO)
                    $("#add-players-button").hide()
            },
            error: function () {
                console.log('error');
            }
        });
    }
    //pop up model click event
    $("#add-player").on('show.bs.modal', function () {
        getPlayers()
    })

    //search by players name
    $("#search-players").on("keyup", function () {
        if ($("#players-listing").data('lenght') == ZERO)
            return false
        var value = $(this).val().toLowerCase();
        var i = ZERO;
        $(".players-length").filter(function () {
            if (!($(this).text().toLowerCase().indexOf(value) > -ONE))
                i++
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -ONE)
        });
        if (i >= $("#players-listing").data('lenght')) {
            $("#players-no-record").show();
            $("#add-players-button").hide()
        } else {
            $("#players-no-record").hide();
            $("#add-players-button").show()
        }

    });

    /**
     * Script to close Modal pop Up
     */
    $("#modalAddTeam").click(function () {
        var url = BASE_URL + '/admin/team/teamList';
        window.location.replace(url);
    });

    /**
     * Script to redirect page on userlist
     */
    $("#modalAddTeam").on('hidden.bs.modal', function () {
        var url = BASE_URL + '/admin/team/teamList';
        window.location.replace(url);
    });

    /**
     * Script to activate/deactivate the Player
     * @return redirect(url)
     */

    $("body").on("click", "#changeStatusTeam", function (e) {
        e.preventDefault();
        var current = $(this);
        var url = $(current).attr("href");
        var status = $(current).attr("_status");
        if (status == validationError.constantFields.active) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.deactiveTeam);
            $('#confirm').text(validationError.popUpMessages.deactivateTeamText);
        } else {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.activeTeam);
            $('#confirm').text(validationError.popUpMessages.activateTeamText);
        }
        $("#confirmPopUp").modal("show");
        $("#confirmPopUp")
                .unbind()
                .on("click", "#confirm", function (e) {
                    $("#confirmPopUp").modal("hide");
                    $.ajax({
                        url: url,
                        success: function (response) {
                            if (response != undefined || response != "") {
                                window.location.replace(response);
                            }
                        }
                    });
                });
    });

    /**
     * Script to validate team while adding
     */
    $("#frmEditTeam").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            team_name: {
                required: true,
                maxlength: validationError.teamName.maxLengthLimit,
                lettersOnly: true,
                duplicateTeam: true
            },

        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids()) {
                return;
            }
        },
        submitHandler: function (form, event) {
            if ($(form).valid()) {
                $("#team_players").val(checkPlayerExists().toString())
                var data = new FormData(form);
                var url = $(form).attr("action");
                $.ajax({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    data: data,
                    mimeType: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        $(".loader").show();
                    },
                    success: function () {
                        $(".loader").hide();
                        $("#modalAddTeam .success-text").text(validationError.popUpMessages.editTeamAdmin);
                        $("#modalAddTeam").modal("show");
                        return false;
                    },
                    error: function (response) {
                        $(".loader").hide();
                        $("#page_error_team_image").text(response.responseJSON.errors.team_image[0]);
                        $("#page_error_team_image").show();
                        return false;
                    }
                });
                return false;
            }

        },
        messages: {
            team_name: {
                required: validationError.teamName.required,
                maxlength: validationError.teamName.maxlength,
            },
            team_players: {
                maxlength: validationError.teamPlayers.maxlength,
            }

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    /**
     * Script to remove player from the team
     */
    $("body").on("click", ".removePlayer", function (e) {
        //$(".removePlayer").click(function () {
        var playerId = $(this).attr('player_id');
        $current = $(this);
        if (playerId <= validationError.constantFields.zero)
            return false
        $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.removePlayer);
        $('#confirm').text(validationError.popUpMessages.removePlayerBtnText);
        $("#confirmPopUp").modal("show");
        $("#confirmPopUp")
                .unbind()
                .on("click", "#confirm", function (e) {
                    $("#confirmPopUp").modal("hide");
                    var url = '/admin/team/removePlayerFromTeam/' + playerId;
                    $.ajax({
                        url: url,
                        type: "GET",
                        success: function (response) {
                            if (response.status == validationError.constantFields.oKStatus) {
                                $current.parents('.list-group-item').remove();
                            }
                        },
                        error: function () {
                            console.log('error');
                        }
                    });
                });

    });
    
    var checkPlayerExists = function(){
        var existsPlayer = [];
        $(".players_list_info").each(function(){
            existsPlayer.push($( this ).data('id'))
        })        
        return existsPlayer;
    }

    /**
     * Script to add player list
     */
    $("#add-players-button").click(function () {
        $("#add-player").modal("hide");
        var url = "/admin/team/getPlayersList";
        var playersIdString = getCheckedPlayers().toString()+','+checkPlayerExists().toString();
        var selectedPlayers = $("#team_players").val(playersIdString);
        var selectedPlayersList = selectedPlayers.val();
        var formData = {'selectedPlayersList': selectedPlayersList}
        $.ajax({
            url: url,
            type: "GET",
            data: formData,
            beforeSend: function () {
                // $(".loader").show();
            },
            success: function (response) {
               // checkPlayerExists()
                $(".loader").hide();
                $("#playerList").html(response.data);
               
            },
            error: function () {
                $(".loader").hide();
                console.log("error");
            }
        });
        return false;
    });
});

