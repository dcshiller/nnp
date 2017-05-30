
function toggleMenuVisibility(menu_id){
  const menu = document.querySelector("#" + menu_id);
  menu.classList.toggle("hidden");
}

function assignMenuTogglers(){
  for (const li of document.querySelectorAll("#menu_menu li")) {
    li.addEventListener("click", toggleMenuVisibility.bind(this, li.getAttribute('data-menu')));
  }
}

function handleMouseMove(origX, origY, e){
  e.target.style.left = e.clientX - origX + "px";
  e.target.style.top = e.clientY - origY + "px";
}

function dragMenu(e){
  const origX = e.offsetX;
  const origY = e.offsetY;
  const moveHandler = handleMouseMove.bind(e.target, origX, origY)
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", document.removeEventListener.bind(document, "mousemove", moveHandler));
}

function assignMenuMovers(){
  for (const menu of document.querySelectorAll(".menu")) {
    menu.addEventListener("mousedown", dragMenu)
  }
}

module.exports = {
  initialize: doBoth(assignMenuTogglers, assignMenuMovers)
}
