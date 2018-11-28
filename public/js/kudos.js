
console.log("hey!")

$(".modal, .modal-backdrop").hide()


$(".kudos-modal").on("click", function () {
    $(".modal, .modal-backdrop").show()
});


// Render function that grabs all info in the list of kudos//

const render = function (kudosList) {

    //clears the page so I can re-render the new list of kudos on the page//
    $('#kudos').empty();

    // Loop through the kudos and append each item to the #kudos div//

    for (let i = 0; i < kudosList.length; i++) {
        $('#kudos').append(`<div class="card">

        <h3>${kudosList[i].title}<h3>
        <h6>To: ${kudosList[i].to[0].username}</h6>
        <h6>From: ${kudosList[i].from[0].username}</h6>
        <h4>${kudosList[i].body}</h4>
        </div>`);

    }
}

// Grab all kudos and render them to the page//

const getKudos = function () {
    $.get(`/api/kudo/`)
        .then(function (data) {
            render(data)
        });
}



// Grab all users and append them to the dropdowns using a for loop in the promise to grab the name associated with each id//


const getUsers = function () {
    $.get(`/api/users/`)
        .then(function (data) {
console.log(data)
            for (let i = 0; i < data.length; i++) {
                $('#kudo-from').append(`<option value='${data[i]._id}'>${data[i].username}</option>`)
                $('#kudo-to').append(`<option value='${data[i]._id}'>${data[i].username}</option>`)
            };
        });
}

// POST a new kudo//

const postKudo = function (event) {

    event.preventDefault();

    $('#messages').empty();

    // validating selections for "to" and "from", grabbing data from input and posting kudo message//

    if ($('#kudo-to').val() && $('#kudo-from').val()) {


        const kudo = {
            title: $('#kudo-title').val().trim(),
            body: $('#kudo-body').val().trim(),
            to: $('#kudo-to').val(),
            from: $('#kudo-from').val()
        }


        $.post('/api/kudo', kudo)
            .then(function (data) {

                // clear input fields and hide modal once post is made

                $('#kudo-title').val('');
                $('#kudo-body').val('');
                $('#kudo-from').val('');
                $('#kudo-to').val('');

                $('.modal').modal('hide');

                // Re-render get kudos & send error message if there's an error with messages or dropdown selections

                getKudos();
            })
            .catch(function (err) {

                $('#messages').append(`<div class='alert alert-warning'> Please check your message and fix the errors to re-submit.</div>`)
            })
    } else {

        $('#messages').append(`<div class='alert alert-info'>Please make sure you have a sender and receiver selected.</div>`)
    }
}

//render functions//

getKudos();
getUsers();

$('#send-kudo').on('click', postKudo);