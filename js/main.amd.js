/*! brianCheskoWebpage v0.1.0 | (c) 2021 Brian Chesko | MIT License */
define(function () { 'use strict';

	/**
	 * Element.matches() polyfill (simple version)
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	 */
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	console.log('onload.js executed');

	const bannerWrapper = document.getElementById('banner_wrapper');
	const bannerImageElements = [
	    document.getElementById('banner_image1'), document.getElementById('banner_image2')
	];
	const bannerImageDir = './img/';
	const bannerImages = ["grad-stair-gradient.jpg", "moon.jpg", "ocean.jpg"]; // TODO: get actual images

	var expandedId = undefined;

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
	            const prevActiveEl = bannerImageElements[bannerElementIndex];
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

	const captionTimeouts = [];

	const setModalImage = (mediaItem) => {
	    const modal = document.getElementById('image-modal');
	    const modalImage = document.getElementById('image-modal_image');
	    const modalCaption = document.getElementById('image-modal_caption');

	    modal.classList.add('image-modal__visible');
	    modalImage.setAttribute('src', mediaItem.src);

	    if (modalCaption.firstChild) {
	        modalCaption.firstChild.remove();
	    }
	    
	    if (mediaItem.caption) {
	        modalCaption.appendChild(document.createTextNode(mediaItem.caption));
	    }
	};

	const getCaption = (mediaList, index) => {
	    const rawCaption = mediaList[index].caption;
	    const showIndex = mediaList.length > 1;

	    if (rawCaption || showIndex) {
	        const captionNumber = `${index + 1}/${mediaList.length}`;
	        const prefix = (rawCaption ? '(' : '') + captionNumber + (rawCaption ? ')' : '');
	        return [showIndex && prefix, rawCaption].filter(x => x).join(' ');
	    } else {
	        return undefined;
	    }
	};

	const advanceGallery = (mediaList, galleryElement, index) => {
	    console.log('Advancing gallery to position', index);
	    Array.from(
	        galleryElement.getElementsByClassName('project-multimedia_item')
	    ).forEach((item) => {
	        item.setAttribute('style', `transform: translateX(-${index * 100}%)`);
	    });

	    const captionEl = galleryElement.parentElement.getElementsByClassName('project-multimedia_caption')[0];

	    if (captionEl) {
	        captionEl.classList.remove('project-multimedia_caption__active');

	        // clear previous captions that will be spawning, in case the user spam clicks
	        captionTimeouts.forEach(id => clearTimeout(id));
	        captionTimeouts.push(
	            setTimeout(() => {
	                captionEl.innerText = getCaption(mediaList, index);
	                captionEl.classList.add('project-multimedia_caption__active');
	            }, 350) // wait a duration LONGER than the transition to 0 opacity in the CSS, so that we change when it's hidden
	        );
	    }
	};

	const createPortfolioImage = (mediaItem) => {
	    const img = document.createElement('img');
	    img.setAttribute('src', mediaItem.src);
	    img.addEventListener('click', () => setModalImage(mediaItem));
	    return img;
	};

	const createPortfolioYoutubeFrame = (mediaItem) => {
	    const frame = document.createElement('iframe');
	    frame.setAttribute('src', mediaItem.src);
	    frame.setAttribute('title', 'Embedded YouTube Player');
	    frame.setAttribute('frameborder', 0);
	    frame.setAttribute('allow', 'clipboard-write; encrypted-media;');
	    frame.setAttribute('allowfullscreen', 'true');
	    return frame;
	};

	const createPortfolioPdf = (mediaItem) => {
	    const frame = document.createElement('iframe');
	    frame.setAttribute('src', mediaItem.src);
	    return frame;
	};

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
	};

	const expandProject = (projectId) => {
	    if (expandedId && projectId != expandedId) {
	        collapseProject(expandedId);
	    }

	    console.log(`Expanding ${projectId}`);
	    expandedId = projectId;

	    const wrapperId = `portfolio_${projectId}`;
	    const projectWrapper = document.getElementById(wrapperId);

	    projectWrapper.classList.add('portfolio_project-wrapper__expanded');

	    // dynamically set the max height to what it wants to be, fixes awkward animation timing mismatch
	    // for collapse vs expand when the heights are very small
	    //
	    // TODO: the calc is a cheeky hack to fix the fact that some captions may take up more lines than the first
	    // caption loaded does, which means that the scroll height only guarantees the box will be big enough to fully
	    // fit the first caption. this pads an additional couple lines on top. a more technically correct fix
	    // would be to test all captions to see which one will be rendered with the most lines, but that would slow down
	    // loading (probably not much with a site this small, but it's still poor design and this hack works fine)
	    const contentEl = projectWrapper.getElementsByClassName('portfolio_project-content')[0];
	    contentEl.style.maxHeight = `calc(${contentEl.scrollHeight}px + 5em)`; 

	    // this should never fail unless someone messed with the DOM
	    const arrow = projectWrapper.getElementsByClassName('portfolio_project-expand-collapse-arrow')[0];
	    if (arrow) {
	        arrow.src = 'https://img.icons8.com/material/20/000000/collapse-arrow--v3.png';
	        arrow.alt = 'Collapse';
	        arrow.classList.add('portfolio_project-expand-collapse-arrow__expanded');
	    }

	    // TODO: consider the following -- what if instead of adding the multimedia at element creation time,
	    // we just create them here on expand and destroy them after collapse (or just not create them again)? not sure
	    // if that would be helpful, although would prevent loading of a ton of images at once
	};

	const collapseProject = (projectId) => {
	    if (expandedId != projectId) {
	        return;
	    }

	    console.log(`Collapsing ${projectId}`);
	    expandedId = undefined;

	    const wrapperId = `portfolio_${projectId}`;
	    const projectWrapper = document.getElementById(wrapperId);

	    projectWrapper.classList.remove('portfolio_project-wrapper__expanded');

	    // dynamically set the max height to what it wants to be, fixes awkward animation timing mismatch
	    // for collapse vs expand when the heights are very small
	    const contentEl = projectWrapper.getElementsByClassName('portfolio_project-content')[0];
	    contentEl.style.removeProperty('max-height');

	    // swap out the expand arrow with a collapse one
	    const arrow = projectWrapper.getElementsByClassName('portfolio_project-expand-collapse-arrow')[0];
	    if (arrow) {
	        arrow.src = 'https://img.icons8.com/material/24/000000/expand-arrow--v3.png';
	        arrow.alt = 'Expand';
	        arrow.classList.remove('portfolio_project-expand-collapse-arrow__expanded');
	    }
	};

	const populateProjects = (projects, skillGroups) => {
	    const projectMap = {};
	    const skillGroupSets = {};

	    const allProjectsWrapper = document.getElementById('portfolio_all-projects');

	    const getSkillGroupNames = (element) => {
	        const groups = [];
	        for (let [groupName, set] of Object.entries(skillGroupSets)) {
	            if (set.has(element)) {
	                groups.push(groupName);
	            }
	        }
	        return groups;
	    };

	    const createExpandListener = (wrapperEl) => {
	        wrapperEl.addEventListener('click', (event) => {
	            const targetId = event.currentTarget.id;
	            const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');
	            const project = projectMap[projectId];

	            if (projectId && project && expandedId != projectId) {
	                event.stopPropagation();
	                expandProject(projectId);
	            }
	        }, false);
	    };

	    const createCollapseListener = (headerEl) => {
	        headerEl.addEventListener('click', (event) => {
	            // grab project name from the header's parent
	            const headerEl = event.currentTarget;
	            const targetId = headerEl.parentElement.id;
	            const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');

	            if (expandedId == projectId) {
	                event.stopPropagation();
	                collapseProject(projectId);
	            }
	        }, false);
	    };

	    const createSkillSpans = (proj, wrapperEl) => {
	        const skillWrapper = document.createElement('div');
	        skillWrapper.className = 'portfolio_project-skills-wrapper';
	        
	        const allSkills = proj.skills || [];

	        allSkills.forEach(skill => {
	            const relevantGroupNames = getSkillGroupNames(skill.toLowerCase());
	            const relevantGroups = relevantGroupNames.map(groupName => skillGroups[groupName]);

	            const span = document.createElement('span');
	            span.className = 'skills_item';
	            span.appendChild(document.createTextNode(skill));

	            if (relevantGroups.length) {
	                if (relevantGroups.length > 1) {
	                    const pct = 100 / relevantGroups.length;
	                    
	                    // the reducer turns each color into two strings, the first specifying the css for the color and start
	                    // position, the second specifying the color and end position. this creates hard edge lines so that
	                    // the gradient doesn't blend at all, but has distinct sections
	                    const colorString = relevantGroups.map(group => group.color).reduce((accumulator, color, index) => {
	                        accumulator.push(`${color} ${pct*index}%`, `${color} ${pct*(index+1)}%`);
	                        return accumulator;
	                    }, []);

	                    span.style = `background: linear-gradient(135deg, ${colorString})`;
	                } else {
	                    span.style = `background-color: ${relevantGroups[0].color}`;
	                }
	            }

	            skillWrapper.append(span);
	        });

	        wrapperEl.appendChild(skillWrapper);

	        return skillWrapper;
	    };

	    // creates the project element, adds it to the dom, and returns it
	    const createProjectElement = (proj) => {
	        const wrapper = document.createElement('div');
	        wrapper.id = `portfolio_${proj.id}`;
	        wrapper.classList.add('portfolio_project-wrapper');

	        const header = document.createElement('h3');
	        header.classList.add('portfolio_project-heading');

	        const contentWrapper = document.createElement('div');
	        contentWrapper.className = 'portfolio_project-content';

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
	            contentWrapper.appendChild(description);
	        }

	        if (proj.skills) {
	            createSkillSpans(proj, contentWrapper);
	        }

	        if (proj.multimedia) {
	            const multimediaWrapper = document.createElement('div');
	            multimediaWrapper.classList.add('project-multimedia_wrapper');
	            const multimediaGallery = document.createElement('span');
	            multimediaGallery.classList.add('project-multimedia_gallery');

	            let galleryIndex = 0;
	            let captionCount = 0;
	            let addedMedia = [];

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
	                    case 'pdf':
	                        mediaEl = createPortfolioPdf(mediaItem);
	                        break;
	                    default:
	                        mediaEl = undefined; // technically redundant, but I prefer to always have a default case
	                        break;
	                }

	                if (mediaEl) {
	                    mediaEl.classList.add('project-multimedia_item');
	                    mediaEl.classList.add(`project-multimedia_item__${mediaType}`);
	                    multimediaGallery.appendChild(mediaEl);
	                    addedMedia.push(mediaItem);

	                    if (mediaItem.caption) {
	                        captionCount++;
	                    }
	                }
	            });

	            const itemCount = addedMedia.length;

	            if (itemCount) {
	                if (itemCount > 1) {
	                    // only if we have several items will we add item traversal buttons
	                    const prevButton = document.createElement('button');
	                    const nextButton = document.createElement('button');
	                    prevButton.classList.add('project-multimedia_button', 'project-multimedia_button__prev');
	                    nextButton.classList.add('project-multimedia_button', 'project-multimedia_button__next');
	                    prevButton.addEventListener('click', () => {
	                        galleryIndex = (galleryIndex - 1 + itemCount) % itemCount;
	                        advanceGallery(addedMedia, multimediaGallery, galleryIndex);
	                    });
	                    nextButton.addEventListener('click', () => {
	                        galleryIndex = (galleryIndex + 1) % itemCount;
	                        advanceGallery(addedMedia, multimediaGallery, galleryIndex);
	                    });
	                    multimediaWrapper.appendChild(prevButton);
	                    multimediaWrapper.appendChild(nextButton);
	                }
	                
	                multimediaWrapper.appendChild(multimediaGallery);

	                // don't bother with a caption element if we'll never see one, but if we can, add one
	                if (captionCount > 0) {
	                    const caption = document.createElement('span');
	                    caption.classList.add('project-multimedia_caption');
	                    const captionText = getCaption(addedMedia, 0);
	                    if (captionText) {
	                        caption.classList.add('project-multimedia_caption__active');
	                        caption.innerText = captionText;
	                    }
	                    multimediaWrapper.appendChild(caption);
	                }

	                contentWrapper.appendChild(multimediaWrapper);
	            }
	        }
	        wrapper.appendChild(contentWrapper);

	        // add to top-level
	        allProjectsWrapper.appendChild(wrapper);

	        createExpandListener(wrapper);
	        createCollapseListener(header);

	        return wrapper;
	    };

	    document.getElementById('portfolio_placeholder').remove();

	    // converts the JSON object with list children into a name:set map
	    Object.entries(skillGroups).forEach(([groupName, value]) => {
	        skillGroupSets[groupName] = new Set(value.items);
	    });

	    // convert projects array to key value pairs for easier lookup
	    projects.forEach(proj => {
	        projectMap[proj.id] = proj;
	        createProjectElement(proj);
	    });
	};

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
	    });

	    wrapper.appendChild(titleWrapper);
	    wrapper.appendChild(descWrapper);

	    return wrapper;
	};

	const populateInternships = (internships) => {
	    const allInternshipsWrapper = document.getElementById('internships');
	    internships.forEach(internship => {
	        const internshipElement = createResumeLineItem(internship);
	        allInternshipsWrapper.appendChild(internshipElement);
	    });
	    document.getElementById('resume-internship-placeholder').remove();
	};

	const populateWork = (jobs) => {
	    const allJobsWrapper = document.getElementById('work');
	    jobs.forEach(job => {
	        const workElement = createResumeLineItem(job);
	        allJobsWrapper.appendChild(workElement);
	    });
	    document.getElementById('resume-work-placeholder').remove();
	};

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
			populateProjects(data.projects, data.skills);
			populateInternships(data.internships);
			populateWork(data.jobs);
		}
	};

	// add visibility toggle to show coursework
	const toggleCoursework = () => {
		const button = document.getElementById('coursework_show-btn');
		const list = document.getElementById('coursework_list');
		if (button.classList.contains('visible')) {
			button.innerText = 'show';
		} else {
			button.innerText = 'hide';
		}
		button.classList.toggle('visible');
		list.classList.toggle('visible');
	};

	const closeModal = (event) => {
		if (event.target != event.currentTarget) {
			return; // only process if we clicked EXACTLY the x or clickthrough, nothing on the modal
		}
		const modal = document.getElementById('image-modal');
		modal.classList.remove('image-modal__visible');
	};

	document.getElementById('coursework_show-btn').addEventListener('click', toggleCoursework, false);
	document.getElementById('image-modal').addEventListener('click', closeModal, false);
	document.getElementById('image-modal_close-button').addEventListener('click', closeModal);

});
