function createUser(id, password) {
    $.get('php/getUserInfo.php', { id: id, password: password })
        .done((data) => {
            data = JSON.parse(data)
            console.log(data)
            loginToken = new User(data[0]);
        })
        .fail(() => {
            console.log('FAIL')
        })
}