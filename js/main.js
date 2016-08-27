$(document).ready(function() {
    $.getJSON("lista.json", function(json) {
        $(".board-title").text(json.board_title);
        var lists = json.lists;
        for (var i in lists) {
            var id = lists[i].id;
            var titulo = lists[i].title;
            var cards = lists[i].cards;

            $("#board").append(
                "<div id='" + id + "' class='list'>" +
                "<h1 class='list-title'>" + titulo + "</h1>" +
                "<div id='card" + id + "'class='cards'>" +
                "</div>" +
                "<a class='add-card' href='#'>Adicionar um cartão...</a>" +
                "</div>");

            for (var j in cards) {
                $("#card" + id).append(
                    "<div id='" + cards[j].id + "' class='card'>" +
                    cards[j].content +
                    "</div>");
            }
        }
        $("#board").append("<a class='add-list' href='#'>Adicionar uma lista...</a>");
        $(".sortable-board").sortable({
            opacity: 0.7,
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true,
            items: ".list",
            update: function(event, ui) {
                var data = $(this).sortable('toArray');
                console.log(data); // TODO getJSON
            }
        });

        $(".cards").sortable({
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true,
            connectWith: ".cards",
            update: function(event, ui) {
                var data = $(this).sortable('toArray');
                console.log(data);
            }
        });
    });
});
