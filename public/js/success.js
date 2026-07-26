/*
====================================
SUCCESS PAGE SCRIPT
====================================
*/


// DONE BUTTON

const doneBtn =
  document.getElementById("doneBtn");



/*
====================================
BUTTON EVENT
====================================
*/

doneBtn.addEventListener(
  "click",
  () => {

    // BUTTON LOADING STATE

    doneBtn.innerHTML =
      "Redirecting...";

    doneBtn.disabled = true;



    /*
    ============================
    REDIRECT
    ============================
    */

    setTimeout(() => {

      // RETURN TO LOGIN

      document.body.style.opacity= "0";

      setTimeout(() => {
          window.location.href = "index.html";
      }, 350);

    }, 1200);

});