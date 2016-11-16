/*
Samir Khoulani
Samir_khoulani@student.uml.edu
11/15/16
HW7
The purpose of this javascript is to check if the form was validated, and if it was
then carry out the building of the chart. Otherwise, it does not submit, and instead
displays the error for the specific form, and what the user must enter for it to work.
*/

$(document).ready(function() {
    $('#form').validate({
        rules:
        {
            horbegin:
            {
                required: true,
                digits: true,
                range: [0, parseInt($('#horend').val())]
            },
            horend:
            {
                required: true,
                digits: true,
                range: [parseInt($('#horbegin').val()), 200]
            },
            vertbegin:
            {
                required: true,
                digits: true,
                range: [0, parseInt($('#vertend').val())]
            },
            vertend:
            {
                required: true,
                digits: true,
                range: [parseInt($('#vertbegin').val()), 200]
            }

        }
    });
    $("#btn").on("click", function(e) {
        // This prevents the default action to refresh using the passed event parameter, and lets the chart stay on the page.
        e.preventDefault();
        if(!$("#form").valid()) {
            return;
        }
        //This deletes previous tables and error messages.
        refreshTable();

        //This defines the element of the message that will be thrown for errors.
        var errorMessage = document.createElement("P");

        // Here, I am storing the user input into strings.
        var horBeginString = document.getElementsByName('horbegin')[0].value;
        var horEndString = document.getElementsByName('horend')[0].value;
        var vertBeginString = document.getElementsByName('vertbegin')[0].value;
        var vertEndString = document.getElementsByName('vertend')[0].value;

        // Here, I parse the user input into integers, and store them.
        var hor_begin = parseInt(horBeginString);
        var hor_end = parseInt(horEndString);
        var vert_begin = parseInt(vertBeginString);
        var vert_end = parseInt(vertEndString);

        // Defining the table element for the page.
        var table = document.createElement('table');

        // The table is now constructed, using nested table data, which make up the rows, which make up the entire table.
        for (var i = vert_begin-1; i <= vert_end; i++) {
            // A basic table row element is created here.
            var tr = document.createElement('tr');

            // Creating the table data for row i
            for (var j = hor_begin-1; j <= hor_end; j++) {
                // A single table element is created here.
                var td = document.createElement('td');

                // Creating the table data for column j
                var val = document.createTextNode(''+i*j);

                // This sets the top left corner as blank
                if(j == hor_begin-1 && i == vert_begin-1) {
                    val = document.createTextNode('');
                }
                // This writes the multiplicands in order for the first row
                else if(i == vert_begin-1) {
                    val = document.createTextNode(''+j);
                }
                // This writes the multiplicands in order for the first column
                else if(j == hor_begin-1) {
                    val = document.createTextNode(''+i);
                }
                // Adding the text node to the data element
                td.appendChild(val);

                // Adding the table data to the row
                tr.appendChild(td);
            }
            // Adding the completed row to the table
            table.appendChild(tr);
        }
        // The completed table is written to the body of the document.
        document.body.appendChild(table);
    });

    // Code from HW6
    function refreshTable() {
        // I am pulling both tables and paragraphs.
        var tableElements = document.getElementsByTagName('table');
        var parElements = document.getElementsByTagName('p');

        // This removes the error message when the table is refreshed to prevent duplicate error messages.
        for(var i = 1; i < parElements.length; i++) {
            parElements[i].parentElement.removeChild(parElements[i]);
        }

        // This removes a table when the table is refreshed to prevent extra tables.
        for(var j = 0; j < tableElements.length; j++) {
            tableElements[j].parentElement.removeChild(tableElements[j]);
        }
    }
});
