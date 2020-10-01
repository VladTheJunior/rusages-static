$(document).ready(function () {
    $("#dxdiag-form").submit(function (e) {
      e.preventDefault();
      if ($("#fileInput").prop("files").length > 0)
      {
        console.log($("#fileInput").prop("files")[0]);
        $.ajax({
            type: "POST",
            url: '/system-requirements/check/',
            processData: false,
            contentType: false,
            dataType: "json",
            data: new FormData($("#dxdiag-form").get(0)),
            success: function (response) {
                $('.os-field').text(response.os);
                $('.cpu-field').text(response.cpu);
                $('.gpu-field').text(response.gpu);
                $('.vram-field').text(response.vram);
                $('.directx-field').text(response.directx);
                $('.ram-field').text(response.ram);

            
            },
            error: function (response) {
      
            },
        });
    }


    });
});