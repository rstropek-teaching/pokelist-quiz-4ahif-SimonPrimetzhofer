"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Starting offset is 0
let offset = 0;
//This function is able to fetch data from the PokeAPI and to display it on the HTML page
function page() {
    return __awaiter(this, void 0, void 0, function* () {
        //Getting the Table by ID
        let pList = document.getElementById("pList");
        //Calling the API
        const response = yield fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset);
        const result = yield response.json();
        //Showing the list of pokemons
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
//This function shows the details about a pokemon
function details(url) {
    return __awaiter(this, void 0, void 0, function* () {
        //Modal
        let modal = document.getElementById('myModal');
        //Details about pokemon
        let pName = document.getElementById("pName");
        let pWeight = document.getElementById("pWeight");
        let pImage = document.getElementById("pImage");
        let pAbilities = document.getElementById("pAbilities");
        //Check if the modal is not null
        if (modal != null)
            modal.style.display = "block";
        else
            return;
        // Click somewhere outside the modal to close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        //Getting the details about a pokemon
        const response = yield fetch(url);
        const pokemon = yield response.json();
        //Setting the name
        if (pName != null)
            pName.innerHTML = pokemon.name;
        //Setting the weight    
        if (pWeight != null)
            pWeight.innerHTML = "Weight: " + pokemon.weight;
        //Setting the image
        if (pImage != null) {
            pImage.innerHTML = "";
            let image = document.createElement("img");
            image.setAttribute("id", "image");
            image.setAttribute("src", pokemon.sprites.front_default);
            pImage.appendChild(image);
        }
        //Setting the abilities
        if (pAbilities != null) {
            pAbilities.innerHTML = "";
            let abilities = "<strong>Abilities:</strong><br/>";
            for (const ability of pokemon.abilities) {
                abilities += ability.ability.name + "<br/>";
            }
            pAbilities.innerHTML = abilities;
        }
    });
}
//Operator 1 or -1 is valid
function changePage(operator) {
    if (operator == 1 || operator == -1) {
        if (offset + (operator * 20) >= 0 || offset + (operator * 20) <= 949)
            offset += operator * 20;
        page();
    }
}
