$("document").ready(function () {

    /**
     * Data table implemenation
     * @param {type} tableId
     * @param {type} searchVal
     * @param {type} key
     * @returns {json array}
     */
    function filterColumn(tableId, searchVal, key) {
        $('#' + tableId).DataTable().column(key).search(
                searchVal
                ).draw();
    }

    /**
     * Stop Autoclose export to csv filter while click on datepicker.
     * @param {evnt} 
     * @returns {}
     */

    $("body").on("click", ".flatpickr-months", function (evnt) {
        evnt.stopPropagation();
        $(this).closest('.dropdown-menu').one('hide.bs.dropdown', function (evnt) {
            return false;
        });
    })

    /**
     * Data table Pagination display only if record more then 10.
     * @param {section} 
     * @returns {}
     */
    function dateTablePagination($section) {
        if ($section.find(".paginate_button").length == validationError.constantFields.three) {
            $section.hide();
        } else {
            $section.show();
            $section.find(".disabled").hide();
        }
    }

    /**
     * Data Table Implentation
     */
    $("#usertable").DataTable({
//        processing: true,
        serverSide: true,
        ajax: "/admin/getdata?userType=Registered",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#usertable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.eight]},
        ],
        columns: [
            {data: "first_name", name: "first_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/insurance/viewprofile/' + row.id + "> " + row.first_name + "</a>"; // row object contains the row data
                }
            },
            {data: "last_name", name: "last_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/insurance/viewprofile/' + row.id + "> " + row.last_name + "</a>"; // row object contains the row data
                }
            },
            {data: "email", name: "email",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<div class='user-email' title=" + row.email + ">" + row.email + "</div>"; // row object contains the row data
                }
            },
            {data: "address", name: "address"},
            {data: "opted_newsletter", name: "opted_newsletter"},
            {data: "opted_player_updates", name: "opted_player_updates"},
            {data: "opted_team_updates", name: "opted_team_updates"},
            {data: "referred_by", name: "referred_by"},
            {data: "user_status", name: "status"},
            {data: "action", name: "action", searchable: false}
        ],
        language: {search: ""},
    });
    $("#usertable_filter input").attr("placeholder", "Search");
    var status = '<div class="select-panel">\
                    <select class="custom-select" name="status" id="user_status_filter">\
                        <option value="">Status</option>\
                        <option value="' + validationError.constantFields.active + '">' + validationError.statusText.active + '</option>\
                        <option value="' + validationError.constantFields.inactive + '">' + validationError.statusText.inactive + '</option>\
                    </select>\
                </div>';
    $("#usertable_filter").append(status);
    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    /**
     * Export CSV button
     * @type String
     */
    var exportCsv = '<div class="right-item">\
                <div class="btn-group ext-dropdown-panel">\
                    <button type="button" class="btn  white-btn export-csv dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export to CSV</button>\
                    <div class="dropdown-menu custom-menu">\
                        <div class="common-header"><h4>Select Insurance Purchase Date</h4></div>\
                        <div class="dropdown-inside">\
                            <div class="form-group from-flex">\
                                <div class="col-md-6 mb-space">\
                                    <div class="floating-input calendar-panel">\
                                        <input type="text" name="purchased_from" id="from_date_insurance" class="calInsurance form-control datepicker" placeholder="From" readonly="true">\
                                        <img src="../../images/calendar.png" alt="" />\
                                    </div>\<span class="error"></span>\
                                </div>\
                                <div class="col-md-6">\
                                    <div class="floating-input calendar-panel">\
                                        <input type="text" name="purchased_to" id="to_date_insurance" class="calInsurance form-control datepicker" placeholder="To" readonly="true">\
                                        <img src="../../images/calendar.png" alt="" />\
                                    </div>\<span class="error"></span>\
                                </div>\
                            </div>\
                            <button name="btnExportCsvInsurance" id="btnExportCsvInsurance" data-usertype="Registered" class="btn primary-btn" type="button">Export</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';
    $("#usertable_filter").after(exportCsv);
    $("#usertable_filter").wrap('<div class="left-item"> </div>');
    $("#usertable_paginate, #usertable_info").wrapAll("<div class='pagination-panel' />");
    $("#usertable").wrap("<div class='table-scroll' />");
    $("#user_status_filter").on("change", function (e) {
        filterColumn("usertable", $(this).val(), validationError.constantFields.seven);
    });

    /**
     * Data Table Implentation for guest user
     */
    $("#guestusertable").DataTable({
        //        processing: true,
        serverSide: true,
        ajax: "/admin/getdata?userType=Guest",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#guestusertable_paginate"));
        },

        columns: [
            {data: "first_name", name: "first_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/insurance/viewprofile/' + row.id + "> " + row.first_name + "</a>"; // row object contains the row data
                }
            },
            {data: "last_name", name: "last_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/insurance/viewprofile/' + row.id + "> " + row.last_name + "</a>"; // row object contains the row data
                }
            },
            {data: "email", name: "email",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<div class='user-email' title=" + row.email + ">" + row.email + "</div>"; // row object contains the row data
                }
            },
            {data: "address", name: "address"},
            {data: "opted_newsletter", name: "opted_newsletter"},
            {data: "opted_player_updates", name: "opted_player_updates"},
            {data: "opted_team_updates", name: "opted_team_updates"}
        ],
        language: {search: ""},
    });
    $("#guestusertable_filter input").attr("placeholder", "Search");

    /**
     * Export CSV button
     * @type String
     */
    var exportCsv = '<div class="right-item">\
                        <div class="btn-group ext-dropdown-panel">\
                            <button type="button" class="btn  white-btn export-csv dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export to CSV</button>\
                            <div class="dropdown-menu custom-menu">\
                                <div class="common-header"><h4>Select Insurance Purchase Date</h4></div>\
                                <div class="dropdown-inside">\
                                    <div class="form-group from-flex">\
                                        <div class="col-md-6 mb-space">\
                                            <div class="floating-input calendar-panel">\
                                                <input type="text" name="purchased_from" id="from_date_insurance" class="calInsurance form-control datepicker" placeholder="From" readonly="true">\
                                                <img src="../../images/calendar.png" alt="" />\
                                            </div>\<span class="error"></span>\
                                        </div>\
                                        <div class="col-md-6">\
                                            <div class="floating-input calendar-panel">\
                                                <input type="text" name="purchased_to" id="to_date_insurance" class="calInsurance form-control datepicker" placeholder="To" readonly="true">\
                                                <img src="../../images/calendar.png" alt="" />\
                                            </div>\<span class="error"></span>\
                                        </div>\
                                    </div>\
                                    <button name="btnExportCsvInsurance" id="btnExportCsvInsurance" data-usertype="Guest" class="btn primary-btn" type="button">Export</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
    $("#guestusertable_filter").after(exportCsv);
    $("#guestusertable_filter").wrap('<div class="left-item"> </div>');
    $("#guestusertable_paginate, #guestusertable_info").wrapAll("<div class='pagination-panel' />");
    $("#guestusertable").wrap("<div class='table-scroll' />");

    /**
     * Data Table Implentation
     */
    $("#playertable").DataTable({
//        processing: true,
        serverSide: true,
        ajax: "/admin/getPlayerData",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#playertable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.zero]},
            {orderable: false, targets: [validationError.constantFields.four]}
        ],
        columns: [
            {data: "player_image", name: "player_image",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 

                    if (row.player_image != null && row.player_image != '') {
                        return "<div class='post-img post-img-sm'><img class='player-img' src=" + row.player_image + "></div>"; // row object contains the row data
                    } else {
                        return "<div class='post-img post-img-sm'></div>"; // row object contains the row data
                    }

                }
            },
            {data: "player_name", name: "player_name"},
            {data: "team", name: "team"},
            {data: "status", name: "status"},
            {data: "action", name: "action", searchable: false}
        ],
        language: {search: ""},
    });
    $("#playertable_filter input").attr("placeholder", "Search");
    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#playertable_filter").wrap('<div class="left-item"> </div>');
    $("#playertable_paginate, #playertable_info").wrapAll("<div class='pagination-panel' />");

    $("#player_status_filter").on("change", function (e) {
    });

    /**
     * Promocode Data Table Implentation
     */
    $("#promocodetable").DataTable({
        serverSide: true,
        ajax: "/admin/getPromocodeData",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#promocodetable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.seven]}
        ],
        columns: [
            {data: "promo_code", name: "promo_code",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/promocode/transactions/' + row.id + "> " + row.promo_code + "</a>"; // row object contains the row data
                }
            },
            {data: "start_date", name: "start_date",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/promocode/transactions/' + row.id + "> " + row.start_date + "</a>"; // row object contains the row data
                }
            },
            {data: "end_date", name: "end_date",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<a href=" + BASE_URL + '/admin/promocode/transactions/' + row.id + "> " + row.end_date + "</a>";
                }
            },
            {data: "discount", name: "discount"},
            {data: "min_amount", name: "min_amount"},
            {data: "max_amount", name: "max_amount"},
            {data: "status", name: "status"},
            {data: "action", name: "action", searchable: false}
        ],
        language: {search: ""},
    });
    $("#promocodetable_filter input").attr("placeholder", "Search");
    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#promocodetable_filter").wrap('<div class="left-item"> </div>');
    $("#promocodetable_paginate, #promocodetable_info").wrapAll("<div class='pagination-panel' />");

    /**
     * Data Table for user PromoCode Transactions
     */
    $("#promotransactionstable").DataTable({
        serverSide: true,
        ajax: {
            "url": "/admin/promocode/transactionsData",
            "type": "POST",
            "data": {
                promocode: $("#promoCode").val(),
                _token: $("input[name='_token']").val(),
            }
        },
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#promotransactionstable_paginate"));
        },
        order: [],
        columnDefs: [],
        columns: [
            {data: "insuranceId", name: "insuranceId"},
            {data: "user_name", name: "user_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.user_name; // row object contains the row data
                }
            },
            {data: "email", name: "email"},
            {data: "player_name", name: "player_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.player_name; // row object contains the row data
                }
            },
            {data: "insurance_cost", name: "insurance_cost"},
            {data: "ticket_price", name: "ticket_price"},
            {data: "no_of_tickets", name: "no_of_tickets"},
            {data: "promo_code_discount", name: "promo_code_discount"},
            {data: "promo_code_discount_amount", name: "promo_code_discount_amount"},
            {data: "purchase_insurable_date", name: "purchase_insurable_date"},
            {data: "statuse", name: "status"},
        ],
        language: {search: ""},
    });

    $("#promotransactionstable_filter input").attr("placeholder", "Search");

    /*************** search folter start ***********/
    var status = '<div class="select-panel">\
                    <select class="custom-select" name="status" id="promotransaction_status_filter">\
                        <option value="">Status</option>\
                        <option value="' + validationError.constantFields.pending + '">' + validationError.statusText.pending + '</option>\
                        <option value="' + validationError.constantFields.approved + '">' + validationError.statusText.approved + '</option>\
                        <option value="' + validationError.constantFields.rejected + '">' + validationError.statusText.rejected + '</option>\
                    </select>\
                </div>';
    $("#promotransactionstable_filter").append(status);
    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    /**
     * Export CSV button
     * @type String
     */
    var exportPromoCsv = '<div class="right-item">\
                <div class="btn-group ext-dropdown-panel">\
                    <button type="button" class="btn  white-btn export-csv dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export to CSV</button>\
                    <div class="dropdown-menu custom-menu">\
                        <div class="common-header"><h4>Select Promo Code Applied Date</h4></div>\
                        <div class="dropdown-inside">\
                            <div class="form-group from-flex">\
                                <div class="col-md-6 mb-space">\
                                    <div class="floating-input calendar-panel">\
                                        <input type="text" name="applied_from" id="from_date_promocode" class="calInsurance form-control datepicker" placeholder="From" readonly="true">\
                                        <img src="../../images/calendar.png" alt="" />\
                                    </div>\<span class="error"></span>\
                                </div>\
                                <div class="col-md-6">\
                                    <div class="floating-input calendar-panel">\
                                        <input type="text" name="applied_to" id="to_date_promocode" class="calInsurance form-control datepicker" placeholder="To" readonly="true">\
                                        <img src="../../images/calendar.png" alt="" />\
                                    </div>\<span class="error"></span>\
                                </div>\
                            </div>\
                            <button name="btnExportCsvPromocode" id="btnExportCsvPromocode" class="btn primary-btn" type="button">Export</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';
    $("#promotransactionstable_filter").after(exportPromoCsv);
    $("#promotransaction_status_filter").on("change", function (e) {
        filterColumn("promotransactionstable", $(this).val(), validationError.constantFields.ten);
    });
    $("#promotransactionstable_filter").wrap('<div class="left-item"> </div>');
    $("#promotransactionstable_paginate, #promotransactionstable_info").wrapAll("<div class='pagination-panel' />");
    $("#promotransactionstable").wrap("<div class='table-scroll' />");
    $("#promotransactionstable_paginate, #promotransactionstable_info").wrapAll("<div class='pagination-panel' />");
    /*************** search folter end ***********/

    /**
     * Script to export CSV implementation
     * 
     */
    $("body").on("click", "#btnExportCsvPromocode", function (e) {
        e.preventDefault();
        $(".error").html('');
        var appliedFrom = $("input[name='applied_from']").val();
        var appliedTo = $("input[name='applied_to']").val();
        var promoCode = $("#promoCode").val();
        var promoStatus = $("#promotransaction_status_filter").val() ? $("#promotransaction_status_filter").val() : "";
        if ($.trim(appliedFrom) == "") {
            $(".error").html(validationError.exportCsv.purchasedFromRequired);
            return false;
        }
        if ($.trim(appliedTo) == "") {
            $(".error").html(validationError.exportCsv.appliedToRequired);
            return false;
        }

        var formData = {"appliedFrom": appliedFrom,
            "appliedTo": appliedTo,
            "promoStatus": promoStatus,
            "promoCode": promoCode
            };
        $.ajax({
            url: '/admin/export/promocodes',
            type: "GET",
            data: formData,
            success: function (response) {
                var queryString = "?&appliedFrom="+ appliedFrom + "&appliedTo=" + appliedTo +
                        "&promoStatus=" + promoStatus + "&promoCode=" + promoCode;
                var url = "/admin/export/promocodes" + queryString;
                window.location.href = url;
            }
        });
    });

    /**
     * Data Table Implentation
     */
    $("#teamtable").DataTable({
        //processing: true,
        serverSide: true,
        ajax: "/admin/team/getTeamData",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#teamtable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.zero]},
            {orderable: false, targets: [validationError.constantFields.four]}
        ],
        columns: [
            {data: "logo", name: "team_logo", searchable: false,
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    if (row.team_logo != null && row.team_logo != '') {
                        return "<div class='post-img post-img-sm'><img class='player-img' src=" + row.team_logo + "></div>"; // row object contains the row data
                    } else {
                        return "<div class='post-img post-img-sm'></div>"; // row object contains the row data
                    }
                }
            },
            {data: "team_name", name: "team_name"},
            {data: "team_players", name: "team_players", searchable: false},
            {data: "status", name: "status", searchable: false},
            {data: "action", name: "action", searchable: false}
        ],
        language: {search: ""},
    });
    $("#teamtable_filter input").attr("placeholder", "Search");
    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#teamtable_filter").wrap('<div class="left-item"> </div>');
    $("#teamtable_paginate, #teamtable_info").wrapAll("<div class='pagination-panel' />");

    /**
     * Data Table for Inurance Implentation
     */
    $("#insurancetable").DataTable({
        serverSide: true,
        ajax: "/admin/insurance/getInsuranceData",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#insurancetable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.twelve]}
        ],
        columns: [
            {data: "insuranceId", name: "insuranceId",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<div class='show-insurance-link' style='cursor: pointer;' page='insurance' data=" + row.id + " > " + row.insuranceId + "</div>"; // row object contains the row data
                }
            },
            {data: "user_name", name: "user_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.user_name_href; // row object contains the row data
                }},
            {data: "purchase_insurable_date", name: "purchase_insurable_date"},
            {data: "refund_percentage", name: "refund_percentage"},
            {data: "insurance_cost", name: "insurance_cost"},
            {data: "player_name", name: "player_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.player_name_href; // row object contains the row data
                }},
            {data: "game_date", name: "game_date"},
            {data: "ticket_price", name: "ticket_price"},
            {data: "no_of_tickets", name: "no_of_tickets"},
            {data: "promo_code_discount_amount", name: "promo_code_discount_amount"},
            {data: "refund_amount", name: "refund_amount"},
            
            {data: "statuse", name: "status"},
            {data: "action", name: "action", searchable: false}
        ],
        language: {search: ""},
    });
    $("#insurancetable_filter input").attr("placeholder", "Search");
    var status = '<div class="select-panel">\
                    <select class="custom-select" name="status" id="insurance_status_filter">\
                        <option value="">Status</option>\
                        <option value="' + validationError.constantFields.pending + '">' + validationError.statusText.pending + '</option>\
                        <option value="' + validationError.constantFields.approved + '">' + validationError.statusText.approved + '</option>\
                        <option value="' + validationError.constantFields.rejected + '">' + validationError.statusText.rejected + '</option>\
                    </select>\
                </div>';
    
    var gameCalendar = '<div class="row-calendar filter-item">\
                    <div class="form-group calendar-panel">\
                    <input type="text" name="game_date" class="calGameDate form-control datepicker" placeholder="Game Date" readonly="true">\
                        <img src="../../images/calendar.png" alt="" />\
                        </div>\
                        </div>\
                </div>';

    var player = '<div class="form-group player-name filter-item">\
                    <input type="text" id="player_name" name="player_name" class="form-control" placeholder="Player">\
                </div>';
    var btnShow = '<button id="btnShowInsurance" type="button" class="btn primary-btn-sm show-btn">Show</button>';
    var btnClearFilter = '<div class="cleareAll"><a  href="">Clear All</a></div>';
    
      /**
     * Export CSV button
     * @type String
     */
    var exportCsvInsurance = '<div class="right-item">\
                        <div class="btn-group ext-dropdown-panel">\
                            <button type="button" class="btn  white-btn export-csv dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export to CSV</button>\
                            <div class="dropdown-menu custom-menu">\
                                <div class="common-header"><h4>Select Insurance Purchase Date</h4></div>\
                                <div class="dropdown-inside">\
                                    <div class="form-group from-flex">\
                                        <div class="col-md-6 mb-space">\
                                            <div class="floating-input calendar-panel">\
                                                <input type="text" name="purchased_from" id="from_date_insurance" class="calInsurance form-control datepicker" placeholder="From" readonly="true">\
                                                <img src="../../images/calendar.png" alt="" />\
                                            </div>\<span class="error"></span>\
                                        </div>\
                                        <div class="col-md-6">\
                                            <div class="floating-input calendar-panel">\
                                                <input type="text" name="purchased_to" id="to_date_insurance" class="calInsurance form-control datepicker" placeholder="To" readonly="true">\
                                                <img src="../../images/calendar.png" alt="" />\
                                            </div>\<span class="error"></span>\
                                        </div>\
                                    </div>\
                                    <button name="btnExportCsvInsurance" id="btnExportCsvInsurance" data-usertype="" class="btn primary-btn" type="button">Export</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
    $("#insurancetable_filter").append(gameCalendar);
    $("#insurancetable_filter").append(player);
    $("#insurancetable_filter").append(status);
    $("#insurancetable_filter").append(btnShow);
    $("#insurancetable_filter").append(btnClearFilter);
    $("#insurancetable_filter").after(exportCsvInsurance);

    $("#insurancetable_wrapper .calendar-panel img").attr("src", "../../../images/calendar.png");

    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#insurancetable_filter").wrap('<div class="left-item filter-row"> </div>');
    $("#insurancetable_filter .row-calendar, #insurancetable_filter .player-name, #insurancetable_filter .select-panel, #insurancetable_filter .cleareAll, #insurancetable_filter .show-btn").wrapAll('<div class="filter-data"> </div>');
    $("#insurance_paginate, #insurancetable_info").wrapAll("<div class='pagination-panel' />");

    $("#insurancetable").wrap("<div class='table-scroll' />");

    $("#btnShowInsurance").on("click", function (e) {
        var gameDate = $("input[name='game_date']").val();
        var playerName = $("input[name='player_name']").val();
        var statusInsurance = $("#insurance_status_filter").val();
        $('#insurancetable').DataTable()
            .column(validationError.constantFields.six).search(gameDate)
            .column(validationError.constantFields.five).search(playerName)
            .column(validationError.constantFields.ten).search(statusInsurance).draw();
    });

    /**
     * Data Table for player Inurance Implentation
     */
    $("#playerinsurancetable").DataTable({
        serverSide: true,
        ajax: "/admin/insurance/entityInsuranceData/" + $("#playerId").val() + "/player_id",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#playerinsurancetable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.ten]}
        ],
        columns: [
            {data: "insuranceId", name: "insuranceId",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<div class='show-insurance-link' page='player' data=" + row.id + " > " + row.insuranceId + "</div>"; // row object contains the row data
                }
            },
            {data: "user_name", name: "user_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.user_name_href; // row object contains the row data
                }},
            {data: "purchase_insurable_date", name: "purchase_insurable_date"},
            {data: "refund_percentage", name: "refund_percentage"},
            {data: "insurance_cost", name: "insurance_cost"},
            {data: "game_date", name: "game_date"},
            {data: "ticket_price", name: "ticket_price"},
            {data: "no_of_tickets", name: "no_of_tickets"},
            {data: "refund_amount", name: "refund_amount"},
            {data: "statuse", name: "status"},
            {data: "action", name: "action", searchable: false},
        ],
        language: {search: ""},
    });
    $("#playerinsurancetable_filter input").attr("placeholder", "Search");
    var status = '<div class="select-panel">\
                    <select class="custom-select" name="status" id="playerinsurancetable_status_filter">\
                        <option value="">Status</option>\
                        <option value="' + validationError.constantFields.pending + '">' + validationError.statusText.pending + '</option>\
                        <option value="' + validationError.constantFields.approved + '">' + validationError.statusText.approved + '</option>\
                        <option value="' + validationError.constantFields.rejected + '">' + validationError.statusText.rejected + '</option>\
                    </select>\
                </div>';

    var userName = '<div class="form-group player-name filter-item">\
                    <input type="text" id="user_name" name="user_name" class="form-control" placeholder="User">\
                </div>';

    var gameCalendar = '<div class="row-calendar filter-item">\
                    <div class="form-group calendar-panel">\
                    <input type="text" name="game_date" class="calGameDate form-control datepicker" placeholder="Game Date" readonly="true">\
                        <img src="../images/calendar.png" alt="" />\
                        </div>\
                        </div>\
                </div>';

    var btnShow = '<button id="btnShowplayerinsurancetable" type="button" class="btn primary-btn-sm show-btn">Show</button>';
    var btnClearFilter = '<div class="cleareAll"><a  href="">Clear All</a></div>';

    $("#playerinsurancetable_filter").append(gameCalendar);
    $("#playerinsurancetable_filter").append(userName);
    $("#playerinsurancetable_filter").append(status);
    $("#playerinsurancetable_filter").append(btnShow);
    $("#playerinsurancetable_filter").append(btnClearFilter);
    $("#playerinsurancetable_filter").after(exportCsvInsurance);
    $("#playerinsurancetable_wrapper .calendar-panel img").attr("src", "../../../images/calendar.png");

    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#playerinsurancetable_filter").wrap('<div class="left-item filter-row"> </div>');
    $("#playerinsurancetable_filter .row-calendar, #playerinsurancetable_filter .player-name, #playerinsurancetable_filter .select-panel, #playerinsurancetable_filter .cleareAll, #playerinsurancetable_filter .show-btn").wrapAll('<div class="filter-data"> </div>');
    $("#playerinsurancetable_paginate, #playerinsurancetable_info").wrapAll("<div class='pagination-panel' />");

    $("#playerinsurancetable").wrap("<div class='table-scroll' />");

    $("body").on("click", "#btnShowplayerinsurancetable", function (e) {
        var gameDate = $("input[name='game_date']").val();
        var userName = $("input[name='user_name']").val();
        var statusInsurance = $("#playerinsurancetable_status_filter").val();
        $('#playerinsurancetable').DataTable()
                .column(validationError.constantFields.five).search(gameDate)
                .column(validationError.constantFields.one).search(userName)
                .column(validationError.constantFields.nine).search(statusInsurance).draw();

    });


    /**
     * Data Table for user Inurance Implentation
     */
    $("#userinsurancetable").DataTable({
        serverSide: true,
        ajax: "/admin/insurance/entityInsuranceData/" + $("#userId").val() + "/user_id",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#userinsurancetable_paginate"));
        },
        order: [],
        columnDefs: [
            {orderable: false, targets: [validationError.constantFields.ten]}
        ],
        columns: [
            {data: "insuranceId", name: "insuranceId",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return "<div class='show-insurance-link' page='user' data=" + row.id + " > " + row.insuranceId + "</div>"; // row object contains the row data
                }
            },
            {data: "purchase_insurable_date", name: "purchase_insurable_date"},
            {data: "refund_percentage", name: "refund_percentage"},
            {data: "insurance_cost", name: "insurance_cost"},
            {data: "player_name", name: "player_name",
                'render': function (data, type, row, meta) { // render event defines the markup of the cell text 
                    return row.player_name_href; // row object contains the row data
                }},
            {data: "game_date", name: "game_date"},
            {data: "ticket_price", name: "ticket_price"},
            {data: "no_of_tickets", name: "no_of_tickets"},
            {data: "refund_amount", name: "refund_amount"},
            {data: "statuse", name: "status"},
            {data: "action", name: "action", searchable: false},
        ],
        language: {search: ""},
    });
    $("#userinsurancetable_filter input").attr("placeholder", "Search");
    var status = '<div class="select-panel">\
                    <select class="custom-select" name="status" id="userinsurancetable_status_filter">\
                        <option value="">Status</option>\
                        <option value="' + validationError.constantFields.pending + '">' + validationError.statusText.pending + '</option>\
                        <option value="' + validationError.constantFields.approved + '">' + validationError.statusText.approved + '</option>\
                        <option value="' + validationError.constantFields.rejected + '">' + validationError.statusText.rejected + '</option>\
                    </select>\
                </div>';

    var player = '<div class="form-group player-name filter-item">\
                    <input type="text" id="player_name" name="player_name" class="form-control" placeholder="Player">\
                </div>';
    var gameCalendar = '<div class="row-calendar filter-item">\
                    <div class="form-group calendar-panel">\
                    <input type="text" name="game_date" class="calGameDate form-control datepicker" placeholder="Game Date" readonly="true">\
                        <img src="../../images/calendar.png" alt="" />\
                        </div>\
                        </div>\
                </div>';

    var btnShow = '<button id="btnShowuserinsurancetable" type="button" class="btn primary-btn-sm show-btn">Show</button>';
    var btnClearFilter = '<div class="cleareAll"><a  href="">Clear All</a></div>';

    $("#userinsurancetable_filter").append(gameCalendar);
    $("#userinsurancetable_filter").append(player);
    $("#userinsurancetable_filter").append(status);
    $("#userinsurancetable_filter").append(btnShow);
    $("#userinsurancetable_filter").append(btnClearFilter);
    $("#userinsurancetable_filter").after(exportCsvInsurance);
    $("#userinsurancetable_wrapper .calendar-panel img").attr("src", "../../../images/calendar.png");

    $(".custom-select").select2({minimumResultsForSearch: Infinity});

    $("#userinsurancetable_filter").wrap('<div class="left-item filter-row"> </div>');
    $("#userinsurancetable_filter .row-calendar, #userinsurancetable_filter .player-name, #userinsurancetable_filter .select-panel, #userinsurancetable_filter .cleareAll, #userinsurancetable_filter .show-btn").wrapAll('<div class="filter-data"> </div>');
    $("#userinsurancetable_paginate, #userinsurancetable_info").wrapAll("<div class='pagination-panel' />");

    $("#userinsurancetable").wrap("<div class='table-scroll' />");
    $("body").on("click", "#btnShowuserinsurancetable", function (e) {
        var gameDate = $("input[name='game_date']").val();
        var playerName = $("input[name='player_name']").val();
        var statusInsurance = $("#userinsurancetable_status_filter").val();
         $('#userinsurancetable').DataTable()
                .column(validationError.constantFields.five).search(gameDate)
                .column(validationError.constantFields.four).search(playerName)
                .column(validationError.constantFields.nine).search(statusInsurance).draw();

    });


    
    $("#claimtable").DataTable({
        //processing: true,
        serverSide: true,
        ajax: "/admin/claims/getClaimRequestData",
        "fnDrawCallback": function (oSettings) {
            dateTablePagination($("#claimtable_paginate"));
        },
        order: [],
        columnDefs: [],
        columns: [
            {data: "user_email", name: "user_email"},
            {data: "insurance_id", name: "insurance_id"},
            {data: "request_date", name: "request_date", searchable: false},
            {data: "reimbursement_amount", name: "reimbursement_amount", searchable: false},
            {data: "payment_method", name: "payment_method", searchable: false},
            {data: "paypal_email", name: "paypal_email", searchable: false},
            {data: "shipping_address", name: "shipping_address", searchable: false},
            {data: "purchase_proof_image", name: "purchase_proof_image", searchable: false},
            {data: "claim_eligilibity_show", name: "claim_eligilibity"},
            {data: "claim_status_show", name: "claim_status"},
        ],
        language: {search: ""},
    });
    
    $("#claimtable_filter input").attr("placeholder", "Search");
    var reimbursementStatus = '<div class="select-panel">\
        <select class="custom-select" name="claim_eligilibity" id="claim_status_filter">\
            <option value="">Claim Status</option>\
            <option value="' + validationError.constantFields.statusPaid + '">' + validationError.reimbursementStatusText.paid + '</option>\
            <option value="' + validationError.constantFields.statusNotPaid + '">' + validationError.reimbursementStatusText.notPaid + '</option>\
        </select>\
    </div>';
    
    $("#claimtable_filter").append(reimbursementStatus);
    $(".custom-select").select2({minimumResultsForSearch: Infinity});
    

    $("#claimtable_filter").wrap('<div class="left-item"> </div>');
    $("#claimtable_paginate, #claimtable_info").wrapAll("<div class='pagination-panel' />");
    $("#claimtable").wrap("<div class='table-scroll' />");
    $("#claim_status_filter").on("change", function (e) { 
        filterColumn("claimtable", $(this).val(), validationError.constantFields.nine);
    });
});    