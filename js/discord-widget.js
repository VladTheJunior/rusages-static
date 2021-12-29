document.addEventListener("DOMContentLoaded", function() { 
    var requestURL = 'https://discordapp.com/api/guilds/739033277301522433/widget.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var discord = request.response;
        document.querySelector('.discord-invite-header-count').innerHTML = '<div class="discord-invite-header-online-status"></div>' + discord['presence_count'] + ' в сети';
    }
});