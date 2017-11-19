"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Getting the Table by ID
let pList = document.getElementById("pList");
let pName = document.getElementById("pName");
let pWeight = document.getElementById("weight");
let pic = document.getElementById("pic");
let abilities = document.getElementById("abilities");
let btn = document.getElementById("btn");
//Starting offset is 0
let offset = 0;
//This function is able to fetch data from the PokeAPI and to display it on the HTML page
function page() {
    return __awaiter(this, void 0, void 0, function* () {
        //Calling the API
        const response = yield fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset);
        const result = yield response.json();
        let showTable = "";
        for (const pokemon of result.results) {
            let row = `<tr><td>${pokemon.name}</td>`;
            row += `<td><button class='btn btn-default' onclick=details('${pokemon.url}')>Details</button></td></tr>`;
            showTable += row;
        }
        //Updating the Table
        if (pList != null)
            pList.innerHTML = showTable;
    });
}
function details(url) {
    return __awaiter(this, void 0, void 0, function* () {
        //Getting the details about a pokemon
        const response = yield fetch(url);
        const pokemon = yield response.json();
        window.open("detail.html", "_self");
        if (pName != null)
            pName.innerHTML = pokemon.name;
    });
}
//This function gets called when the user presses the ">" button
//Offset+=20 because the next 20 pokemons should be displayed
function nextPage() {
    offset += 20;
    page();
}
//This function gets called when the user presses the "<" button
/*

    Shortened form for if which is equivalent to the following:

    if(offset-20>=0){
        offset-=20;
    }

*/
function previousPage() {
    offset = (offset - 20 >= 0 ? offset - 20 : offset);
    page();
}
