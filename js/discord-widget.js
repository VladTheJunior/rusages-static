function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

document.addEventListener("DOMContentLoaded", function() { 
    var requestURL = 'https://discordapp.com/api/guilds/739033277301522433/widget.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var discord = request.response;
        document.querySelector('.discord-invite-header-count').innerHTML = '<div class="discord-invite-header-online-status"></div>' + discord['presence_count'] + ' в сети' + '<div class="discord-invite-header-overall-status"></div>' + discord['members'].length + declOfNum(discord['members'].count(), ['участник', 'участника', 'участников']);
    }
});