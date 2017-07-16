
function toggleMenuVisibility(menu_id){
  const menu = document.querySelector("#" + menu_id);
  const menuSelector = document.querySelector("#" + menu_id + "_selector")
  menu.classList.toggle("hidden");
  menuSelector.classList.toggle("active_selection")
}

function assignMenuTogglers(){
  for (const li of document.querySelectorAll("#menu_menu li[data-menu]")) {
    li.addEventListener("click", toggleMenuVisibility.bind(this, li.getAttribute('data-menu')));
  }
}

function handleMouseMove(menu, startTime, origX, origY, e){
  const curTime = (new Date()).getTime();
  if (curTime - startTime > 700) { 
    menu.style.top = e.clientY - origY + "px";
    menu.style.left = e.clientX - origX + "px";
  }
}

function dragMenu(e){
  const origX = e.offsetX;
  const origY = e.offsetY;
  const startTime = (new Date()).getTime();
  const moveHandler = handleMouseMove.bind(null, e.currentTarget, startTime, origX, origY)
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
