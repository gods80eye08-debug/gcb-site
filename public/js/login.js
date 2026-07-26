/*
====================================
LOGIN PAGE SCRIPT
====================================
*/

// FORM
const loginForm =
  document.getElementById("loginForm");

// INPUTS
const phoneInput =
  document.getElementById("phone");

const passwordInput =
  document.getElementById("password");

// LOGIN BUTTON
const loginButton =
  document.querySelector(".login-btn");

/*
====================================
FORM SUBMIT
====================================
*/

if (loginForm && phoneInput && passwordInput && loginButton) {
  loginForm.addEventListener(
    "submit",
    async function(event){

      event.preventDefault();

      // GET VALUES
      const phone =
        phoneInput.value.trim();

      const password =
        passwordInput.value.trim();

      /*
      ============================
      VALIDATION
      ============================
      */

      if(phone.length < 9){

        showMessage(
          "Enter a valid phone number"
        );

        return;

      }

      if(password.length < 4){

        showMessage(
          "Password is too short"
        );

        return;

      }

      /*
      ============================
      BUTTON LOADING STATE
      ============================
      */

      loginButton.innerHTML =
        "Please wait...";

      loginButton.disabled = true;

      /*
      ============================
      SIMULATED DELAY
      ============================
      */

      setTimeout(() => {

        // REDIRECT
        document.body.style.opacity=
          "0";

        setTimeout(() => {
            window.location.href ="credit.html";

        }, 350);

      }, 1500);

    }
  );
}

/*
====================================
MESSAGE FUNCTION
====================================
*/

function showMessage(message){
  alert(message);
}

/* PASSWORD TOGGLE */

const togglePassword =
  document.getElementById(
    "togglePassword"
  );

if (togglePassword && passwordInput) {
  togglePassword.addEventListener(
    "click",
    function(){

      if(passwordInput.type === "password"){

        passwordInput.type =
          "text";

        togglePassword.classList.remove(
          "fa-eye"
        );

        togglePassword.classList.add(
          "fa-eye-slash"
        );

      } else {

        passwordInput.type =
          "password";

        togglePassword.classList.remove(
          "fa-eye-slash"
        );

        togglePassword.classList.add(
          "fa-eye"
        );

      }

    }
  );
}

