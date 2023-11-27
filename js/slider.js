$(document).ready(function() {

    $("input.slider").on("input change", function(event) {
        var element = $(this).parents("div.slider-container");
        var pos = event.target.value;

        element.find("div.before").css({width: pos + "%"});
    });

});
