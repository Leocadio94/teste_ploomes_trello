$(document).ready(function() {
    $(".sortable-board").sortable({
        opacity: 0.7,
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,
        items: ".list"
    });
    $(".cards").sortable({
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,
        connectWith: ".cards"
    });
    $.getJSON("lista.json", function(json) {
        console.log(JSON.stringify(json));
    });
});
