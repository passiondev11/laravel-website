$(document).ready(function () {
    $("input").attr("autocomplete", "off")
    $(".loader").hide();
    
    //..hide notification
    $("#displayAjaxMessage").css("display", "none");

    //..set time out for success toast message.
    
    setTimeout(function () {
        $("div.alert-success, div.alert-danger").css("display", "none");
    }, 5000); // 5 secs

    $("input").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length)
            e.preventDefault();
    });

    // restrict white space for password input field
    $("#password, #email, #oldPassword, #newPassword, #confirmPassword").on(
            "keypress", function (e) {
                if (e.which === 32)
                    e.preventDefault();
            });

    $("#frmAdduser").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            first_name: {
                required: true,
                maxlength: validationError.firstName.maxLengthLimit,
                lettersOnly: true,
            },
            last_name: {
                required: true,
                maxlength: validationError.lastName.maxLengthLimit,
                lettersOnly: true,
            },
            email: {
                email: true,
                required: true,
                duplicateEmailDB: true,
                maxlength: validationError.email.maxlength,
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
                // disable button if form is validated to prevent the resubmission

                var data = $('form').serialize();
                var url = $(form).attr("action");
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    beforeSend: function () {
                        $(".loader").show();
                    },
                    success: function () {
                        $(".loader").hide();
                        $("#modalAddUser").modal("show");
                        return false;
                    }
                });
                return false;
                event.preventDefault();
            }

        },
        messages: {
            first_name: {
                required: validationError.firstName.required,
            },
            last_name: {
                required: validationError.lastName.required,

            },
            email: {
                required: validationError.email.required,
                email: validationError.email.email,
            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    // duplicate user email checking in database 
    $.validator.addMethod("duplicateEmailDB", function (value, element) {
        var flag = true;
        var id = $('#frmEdituser #id').val();
        var formData = (id) ? {'email': value, 'id': id} : {'email': value}
        $.ajax({
            url: BASE_URL + '/admin/checkduplicateemail',
            type: "GET",
            async: false,
            data: formData,
            success: function (data) {
                if (data == validationError.constantFields.active) {
                    flag = false;
                }
            },
        });
        return flag;

    }, validationError.email.duplicate);
    // for characters input only
    $.validator.addMethod("lettersOnly", function (value, element)
    {
        return this.optional(element) || /^[a-z\- ]+$/i.test(value);
    }, validationError.firstName.lettersonly);

    $("#frmAdminLogin").validate({
        ignore: "", // for hidden input field validate
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                spaceCheck: true
            },
        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;
        },
        submitHandler: function (form) {
            if ($(form).valid()) {
                // disable button if form is validated to prevent the resubmission
                form.submit();
                return false;
            }
        },
        messages: {
            email: {
                required: validationError.loginEmail.required,
                email: validationError.loginEmail.invalid
            },
            password: {
                required: validationError.loginPassword.required,
                spaceCheck: validationError.password.spaceCheck
            },
        },
        errorPlacement: function (error, element) {
            element.parents('.form-group').find('.error').hide();
            error.insertAfter(element.parent());
        },
    });

    /**
     * Form Validator binded for reset form
     * 
     */
    $("#frmResetForm").validate({
        ignore: "", // for hidden input field validate
        rules: {
            email: {
                required: true,
                email: true,
                checkRegisteredEmail: true
            }
        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return false;
        },
        submitHandler: function (form) {
            // disable button if form is validated to prevent the resubmission
            if ($(form).valid()) {
                var data = {email: $("#email").val()};
                var url = $(form).attr("action");
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    success: function () {
                        $('#resetPopup .mail-link').text($("#email").val());
                        $('#resetPopup .mail-link').attr('href', 'mailto:' + $("#email").val());
                        $("#resetPopup").modal("show");
                        $("#email").val('');
                        return false;
                    }
                });
                return false;
            }
        },
        messages: {
            email: {
                required: validationError.loginEmail.required,
                email: validationError.loginEmail.invalid,
                checkRegisteredEmail: validationError.loginEmail.userExists
            }

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);

        }
    });

    /**
     * Form Validator binded for Reset password form
     * 
     */
    $("#frmResetPassword").validate({
        ignore: "", // for hidden input field validate
        rules: {
            password: {
                required: true,
                minlength: 8,
                maxlength: 20,
                spaceCheck: true,
                pwcheck: true
            },
            password_confirmation: {
                required: true,
                minlength: 8,
                maxlength: 20,
                equalTo: "#password"
            },
        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;
        },
        submitHandler: function (form) {
            if ($(form).valid()) {
                // disable button if form is validated to prevent the resubmission
                var data = $('form').serialize();
                var url = $(form).attr("action");
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    success: function () {
                        $("#passwordResetPopup").modal("show");
                        return false;
                    }
                });
                return false;
            }

        },
        messages: {
            password: {
                required: validationError.password.required,
                pwcheck: validationError.password.passwordCheck,
                spaceCheck: validationError.password.spaceCheck,
                minlength: validationError.password.passwordLength
            },
            password_confirmation: {
                required: validationError.password.required,
                equalTo: validationError.passwordConfirmation.equalTo
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);

        }
    });

    /**
     * Form Validator binded for change password form
     * 
     */
    $("#changePasswordForm").validate({
        ignore: "", // for hidden input field validate
        rules: {
            oldPassword: {
                required: true,
                minlength: 8,
                maxlength: 20,
                spaceCheck: true
            },
            newPassword: {
                required: true,
                minlength: 8,
                maxlength: 20,
                spaceCheck: true,
                pwcheck: true
            },
            confirmPassword: {
                required: true,
                minlength: 8,
                maxlength: 20,
                equalTo: "#newPassword"
            }
        },
        highlight: function (element) {
        },
        unhighlight: function (element) {
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;
        },
        submitHandler: function (form) {
            if ($(form).valid()) {
                $('#oldPassErr').text('');
                $('#oldPassErr').hide();
                // disable button if form is validated to prevent the resubmission
                var oldPassword = $("#oldPassword").val();
                var newPassword = $("#newPassword").val();
                var confirmPassword = $("#confirmPassword").val();
                var data = {
                    _token: $("input[name='_token']").val(),
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                };

                var url = $(form).attr("action");
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    data: data,
                    beforeSend: function () {
                        $(".loader").show();
                    },
                    success: function () {
                        $(".loader").hide();
                        location.reload();
                    },
                    error: function (response) {
                        $(".loader").hide();
                        var responseData = response.responseJSON;
                        $('#oldPassErr').text(responseData.message);
                        $('#oldPassErr').show();
                        return false;
                    }
                });
                return false;
            }

        },
        messages: {
            oldPassword: {
                required: validationError.password.required,
                minlength: validationError.password.passwordLength,
            },
            newPassword: {
                required: validationError.password.required,
                pwcheck: validationError.password.passwordCheck,
                spaceCheck: validationError.password.spaceCheck,
                minlength: validationError.password.passwordLength
            },
            confirmPassword: {
                required: validationError.password.required,
                equalTo: validationError.passwordConfirmation.equalTo
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);

        }
    });

    /**
     * Validator method Space Check added for checking the space input
     * @return {bool} 
     */
    $.validator.addMethod("spaceCheck",
            function (value, element) {
                return /^\S*$/.test(value);
            });

    /**
     * Validator added for checking the password format
     * @return {bool} 
     */
    $.validator.addMethod("pwcheck",
            function (value, element) {                
                return /^[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/i.test(value);
            });

    /**
     * Validator added for checking duplicate 
     * user email in database
     * @return {bool} 
     */
    $.validator.addMethod("checkRegisteredEmail", function (value, element) {
        var flag = true;
        $.ajax({
            url: BASE_URL + '/checkAdminExists',
            type: "GET",
            async: false,
            data: {'email': value},
            success: function (data) {
                if (data == validationError.constantFields.inactive) {
                    flag = false;
                }
            },
        });
        return flag;
    }, validationError.loginEmail.userExists);

    /**
     * Script to close Modal pop Up
     */
    $('#closePopUp').click(function () {
        var url = BASE_URL + '/admin/user/userlist';
        window.location.replace(url);
    });

    /**
     * Script to redirect page on userlist
     */
    $('#modalAddUser').on('hidden.bs.modal', function () {
        var url = BASE_URL + '/admin/user/userlist';
        window.location.replace(url);
    })

    /**
     * Script to activate/deactivate the User
     * @return redirect(url)
     */
    $("body").on("click", "#changeStatus", function (e) {
        e.preventDefault();
        var current = $(this);
        var url = $(current).attr("href");
        var status = $(current).attr("_status");
        if (status == validationError.constantFields.active) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.deactiveUser);
            $('#confirm').text(validationError.popUpMessages.deactivate);
        } else {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.activeUser);
            $('#confirm').text(validationError.popUpMessages.activate);
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
     * Script to validate on user edit
     * @return redirect(url)
     */
    $("#frmEdituser").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            first_name: {
                required: true,
                maxlength: validationError.firstName.maxLengthLimit,
                lettersOnly: true,
            },
            last_name: {
                required: true,
                maxlength: validationError.lastName.maxLengthLimit,
                lettersOnly: true,
            },
            email: {
                email: true,
                required: true,
                duplicateEmailDB: true,
                maxlength: validationError.email.maxlength,
            },
            phone: {
                number: true,
                maxlength: validationError.phone.maxLengthLimit,
                validPhone: true,
            },
            address: {
                maxlength: validationError.constantFields.addressMaxLength,
            },
            city: {
                lettersOnly: true,
            },
            zipcode: {
                maxlength: validationError.zipcode.maxLengthLimit,
                alphaNumeric: true,
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
                // disable button if form is validated to prevent the resubmission
                var data = $('form').serialize();
                var url = $(form).attr("action");
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    beforeSend: function () {
                        $(".loader").show();
                    },
                    success: function () {
                        $(".loader").hide();
                        $('#modalAddUser .success-text').text(validationError.popUpMessages.editUserAdmin);
                        $("#modalAddUser").modal("show");
                        return false;
                    }
                });
                return false;
                event.preventDefault();
            }

        },
        messages: {
            first_name: {
                required: validationError.firstName.required,
            },
            last_name: {
                required: validationError.lastName.required,

            },
            email: {
                required: validationError.email.required,
                email: validationError.email.email,
            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    /**
     * Script to valid phone number
     * return string
     */
    $.validator.addMethod("validPhone", function (value, element)
    {
        if (value.trim().length == 10 || value.trim().length == 0) {
            return true;
        } else {
            return false;
        }
        return this.optional(element) || /^[0-9-+]+$/.test(value);
    }, validationError.phone.validPhone);
    /**
     * Script to valid zipcode
     */
    $.validator.addMethod("alphaNumeric", function (value, element)
    {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, validationError.zipcode.validZipcode);

    /**
     * Script to validate player while adding
     */
    $("#frmAddPlayer").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            player_name: {
                required: true,
                maxlength: validationError.playerName.maxLengthLimit,
                lettersOnly: true,
                duplicatePlayer: true,
            },
            player_image: {
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
                        $("#modalAddPlayer .success-text").text(validationError.popUpMessages.addPlayerAdmin);
                        $("#modalAddPlayer").modal("show");
                        return false;
                    },
                    error: function (response) {
                        $(".loader").hide();
                        $("#page_error_player_image").text(response.responseJSON.errors.player_image[0]);
                        $("#page_error_player_image").show();
                        return false;
                    }
                });

                return false;
            }

        },
        messages: {
            player_name: {
                required: validationError.playerName.required,
                maxlength: validationError.playerName.maxlength,
            },
            player_image: {
                required: validationError.playerImage.required,
            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });



    /**
     * Script to close Modal pop Up
     */
    $("#modalAddPlayer").click(function () {
        var url = BASE_URL + '/admin/player/playerList';
        window.location.replace(url);
    });

    /**
     * Script to redirect page on userlist
     */
    $("#modalAddPlayer").on('hidden.bs.modal', function () {
        var url = BASE_URL + '/admin/player/playerList';
        window.location.replace(url);
    });
    /**
     * Script to validate player while editing
     */
    $("#frmEditPlayer").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            player_name: {
                required: true,
                maxlength: validationError.playerName.maxLengthLimit,
                lettersOnly: true,                
                duplicatePlayer: true
            },
            player_image: {
                //required: true,
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
                        $("#modalAddPlayer .success-text").text(validationError.popUpMessages.editPlayerAdmin);
                        $("#modalAddPlayer").modal("show");
                        return false;
                    },
                    error: function (response) {
                        $(".loader").hide();
                        $("#page_error_player_image").text(response.responseJSON.errors.player_image[0]);
                        $("#page_error_player_image").show();
                        return false;
                    }
                });
                return false;
            }

        },
        messages: {
            player_name: {
                required: validationError.playerName.required,
                maxlength: validationError.playerName.maxlength,
            },
            player_image: {
                required: validationError.playerImage.required,

            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    /**
     * Script to activate/deactivate the Player
     * @return redirect(url)
     */
    $("body").on("click", "#changeStatusPlayer", function (e) {
        e.preventDefault();
        var current = $(this);
        var url = $(current).attr("href");
        var status = $(current).attr("_status");
        if (status == validationError.constantFields.active) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.deactivePlayer);
            $('#confirm').text(validationError.popUpMessages.deactivatePlayerText);
        } else {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.activePlayer);
            $('#confirm').text(validationError.popUpMessages.activatePlayerText);
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
     * Script to check duplicate player name
     */
    $.validator.addMethod("duplicatePlayer", function (value, element)
    {
        var status = false;
        var id = $('#frmEditPlayer #id').val();
        var formData = (id) ? {'name': value, 'id': id} : {'name': value}
        $.ajax({
            url: '/admin/checkPlayerName',
            type: "GET",
            async: false,
            data: formData,
            success: function (data) {
                status = data.status;
            },
        });
        return status;
    }, validationError.playerName.duplicate);

    /**
     * Script to validate promocode while adding
     */
    $("#frmAddEditPromocode").validate({
        focusInvalid: false, // for calendar when validate error
        ignore: "", // for hidden input field validate
        rules: {
            promo_code: {
                required: true,
                duplicatePromocode: true,
            },
            start_date: {
                required: true,
                date: true
            },
            end_date: {
                required: true,
                date: true
            },
            discount: {
                required: true,
                max: {
                    depends: function(element) {
                        if(($('#discount_type').val() == 'percentage') && ($('#discount').val() > validationError.constantFields.discountMaxpercent)) {
                            return true;
                        }
                    }
                },
                isNumeric: true
            },
            limit_usage: {
                min: validationError.constantFields.one,
                isFloat: true
            },
            min_amount: {
                required: {
                    depends: function(element) {
                        if($('#discount_type').val() == 'range') {
                            return true;
                        }
                    }
                },
                isNumeric: true,
                smallerThan: '#max_amount'
            },
            max_amount: {
                required: {
                    depends: function(element) {
                        if($('#discount_type').val() == 'range') {
                            return true;
                        }
                    }
                },
                isNumeric: true,
                greaterThan: '#min_amount' 
            }
        },
        messages: {
            promo_code: {
                required: validationError.promoCode.required,
                duplicatePromocode: validationError.promoCode.duplicate,
            },
            start_date: {
                required: validationError.promoCodeStartDate.required,
                date: validationError.promoCodeStartDate.date
            },
            end_date: {
                required: validationError.promoCodeEndDate.required,
                date: validationError.promoCodeEndDate.date
            },
            discount: {
                required: validationError.promoCodeDiscount.required,
                max: validationError.promoCodeDiscount.max,
                isNumeric: validationError.promoCodeDiscount.digits
            },
            limit_usage:{
                min: validationError.promoCodeLimitUsage.min,
                isFloat: validationError.promoCodeLimitUsage.valid,
            },
            min_amount: {
                required: validationError.promoCodeMinAmount.required,
                isNumeric: validationError.promoCodeMinAmount.numeric,
                smallerThan: validationError.promoCodeMinAmount.smallerThan
            },
            max_amount: {
                required: validationError.promoCodeMaxAmount.required,
                isNumeric: validationError.promoCodeMaxAmount.numeric,
                greaterThan: validationError.promoCodeMaxAmount.greaterThan
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
                        if($('#frmAddEditPromocode').find('#id').val() != '') {
                            $("#modalAddPromocode .success-text").text(validationError.popUpMessages.editPromocodeAdmin);
                        } else {
                            $("#modalAddPromocode .success-text").text(validationError.popUpMessages.addPromocodeAdmin);
                        }
                        $("#modalAddPromocode").modal("show");
                        return false;
                    },
                    error: function (response) {
                        $(".loader").hide();
                        return false;
                    }
                });

                return false;
            }

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
    });

    /**
     * Script to activate/deactivate the Promocode
     * @return redirect(url)
     */
    $("body").on("click", "#changeStatusPromocode", function (e) {
        e.preventDefault();
        var current = $(this);
        var url = $(current).attr("href");
        var status = $(current).attr("_status");
        if (status == validationError.constantFields.active) {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.deactivePromocode);
            $('#confirm').text(validationError.popUpMessages.deactivatePromocodeText);
        } else {
            $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.activePromocode);
            $('#confirm').text(validationError.popUpMessages.activatePromocodeText);
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
     * Script to delete the Promocode
     * @return redirect(url)
     */
    $("body").on("click", "#deletePromocode", function (e) {
        e.preventDefault();
        var current = $(this);
        var url = $(current).attr("href");
        
        $("#confirmPopUp .popUpMsg").text(validationError.popUpMessages.deletePromocode);
        $('#confirm').text(validationError.popUpMessages.deletePromocodeText);
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
     * Script to check duplicate promo code
     */
    $.validator.addMethod("duplicatePromocode", function (value, element)
    {
        var status = false;
        var id = $('#frmAddEditPromocode #id').val();
        var formData = (id) ? {'name': value, 'id': id} : {'name': value}
        $.ajax({
            url: '/admin/checkPromocode',
            type: "GET",
            async: false,
            data: formData,
            success: function (data) {
                status = data.status;
            },
        });
        return status;
    }, validationError.promoCode.duplicate);

    /**
     * Script to check value is float or number only
     */
    $.validator.addMethod("isFloat",
        function (value, element, param) {
            if(value != '') {
                value = Number(value);
                if(Number.isInteger(value)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    );

    /**
     * Script to check minimum amount in promocode case
     */
    $.validator.addMethod("smallerThan",
        function (value, element, param) {
            var $otherElement = $(param);
            var maxAmount = $otherElement.val();
            console.log(value,'value',maxAmount)
            if(maxAmount != '') {
                value = Number(value);
                maxAmount = Number(maxAmount);
                if(value <= maxAmount) {
                    $('.disc-range').find('span').hide();
                }
                return value <= maxAmount;
            } else {
                return true;
            }
        }
    );

    /**
     * Script to check maximum amount in promocode case
     */
    $.validator.addMethod("greaterThan",
        function (value, element, param) {
            var $otherElement = $(param);
            var minAmount = $otherElement.val();
            if(minAmount != '') {
                value = Number(value);
                minAmount = Number(minAmount);
                if(value >= minAmount) {
                    $('.disc-range').find('span').hide();
                }
                return value >= minAmount;
            } else {
                return true;
            }
        }
    );

    /**
     * Script to check if value is numeric(number and float) in promocode case
     */
    $.validator.addMethod('isNumeric', function (value, el, param) {
        if(value != '') {
            if(value >= 0) {
                return $.isNumeric(value);
            } else {
                return false;
            }
        } else {
            return true;
        }
    });

    /**
     * Script to promo close Modal pop Up
     */
    $('#promoClosePopUp').click(function () {
        var url = BASE_URL + '/admin/promocode/promocodeList';
        window.location.replace(url);
    });

    /**
     * Script to redirect page on promocodelist
     */
    $('#modalAddPromocode').on('hidden.bs.modal', function () {
        var url = BASE_URL + '/admin/promocode/promocodeList';
        window.location.replace(url);
    })

    /**
     * Date Picker  
     * @return  datepicker
     */
    $(".calInsurance").flatpickr({
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        disableMobile: true,
    });


    var toDateInsurance = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: "",
        disableMobile: true,
    }

    var fromDateInsurance = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: "",
        disableMobile: true,
        onChange: function (selectedDates, dateStr, instance) {
            toDateInsurance.minDate = dateStr;
            $("#to_date_insurance").flatpickr(toDateInsurance)
        }
    }


    /**
     * Date Picker  
     * @return  datepicker
     */
    $("#from_date_insurance").flatpickr(fromDateInsurance);

    /**
     * Date Picker  
     * @return  datepicker
     */
    $("#to_date_insurance").flatpickr(toDateInsurance);

    /**
     * Date Picker
     * @return datepicker for promocode transactions
     */
    var toDatePromoTransaction = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: "",
        disableMobile: true,
    }

    var fromDatePromoTransaction = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: "",
        disableMobile: true,
        onChange: function (selectedDates, dateStr, instance) {
            toDatePromoTransaction.minDate = dateStr;
            $("#to_date_promocode").flatpickr(toDatePromoTransaction)
        }
    }

    /**
     * Date Picker  
     * @return  datepicker
     */
    $("#from_date_promocode").flatpickr(fromDatePromoTransaction);

    /**
     * Date Picker  
     * @return  datepicker
     */
    $("#to_date_promocode").flatpickr(toDatePromoTransaction);

    var promoEndDate = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: '',
        disableMobile: true,
        onChange: function (selectedDates, dateStr, instance) {
            $('[name=promocode_start_date]').next('input').attr("name","start_date");
        }
    }

    var promoStartDate = {
        altInput: true,
        altFormat: "M d, Y",
        dateFormat: "Y-m-d",
        minDate: '',
        disableMobile: true,
        "onOpen": function(selectedDates, dateStr, instance) {
            console.log(instance)
            instance.setDate(instance.input.value, false);
        },
        onChange: function (selectedDates, dateStr, instance) {
            promoEndDate.minDate = dateStr;
            $("#promocode_end_date").flatpickr(promoEndDate)
            $('[name=promocode_end_date]').next('input').attr("name","end_date");
        }
    }

    /**
     * Date Picker  
     * @return  datepicker
     */
    if($("#promocode_start_date").val() != '') {
        promoStartDate.defaultDate = $("#promocode_start_date").val();
    }
    $("#promocode_start_date").flatpickr(promoStartDate);

    /**
     * Date Picker  
     * @return  datepicker
     */
    $("#promocode_end_date").flatpickr(promoEndDate);

    $('[name=promocode_start_date]').next('input').attr("name","start_date"); 
    $('[name=promocode_end_date]').next('input').attr("name","end_date");

    /**
     * @return field validation
     */
    $(document).on('change','#discount_type', function() {
        var discountType = $(this).val();
        if(discountType == 'range') {
            $('.disc-range').show();
        } else {
            $('.disc-range').hide();
        }

        if(discountType == 'percentage') {
            $('.discount_val').html('(%)');
        } else {
            $('.discount_val').html('($)');
        }
        if($('input[name="discount"]').val() != '') {
            $('#frmAddEditPromocode').find('input[name="discount"]').valid();
        }
    });

    $('#discount_type').trigger('change');
        
});

