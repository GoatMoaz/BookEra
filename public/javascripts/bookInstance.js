window.onload = function () {
    // PDF.js code
    const pdfCanvas = document.getElementById('pdf-canvas');
    const url = pdfCanvas.getAttribute('data-pdf-url');
    console.log(url)
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');

        const pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded');

            const scale = 1.5;
            const viewport = page.getViewport({scale: scale});

            const context = pdfCanvas.getContext('2d');
            pdfCanvas.height = viewport.height;
            pdfCanvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });
    }, function (reason) {
        console.error(reason);
    });

    // Image resizing code
    const img = document.getElementById('myImage');
    const resizerCanvas = document.getElementById('resizer');
    const resizerCtx = resizerCanvas.getContext('2d');
    const newWidth = 350;
    img.onload = function () {
        const newHeight = (newWidth / img.width) * img.height;
        resizerCanvas.width = newWidth;
        resizerCanvas.height = newHeight;

        resizerCtx.imageSmoothingEnabled = true;

        resizerCtx.drawImage(img, 0, 0, newWidth, newHeight);
    };
    img.src = document.querySelector('#myImage').src;

    // Rating code
    let currentRating = 0;
    let ratingLocked = false;

    function hoverStars(stars) {
        if (!ratingLocked) {
            const allStars = document.querySelectorAll('.stars');
            allStars.forEach((star, index) => {
                star.classList.remove('rated');
                if (index < stars) {
                    star.classList.add('rated');
                }
            });
        }
    }

    function rate(stars) {
        if (!ratingLocked) {
            currentRating = stars;
            document.getElementById('rating').value = stars;
            ratingLocked = true;
            displayRating();
        } else {
            currentRating = 0;
            document.getElementById('rating').value = stars;
            ratingLocked = false;
            displayRating();
        }
    }

    function displayRating() {
        const ratingElement = document.getElementById('rating');
        ratingElement.innerHTML = `You've rated this ${currentRating} star(s).`;
        const stars = document.querySelectorAll('.stars');
        stars.forEach((star, index) => {
            star.classList.remove('rated');
            if (index < currentRating) {
                star.classList.add('rated');
            }
        });
    }
}
const button = document.querySelector(".cart");
const done = document.querySelector(".done");
console.log(button);
let added = false;
button.addEventListener('click',()=>{
    if(added){
        done.style.transform = "translate(-110%) skew(-40deg)";
        added = false;
    }
    else{
        done.style.transform = "translate(0px)";
        added = true;
    }

});
;
let currentRating = 0;
let ratingLocked = false;

function hoverStars(stars) {

    if (!ratingLocked) {
        const allStars = document.querySelectorAll('.stars');
        allStars.forEach((star, index) => {
            star.classList.remove('rated');
            if (index < stars) {
                star.classList.add('rated');
            }
        });
    }
}

function rate(stars) {
    if (!ratingLocked) {
        currentRating = stars;
        document.getElementById('rating').value = stars;
        ratingLocked = true;
        displayRating();
    } else {

        currentRating = 0;
        document.getElementById('rating').value = stars;
        ratingLocked = false;
        displayRating();
    }
}

function displayRating() {
    const ratingElement = document.getElementById('rating');
    ratingElement.innerHTML = `You've rated this ${currentRating} star(s).`;
    const stars = document.querySelectorAll('.stars');
    stars.forEach((star, index) => {
        star.classList.remove('rated');
        if (index < currentRating) {
            star.classList.add('rated');
        }
    });
}