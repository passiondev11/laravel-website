$(document).ready(function () {
    /**
     * Date Picker  
     * @return  datepicker
     */
    $(".calGameDate").flatpickr({
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        disableMobile: true,
    });

    /**
     * Script to export CSV implementation
     * 
     */
    $("body").on("click", "#btnExportCsvInsurance", function (e) {
        e.preventDefault();
        var userType = $(this).data('usertype') ? $(this).data('usertype') : "";
        $(".error").html('');
        var purchasedFrom = $("input[name='purchased_from']").val();
        var purchasedTo = $("input[name='purchased_to']").val();
        var userStatus = $("#user_status_filter").val() ? $("#user_status_filter").val() : "";
        var gameDate = $("input[name='game_date']").val() ? $("input[name='game_date']").val() : "";
        var playerName = $("input[name='player_name']").val() ? $("input[name='player_name']").val() : "";
        var statusInsurance = $("#insurance_status_filter").val() ? $("#insurance_status_filter").val() : "";
        var playerId = $("#playerId").val() ? $("#playerId").val() : "";
        var userName = $("input[name='user_name']").val() ? $("input[name='user_name']").val() : '';
        var userId = $("#userId").val() ? $("#userId").val() : "";
        if ($.trim(purchasedFrom) == "") {
            $(".error").html(validationError.exportCsv.purchasedFromRequired);
            return false;
        }
        if ($.trim(purchasedTo) == "") {
            $(".error").html(validationError.exportCsv.purchasedToRequired);
            return false;
        }

        var formData = {"purchasedFrom": purchasedFrom,
            "purchasedTo": purchasedTo, "statusInsurance": statusInsurance,
            "gameDate": gameDate, "playerName": playerName, "userStatus": userStatus,
            "playerId": playerId, "userId": userId, "userName": userName, "userType": userType};
        $.ajax({
            url: '/admin/export/insurances',
            type: "GET",
            data: formData,
            success: function (response) {
                var queryString = "?statusInsurance=" + statusInsurance + "&purchasedFrom="
                        + purchasedFrom + "&purchasedTo=" + purchasedTo + "&userType=" + userType +
                        "&gameDate=" + gameDate + "&playerName=" + playerName + "&userStatus=" + userStatus + "&playerId=" + playerId + "&userId=" + userId + "&userName=" + userName;
                var url = "/admin/export/insurances" + queryString;
                window.location.href = url;
            }
        });
    });

    /**
     * Script to add player list
     */
    $("body").on("click", ".show-insurance-link", function (e) {
        var current = $(this);
        var insId = $(current).attr("data");
        var page = $(current).attr("page") ? $(current).attr("page") : '';
        var url = "/admin/insurance/getInsuranceInfo/" + insId + '/' + page;
        var formData = {'insId': insId, 'page': page}
        $.ajax({
            url: url,
            type: "GET",
            data: formData,
            beforeSend: function () {
                // $(".loader").show();
            },
            success: function (response) {
                $(".loader").hide();
                $("#modal-show-div").html(response.data);
                //  var updateTime = flatpickr.formatDate(new Date(response.updateTime), "d/m/Y | H:i:S");
                //$("#updateTime").text("("+updateTime+")")
                //$("#updateTime").text("(" + showFormatDateTime(response.updateTime, "d/m/Y | H:i:S") + ")")
                $("#statusPendingTime").text("(" + showFormatDateTime(response.statusPendingTime, "M d, Y | H:i:S") + ")")
                $("#statusApprovedTime").text("(" + showFormatDateTime(response.statusApprovedTime, "M d, Y | H:i:S") + ")")
                $("#statusRejectedTime").text("(" + showFormatDateTime(response.statusRejectedTime, "M d, Y | H:i:S") + ")")
                $("#modalInsuranceDetail").modal("show");

            },
            error: function () {
                $(".loader").hide();
            }
        });
        return false;
    });

    var showFormatDateTime = function (dateVal, formatType) {
        return flatpickr.formatDate(new Date(dateVal), formatType);
    }

    /**
     * Script to approve insurance of the User
     * @return redirect(url)
     */
    $("body").on("click", ".approveInsurance", function (event) {
        event.preventDefault();
        var current = $(this);
        var insId = $(current).attr("data");
        var url = "/admin/insurance/changeStatusUserInsurance/" + insId;
        var formData = {'insId': insId}

        $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.approveUserInsuranceText);
        $('#confirm').text(validationError.popUpMessages.approveUserInsuranceBtnText);

        $("#confirmPopUp").modal("show");
        $("#confirmPopUp")
                .unbind()
                .on("click", "#confirm", function (e) {
                    $("#confirmPopUp").modal("hide");
                    $.ajax({
                        url: url,
                        data: {'type': validationError.constantFields.one},
                        success: function (response) {
                            if (response["status"] = validationError.insurance.STATUS_SUCCESS) {
                                current.closest("tr").find(".yellow-txt").parent().html('<span class="green-txt">' + validationError.insurance.approved + '</span>');
                                current.closest("td").html("");
                                displayNotificationMsg("alert-success", response["message"]);
                            } else {
                                displayNotificationMsg("alert-danger", response["message"]);
                            }

                        }
                    });
                });
    });

    /*
     * Close Reject Modal
     */
    $(document).on("click", ".rejectClose", function (event) {
        $("#modalRejectComment").modal("hide");
    });

    /**
     * Script to reject insurance and refund for the User
     * @return redirect(url)
     */
    $("body").on("click", ".rejectInsurance", function (event) {
        event.preventDefault();
        var current = $(this);
        var insId = $(current).attr("data");
        var transactionId = $(current).attr("data-txid");
        var url = "/api/refundPaypalPayment";
        var rejectUrl = "/admin/insurance/changeStatusUserInsurance/" + insId;
        var formData = {"insurance_id": insId, "captureId": transactionId, "comment": ""}

        //Open comment popup and enter the reason for reject
        $("#modalRejectComment .popUpMsg").text(validationError.popUpMessages.rejectUserInsuranceText);

        $("#confirmReject").text(validationError.popUpMessages.buttonText);

        $("#modalRejectComment").modal("show");
        $("#comment").val("");
        $("#modalRejectComment .err-txt").text("");
        $("#modalRejectComment")
                .unbind()
                .on("click", "#confirmReject", function (e) {
                    var comment = $('#comment').val().trim();
                    if (comment == "") {
                        $("#comment").siblings(".err-txt").text(validationError.refund.comment);

                    } else {
                        formData.comment = comment;
                        $("#modalRejectComment").modal("hide");

                        $("#confirmPopUpDeactivate .popUpMsg").text(validationError.popUpMessages.rejectUserInsurancePopupText);

                        $("#confirmDeactivate").text(validationError.popUpMessages.rejectUserInsuranceBtnText);
                        $("#confirmPopUpDeactivate").modal("show");
                        $("#confirmPopUpDeactivate")
                                .unbind()
                                .on("click", "#confirmDeactivate", function (e) {
                                    $(".loader").css("display", "");
                                    $("#confirmPopUpDeactivate").modal("hide");
                                    $.ajax({
                                        type: "POST",
                                        url: url,
                                        data: formData
                                    }).done(function () {
                                        $.ajax({
                                            url: rejectUrl,
                                            data: {'type': validationError.constantFields.two},
                                            success: function (response) {
                                                if (response["status"] = validationError.insurance.STATUS_SUCCESS) {
                                                    current.closest("tr").find(".yellow-txt").parent().html('<span class="red-txt">' + validationError.insurance.rejected + '</span>');
                                                    current.closest("td").html("");
                                                    $(".loader").css("display", "none");
                                                    displayNotificationMsg("alert-success", response["message"]);
                                                } else {
                                                    $(".loader").css("display", "none");
                                                    displayNotificationMsg("alert-danger", response["message"]);
                                                }

                                            }, error: function (textStatus, errorThrown) {
                                                $(".loader").css("display", "none");
                                            }
                                        });
                                    }).fail(function () {
                                        window.location.reload();
                                    });
                                });

                    }

                });
    });

    /**
     * Script to change Claim reimbursement eligibility of the User
     * @return redirect(url)
     */
    $("body").on("click", ".changeReimbEligibility", function (event) {
        event.preventDefault();
        var current = $(this);
        var claimId = current.attr("data");
        var reimbStatusEligible = current.attr("data-change-status");
        var url = "/admin/claims/changeClaimReimburseEligibility/" + claimId;
        var formData = {"cliam_id": claimId, "comment": ""};

        if (reimbStatusEligible == validationError.constantFields.statusPaid) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.approveReimburseEligibleText);
            $('#confirm').text(validationError.popUpMessages.approveReimburseEligibleBtnText);
            $("#confirmPopUp").modal("show");
        } else {
            //Open comment popup and enter the reason for reject
            $("#modalRejectComment .popUpMsg").text(validationError.popUpMessages.rejectUserInsuranceText);

            $("#confirmReject").text(validationError.popUpMessages.buttonText);

            $("#modalRejectComment").modal("show");
            $("#comment").val("");
            $("#comment").attr("placeholder", validationError.eligibility.placeholder);
            $("#modalRejectComment .err-txt").text("");

            $("#modalRejectComment")
                    .unbind()
                    .on("click", "#confirmReject", function (e) {
                        var comment = $('#comment').val().trim();
                        if (comment == "") {
                            $("#comment").siblings(".err-txt").text(validationError.refund.comment);
                        } else {
                            formData.comment = comment;
                            $("#modalRejectComment").modal("hide");

                            $("#confirmPopUp").modal("show");
                            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.rejectReimburseEligibleText);
                            $('#confirm').text(validationError.popUpMessages.rejectReimburseEligibleBtnText);
                        }

                    });
        }
        $("#confirmPopUp")
                .unbind()
                .on("click", "#confirm", function (e) {
                    $("#confirmPopUp").modal("hide");
                    $.ajax({
                        url: url,
                        data: {'changeType': reimbStatusEligible, 'comment': formData.comment},
                        success: function (response) {
                            if (response["status"] = validationError.insurance.STATUS_SUCCESS) {
                                if (reimbStatusEligible == validationError.constantFields.statusPaid) {//..update : yes                                   

                                    current.closest("td").html(validationError.constantFields.yes);
                                    current.attr("data-change-status", validationError.constantFields.statusNotPaid);
                                    $("#paid_" + claimId).prop("disabled", false);
                                    $("#paid_" + claimId).parent().addClass("changeReimbPaid")
                                } else {//..update : No                                          
                                    current.closest("td").html(validationError.constantFields.no);
                                    current.attr("data-change-status", validationError.constantFields.statusPaid);
                                    $("#paid_" + claimId).prop("disabled", true);
                                    $("#paid_" + claimId).parent().removeClass("changeReimbPaid")
                                }
                                displayNotificationMsg("alert-success", response["message"]);
                            } else {
                                displayNotificationMsg("alert-danger", response["message"]);
                            }
                            var notifyUrl = "/admin/claims/sendMailForReimburseEligibility/" + claimId;
                            $.ajax({
                                url: notifyUrl,
                                data: {'claimId': claimId},
                                success: function (response) {

                                }
                            });
                        }
                    });
                });
    });

    /**
     * Script to change Claim reimbursement paid of the User
     * @return redirect(url)
     */
    $("body").on("click", ".changeReimbPaid", function (event) {
        event.preventDefault();
        var current = $(this);
        var claimId = current.attr("data");
        var reimbStatusPaid = current.attr("data-change-status");
        var url = "/admin/claims/changeClaimReimbursePaid/" + claimId;

        if (reimbStatusPaid == validationError.constantFields.statusPaid) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.approveReimbursePaidText);
            $('#confirm').text(validationError.popUpMessages.approveReimbursePaidBtnText);

            $("#confirmPopUp").modal("show");
            $("#confirmPopUp")
                    .unbind()
                    .on("click", "#confirm", function (e) {
                        $("#confirmPopUp").modal("hide");
                        $.ajax({
                            url: url,
                            data: {'changeType': reimbStatusPaid},
                            success: function (response) {
                                if (response["status"] = validationError.insurance.STATUS_SUCCESS) {
                                    $("#paid_" + claimId).prop("checked", false);
                                    current.attr("data-change-status", validationError.constantFields.statusNotPaid);
                                    $("#paid_" + claimId).prop("disabled", true);
                                    $("#paid_" + claimId).parent().removeClass("changeReimbPaid");
                                    $("#eligibility_" + claimId).prop("disabled", true);
                                    $("#eligibility_" + claimId).parent().removeClass("changeReimbEligibility");

                                    displayNotificationMsg("alert-success", response["message"]);
                                } else {
                                    displayNotificationMsg("alert-danger", response["message"]);
                                }
                            }
                        });
                    });
        }
    });

    /**
     * Script to view proof of purchase
     * @return modal
     */
    $("body").on("click", ".showProofOfPurchaseImage", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");      
        $("#modalProofOfPurchase #displayProofOfPurcahse").attr("src", url);
        $("#modalProofOfPurchase").modal("show");
        
    });
    
    /*
     * Close proof of purchase Modal
     */
    $(document).on("click", ".proofClose", function (event) {
        $("#modalProofOfPurchase #displayProofOfPurcahse").attr("src", "");
        $("#modalProofOfPurchase").modal("hide");
    });
    
});

