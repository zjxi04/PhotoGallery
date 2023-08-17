window.onload = function(){
    
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
        console.log('imgClickCallback',src);
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