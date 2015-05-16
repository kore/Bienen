$(document).ready(function(){
    var canvas = Raphael("canvas"),
        beeHandler = new Bee(canvas),
        demoBee = beeHandler.create('#FFFF30').transform(beeHandler.getTransformationString(0, [canvas.width / 2, canvas.height / 2])),
        field = new Field(canvas, beeHandler);

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

        field.register(
            $('form.register input[name="name"]').val(),
            $('form.register input[name="color"]').val()
        );
        demoBee.remove();
        $('#register').addClass("hidden");
        $('#code').removeClass("hidden");

        return false;
    });

    // Programming bindings
    $("#program").sortable({
        revert: true,
        accept: ".card.action",
        items: ".card.action",
        update: function(event, ui) {
            var item = ui.item,
                program = [];
            $(item).removeAttr("style");

            $.each($("#program .card"), function (position, card) {
                program.push($(card).data("type"));
            });
            field.configure(program);
        }
    });
    $(".card.action").draggable({
        connectToSortable: ".program",
        helper: "clone"
    });
    $('#start').on("click", function(event) {
        field.start();
    });
    $('#reset').on("click", function(event) {
        $("#program").empty();
        field.configure([]);
    });
});
