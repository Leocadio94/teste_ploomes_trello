$(document).ready(function() {
    $.getJSON("lista.json", function(json) {
        getListaJSON(json);
        adicionarLista();
        adicionarCard();
        sortListsCards();
    });
});

function getListaJSON(json) {
    if (localStorage.getItem('listaJSON') == null) {
        localStorage.setItem('listaJSON', JSON.stringify(json));
    }

    var listaJSON = JSON.parse(localStorage.getItem('listaJSON'));

    $(".board-title").text(listaJSON.board_title);
    var lists = listaJSON.lists;

    for (var i in lists) {
        var id = lists[i].id;
        var titulo = lists[i].title;
        var cards = lists[i].cards;

        $("#board").append(
            "<div id='" + id + "' class='list'>" +
            "<h1 class='list-title'>" + titulo + "</h1>" +
            "<div id='card" + id + "' class='cards'>" +
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
    var testObject = {
        'one': 1,
        'two': 2,
        'three': 3
    };
}

function adicionarLista() {
    var listaJSON = JSON.parse(localStorage.getItem('listaJSON'));
    $("#form-add-list").hide();

    $("#add-list-btn").click(function(e) {
        e.stopImmediatePropagation();
        $("#add-list-btn").hide();
        $("#form-add-list").show();
        $("#add-list-input").focus();
        return false;
    });

    $("#form-add-list").submit(function(e) {
        e.stopImmediatePropagation();
        listaJSON.lists.push({
            "id": listaJSON.lists.length + 1,
            "title": $("#add-list-input").val(),
            "cards": []
        });
        localStorage.setItem('listaJSON', JSON.stringify(listaJSON));
        $("#board").append(
            "<div id='" + listaJSON.lists.length + "' class='list ui-sortable-handle'>" +
            "<h1 class='list-title'>" + $("#add-list-input").val() + "</h1>" +
            "<div id='card" + listaJSON.lists.length + "' class='cards ui-sortable'>" +
            "</div>" +
            "<div class='add-card'>" +
            "<a class='add-card-btn' href='#'>Adicionar um cartão...</a>" +
            "<form class='form-add-card' style='display: none'>" +
            "<input class='add-card-input' type='text' placeholder='Adicionar um cartão...'></input>" +
            "<input class='btn' type='submit' value='Add...'></input>" +
            "</form>" +
            "</div>" +
            "</div>");
        $("#add-list-btn").show();
        $("#form-add-list").hide();
        $("#add-list-input").val("");
        adicionarCard();
        sortListsCards();
        $("#" + listaJSON.lists.length).focus();
        return false;
    });
}

function adicionarCard() {
    var listaJSON = JSON.parse(localStorage.getItem('listaJSON'));
    $(".form-add-card").hide();

    $(".add-card-btn").click(function(e) {
        e.stopImmediatePropagation();
        var parent = $(this).closest(".list").attr("id");
        console.log(parent);
        $("#" + parent + " .add-card-btn").hide();
        $("#" + parent + " .form-add-card").show();
        $("#" + parent + " .add-card-input").focus();
        return false;
    });

    $(".form-add-card").submit(function(e) {
        e.stopImmediatePropagation();
        var parent = $(this).closest(".list").attr("id");
        console.log(parent);
        listaJSON.lists[parent - 1].cards.push({
            "id": listaJSON.lists[parent - 1].cards.length + 1,
            "content": $("#" + parent + " .add-card .add-card-input").val()
        });
        localStorage.setItem('listaJSON', JSON.stringify(listaJSON));
        $("#card" + parent).append(
            "<div class='card'>" +
            $("#" + parent + " .add-card .add-card-input").val() +
            "</div>");
        $("#" + parent + " .add-card-btn").show();
        $("#" + parent + " .form-add-card").hide();
        $("#" + parent + " .add-card-input").val("");
        sortListsCards();
        return false;
    });
}

function sortListsCards() {
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
}
