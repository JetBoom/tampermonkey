// ==UserScript==
// @name         SteamDB Bad Game Remover
// @namespace    http://average.website
// @version      1.0
// @description  Remove games on SteamDB that have less than a certain rating.
// @author       William "JetBoom" Moodhe
// @match        https://steamdb.info/sales/
// @grant        none
// @run-at       document-end
// ==/UserScript==
/* jshint -W097 */
'use strict';

//////////////

// What rating does the game need to show up on the list?
var min_rating = 80;

//////////////

var ratings = document.querySelectorAll("table.table-sales td:nth-child(7) > span");
var removed = 0;

var td;
var inner;
var rating;
var i;
for (i=0; i < ratings.length; i++)
{
	td = ratings[i];
	inner = td.innerHTML;
	
	if (inner.substr(-1) == "%")
	{
		rating = Number(inner.substr(0, inner.length - 1));
		if (rating < min_rating)
		{
			td.parentElement.parentElement.style.display = "none";
			removed++;
		}
	}
}

console.log("Removed " + removed + " bad games.");
