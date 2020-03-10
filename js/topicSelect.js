window.onload = function () {
    $.ajax({
        url: '/topics',
        type: 'GET',
        cache: false,
        success: function (data) {
            alert('Success!')
            console.log(data);
        },
        error: function (jqXHR, textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
        }
    });
}