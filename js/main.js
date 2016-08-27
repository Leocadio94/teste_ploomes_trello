$(document).ready(function() {
    $.getJSON("lista.json", function(json) {
        getListaJSON(json);
        adicionarLista();
        adicionarCard();
        sortListsCards();
    });
});

function getListaJSON(json) {
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
            "<div class='add-card'>" +
            "<a class='add-card-btn' href='#'>Adicionar um cartão...</a>" +
            "<form class='form-add-card'>" +
            "<input class='add-card-input' type='text' placeholder='Adicionar um cartão...'></input>" +
            "<input class='btn' type='submit' value='Add...'></input>" +
            "</form>" +
            "</div>" +
            "</div>");

        for (var j in cards) {
            $("#card" + id).append(
                "<div id='content" + cards[j].id + "' class='card'>" +
                cards[j].content +
                "</div>");
        }
    }
}

function adicionarLista() {
    $("#form-add-list").hide();

    $("#add-list-btn").click(function() {
        $("#add-list-btn").hide();
        $("#form-add-list").show();
        $("#add-list-input").focus();
    });

    $("#form-add-list").submit(function(e) {
        e.preventDefault();
        $("#board").append(
            "<div class='list'>" +
            "<h1 class='list-title'>" + $("#add-list-input").val() + "</h1>" +
            "<div class='cards'>" +
            "</div>" +
            "<div class='add-card'>" +
            "<a class='add-card-btn' href='#'>Adicionar um cartão...</a>" +
            "<form class='form-add-card'>" +
            "<input class='add-card-input' type='text' placeholder='Adicionar um cartão...'></input>" +
            "<input class='btn' type='submit' value='Add...'></input>" +
            "</form>" +
            "</div>" +
            "</div>");
        $("#add-list-btn").show();
        $("#form-add-list").hide();
        $("#add-list-input").val("");
        $("#list").focus();
    });
}

function adicionarCard() {
    $(".form-add-card").hide();

    $(".add-card-btn").click(function() {
        var parent = $(this).closest(".list").attr("id");
        console.log($("#2 .add-card-btn").attr("class"));
        $("#" + parent + " .add-card .add-card-btn").hide();
        $("#" + parent + " .add-card .form-add-card").show();
        $("#" + parent + " .add-card .add-card-input").focus();
    });

    $(".form-add-card").submit(function(e) {
        e.preventDefault();
        var parent = $(this).closest(".list").attr("id");
        $("#card" + parent).append(
            "<div class='card'>" +
            $("#" + parent + " .add-card .add-card-input").val() +
            "</div>");
        $("#" + parent + " .add-card .add-card-btn").show();
        $("#" + parent + " .add-card .form-add-card").hide();
        $("#" + parent + " .add-card .add-card-input").val("");
        $("#card"+parent).focus();
    });
}

function sortListsCards() {
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
}
