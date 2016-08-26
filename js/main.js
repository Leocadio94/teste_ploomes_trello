$(document).ready(function() {
    $(".sortable-board").sortable({
        opacity: 0.7
    });
    $("#draggable").draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
});
