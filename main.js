let app;
let token;

window.addEventListener('load', function(even) {
  document.getElementById('login').onclick = loginClickHandler;
  document.getElementById('getusers').onclick = getUsersHandler;
  document.getElementById('create').onclick = createUserHandler;
  app = document.getElementById('app');
});

function append(text) {
  let p = document.createElement('p');
  p.innerText = text;
  app.appendChild(p);
}

function createUserHandler() {
  let obj = {}
  obj.firstname = document.getElementById('firstname').value;
  obj.lastname = document.getElementById('lastname').value;
  obj.email = document.getElementById('email').value;
  obj.isAdmin = document.getElementById('isadmin').checked;
  obj.password = document.getElementById('password').value;

  axios({
    method: 'post',
    url: 'http://localhost:8080/users',
    headers: { Authorization: 'Bearer ' + token },
    data: obj
  })
    .then(function(response) {
      return response.data;
    })
    .then(users => {
      append(JSON.stringify(users))
      return;
      for (let ix = 0; ix < users.length; ix++) {
        append(JSON.stringify(users[ix]));
      }
    })
    .catch(function(err) {
      append(err);
    });
}

function getUsersHandler() {
  axios({
    method: 'get',
    url: 'http://localhost:8080/users',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(function(response) {
      return response.data;
    })
    .then(users => {
      for (let ix = 0; ix < users.length; ix++) {
        append(JSON.stringify(users[ix]));
      }
    })
    .catch(function(err) {
      append(err);
    });
}

function loginClickHandler() {
  let email = document.getElementById('emailinp').value;
  let password = document.getElementById('passwordinp').value;
  axios({
    method: 'get',
    url: 'http://localhost:8080/session',
    auth: {
      username: email,
      password: password
    }
  })
    .then(function(response) {
      return response.data;
    })
    .then(d => {
      token = d.token;
      append('logged in ' + d.token);
    })
    .catch(function(err) {
      append(err);
    });
}
