$(document).ready(function(){
    var socket = io.connect();

    socket.on('message', function (data) {
        var date = new Date(data.date);
        $('#chat').append(
            $('<li></li>').append(
                $('<span class="date">').text('[' + date.getHours() + ':' + date.getMinutes() + '] '),
                $('<strong>').text((data.name || "Server") + ": "),
                $('<span class="message">').text(data.text))
        );
        $('body').scrollTop($('body')[0].scrollHeight);
    });

    function senden(e) {
        e.preventDefault();

        var name = $('#name').val();
        var text = $('#text').val();

        socket.emit('message', { name: name, text: text });
        $('#text').val('');

        return false;
    }

    $('#message').bind("submit", senden);
});
