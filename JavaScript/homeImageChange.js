
// makes pictures from home page to change every 5 seconds
function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("img").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("img").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 5000);
}

var images = [], x = -1;
images[0] = "../Images/poza1.jpg";
images[1] = "../Images/poza2.jpg";
images[2] = "../Images/poza3.jpg";
images[3] = "../Images/poza4.jpg";