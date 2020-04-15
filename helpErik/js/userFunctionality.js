// function createUser(user) {
//   // return new Promise((resolve, reject) => {
//   loginToken = new User(user);
//   $.post("php/getUserInfo.php", { id: id, password: password })
//     .done(data => {
//       data = JSON.parse(data);
//       console.log(data);
//       loginToken = new User(data[0]);

//       setTimeout(updatePuzzles, 100);

//       $(".playerName").html(loginToken.username);
//       $(".playerPoints").html(loginToken.score);

//       resolve(data);
//     })
//     .fail(data => {
//       console.log("FAIL");
//       // reject(data);
//     });
//   // });
// }
