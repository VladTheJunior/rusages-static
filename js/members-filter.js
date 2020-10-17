$(document).ready(function () {

    function filtermembers() {
        var memberValue = $("#member-input").val().toLowerCase();
        var staffValue = $("#staff-input").is(':checked');
        var onlineValue = $("#online-input").is(':checked');

        $(".members-row").filter(function () {
            
            var c1 = $(this).find('.td-user-name').first().text().toLowerCase().indexOf(memberValue) > -1;
            var roleText = $(this).find('.td-user-role').first().text();
            var c2 = roleText=='Администратор' || roleText=='Редактор' || roleText=='Автор';
            if (!staffValue){
                c2 = true;
            }
            var c3 = $(this).html().indexOf("online-badge") > -1;
            if (!onlineValue){
                c3 = true;
            }
            $(this).toggle(c1 && c2 && c3);
        });
    }

    $("#member-input").on("keyup", filtermembers);
    $("#staff-input").on("change", filtermembers);
    $("#online-input").on("change", filtermembers);
    //$(document).on('change', '#staff-input #online-input', filtermembers);
});