var Canvas;

const NavigationController = {
  initialize: function (canvasManager){
    Canvas = canvasManager;
    const handleNavUp = Canvas.navUp;
    const handleNavDown = Canvas.navDown;
    const handleNavLeft = Canvas.navLeft;
    const handleNavRight = Canvas.navRight;
    const handleZoomIn = Canvas.zoomIn;
    const handleZoomOut = Canvas.zoomOut;
    const handleResetZoom = Canvas.resetZoom;
    document.querySelector("#up_button").addEventListener("click", handleNavUp);
    document.querySelector("#down_button").addEventListener("click", handleNavDown);
    document.querySelector("#left_button").addEventListener("click", handleNavLeft);
    document.querySelector("#right_button").addEventListener("click", handleNavRight);
    document.querySelector("#zoom_in_button").addEventListener("click", handleZoomIn);
    document.querySelector("#zoom_out_button").addEventListener("click", handleZoomOut);
    document.querySelector("#reset_zoom_button").addEventListener("click", handleResetZoom);
  }
}

module.exports = NavigationController;
