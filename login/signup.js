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
                remote: "../login/checkEmail.php",
                minlength: 4
            },
            password: "required",
            confirmPassword: {
                required: false,
                equalTo: "#signupPassword"
            }
        },
        messages: {
            userName: {
                required: "Vänligen ange ett användarnamn",
                remote: "Användarnamnet är upptaget",
                minlength: "Användarnamnet måste vara minst 4 tecken långt"
            },
            email: {
                email: "Vänligen ange en giltig mailadress",
                required: "Vänligen ange en mailadress",
                remote: "Det finns redan ett konto med den här mailadressen"
            },
            password: "Vänligen ange ett lösenord",
            confirmPassword: {
                equalTo: "Lösenorden du skrivit in matchar inte varandra",
                required: "Vänligen bekräfta ditt lösenord"
            }
        },

    })

})