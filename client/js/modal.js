const modal = document.getElementById('myModal')

const displayModal = () => {
  const user_agent =/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const modalContent = document.getElementById('modal-content')
  modal.style.display = "block"

  // portrait
  if (user_agent && (window.innerHeight > window.innerWidth) && (modal.style.display === "block")) {
    modalContent.style.width = '100%'
    modalContent.style.marginTop = '0%'
    modal.style.overflow = 'hidden'
  }
  // payasage
  else if (user_agent && (window.innerHeight < window.innerWidth) && (modal.style.display === "block")) {
    modalContent.style.marginTop = '1%'
    modalContent.style.width = '70%'
    modal.style.overflow = 'scroll'
  }
  else {
    // on pc
    modalContent.style.marginTop = '5%'
    modalContent.style.width = '400px'
  }
}

// When the user clicks on <span> (x), close the modal
document.getElementById("close_modal").onclick = () => {
  modal.style.display = "none"
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

// When the user clicks on the button, open the modal
document.getElementById("open_form").onclick = () => {
  displayModal()
}
// IF MOBILE RESIZE portrait/paysage
window.addEventListener("resize", () => {
  displayModal()
}, false)
