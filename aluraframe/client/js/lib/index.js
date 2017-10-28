
// Get form fields
var fields = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

// Get table body to insert new registration
var tbody = document.querySelector('table tbody');

// When form.form is submitted, insert the registration data into table body
document.querySelector('.form').addEventListener('submit', function(event) {

    // Prevent form to send data and reload page
    event.preventDefault();

    // Start a new table body line
    var tr = document.createElement('tr');
    
    // Iterate each form field and insert it into a new cell, and then append all cells into tr line
    fields.forEach(function(field) {
        var td = document.createElement('td');
        td.textContent = field.value;
        tr.appendChild(td);
    });

    // Create a new cell from quantity times value
    var tdVolume = document.createElement('td');
    tdVolume.textContent = fields[1].value * fields[2].value;

    // Append volume to tr line and then append line to table body
    tr.appendChild(tdVolume);
    tbody.appendChild(tr);

    // Clear form fields after submission, focusing into data field
    fields[0].value = '';
    fields[1].value = 1;
    fields[2].value = 0;
    fields[0].focus();

});