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

    $(".notifications-item").on("click", function (e) {
        window.location.href = $(this).data('link');
    });

    $(".clear-notifications").on("click", function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: '/notifications/clear/',
            data: {
                csrfmiddlewaretoken: getCookie('csrftoken'),
            },
            success: function (response) {
                try{
                document.title = document.title.split('\u00A0')[1].trim();
                }
                catch(e){}
                $('.notification-mobile-item').remove();
                $('.notifications-count').remove();
                $('.notifications-list').remove();
                $('.notifications-ui').append('<a class="dropdown-item text-center text-muted"><small>У вас нет уведомлений</small></a>');
                $(".clear-notifications").remove();
            },
            error: function (response) { },
        });
    });
});