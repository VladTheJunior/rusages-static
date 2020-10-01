

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    $(".approved-badge").on("click", function (e) {
        e.preventDefault();
        var el  = $(this)

        $.ajax({
            type: "POST",
            url: '/articles/approve/',
            data: {
                csrfmiddlewaretoken: getCookie('csrftoken'),
                post_pk: $(this).attr('id'),
            },
            success: function (response) {
                el.attr('title', 'Установлено ' + response.by + ' ' + response.datetime);
                if (response.status) {
                    el.removeClass("approved-badge-unchecked").addClass("approved-badge-checked");
                    el.html('<i class="far fa-check-circle mr-2 "></i><span class="badge-text">проверено</span>');
                }
                else {
                    el.removeClass("approved-badge-checked").addClass("approved-badge-unchecked");
                    el.html('<i class="far fa-times-circle mr-2 "></i><span class="badge-text">не проверено</span>');
                }
            },
            error: function (response) { },
        });
    });
});