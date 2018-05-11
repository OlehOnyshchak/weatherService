var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};


function onProcess() {
    let dataSource = getDataSource();
    let daysCount = getDaysCount();

    let req = `http://localhost:3000/weather${dataSource}/${daysCount}`;
    getJSON(req, (err, data) => {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            show(data);
        }
    });
}

function getDataSource() {
    var e = document.getElementById("dataSource");
    return e.options[e.selectedIndex].value;
}

function getDaysCount() {
    var e = document.getElementById("daysCount");
    return e.options[e.selectedIndex].value;
}

function show(arr) {
    clearTable();
    let forecast = arr.daily;

    for (let i = 0; i < forecast.length; ++i) {
        let obj = forecast[i];
        addRow([obj.date, obj.min_temp, obj.max_temp]);
    }
}

function clearTable() {
    var table = document.getElementById("dataTable");

    for(let i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
}

function addRow(vals) {
    let table = document.getElementById("dataTable");

    var tr = document.createElement("tr");

    for (let i = 0; i < vals.length; ++i) {
        var td = document.createElement("td");
        var txt = document.createTextNode(vals[i]);

        td.appendChild(txt);
        tr.appendChild(td);
    }

    table.appendChild(tr);
}