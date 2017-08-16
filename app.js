$(function() {

    var socket;
    var connected = false;

    var connect = function() {
        socket = io({
            query: {
                name: $('#name').val()
            }
        });

        socket.on('chat message', function(msg) {
            $('#messages').append($('<li>').text(msg));
        });
        socket.on('chat_update', function(msg) {
            if (!connected) connected = true;
            $('#messages').append($('<li class="update">').text(msg));
        });
    };

    $('form#chatForm').submit(function() {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        $('#send').prop('disabled', true);
        return false;
    });

    $('#name').on('input', function(e) {
        $('#connect').prop('disabled', $(this).val().length === 0);
    });

    $('#m').on('input', function(e) {
        $('#send').prop('disabled', $(this).val().length === 0);
    });

    $('form#login').submit(function(e) {
        $('#connect').prop('disabled', true);
        connect();
        $('#login').hide(100, function(e) {
            $('#log').show(100, function(e) {
                $('#m').prop('disabled', false)
                    .focus();
            });
        });
        return false;
    });
});