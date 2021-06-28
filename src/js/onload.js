console.log('onload.js executed');

const bannerWrapper = document.getElementById('banner_wrapper');

if (bannerWrapper) {
    // throw this on with js to ensure page has fully loaded
    bannerWrapper.classList.add('active');
}
