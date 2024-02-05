﻿document.addEventListener("DOMContentLoaded", function () {
    // Display loading overlay
    document.getElementById('loading-overlay').style.display = 'flex';

    // Lazy load Gallery
    var images = document.querySelectorAll("img[data-src]");
    var imagesContainer = document.getElementById("images-container");

    var observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.getAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        }
    );

    images.forEach(function (img) {
        observer.observe(img);
    });

    var checkLoadingCompletion = function () {
        if (images && Array.from(images).every(img => img.complete)) {
            imagesContainer.style.display = "flex";
            // Hide loading overlay
            document.getElementById('loading-overlay').style.display = 'none';
        } else {
            setTimeout(checkLoadingCompletion, 100);
        }
    };

    checkLoadingCompletion();
    // End Lazy Load    

    // Display or hide the topbutton if the user has scrolled from the screen top
    window.onscroll = function () {
        // When the user scrolls down 20px from the top of the document, show the button
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            document.getElementById("top-button").style.display = "block";
        } else {
            document.getElementById("top-button").style.display = "none";
        }
    };

    // When the user clicks on the topbutton, scroll to the top of the document
    window.topFunction = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
});



