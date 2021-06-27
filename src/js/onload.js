console.log('onload.js executed');

const bannerWrapper = document.getElementById('banner_wrapper');

if (bannerWrapper) {
    // throw this on with js to ensure page has fully loaded
    console.log('aaa')
    bannerWrapper.classList.add('active');
} else {
    
    console.log('bbbbb')
}