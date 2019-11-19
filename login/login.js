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
            email: "Vänligen ange en mailadress",
            password: "Vänligen ange ett lösenord"
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
                        $('#loginSpinner').show();
                    },
                })
                .done((res) => {
                    // Hide spinner
                    $('#loginSpinner').hide();
                    console.log("Success")
                    console.log(res)

                    // Hide loggin form
                    getBackToHomePage();

                    // Load the content for the logged in user

                })
                .fail(() => {
                    console.log("Fail!")
                })
        }
    })
})