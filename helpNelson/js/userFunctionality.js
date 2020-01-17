function createUser(id, password) {
  $.get('getUserInfo.php', {id: id, password: password})
  .done((data) => {
    data = JSON.parse(data)
    console.log(data)
  })
  .fail(() => {
    console.log('FAIL')
  })
}