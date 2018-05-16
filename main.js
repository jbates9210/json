// variable to increment by 1 each time btn is clicked
var pageCounter = 1;

// variable to select the div with ID of animal-info
var animalContainer = document.getElementById("animal-info");

// variable to select the button with ID of btn
var btn = document.getElementById("btn");

// click button to start JSON parsing
btn.addEventListener("click", function() {

    // variable to hold the HttpRequest built in function
    var request = new XMLHttpRequest();

    // Get data from website
    request.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

    // Function to start when JSON is loaded
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
        // store data in a variable
        var jsonData = JSON.parse(request.responseText);

        // Give the data to the addHTML function
        addHTML(jsonData);
        } else {
            alert('Server connection established, but data could not be processed: ' + err)
        }
    };

    request.onerror = function() {
        alert('Connection error: ' + err);
    };

    request.send();
    pageCounter++;

    // Hide button with hide-me class when clicked 3 times
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }
});

// function to add HTML with the JSON data received
function addHTML(data) {

    // variable to hold HTML
    var htmlString = "";

    // Loop through array of pet objects, and add them to a <p> element
    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
        for (k = 0; k < data[i].foods.likes.length; k++) {
            if (k == 0) {
                htmlString += data[i].foods.likes[k];
            } else {
                htmlString += " and " + data[i].foods.likes[k];
            }
        }

        htmlString += ' and dislikes ';

        for (k = 0; k < data[i].foods.dislikes.length; k++) {
            if (k == 0) {
                htmlString += data[i].foods.dislikes[k];
            } else {
                htmlString += " and " + data[i].foods.dislikes[k];
            }
        }

        htmlString += '.<p>';
    }

    // target ID, Use DOM method insertAdjacentHTML to add HTML before the end of the div element
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}

