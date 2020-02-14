function createUser(id, password) {
    $.get('php/getUserInfo.php', { id: id, password: password })
        .done((data) => {
            data = JSON.parse(data)
            console.log(data)
            loginToken = new User(data[0]);
            
            //might be rewritten --> se getPuzzle() function 
            // loginToken.teamId = 2
            setTimeout(updatePuzzles, 100)
        })
        .fail(() => {
            console.log('FAIL')
        })
}