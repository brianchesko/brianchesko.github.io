console.log('onload.js executed');

const bannerWrapper = document.getElementById('banner_wrapper');
const bannerImageElements = [
    document.getElementById('banner_image1'), document.getElementById('banner_image2')
]
const bannerImageDir = './img/';
const bannerImages = ["crab.jpg", "moon.jpg", "ocean.jpg"]; // TODO: get actual images

if (bannerWrapper) {
    // throw this on with js to ensure page has fully loaded
    bannerWrapper.classList.add('active');
    
    let currImageIndex = 0;
    let bannerElementIndex = 0;
    const numImages = bannerImages.length;

    // initial timeout to allow gallery to fade in first
    setTimeout(() => {
        setInterval(() => {
            // toggle between element 0 and 1 as the active
            const prevActiveEl = bannerImageElements[bannerElementIndex]
            bannerElementIndex = (bannerElementIndex + 1) % 2;
            const nextActiveEl = bannerImageElements[bannerElementIndex];
            
            nextActiveEl.classList.add('banner_image__active');
            prevActiveEl.classList.remove('banner_image__active');
    
            // increment the image in a circular fashion
            currImageIndex = (currImageIndex + 1) % numImages;
            nextActiveEl.src = `${bannerImageDir}${bannerImages[currImageIndex]}`;
        }, 3250);
    }, 1000);
}

const advanceGallery = (galleryElement, index) => {
    console.log('Advancing gallery to position', index);
    Array.from(
        galleryElement.getElementsByClassName('project-multimedia_item')
    ).forEach((item) => {
        item.setAttribute('style', `transform: translateX(-${index * 100}%)`);
    });
};

const createPortfolioImage = (mediaItem) => {
    const img = document.createElement('img');
    img.setAttribute('src', mediaItem.src);
    return img;
}

const createPortfolioYoutubeFrame = (mediaItem) => {
    const frame = document.createElement('iframe');
    frame.setAttribute('src', mediaItem.src);
    frame.setAttribute('title', 'Embedded YouTube Player');
    frame.setAttribute('frameborder', 0);
    frame.setAttribute('allow', 'clipboard-write; encrypted-media;');
    frame.setAttribute('allowfullscreen', 'true');
    return frame;
}

const createPortfolioVideo = (mediaItem) => {
    const video = document.createElement('video');
    const src = mediaItem.src;
    const srcList = Array.isArray(src) ? src : [src];

    srcList.forEach((srcObj) => {
        const srcEl = document.createElement('source');
        srcEl.setAttribute('src', srcObj.src);
        srcEl.setAttribute('type', srcObj.mime);
        video.appendChild(srcEl);
    });

    video.appendChild(document.createTextNode('Your browser does not support video elements.'));

    return video;
}

