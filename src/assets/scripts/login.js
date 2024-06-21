window.addEventListener('load', function() {
  if (window.location.hash === '#signup') {
    document.getElementById('flip').checked = true;
  }
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  login();
});

document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();
  register();
});

function login() {
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;

  if (localStorage.getItem(email) === password) {
    var userName = localStorage.getItem(email + '-name');
    var userEmail = localStorage.getItem(email + '-email');
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userEmail', userEmail);
    if (window.location.hash === '#subscribe') {
      window.location.href = 'pago.html';
    } else {
      Swal.fire({
        icon: "success",
        title: "Successful login",
        timerProgressBar: true,
        confirmButtonColor: "#ffb703",
        timer: 3000
      }).then( () => {
        window.location.href = 'index.html';
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid credentials",
      timerProgressBar: true,
      confirmButtonColor: "#ffb703",
    }).then( ()=>{}
    )
  }
}

function register() {
  var name = document.getElementById('register-name').value;
  var email = document.getElementById('register-email').value;
  var password = document.getElementById('register-password').value;

  if (localStorage.getItem(email)) {
    Swal.fire({
      icon: "error",
      title: "The email is already registered",
      timerProgressBar: true,
      confirmButtonColor: "#ffb703",
    }).then( ()=>{}
    )
  } else {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Enter a valid email address",
        timerProgressBar: true,
        confirmButtonColor: "#ffb703",
      }).then( ()=>{}
      )
      return;
    }

    var nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Name should not contain numbers",
        timerProgressBar: true,
        confirmButtonColor: "#ffb703",
      }).then( ()=>{}
      )
      return;
    }
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password should be at least 8 characters long",
        timerProgressBar: true,
        confirmButtonColor: "#ffb703",
      }).then( ()=>{}
      )
      return;
    }
    localStorage.setItem(email, password);
    localStorage.setItem(email + '-name', name);
    localStorage.setItem(email + '-email', email);
    Swal.fire({
      icon: "success",
      title: "Registration successful. You can now log in",
      timerProgressBar: true,
      confirmButtonColor: "#ffb703",
    }).then( ()=>{}
    )

    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
  }
}