/**
 * validate and show preview on image select
 */
function imageValidation(imageId, showImageId, errorDiv) {
    var image_holder = $("#" + showImageId);
    if ($("#" + errorDiv).parent().find(".error")) {
        $("#" + errorDiv).parent().find(".error").text('');
    }
    image_holder.empty();
    if (imageId.files[0].type.startsWith("image/")) {
        var reader = new FileReader();
        if (imageId.files[0].size / (validationError.playerImage.imageSizeInKB) <= (validationError.playerImage.maxLengthLimit)
                && imageId.files[0].size / (validationError.playerImage.imageSizeInKB) >= (validationError.playerImage.minLengthLimit)) {
            reader.onload = function (e) {
                $('#' + showImageId)
                        .attr('src', e.target.result);
            };
            reader.readAsDataURL(imageId.files[0]);
        } else {
            $("#" + errorDiv).show();
            $("#" + errorDiv).text(validationError.proofPruchase.maxLengthLimitMessage);
            return false;
        }
    } else {
        $("#" + errorDiv).show();
        $("#" + errorDiv).text(validationError.proofPruchase.imageOnly);
        return false;
    }

}

/**
 * On click close notification
 * 
 */

$(".closeAjaxNotification").on("click", function (e) {
    $("#displayAjaxMessage").css("display", "none");
});


/**
 * Common toast message
 * @return {Toast message} 
 */

function displayNotificationMsg($type, $msg) {
    $("#displayAjaxMessage").css("display", "");
    if ($type == "alert-success") {
        $("#displayAjaxMessage").removeClass("alert1 alert-danger");
        $("#displayAjaxMessage").addClass("alert alert-success");
        $("#displayAjaxMessage").find(".display_message").html($msg);
        window.setTimeout(function () {
            $("#displayAjaxMessage").css("display", "none");
            $("#displayAjaxMessage").removeClass("alert alert-success");
            $("#displayAjaxMessage").find(".display_message").html("");
        }, validationError.constantFields.timeOut);
    } else {
        $("#displayAjaxMessage").removeClass("alert1 alert-success");
        $("#displayAjaxMessage").addClass("alert alert-danger");
        $("#displayAjaxMessage").find(".display_message").html($msg);
        window.setTimeout(function () {
            $("#displayAjaxMessage").css("display", "none");
            $("#displayAjaxMessage").removeClass("alert alert-danger");
            $("#displayAjaxMessage").find(".display_message").html("");
        }, validationError.constantFields.timeOut);
    }
}

