var imageUrls;
var request = new XMLHttpRequest();
request.open('GET', 
    'https://people.ece.ubc.ca/kumseok/vsp23/images',true);
request.onload = function(){
    if (request.status == 200){
        if (request.getResponseHeader('Content-Type')
            .includes('application/json')){
                imageUrls = JSON.parse(request.responseText);
                console.log('Image URLs: ', imageUrls, 'json format:', request.responseText);
                PhotoGalleryLib.onSizeClassChange(sizeChangeCallback);
                prepPresentationMode();
            }
        }
    }
console.log('send request...');
request.send();

function sizeChangeCallback(size){
    console.log('Screen size is '+ size);
    
    var oldGallery = document.getElementById("imagesGrid");
    if (oldGallery == null){
        var newGallery = PhotoGalleryLib.generateGrid(imageUrls, size);
        var container = document.getElementById('container');
        container.appendChild(newGallery);
    }
    if (oldGallery != null){
        var parent = oldGallery.parentNode;
        parent.removeChild(oldGallery);
        var newGallery = PhotoGalleryLib.generateGrid(imageUrls, size);
        parent.appendChild(newGallery);
    }
}

function prepPresentationMode(){
    
    var timer = false;
    var closeButton = function(){
        if (timer) clearInterval(timer);
        PhotoGalleryLib.closePresentationModal();
    }
    
    /* the following is for the requirement that when a picture is clicked, 
    enters 'presentation mode' */
    var imgClickCallback = function(index){
        var images = document.querySelectorAll('#imagesGrid img');
        src = images[index].src;
        PhotoGalleryLib.createModal();
        PhotoGalleryLib.setModalImgSrc(src);
        PhotoGalleryLib.openPresentationModal();
        
        var previousBtnCb = function(){
            if (index == 0){ 
                index = images.length - 1;
                src = images[index].src;
            }
            else{
                index = index-1;
                src = images[index].src;
            }
            PhotoGalleryLib.setModalImgSrc(src);
        }
        var nextBtnCb = function(){
            if (index == images.length - 1){
                index = 0;
                src = images[index].src;
            }
            else{
                index = index + 1;
                src = images[index].src;
            }
            PhotoGalleryLib.setModalImgSrc(src);
        }

        PhotoGalleryLib.initModal(closeButton,
            previousBtnCb, nextBtnCb);
    }
    PhotoGalleryLib.addImageClickHandlers(imgClickCallback);
    
    window.addEventListener('resize', function() {
        PhotoGalleryLib.addImageClickHandlers(imgClickCallback);
    });

    //the following is for 'automatic slide show'
    function initSlideshow(){
        var images = document.querySelectorAll('#imagesGrid img');
        src = images[0].src;
        console.log('initSlideshow',src);
        PhotoGalleryLib.createModal();
        PhotoGalleryLib.setModalImgSrc(src);
        PhotoGalleryLib.openPresentationModal();
        PhotoGalleryLib.initModal(closeButton,
            function(){ return null; }, 
            function(){ return null; }); 
    }
    
    function makeSlideshow(){
        var images = document.querySelectorAll('#imagesGrid img');
        var i = 1;
        timer = setInterval(function(){
            src = images[i].src;
            console.log('makeSlideshow',src);
            PhotoGalleryLib.setModalImgSrc(src);
            i = (i + 1) % images.length;
        }, 1000);
    }

    var slideshowButton = document.getElementsByClassName('slideshowButton')[0];
    slideshowButton.addEventListener('click', function(){
        initSlideshow();
        makeSlideshow();
    });
}
