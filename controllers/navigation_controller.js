var Canvas;

const NavigationController = {
  initialize: function (canvasManager){
    Canvas = canvasManager;
    const handleNavUp = Canvas.navUp;
    const handleNavDown = Canvas.navDown;
    const handleNavLeft = Canvas.navLeft;
    const handleNavRight = Canvas.navRight;
    document.querySelector("#up_button").addEventListener("click", handleNavUp);
    document.querySelector("#down_button").addEventListener("click", handleNavDown);
    document.querySelector("#left_button").addEventListener("click", handleNavLeft);
    document.querySelector("#right_button").addEventListener("click", handleNavRight);
  }
}

module.exports = NavigationController;