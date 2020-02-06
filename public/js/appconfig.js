/** Config file for JS variables and 
 *  validations used throughout application
 */
var validationError = {
    constantFields: {
        active: 1,
        inactive: 0,
        spaceKeyCode: 32,
        passwordMinLength: 8,
        passwordMaxLength: 20,
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        minTicketPrice: 1,
        maxTicketPrice: 10000,
        keyCodeBackspace: 8,
        keyCodeOne: 48,
        keyCodeNine: 57,
        timeOut: 5000,
        addressMaxLength: 100,
        decimal: ".00",
        oKStatus: "Success",
        pending: 0,
        approved: 1,
        rejected: 2,
        cardLength: 16,
        minTicketCount: 4,
        maxTicketCount: 10,
        discountMaxpercent: 100,
        delay: 300,
        fifty: "50",
        yes: "Yes",
        no: "No",
        hundredpercent: "100%",
        fiftypercent: "50%",
        zeroAmount: "$0.00",
        keyCodeDot: 46,
        statusNotPaid: 0,
        statusPaid: 1,
        statusEligible: 1,
        statusNotEligible: 0,
        statusPaidText: 'Paid',
        statusNotPaidText: 'Unpaid',
        ageLimit: 18
    },
    loginEmail: {
        required: "Please enter Email",
        invalid: "Please enter valid Email",
        spaceCheck: "No spaces allowed in password",
        userExists: "Email is not registered"
    },
    loginPassword: {
        required: "Please enter Password"
    },
    firstName: {
        required: "Please enter First Name",
        maxLengthLimit: 20,
        maxlength: "Maximum character limit is 20",
        lettersonly: "Field cannot contain the special character or number"
    },
    lastName: {
        required: "Please enter Last Name",
        maxLengthLimit: 20,
        maxlength: "Maximum character limit is 20",
        lettersonly: "Field cannot contain the special character or number"
    },
    email: {
        required: "Please enter Email",
        email: "Invalid email",
        maxlength: 255,
        duplicate: "Email already exists",
        invalid: "Please enter valid Email"

    },
    password: {
        required: "Password cannot be empty",
        spaceCheck: "No spaces allowed in password",
        passwordCheck: "Password must contain the combination of characters and numeric values",
        passwordLength: "Password must be between 8 to 20 characters"
    },
    passwordConfirmation: {
        required: "Confirm Password cannot be empty",
        equalTo: "New Password and Confirm Password are not same",
        equals: "Password and Confirm Password do not match"
    },
    popUpMessages: {
        deactiveUser: "Are you sure that you want to deactivate this user?",
        activeUser: "Are you sure that you want to activate this user?",
        deactivate: "Deactivate User",
        activate: "Activate User",
        editUserAdmin: "User updated successfully!",
        addPlayerAdmin: "Player added successfully!",
        addTeamAdmin: "Team added successfully!",
        editPlayerAdmin: "Player updated successfully!",
        editTeamAdmin: "Team updated successfully!",

        deactivePlayer: "Are you sure that you want to deactivate this player?",
        activePlayer: "Are you sure that you want to activate this player?",
        deactiveTeam: "Are you sure that you want to deactivate this team?",
        activeTeam: "Are you sure that you want to activate this team?",
        deactivatePlayerText: "Deactivate Player",
        activatePlayerText: "Activate Player",
        deactivateTeamText: "Deactivate Team",
        activateTeamText: "Activate Team",
        removePlayer: "Are you sure that you want to remove this player from the team?",
        removePlayerBtnText: "Remove Player",

        deactivePromocode: "Are you sure that you want to deactivate this promo code?",
        activePromocode: "Are you sure that you want to activate this promo code?",
        deactivatePromocodeText: "Deactivate Promo Code",
        activatePromocodeText: "Activate Promo Code",
        addPromocodeAdmin: "Promo Code added successfully!",
        editPromocodeAdmin: "Promo Code updated successfully!",
        deletePromocode: "Are you sure that you want to delete this promo code?",
        deletePromocodeText: "Delete Promo Code",

        approveUserInsuranceBtnText: "Approve Insurance",
        approveUserInsuranceText: "Are you sure that you want to approve this insurance?",
        approveUserInsurancesuccess: "Insurance approved successfully!",

        rejectUserInsuranceBtnText: "Reject Insurance",
        rejectUserInsuranceText: "Are you sure that you want to reject this insurance?",
        rejectUserInsurancePopupText: "This action cannot be undone. Are you sure that you want to reject this insurance?",
        rejectUserInsurancesuccess: "Insurance rejected successfully!",
        buttonText: "Submit",

        approveReimburseEligibleText: "Are you sure that you want to mark this request as eligible for claim?",
        rejectReimburseEligibleText: "Are you sure that you want to mark this request as  not eligible for claim?",
        approveReimburseEligibleBtnText: "Eligible",
        rejectReimburseEligibleBtnText: "Not Eligible",

        approveReimbursePaidText: "This action cannot be undone. Are you sure that you want to mark this request as paid?",
        rejectReimburseNotPaidText: "Are you sure that you want to mark this request as  unpaid?",
        approveReimbursePaidBtnText: "Paid",

        claimRequestedSubmitted: "Your refund request has been submitted. You will receive an e-mail once the payment is processed.",
        rejectReimburseNotPaidBtnText: "Unpaid"

    },
    phone: {
        required: "Please enter phone",
        maxLengthLimit: 10,
        validPhone: "Please enter valid phone"
    },
    zipcode: {
        required: "Please enter zipcode",
        maxLengthLimit: 5,
        validZipcode: "Please enter valid zipcode"
    },
    address: {
        required: "Please enter address"
    },
    city: {
        required: "Please enter city"
    },
    state: {
        required: "Please select state"
    },
    country: {
        required: "Please select country"
    },
    statusText: {
        active: "Active",
        inactive: "Inactive",
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
    },

    playerName: {
        required: "Please enter Player Name",
        maxLengthLimit: 26,
        maxlength: "Maximum character limit is 26",
        lettersonly: "Field cannot contain the special character or number",
        duplicate: "Player already exists",
    },
    playerImage: {
        required: "Please upload Player Image",
        minLengthLimit: 0.049, //50kb
        maxLengthLimit: 4,
        imageSizeInKB: 1048576, //1024*1024kb
        maxlength: "Maximum character limit is 26",
        imageOnly: "Only jpeg, jpg, png file is allowed",
        minLengthLimitMessage: "Image size must be between 50KB to 4MB",
        maxLengthLimitMessage: "Image size must be between 50KB to 4MB",
    },

    promoCode: {
        required: "Please enter Promo Code",
        duplicate: "Promo Code already exists",
        invalid: "Promo Code is not valid",
        valid: "Promo Code applied successfully!",
    },
    promoCodeStartDate: {
        required: "Please enter Start Date",
        date: "Please enter valid Start Date",
    },
    promoCodeEndDate: {
        required: "Please enter End Date",
        date: "Please enter valid End Date",
    },
    promoCodeDiscount: {
        required: "Please enter Discount",
        min: "Discount should be greater than 0",
        digits: "Please enter valid Discount",
        max: "Discount should not be greater than 100",
    },
    promoCodeLimitUsage: {
        min: "Minimum limit should be 1",
        valid: "Please enter valid limit",
    },
    promoCodeMinAmount: {
        required: "Please enter min. total amount",
        numeric: "Please enter valid amount",
        smallerThan: "Min. total amount should be smaller than max. total amount",
    },
    promoCodeMaxAmount: {
        required: "Please enter max. total amount",
        numeric: "Please enter valid amount",
        greaterThan: "Max. total amount should be greater than min. total amount",
    },

    teamName: {
        required: "Please enter Team Name",
        maxLengthLimit: 26,
        maxlength: "Maximum character limit is 26",
        lettersonly: "Field cannot contain the special character or number",
        duplicate: "Team already exists"
    },
    teamPlayers: {
        required: "Please select players",
        maxLengthLimit: 5,
        minLengthLimit: 5,
        maxlength: "Maximum players limit is 5",
        minlength: "Minimum players limit is 5",
        lettersonly: "Field cannot contain the special character or number"
    },
    teamImage: {
        required: "Please upload Team Image",
        minLengthLimit: 0.049, //50kb
        maxLengthLimit: 1,
        imageSizeInKB: 1048576, //1024*1024kb
        maxlength: "Maximum character limit is 26",
        imageOnly: "Only jpeg, jpg, png file is allowed",
        minLengthLimitMessage: "Image size must be between 50KB to 4MB",
        maxLengthLimitMessage: "Image size must be between 50KB to 4MB",
    },

    getQuote: {
        playerRequired: "Please select player",
        gameDateRequired: "Please select game date",
        ticketPriceRequired: "Please enter a valid ticket price",
        minTicketMsg: "Ticket price could not be less then 1",
        maxTicketMsg: "Ticket price could not be more then 10,000",
        ticketQuantity: "Please enter number of tickets more than 4",
        ticketMoreThanTen: "Number of tickets cannot be more than 10",
        NOGAME: "Player does not have a game on this day",
        OUTOFGAME: "Player is deemed likely to be out for the game on the date selected",
        NOTFOUND: "Player Data not found"
    },

    exportCsv: {
        purchasedFromRequired: "Please select from date",
        purchasedToRequired: "Please select to date"
    },

    payment: {
        cardNumber: "Please enter a valid Card Number",
        expiryMonth: "Please enter the Month",
        expiryYear: "Please enter the Year",
        cvv: "Please enter CVV of your card",
        cardHolderName: "Please enter the Card Holder Name",
        cardExpired: "Please enter a valid Expiry Month and Year",
        agreeTerms: "Please accept Terms and Conditions to continue",
        captcha: "Please check the reCaptcha",
        ticketProof: "Please check the acknowledgement for Ticket Proof Request",

        certify:"Please accept the agreement",
        captchaError:"The captcha response is incorrect. Please try again",
        captchaReq: "Please enter the captcha",
        captchaMatchReq: "Please enter valid captcha",
    },

    insurance: {
        'approved': 'Approved',
        'rejected': 'Rejected',
        'STATUS_SUCCESS': 'Success',
        'STATUS_FAIL': 'Fail',
        'required': "Please enter a valid Confirmation Number",
        'paypal_email': "Please enter Paypal email Id",
        'shipping_address': "Please enter the shipping address",
    },

    refund: {
        comment: "Please enter the comment "
    },
    
    ContactUs: {
        message: "Please enter Message",
        success: "Thank you for contacting us. We will contact you as soon as we review your message."
    },

    reimbursementStatusText: {
        paid: 'Paid',
        notPaid: 'Unpaid',
    },

    common: {
        name: "Please enter First Name & Last Name",
        query: "Please select a query",
        full_name: "Please enter your Name"
    },
    
    confirmation_number: {
        rejected: "Sorry, you’re not eligible for reimbursement",
        pending: "Whoops! Looks like the game hasn't happened yet. Please check back later or "
//        pending: "Player status under review. Please check back within 24 hours of the conclusion of the game"
    },
    
    eligibility: {
        placeholder: "Due to some unexpected reason we are not able to refund the amount"
    },
    proofPruchase: {
        required: "Please upload Proof of Purchase",
        minLengthLimit: 0.049, //50kb
        maxLengthLimit: 15,
        imageSizeInKB: 1048576, //1024*1024kb
        imageOnly: "Only jpeg, jpg, png, pdf file is allowed",
        LengthLimitMessage: "Image size must be between 50KB to 15MB",
    },
    referredBy: {
        validUser: "Please select valid user",
    },
};

// Months Array
var months = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];

