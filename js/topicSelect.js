window.onload = function () {
    console.log(userEmail);
    $.ajax({
        url: `/user?${userEmail}`,
        type: 'GET',
        cache: false,
        success: function (data) {
            console.log('Retrived user data');
        },
        error: function (jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
        }
    });
    $.ajax({
        url: '/topics',
        type: 'GET',
        cache: false,
        success: function (data) {
            console.log('Retrived topic data');
            items = data.Items;
            items = items.sort(function (a, b) {
                return a.topicId - b.topicId;
            });
            console.log(items);
            items.forEach(item => {
                let newItem = document.createElement('option');
                newItem.setAttribute('value', item.topicId);
                newItem.innerHTML = item.name;
                document.getElementById("topicValues").appendChild(newItem);
            });

        },
        error: function (jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
        }
    });
}