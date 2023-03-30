window.onload = renderBackgroundImage();

const urlInput = GetById("url");
const id = GetById("id");
const campaign = GetById("campaign");
const content = GetById("content");
const term = GetById("term");
const medium = GetById("medium");
const source = GetById("source");
const homeIcon = GetById("home-icon");
const finalUrl = GetById("final-url");
const finalBtn = GetById("final-btn");
const forms = document.getElementsByTagName("form");
const myForms = [...forms];

myForms.forEach((element) => {
	element.addEventListener("click", function (event) {
		event.preventDefault();
	});
});

let parameters = [source, medium, id, campaign, content, term];
let finalUrlString = "";

// Tooltips
var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Event Listeners
urlInput.addEventListener("input", main);
id.addEventListener("input", main);
campaign.addEventListener("input", main);
content.addEventListener("input", main);
term.addEventListener("input", main);
medium.addEventListener("input", main);
source.addEventListener("input", main);

// Home Icon Event Listener
homeIcon.addEventListener("click", function () {
	urlInput.value = "https://www.google.com";
	main();
});

// Clear All Event Listener
let clearDetailsBtn = document.getElementById("clear-details-btn");
clearDetailsBtn.addEventListener("click", clearParameters);

// Clear Url Input
let clearUrlBtn = document.getElementById("clear-url-btn");
clearUrlBtn.addEventListener("click", function () {
	urlInput.value = "";
	main();
});

// Main Function
function main() {
	let url = urlInput.value;

	finalString();

	if (url != "") {
		clearRequired();
		let requiredParameters = [medium, source, campaign];
		for (let i = 0; i < requiredParameters.length; i++) {
			let element = requiredParameters[i];
			if (element.value == "") {
				required(element);
			} else {
				element.style.backgroundColor = "";
				element.style.borderColor = "";
			}
		}

		final(url);
	} else {
		clearRequired();
		finalUrl.value = "";
	}
}

// Required Tracking Parameters Highlighting
function required(element) {
	element.placeholder = "Required";
	element.style.borderColor = "red";
	element.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
}

// Clear Required
function clearRequired() {
	let elements = [campaign, source, medium];
	for (let i = 0; i < elements.length; i++) {
		elements[i].placeholder = "";
		elements[i].style.borderColor = "";
		elements[i].style.backgroundColor = "";
	}
}

// Clear All Tracking Parameters
function clearParameters() {
	for (let i = 0; i < parameters.length; i++) {
		parameters[i].value = "";
	}
	main();
}

function finalString() {
	finalUrlString = "";
	for (let i = 0; i < parameters.length; i++) {
		let element = parameters[i];
		if (element.value != "") {
			addToFinalUrlString(element);
		}
	}
}

function addToFinalUrlString(element) {
	let elementValue = replaceSpaces(element.value);
	if (finalUrlString == "") {
		finalUrlString += `utm_${element.id}=${elementValue}`;
	} else {
		finalUrlString += `&utm_${element.id}=${elementValue}`;
	}
}

function final(url) {
	// Removes the first '&' from the finalUrlString so it can be used as a set of UTM tracking parameters
	let finalUrlFixed = finalUrlString.substring(1);
	if (finalUrlFixed.length > 0) {
		finalUrlFixed = `?${finalUrlFixed}`;
	}
	finalUrl.value = url + finalUrlFixed;
}

// Copy Final URL to clipboard
finalBtn.addEventListener("click", function () {
	copyToClipboard(finalBtn, finalUrl);
});

// Copies Final URL to clipboard
function copyToClipboard(btn, element) {
	let copyText = element;

	copyText.select();
	copyText.setSelectionRange(0, 99999);

	navigator.clipboard.writeText(copyText.value);

	btn.className = "btn btn-outline-success ms-2 fw-bold";

	btn.innerHTML = "Copied!";
	setTimeout(function () {
		btn.innerHTML = "Copy";
		btn.className = "btn btn-outline-primary ms-2 fw-bold";
	}, 1500);
}

// Utilities Functions
https: function replaceSpaces(s) {
	return s.replaceAll(" ", "%20");
}

function GetById(name) {
	return document.getElementById(name);
}

function renderBackgroundImage() {
	fetch(
		`https://source.unsplash.com/${screen.width}x${screen.height}/?nature`
	).then((response) => {
		console.log(response);
		document.body.style.backgroundImage = `url("${response.url}")`;
	});
}
