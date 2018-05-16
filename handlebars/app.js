var request = new XMLHttpRequest();

request.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    addHTML(data);
    } else {
        alert('Server connection established, but data could not be processed: ' + err);
    }
};

request.onerror = function() {
    alert('Connection error: ' + err);
};

request.send();

Handlebars.registerHelper('calculateAge', function(birthYear) {
    var age = new Date().getFullYear() - birthYear;
    if (age > 0) {
        return age + " years old";
    } else {
        return "Less than a year old"
    }
});

function addHTML(petData) {
    // Selecting the template code from the HTML - {{#each pets}}
    var rawTemp = document.getElementById("pets-temp").innerHTML;

    // Running the above code template through Handlebars compile method
    var compiledTemp = Handlebars.compile(rawTemp);

    // Pass the compiled template the JSON data, returns a string of HTML
    var genHTML = compiledTemp(petData);

    // Add to the DOM
    var petContainer = document.getElementById("pets-container");
    petContainer.innerHTML = genHTML;
}