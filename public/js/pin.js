/*
====================================
PIN AUTHORIZATION SCRIPT
====================================
*/


// KEYS

const keys =
  document.querySelectorAll(".key");


// DOTS

const dots =
  document.querySelectorAll(".pin-dot");


// PIN STORAGE

let pin = "";



/*
====================================
KEYPAD EVENTS
====================================
*/

keys.forEach((key) => {

  key.addEventListener("click", () => {

    // IGNORE EMPTY KEY

    if(
      key.classList.contains("empty")
    ){
      return;
    }


    // DELETE BUTTON

    if(
      key.classList.contains("delete-key")
    ){

      pin =
        pin.slice(0, -1);

      updateDots();

      return;
    }


    // LIMIT PIN LENGTH

    if(pin.length >= 4){
      return;
    }


    // ADD NUMBER

    pin += key.innerText;


    // UPDATE UI

    updateDots();


    // COMPLETE PIN

    if(pin.length === 4){
        //SAVE PIN
        localStorage.setItem("userpin", pin);

      setTimeout(() => {

        // REDIRECT

        document.body.style.opacity= "0";

        setTimeout(() => {
            window.location.href="credit.html"
        },350);

      }, 700);

    }

  });

});



/*
====================================
UPDATE DOTS
====================================
*/

function updateDots(){

  dots.forEach((dot, index) => {

    if(index < pin.length){

      dot.classList.add("active");

    }else{

      dot.classList.remove("active");

    }

  });

}