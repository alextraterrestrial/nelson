$('document').ready(function() {
    let request;

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
                    const jsonRes = JSON.parse(res);
                    console.log(res);
                    console.log(jsonRes)

                    // If loggin was successful
                    if (jsonRes.loggedIn) {
                        // Hide loggin form
                        getBackToHomePage();
                        checkUser();
                    } else if (jsonRes.errors) {
                        // $("#loginPassword").attr("aria-invalid", "true");
                        //Show error message    
                        $("#loginErrorMessage").html("Fel mailadress eller lösenord")

                        console.log(jsonRes.errors);
                    }
                })
                .fail(() => {
                    console.log("Fail!")
                })
        }
    })
})