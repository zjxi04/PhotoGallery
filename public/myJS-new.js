imageUrls = ["images/image1.jpg", "images/image2.jpg",
    "images/image3.jpg", "images/image4.jpg",
    "images/image5.jpg", "images/image6.jpg", 
    "images/image7.jpg", "images/image8.jpg"];

function callback(size){
    console.log('Screen size is '+ size);

    var oldGallery = document.getElementById("imagesGrid");
    if (oldGallery != null) oldGallery.innerHTML = '';

    var newGallery = PhotoGalleryLib.generateGrid(imageUrls, size);
    if ((oldGallery != null)) oldGallery.appendChild(newGallery);
}

PhotoGalleryLib.onSizeClassChange(callback);
