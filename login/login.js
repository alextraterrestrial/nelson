$(document).ready(() => {

    let request;

    //Add listener for go to rgister link
    $("#goToRegister").click(() => {
        //Hide login
        getBackToHomePage();

        //Show register
        $("#menyContent").css({ display: "block" })
        $("#secRegistrering").css({ display: "block" })
    });

    // Validate form
    $("form[name='loginForm']").validate({
            //Validation rules
            rules: {
                email: "required",
                password: "required"
            },
            messages: {
                email: "Vänligen ange din mailadress",
                password: "Vänligen ange ditt lösenord"
            },
            submitHandler: form => {
                let email = form.email.value;
                let password = form.password.value;
                let formData = { email: email, password: password };
                formData = JSON.stringify(formData);

                request = $.ajax({
                        url: "../login/login.php",
                        type: "POST",
                        data: formData,
                        encode: true,

                        beforeSend: function() {
                            //Clear error message
                            $("#loginErrorMessage").empty();
                            //Show spinner
                            $('#loginSpinner').show();
                        },
                    })
                    .done((res) => {
                        // Hide spinner
                        $('#loginSpinner').hide();
                        const parsedRes = JSON.parse(res);
                        console.log(parsedRes)

                        // If loggin was successful
                        if (parsedRes.loggedIn) {
                            // Set the global variable user to the respo
                            loginToken = parsedRes;
                            console.log(loginToken)
                                // Hide loggin form
                            getBackToHomePage();
                            checkUser();
                        } else if (parsedRes.errors) {
                            // $("#loginPassword").attr("aria-invalid", "true");
                            //Show error message    
                            $("#loginErrorMessage").html("Fel mailadress eller lösenord")

                            console.log(parsedRes.errors);
                        }
                    })
                    .fail(() => {
                        console.log("Fail!")
                    })
            }
        })
        //Logout function 


})