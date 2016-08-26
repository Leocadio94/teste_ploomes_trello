$(document).ready(function() {
    $(".sortable-board").sortable({
        opacity: 0.7,
        placeholder: "ui-state-highlight"
    });
    $(".lists").sortable({
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true
    });
});
