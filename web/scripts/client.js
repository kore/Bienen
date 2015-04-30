$(document).ready(function(){
    var socket = io.connect(),
        canvas = Raphael("canvas"),
        bee = new Bee(canvas);

    demoBee = bee.create('#FB8D2D');
    demoBee.transform("R0,24,24T" + (canvas.width / 2 - 24) + "," + (canvas.height / 2 - 24) + "s3,3,0,0");

    // Registration form bindings
    $('form.register button.color').on("click", function(event) {
        $('form.register button.color').removeClass("active");
        $(this).addClass("active");
        $('form.register input[name="color"]').val($(this).data('color'));
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