const populateProjects = (projects) => {
    const projectMap = {};

    const allProjectsWrapper = document.getElementById('portfolio_all-projects');

    var expandedId = undefined;

    const createExpandListener = (wrapperEl) => {
        wrapperEl.addEventListener('click', (event) => {
            const targetId = event.currentTarget.id;
            const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');
            const project = projectMap[projectId];
            const targetClasses = Array.from(wrapperEl.classList);

            if (expandedId) {
                return;
            }
            expandedId = targetId;

            if (projectId && project && !targetClasses.includes('portfolio_project-wrapper__expanded')) {
                console.log(`Expanding ${projectId}`);
                event.stopPropagation();

                event.currentTarget.classList.add('portfolio_project-wrapper__expanded');

                const allDropdowns = Array.from(
                    document.getElementsByClassName('portfolio_project-expand-collapse-arrow')
                );

                allDropdowns.forEach(arrow => {
                    if (arrow.parentElement.parentElement.id == targetId) {
                        arrow.src = 'https://img.icons8.com/material/20/000000/collapse-arrow--v3.png';
                        arrow.alt = 'Collapse';
                        arrow.classList.add('portfolio_project-expand-collapse-arrow__expanded');
                    } else {
                        arrow.classList.add('portfolio_project-expand-collapse-arrow__hidden');
                    }
                });

                // TODO: consider the following -- what if instead of adding the multimedia at element creation time,
                // we just create them here on expand and destroy them after collapse (or just not create them again)? not sure
                // if that would be helpful, although would prevent loading of a ton of images at once

                projects.forEach(proj => {
                    const currentName = proj.id;
                    const currEl = document.getElementById(`portfolio_${currentName}`);
                    // set every other to hidden
                    if (currEl && currentName != projectId) {
                        currEl.classList.add('portfolio_project-wrapper__hidden');
                    }
                });
            } else {
                console.log(`Project not found with name ${projectId}`);
            }
        }, false);
    }

    const createCollapseListener = (headerEl) => {
        headerEl.addEventListener('click', (event) => {
            // grab project name from the header's parent
            const headerEl = event.currentTarget;
            const targetEl = headerEl.parentElement;
            const targetId = targetEl.id;
            const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');
            const project = projectMap[projectId];

            if (expandedId != targetId) {
                return;
            }

            const targetClasses = Array.from(targetEl.classList);

            if (projectId && project && targetClasses.includes("portfolio_project-wrapper__expanded")) {
                event.stopPropagation();
                console.log(`Collapsing ${projectId}`)
                targetEl.classList.remove('portfolio_project-wrapper__expanded');
                projects.forEach(proj => {
                    const currEl = document.getElementById(`portfolio_${proj.id}`);
                    currEl.classList.remove('portfolio_project-wrapper__hidden');
                });

                const allDropdowns = Array.from(document.getElementsByClassName('portfolio_project-expand-collapse-arrow'));
                allDropdowns.forEach(arrow => {
                    if (arrow.parentElement.parentElement.id != targetId) {
                        // remove the hidden css from the hidden arrows
                        arrow.classList.remove('portfolio_project-expand-collapse-arrow__hidden');
                    } else {
                        // swap out the collapse arrow on the collapsed header with expand arrow
                        arrow.src = 'https://img.icons8.com/material/24/000000/expand-arrow--v3.png';
                        arrow.alt = 'Collapse';
                        arrow.classList.remove('portfolio_project-expand-collapse-arrow__expanded');
                    }
                });
            }
            expandedId = undefined;
        }, false);
    }

    // creates the project element, adds it to the dom, and returns it
    const createProjectElement = (proj) => {
        const wrapper = document.createElement('div');
        wrapper.id = `portfolio_${proj.id}`;
        wrapper.classList.add('portfolio_project-wrapper');

        const header = document.createElement('h3');
        header.classList.add('portfolio_project-heading');

        const headerText = document.createElement('span');
        headerText.classList.add('portfolio_project-heading-text');
        headerText.innerText = proj.name;

        const dropdownArrow = document.createElement('img');
        // Dropdown arrow sourced from Icons8
        dropdownArrow.classList.add('portfolio_project-expand-collapse-arrow');
        dropdownArrow.src = 'https://img.icons8.com/material/24/000000/expand-arrow--v3.png';
        dropdownArrow.alt = 'Expand';
        
        header.appendChild(headerText);
        header.appendChild(dropdownArrow);

        wrapper.appendChild(header);

        if (proj.description) {
            const description = document.createElement('p');
            description.classList.add('portfolio_project-desc');
            description.innerText = proj.description;
            wrapper.appendChild(description);
        }

        if (proj.multimedia) {
            const multimediaWrapper = document.createElement('div');
            multimediaWrapper.classList.add('project-multimedia_wrapper');
            const multimediaGallery = document.createElement('span');
            multimediaGallery.classList.add('project-multimedia_gallery');

            let itemCount = 0;
            let galleryIndex = 0;

            proj.multimedia.forEach((mediaItem) => {
                const mediaType = mediaItem.type;
                let mediaEl;
                switch (mediaType) {
                    case 'image':
                        mediaEl = createPortfolioImage(mediaItem);
                        break;
                    case 'youtube':
                        mediaEl = createPortfolioYoutubeFrame(mediaItem);
                        break;
                    case 'video':
                        mediaEl = createPortfolioVideo(mediaItem);
                        break;
                    default:
                        mediaEl = undefined; // technically redundant, but I prefer to always have a default case
                        break;
                }
                if (mediaEl) {
                    mediaEl.classList.add('project-multimedia_item');
                    mediaEl.classList.add(`project-multimedia_item__${mediaType}`);
                    multimediaGallery.appendChild(mediaEl);
                    itemCount++;
                }
            });

            if (itemCount) {
                if (itemCount > 1) {
                    // only if we have several items will we add item traversal buttons
                    const prevButton = document.createElement('button');
                    prevButton.classList.add('project-multimedia_button', 'project-multimedia_button__prev');
                    prevButton.addEventListener('click', () => {
                        galleryIndex = (galleryIndex - 1 + itemCount) % itemCount;
                        advanceGallery(multimediaGallery, galleryIndex);
                    });
                    multimediaWrapper.appendChild(prevButton);
                }
                multimediaWrapper.appendChild(multimediaGallery);
                if (itemCount > 1) {
                    const nextButton = document.createElement('button');
                    nextButton.classList.add('project-multimedia_button', 'project-multimedia_button__next');
                    nextButton.addEventListener('click', () => {
                        galleryIndex = (galleryIndex + 1) % itemCount;
                        advanceGallery(multimediaGallery, galleryIndex);
                    });
                    multimediaWrapper.appendChild(nextButton);
                }
                // TODO: add support for media captions
                wrapper.appendChild(multimediaWrapper);
            }
        }

        // TODO: add relevant technologies to bottom of each project, add in from json

        // add to top-level
        allProjectsWrapper.appendChild(wrapper);
        createExpandListener(wrapper);
        createCollapseListener(header);

        return wrapper;
    }

    document.getElementById('portfolio_placeholder').remove();

    // convert projects array to key value pairs for easier lookup
    projects.forEach(proj => {
        projectMap[proj.id] = proj;
        createProjectElement(proj);
    });
}

