function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;

    var distance = targetPosition - startPosition;

    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;

        var timeElapsed = currentTime - startTime;

        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);

        console.log(' timeElapsed :' + timeElapsed + 'duration: ' + duration)

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    }

    requestAnimationFrame(animation);
}



var faq_scroll = document.querySelector('#faq_scroll');
faq_scroll.addEventListener('click', () => {
    smoothScroll('.faq_container', 2000);
    console.log("a");
});

var contact_scroll = document.querySelector('#contact_scroll');
contact_scroll.addEventListener('click', () => {
    smoothScroll('.footer', 2000);
    console.log("a");
});



// user login 
var apiData = ''
var apiUrl = '/userdetails';

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
        .then(Data => {
            // data = apiData// Use the data retrieved from the API
            console.log(Data);
            apiData = Data;
            document.getElementById("login_btn").style.display = "none";
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
}

fetchAPiData(apiUrl);
console.log(apiData)

if (apiData) {
    console.log(apiData)
}