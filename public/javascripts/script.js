document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


//Modal Anleitung
var modalBuch = document.querySelector(".modalBuch");
var triggerBuch = document.querySelector(".triggerBuch");
var closeButtonBuch = document.querySelector(".close-buttonBuch");

function toggleModalBuch() {
    modalBuch.classList.toggle("show-modalBuch");
}

function windowOnClick(event) {
    if (event.target === modalBuch) {
        toggleModalBuch();
    }
}

triggerBuch.addEventListener("click", toggleModalBuch);
closeButtonBuch.addEventListener("click", toggleModalBuch);
window.addEventListener("click", windowOnClick);