const createResumeLineItem = (item) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('resume-line');

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('resume-line_title');

    const titleEl = document.createElement('h3');
    const companyEl = document.createElement('h4');
    const locationEl = document.createElement('h4');
    const dateEl = document.createElement('h4');

    titleEl.innerText = item.position;
    companyEl.innerText = item.company;
    locationEl.innerText = item.location;
    dateEl.innerText = item.date;

    titleWrapper.appendChild(titleEl);
    titleWrapper.appendChild(companyEl);
    titleWrapper.appendChild(locationEl);
    titleWrapper.appendChild(dateEl);

    const descWrapper = document.createElement('div');
    descWrapper.classList.add('resume-line_description');

    item.description.split('\n').forEach(line => {
        const lineEl = document.createElement('p');
        lineEl.innerText = line;
        descWrapper.appendChild(lineEl);
    })

    wrapper.appendChild(titleWrapper);
    wrapper.appendChild(descWrapper);

    return wrapper;
}

const populateInternships = (internships) => {
    const allInternshipsWrapper = document.getElementById('internships');
    internships.forEach(internship => {
        const internshipElement = createResumeLineItem(internship);
        allInternshipsWrapper.appendChild(internshipElement);
    });
    document.getElementById('resume-internship-placeholder').remove();
}

const populateWork = (jobs) => {
    const allJobsWrapper = document.getElementById('work');
    jobs.forEach(job => {
        const workElement = createResumeLineItem(job);
        allJobsWrapper.appendChild(workElement);
    });
    document.getElementById('resume-work-placeholder').remove();
}

// load projects from json file
// https://stackoverflow.com/questions/16991341/json-parse-file-path
var projectRequest = new XMLHttpRequest();
projectRequest.open("GET", "./resume-data.json", true);
projectRequest.responseType = 'json';
projectRequest.send(null);
projectRequest.onreadystatechange = () => {
	if (projectRequest.readyState === 4 && projectRequest.status === 200) {
        const data = projectRequest.response;
        console.log('Resume data loaded', data);
		populateProjects(data.projects);
		populateInternships(data.internships);
		populateWork(data.jobs);
	}
}