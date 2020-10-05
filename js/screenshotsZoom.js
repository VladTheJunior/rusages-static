function zoomIn() {
    $('#screenZoomImage').css("background-image", 'url('+$(this).attr("src")+')');
    $('#screenZoom').fadeIn().css("display", "flex");
  }

$(document).ready(function () {
    $('#screenZoom').on("click", function(e){
        $('#screenZoom').fadeOut();
    });
    $(".article-body img").click(zoomIn);
});