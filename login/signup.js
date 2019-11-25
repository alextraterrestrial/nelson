$('document').ready(function() {
    //Validate form fileds
    $("form[name='signupForm']").validate({
        rules: {
            email: {
                required: true,
                email: true,
                remote: "../login/checkEmail.php"
            },
            userName: {
                required: true,
                remote: ""
            },
            password: "required",
            confirmPassword: "required"
        },
        messages: {
            userName: {
                required: "Vänligen ange ett användarnamn",
                remote: "Användarnamnet är upptaget"
            },
            email: {
                email: "Vänligen ange en giltig mailadress",
                required: "Vänligen ange en mailadress",
                remote: "Det finns redan ett konto med den här mailadressen"
            },
            password: "Vänligen ange ett lösenord",
            confirmPassword: "Vänligen bekräfta ditt lösenord"
        },

    })

})