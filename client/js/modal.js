const user_agent =/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// Get the modal
const modal = document.getElementById('myModal');
const btn = document.getElementById("open_form");
const close_btn = document.getElementById("close_modal");
const modalContent = document.getElementById('modal-content')

// When the user clicks on the button, open the modal
btn.onclick = () => {
  modal.style.display = "block"
  if (user_agent && (window.innerHeight > window.innerWidth) && (modal.style.display === "block")) {
    modalContent.style.width = '95%'
  }
  else {
    modalContent.style.marginTop = '5%'
    modalContent.style.width = '70%'
  }
}
// When the user clicks on <span> (x), close the modal
close_btn.onclick = () => {
  modal.style.display = "none"
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}
// IF MOBILE
window.addEventListener("DOMContentLoaded", () => {
  // if mobile and portrait
  if (user_agent && (window.innerHeight > window.innerWidth) && (modal.style.display === "block")) {
    modalContent.style.width = '95%'
  }
})
// IF MOBILE RESIZE portrait/paysage
window.addEventListener("resize", () => {
  if (window.innerHeight > window.innerWidth) {
    modalContent.style.width = '95%'
    modalContent.style.marginTop = '15%'
  }
  else {
    modalContent.style.marginTop = '5%'
    modalContent.style.width = '70%'
  }
}, false)
