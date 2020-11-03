$(document).ready(function () {


    function getFeedItems(queryText) {
        // As an example of an asynchronous action, return a promise
        // that resolves after a 100ms timeout.
        // This can be a server request or any sort of delayed action.
        return new Promise(resolve => {
            setTimeout(() => {
                const itemsToDisplay = items
                    // Filter out the full list of all items to only those matching the query text.
                    .filter(isItemMatching)
                    // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
                    .slice(0, 5);

                resolve(itemsToDisplay);

            }, 100);
        });

        // Filtering function - it uses the `name` and `username` properties of an item to find a match.
        function isItemMatching(item) {
            // Make the search case-insensitive.
            const searchString = queryText.toLowerCase();

            // Include an item in the search results if the name or username includes the current user input.
            return (
                item.name.toLowerCase().includes(searchString)
            );
        }
    }
    const items = JSON.parse(document.getElementById('mentions-data').textContent);

    CKEditor.InlineEditor.defaultConfig.mention.feeds[0].feed = getFeedItems

    CKEditor.InlineEditor.create(document.querySelector('.comment-box-content-editable'))
        .then(editor => {
            window.editor = editor;



            $("#comments_section").on('click', '.comment-reply', function () {
                $(".comment-form").attr("action", "/comments/create/");
                $(".comment-form .submit-button").html("Отправить");
                $(".comment-form .cancel-button").hide();
                $(".comment-form button").removeAttr("id");
                editor.setData("");
                editor.isReadOnly = false;
                editor.model.change(writer => {
                    const root = editor.model.document.getRoot();
                    //const replyParagraph = writer.createElement('paragraph');
                    const firstElem = root.getChild(0);
                    // And place selection inside the paragraph.
                    writer.setSelection(firstElem, 'in');
                });

                editor.editing.view.focus();

                editor.execute('mention', {
                    marker: '@',
                    mention: {
                        userId: $(this).data('userid'),
                        name: $(this).data('username'),
                        id: '@' + $(this).data('username'),
                        link: '/user/' + $(this).data('profileid') + '/#content',
                    },
                });



                $("html,body").animate(
                    { scrollTop: $("#comment").offset().top - 95 },
                    "slow"
                );
            });


            $("#comments_section").on('click', ".comment-edit", function () {
                //$(".comment-box-content-editable").html($(`#comment-body${$(this).attr("id")}`).html());
                editor.setData($(`#comment-body${$(this).attr("id")}`).html());
                editor.isReadOnly = false;

                $(".comment-form .submit-button").html("Изменить");
                $(".comment-form button").attr("id", $(this).attr("id"));
                $(".comment-form").attr("action", "/comments/edit/");
                $(".comment-form .cancel-button").show();

                $("html,body").animate(
                    { scrollTop: $("#comment").offset().top - 95 },
                    "slow"
                );
            });

            $("#comments_section").on('click', ".comment-remove", function () {
                editor.setData($(`#comment-body${$(this).attr("id")}`).html());
                editor.isReadOnly = true;
                $(".comment-form .submit-button").html("Удалить");
                $(".comment-form button").attr("id", $(this).attr("id"));
                $(".comment-form").attr("action", "/comments/delete/");
                $(".comment-form .cancel-button").show();
                $("html,body").animate(
                    { scrollTop: $("#comment").offset().top - 95 },
                    "slow"
                );
            });

            $(".comment-form .cancel-button").click(function (e) {
                $(".comment-form .submit-button").html("Отправить");
                $("html,body").animate(
                    { scrollTop: $(`#comment${$(".comment-form button").attr('id')}`).offset().top - 95 },
                    "slow"
                );
                $(".comment-form button").removeAttr("id");
                editor.isReadOnly = false;
                editor.setData("");

                $(".comment-form").attr("action", "/comments/create/");
                $(".comment-form .cancel-button").hide();
            });


            $(".comment-form .submit-button").on('click', function (e) {
                if (editor.getData() == "") {
                    alert("Комментарий не может быть пустым!");
                    return false;
                }
                const post_id = $(".comment-form").attr("id");
                const comment_body = editor.getData();
                const url = $(".comment-form").attr("action");
                var userids = [];
                $('.comment-form .mention').each(function () {
                    userids.push($(this).data('user-id'));
                });
                var action = 0;
                var comment_id = 0;
                if (url == "/comments/edit/") {
                    action = 1;
                    comment_id = $(".comment-form button").attr("id");
                }
                if (url == "/comments/delete/") {
                    action = 2;
                    comment_id = $(".comment-form button").attr("id");
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                        post_pk: post_id,
                        comment_pk: comment_id,
                        comment_body: comment_body,
                        action: action,
                        userids: userids,
                    },
                    success: function (response) {
                        if (action == 0) {
                            $("#emptyComments").remove();
                            //var data = JSON.parse(response);

                            var comment_html = `							<div class="media mb-4" id="comment${response.comment.comment_id}">
<div class="avatar-container mr-3">
  <img width="64px" height="64px"
    src="https://vladthejunior.sirv.com/rusages/images/avatars/${response.comment.avatar}">
  <div title="Пользователь в сети" class="online-badge"></div>

</div>
<div class="media-body">
  <div class="article-preview-body-footer" style="align-items: flex-start;
  margin-top: 0;">
    <div>
      <h5><a href="/user/${response.comment.profile_id}/#content"
          class="animated-link-black">${response.comment.username}</a></h5>
    </div>

    <ul class="article-preview-body-footer-actions">

      <li style="margin-top: 0; margin-bottom: 0;">
        <button title="Ответить" data-profileid="${response.comment.profile_id}"
          data-userid="${response.comment.userid}"
          data-username="${response.comment.username}"
          class="btn shadow-none fas text-primary fa-reply ml-1 mb-1 p-0 comment-action comment-reply"></button>
      </li>

      <li style="margin-top: 0; margin-bottom: 0;">
        <button title="Изменить" id="${response.comment.comment_id}"
          class="btn shadow-none fas text-primary fa-pencil ml-1 mb-1 p-0 comment-action comment-edit"></button>
      </li>
      <li style="margin-top: 0; margin-bottom: 0;">
        <button title="Удалить" id="${response.comment.comment_id}"
          class="btn shadow-none fas text-danger fa-times ml-1 mb-1 p-0 comment-action comment-remove"></button>
      </li>


    </ul>
  </div>

  <ul class="article-preview-body-info">
    <li>
      <small class="text-capitalize font-weight-bold" style="color:#343a40;"><i
          class=" far fa-user-tag mr-1"></i>
          ${response.comment.usergroup}</small>
    </li>
    <li>
      <small class="text-capitalize font-weight-bold" style="color:#343a40;"><i
          class=" far fa-calendar-alt mr-1"></i>
          ${response.comment.datetime}</small>
    </li>

  </ul>


  <div id="comment-body${response.comment.comment_id}" class="comment-body mt-2">
  ${response.comment.comment_body}</div>
</div>
</div>`;

                            $("#comments_section").prepend(comment_html);
                            document.querySelectorAll(`#comment-body${response.comment.comment_id} oembed[url]`).forEach(element => {
                                iframely.load(element, element.attributes.url.value);
                            });
                            editor.setData("");
                        }
                        if (action == 1) {
                            $(".comment-form .submit-button").html("Отправить");
                            $(".comment-form .cancel-button").hide();
                            $(".comment-form button").removeAttr("id");
                            $(`#comment-body${comment_id}`).html(comment_body);
                            document.querySelectorAll(`#comment-body${comment_id} oembed[url]`).forEach(element => {
                                iframely.load(element, element.attributes.url.value);
                            });
                            $("html,body").animate(
                                { scrollTop: $(`#comment${comment_id}`).offset().top - 95 },
                                "slow"
                            );
                            editor.setData("");
                            $(".comment-form").attr("action", "/comments/create/");
                        }

                        if (action == 2) {
                            $(".comment-form .submit-button").html("Отправить");
                            $(".comment-form .cancel-button").hide();
                            $(".comment-form button").removeAttr("id");
                            $(`#comment${comment_id}`).remove();
                            if ($("#comments_section").children().length == 0) {
                                $("#comments_section").prepend(
                                    '<p id="emptyComments" style="margin: 0;padding: 15px;">В данной статье отсутсвуют комментарии...</p>'
                                );
                            }
                            editor.isReadOnly = false;
                            editor.setData("");

                            $(".comment-form").attr("action", "/comments/create/");
                        }


                    },
                    error: function (response) { },
                });
            });





        })
        .catch(error => {
            console.error('There was a problem initializing the editor.', error);
        });






});
