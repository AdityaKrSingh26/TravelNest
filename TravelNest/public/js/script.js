var request = ''
var apiUrl = '/apiData';

// Use the fetch() function to make a GET request to the API
const fetchAPiData = (url) => {
    fetch(url)
        .then(response => {
            // Check if the response status is OK (HTTP status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then(apiData => {
            // data = apiData// Use the data retrieved from the API
            console.log(apiData);
            cardAppend(apiData)
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
}

fetchAPiData(apiUrl);


const cardAppend = (apiData) => {

    for (const data of apiData) {
        cardTemplate(data)
    }
}

const removeCard = () => {
    console.log("Removing card");
    // Get a reference to the parent element of the element you want to remove
    var parentElement = document.querySelector(".container");

    // Get a reference to the element you want to remove
    var elementToRemove = document.querySelector(".card");

    // Check if both parent and child elements exist
    if (parentElement && elementToRemove) {
        // Remove the child element from the parent
        parentElement.removeChild(elementToRemove);
    }

}

const cardTemplate = (data) => {

    // Create and set the card element
    const card = document.createElement('div');
    card.className = 'card';

    // Create and set the image element
    const image = document.createElement('div');
    image.className = 'image';
    const img = document.createElement('img');

    // Replace with your image source from the API
    img.src = data.roomPictures[0];
    img.alt = '';
    image.appendChild(img);

    // Create and set the info element
    const info = document.createElement('div');
    info.className = 'info';

    // Set the name, price, rating, and location
    info.innerHTML = `
      <h3 class="name">${data.name}</h3>
      <p>Price: $${data.price}</p>
      <div class="rating">
        <img src="assets_images/assets/icons/rating.png" alt="">
        <p>${data.rating} / 5</p>
      </div>
      <div class="location">
        <img src="assets_images/assets/icons/location.png" alt="">
        <p>${data.city} , ${data.state}</p>
      </div>
    `;

    // Create and set the button element
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Book Now'; // Change 'Book Now' to 'Login'
    const anchor = document.createElement('a');
    anchor.href = '/hotel';
    anchor.appendChild(button);


    // Append the image, info, and button to the card
    card.appendChild(image);
    card.appendChild(info);
    card.appendChild(anchor);

    // Append the card to the container
    const container = document.querySelector('.container');
    container.appendChild(card);

}




// Get all elements with class 'dropdown_name'
var dropdownItems = document.querySelectorAll('.dropdown li');

// Add click event listener to each element
dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
        // Access and log the ID of the clicked element
        // removeCard()
        request = `city=${item.id}`;
        fetchAPiData(`/apiData?${request}`)
    });
});
