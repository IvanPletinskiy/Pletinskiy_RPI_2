
var currentImageIndex = 0
var isChanging = true
var looper;

let images = [
    "image0.jpg",
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
];

$(document).ready(function () {
    initialize();
});

function onKeyDown(e) {

    e = e || window.event;
    if (e.keyCode === 27) {
        self.close()
    }
    if (e.keyCode === 37) {
        // left arrow
        rewindBack()
    }
    if (e.keyCode === 39) {
        // right arrow
        rewindForward()
    }
}

function save() {
    localStorage.setItem('currentIndex', currentImageIndex);
    if(isChanging) {
        localStorage.setItem('isChanging', 0);
    } else {
        localStorage.setItem('isChanging', 1);
    }
}

function initialize() {
    if (localStorage.getItem('currentIndex') != null) {
        currentImageIndex = Number(localStorage.getItem('currentIndex'));
    }
    if(localStorage.getItem('isChanging') != null) {
        isChanging = localStorage.getItem('isChanging') == '0';
    }

    updateImage(currentImageIndex)
    updateButton()

    $('.control__control-button').on("mousedown", function (e) {
        isChanging = !isChanging
        updateButton()
        return true;
    });

    $('.slider__back').on("mousedown", function (e) {
        rewindBack()
        return true;
    });

    $('.slider__forward').on("mousedown", function (e) {
        rewindForward()
        return true;
    });

    document.onkeydown = onKeyDown;
    window.onbeforeunload = save
}

function updateButton() {
    if (looper) {
        clearInterval(looper)
    }
    if (isChanging) {
        looper = setInterval(loop, 3000)
        $(".control__control-button").text("Stop");
    } else {
        $(".control__control-button").text("Start");
    }
}

function loop() {
    currentImageIndex = (currentImageIndex + 1) % images.length
    updateImage(currentImageIndex)
}

function updateImage(index) {1
    document.getElementById("image_container").innerHTML = '<img class="image_container_image" src="image' + index + '.jpg" alt=""/>';
    updateDots()
}

function updateDots() {
    $(".dots__container").empty()
    for (let i = 0; i < images.length; i++) {
        var dot = document.createElement("div");

        if (i == currentImageIndex) {
            dot.innerHTML = '<img src="filled.png" alt="" class="dots__dots-container-dot" id="' + i + '"/>'
        } else {
            dot.innerHTML = '<img src="outlined.png" alt="" class="dots__dots-container-dot" id="' + i + '"/>'
        }
        dot.onclick = function (mouseEvent) {
            currentImageIndex = i
            updateImage(currentImageIndex)
            updateButton()
        }
        document.getElementById("dots_container").appendChild(dot);
    }
}

function rewindBack() {
    currentImageIndex = (currentImageIndex - 1)
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1
    }

    updateImage(currentImageIndex)
    updateButton()
}

function rewindForward() {
    currentImageIndex = (currentImageIndex + 1) % images.length
    updateImage(currentImageIndex)
    updateButton()
}