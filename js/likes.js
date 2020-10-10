

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
  $(".like-button").on('click',function (e) {
    e.preventDefault();
    const post_id = $(this).attr("id");
    const is_liked = $(`.like-btn${post_id}`).hasClass("btn-danger");
    const likes_count = parseInt($.trim($(`.like-spn${post_id}`).text()));

    $.ajax({
      type: "POST",
      url: '/articles/like/',
      data: {
        csrfmiddlewaretoken: getCookie('csrftoken'),
        post_pk: post_id,
      },
      success: function (response) {

        $(`.like-btn${post_id}`).attr('title', response.users.join(', '));
        if (is_liked) {
          $(`.like-btn${post_id}`)
            .removeClass("btn-danger")
            .addClass("btn-primary");
          $(`.like-spn${post_id}`).text(" " + (likes_count - 1).toString());
        } else {
          $(`.like-btn${post_id}`)
            .removeClass("btn-primary")
            .addClass("btn-danger");
          $(`.like-spn${post_id}`).text(" " + (likes_count + 1).toString());
        }
      },
      error: function (response) {},
    });
  });
});
