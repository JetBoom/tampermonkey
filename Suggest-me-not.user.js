// ==UserScript==
// @name         Suggest-me-not
// @namespace    http://average.website
// @version      1.0
// @description  Removes suggestions and recommendations on the YouTube front page for channels you aren't subscribed to.
// @author       William "JetBoom" Moodhe
// @match        https://www.youtube.com/
// @grant        none
// @run-at document-end
// ==/UserScript==
/* jshint -W097 */
//'use strict';

function removeSuggestions()
{
	var spans = document.querySelectorAll("ol.section-list span");

	// Remove ancestor li element of spans that have recommendations.
	var span;
	var par;
	for (var i=0; i < spans.length; i++)
	{
		span = spans[i];

		if (span.innerHTML == "Recommended channel for you" || span.innerHTML == "Recommended" || span.innerHTML == "Want all the latest updates? Subscribe now.")
		{
			par = span.parentElement;
			while (par != null && par.nodeName.toLowerCase() != "li")
				par = par.parentElement;

			if (par != null)
				par.style.display = "none";
		}
	}
}

// Mutation Observer to check for DOM changes to the section list.
var content = document.querySelector("ol.section-list");
if (content)
{
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			removeSuggestions();
		});
	});
	observer.observe(content, {childList: true, subtree: true});
}

// Immediately remove suggestions once.
removeSuggestions();
