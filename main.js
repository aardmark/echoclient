window.addEventListener('load', function(even) {
  document.getElementById('login').onclick = loginClickHandler;
  document.getElementById('getusers').onclick = getUsersHandler;
});

function append(parent, text) {
  let p = document.createElement('p');
  p.innerText = text;
  parent.appendChild(p);
}

let token;

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
      console.log(users);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function loginClickHandler() {
  let parent = document.getElementById('app');
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  append(parent, email);
  append(parent, password);
  axios({
    method: 'get',
    url: 'http://localhost:8080/authorize',
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
      console.log(d.token);
    })
    .catch(function(err) {
      console.error(err);
    });
}
