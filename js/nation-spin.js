$(document).ready(function () {

    // Clone the first element and append it to the end of the list

    $('#btn-spin').on('click', function () {
        var $ul = $('.slotwrapper ul');
        var $firstSlot = $ul.find('li').first();

        var animationTime = 3000;
        var loopCount = 6;
        var slotHeight = $firstSlot.height();
        var slotCount = $ul.children().length;
        var rouletteHeight = slotHeight * slotCount;
        var spinSpeed = animationTime / loopCount;
        $firstSlot.clone().appendTo($ul);
        function spin(count) {
            $ul.animate({
                top: -rouletteHeight
            }, spinSpeed, 'linear', function () {
                if (count == 0) {
                    var slot = Math.floor(Math.random() * slotCount),
                        top = -slot * slotHeight,
                        time = animationTime * slot / slotCount;
                    $ul.css({
                        top: 0
                    }).animate({
                        top: top
                    }, time, 'easeOutQuart');
                    $ul.find('li').last().remove(); // Remove the cloned row
                    $ul.removeClass('blur');
                    $('#btn-spin').css("pointerEvents", "auto");
                } else {
                    $ul.css({
                        top: 0
                    });
                    spin(count - 1);
                };
            });
        }



        $('.unknownImg').hide();
        var click = document.getElementById("StartSpin");
        click.volume = 0.1;
        click.play();
        $('#btn-spin').css("pointerEvents", "none");

        var wheeling = document.getElementById("Spinning");
        wheeling.volume = 0.1;
        wheeling.play();
        $ul.removeClass('blur').addClass("blur");
        $ul.css({
            top: 0
        });
        spin(loopCount - 1);


    });
});