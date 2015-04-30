$(document).ready(function(){
    var socket = io.connect(),
        canvas = Raphael("canvas"),
        beeHandler = new Bee(canvas),
        demoBee = beeHandler.create('#FFFF30').transform("R0,24,24T" + (canvas.width / 2) + "," + (canvas.height / 2));

    // Registration form bindings
    $('form.register button.color').on("click", function(event) {
        $('form.register button.color').removeClass("active");
        $(this).addClass("active");

        color = $(this).data('color');
        $('form.register input[name="color"]').val(color);

        demoBee.items[5].attr("fill", color);
        demoBee.items[7].attr("fill", color);
    });
    $('form.register').on("submit", function(event) {
        event.preventDefault();
        socket.emit('register', {
            "name": $('form.register input[name="name"]').val(),
            "color": $('form.register input[name="color"]').val()
        });

        return false;
    });
    socket.on('registered', function() {
        canvas.remove(demoBee);
        $('#register').addClass("hidden");
        $('#code').removeClass("hidden");
    });

    // Programming bindings
    $(".slot").droppable({
        accept: ".card",
        activeClass: "bg-success",
        drop: function(event, element) {
            var program = {};

            // Handle UI
            $(this).empty();
            $(this).append($(element.draggable).clone().detach().css({top: 0, left: 0}));
            $(element.draggable).css({top: 0,left: 0});

            // Read program from HTML
            $("table.program .slot").each(function() {
                var type = $(this).data('type'),
                    action = $(this).find(".card").data("type") || null;

                program[type] = action;
            });
            socket.emit("configure", program);
        }
    });
    $(".card").draggable({
        helper: "clone"
    });
});
