$(document).ready(function() {
    $(".sortable-board").sortable({
        opacity: 0.7,
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true
    });
    $(".cards").sortable({
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,
        connectWith: ".cards"
    });
});
