function signUp() {
  //Validate form fileds
  $("form[name='signupForm']").validate({
    rules: {
      email: {
        required: true,
        email: true,
        remote: "php/checkEmail.php"
      },
      username: {
        required: true,
        remote: "php/checkEmail.php",
        minlength: 4
      },
      password: "required",
      confirmPassword: {
        required: false,
        equalTo: "#signupPassword",
        minlength: 6
      }
    },
    messages: {
      username: {
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
      // console.log("Submit handled");
      let email = form.email.value;
      let username = form.username.value;
      let password = form.password.value;
      let passwordConfirm = form.confirmPassword.value;
      let formData = {
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
      };
      formData = JSON.stringify(formData);
      // console.log(formData);

      request = $.ajax({
        url: "php/signup.php",
        type: "POST",
        data: formData,
        encode: true

        // beforeSend: function() {
        //     //Clear error message
        //     $("#loginErrorMessage").empty();
        //     //Show spinner
        //     $('#loginSpinner').show();
        // },
      })
        .done(res => {
          // console.log("Data sent to register.php");
          let parsedRes = JSON.parse(res);
          // console.log(parsedRes);

          if (!parsedRes.errors) {
            loginToken = new User(parsedRes);

            loadMenu();
            toggleMenu();
          }
          //   createUser(parsedRes.userId, parsedRes.password);
          //   init();
          // getBackToHomePage();
          // checkUser();
        })
        .fail(res => {
          console.log("Fail!");
          console.log(res);
        });
    }
  });
}

function addSignupListener() {
  $("#signUpSubmit").click(e => {
    signUp();
  });
}

// $(document).ready(function() {
//   let request;
//   $("#goToLogin").click(() => {
//     //Hide login
//     getBackToHomePage();

//     //Show register
//     $("#menyContent").css({ display: "block" });
//     $("#secLogin").css({ display: "block" });
//   });
// });
