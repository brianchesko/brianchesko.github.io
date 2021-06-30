document.getElementById('coursework_show-btn').addEventListener('click', () => {
	const button = document.getElementById('coursework_show-btn');
	const list = document.getElementById('coursework_list');
	if (button.classList.contains('visible')) {
		button.innerText = 'show';
	} else {
		button.innerText = 'hide';
	}
	button.classList.toggle('visible');
	list.classList.toggle('visible');
}, false);

// https://stackoverflow.com/questions/16991341/json-parse-file-path
var projectRequest = new XMLHttpRequest();
projectRequest.open("GET", "./projects.json", true);
projectRequest.responseType = 'json';
projectRequest.send(null);
projectRequest.onreadystatechange = () => {
	if (projectRequest.readyState === 4 && projectRequest.status === 200) {
		const responseArray = projectRequest.response.projects;
		const projects = {};

		console.log('Loaded projects', responseArray);

		const allProjectsWrapper = document.getElementById('portfolio_all-projects');

		const createExpandListener = (wrapperEl) => {
			wrapperEl.addEventListener('click', (event) => {
				const targetId = event.currentTarget.id;
				const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');
				const project = projects[projectId];
				const targetClasses = Array.from(wrapperEl.classList);

				if (projectId && project && !targetClasses.includes('portfolio_project-wrapper__expanded')) {
					console.log(`Expanding ${projectId}`);
					event.stopPropagation();
					// fill in the name, description etc from json
					// fillerProject.classList.toggle('visible');
					// fillerHeading.innerText = project.name;
					event.currentTarget.classList.add('portfolio_project-wrapper__expanded');

					responseArray.forEach(proj => {
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

				// TODO: big brain move. instead of doing some funny shit deciding which is 
				// being shown/expanded and not, we have a second element that is actually storing the
				// expanded object. that way, we can always just set its title/description/images
				// from a static csv or json file instead of duplicating a ton of html elements.
				// then just hot swap the individual project headers with the big boy element,
				// which will initially have everything but the header row display: none or size 0,
				// then change those
			}, false);
		}

		const createCollapseListener = (headerEl) => {
			headerEl.addEventListener('click', (event) => {
				// grab project name from the header's parent
				const targetEl = event.currentTarget.parentElement;
				const targetId = targetEl.id;
				const projectId = targetId.includes('portfolio_') && targetId.replace('portfolio_', '');
				const project = projects[projectId];

				const targetClasses = Array.from(targetEl.classList);

				if (projectId && project && targetClasses.includes("portfolio_project-wrapper__expanded")) {
					event.stopPropagation();
					console.log(`Collapsing ${projectId}`)
					targetEl.classList.remove('portfolio_project-wrapper__expanded');
					responseArray.forEach(proj => {
						const currEl = document.getElementById(`portfolio_${proj.id}`);
						currEl.classList.remove('portfolio_project-wrapper__hidden');
					});
				}
			}, false);
		}

		// creates the project element, adds it to the dom, and returns it
		const createProjectElement = (proj) => {
			const wrapper = document.createElement('div');
			wrapper.id = `portfolio_${proj.id}`;
			wrapper.classList.add('portfolio_project-wrapper');

			const header = document.createElement('h2');
			header.classList.add('portfolio_project-heading');
			header.innerText = proj.name;
			wrapper.appendChild(header);

			if (proj.description) {
				const description = document.createElement('p');
				description.classList.add('portfolio_project-desc');
				description.innerText = proj.description;
				wrapper.appendChild(description);
				// TODO: handle line breaks
			}

			/*
			if (proj.multimedia) {
				const multimedia = document.createElement('p');
				multimedia.classList.add('portfolio_project-multimedia');
				// TODO... a lot. figure out how to include images, gallery, links, demos? etc
				wrapper.appendChild(multimedia);
			}
			*/

			// TODO: add collapse/expand arrow at top right

			// add to top-level
			allProjectsWrapper.appendChild(wrapper);
			createExpandListener(wrapper);
			createCollapseListener(header);

			return wrapper;
		}

		document.getElementById('portfolio_placeholder').remove();

		// convert projects array to key value pairs for easier lookup
		responseArray.forEach(proj => {
			projects[proj.id] = proj;
			createProjectElement(proj);
		});
	}
}


