$('document').ready(function() {

    let request;
    $("#goToLogin").click(() => {
        //Hide login
        getBackToHomePage();

        //Show register
        $("#menyContent").css({ display: "block" })
        $("#secLogin").css({ display: "block" })
    });

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
        submitHandler: form => {
            console.log("Submit handled")
            let email = form.email.value;
            let userName = form.username.value;
            let password = form.password.value;
            let formData = { email: email, username: username, password: password };
            formData = JSON.stringify(formData);

            request = $.ajax({
                    url: "../login/signup.php",
                    type: "POST",
                    data: formData,
                    encode: true,

                    // beforeSend: function() {
                    //     //Clear error message
                    //     $("#loginErrorMessage").empty();
                    //     //Show spinner
                    //     $('#loginSpinner').show();
                    // },
                })
                .done((res) => {
                    console.log("Data sent to register.php")
                })
                .fail(() => {
                    console.log("Fail!")
                })
        }


    })

})