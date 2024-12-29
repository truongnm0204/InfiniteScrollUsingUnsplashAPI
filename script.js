let photosArray = [];
const count = 30;
const apiKey = 'YourApiKey';
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
//check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImage){
        ready  = true;
        loader.hidden = true;
        console.log('ready =',ready);
    }
}
 

// helper function to set Attributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Link and Photo, and add to the DOM
function displayPhotos(){
    photosArray.forEach((photo)=>{
        imagesLoaded = 0;
        totalImage = photosArray.length;
        // Create <a>to link to Unsplash</a>
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target:'_blank',
        });
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finshed loading
        img.addEventListener('load', imageLoaded);
        // append to the code
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}
// Unsplash API
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch err
    }
}


// Check to sê if  scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',() =>{
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready){
        getPhotos();
    }
});
getPhotos();
