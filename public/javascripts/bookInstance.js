window.onload = function () {
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
    const stars = document.querySelectorAll('.stars');

    stars.forEach((star, index) => {
        // Add mouseover event to hover stars
        star.addEventListener('mouseover', () => {
            hoverStars(index + 1);
        });

        // Add click event to rate
        star.addEventListener('click', () => {
            rate(index + 1);
        });

        // Add mouseout event to display current rating when not hovering
        star.addEventListener('mouseout', displayRating);
    });

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
        const allStars = document.querySelectorAll('.stars');
        allStars.forEach((star, index) => {
            star.classList.remove('rated');
            if (index < currentRating) {
                star.classList.add('rated');
            }
        });
    }
};

const button = document.querySelector('.cart');
const done = document.querySelector('.done');
console.log(button);
let added = false;
button.addEventListener('click', () => {
    if (added) {
        done.style.transform = 'translate(-110%) skew(-40deg)';
        added = false;
    } else {
        done.style.transform = 'translate(0px)';
        added = true;
    }
});
