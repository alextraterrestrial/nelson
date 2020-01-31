function createUser(id, password) {
<<<<<<< HEAD
  $.get('getUserInfo.php', {id: id, password: password})
  .done((data) => {
    data = JSON.parse(data)
    console.log(data)
    loginToken = new User(data)
    return loginToken
  })
  .fail(() => {
    console.log('FAIL')
  })
=======
    $.get('php/getUserInfo.php', { id: id, password: password })
        .done((data) => {
            data = JSON.parse(data)
            console.log(data)
            loginToken = new User(data[0]);
        })
        .fail(() => {
            console.log('FAIL')
        })
>>>>>>> 6fa713996625fc88d46980595c66c9bd123060d6
}