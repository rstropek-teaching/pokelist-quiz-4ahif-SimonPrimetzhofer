//Starting offset is 0
let offset: number = 0;

//This function is able to fetch data from the PokeAPI and to display it on the HTML page
async function page() {
    //Getting the Table by ID
    let pList: HTMLElement | null = document.getElementById("pList");
    //Calling the API
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset);
    const result = await response.json();

    //Showing the list of pokemons
    let showTable: string = "";
    for (const pokemon of result.results) {
        let row: string = `<tr><td>${pokemon.name}</td>`;
        row += `<td><button class='btn btn-default' onclick=details('${pokemon.url}')>Details</button></td></tr>`;
        showTable += row;
    }
    //Updating the Table
    if (pList != null)
        pList.innerHTML = showTable;

}
//This function shows the details about a pokemon
async function details(url: string) {
    //Modal
    let modal: HTMLElement | null = document.getElementById('myModal');
    //Details about pokemon
    let pName: HTMLElement | null = document.getElementById("pName");
    let pWeight: HTMLElement | null = document.getElementById("pWeight");
    let pImage: HTMLElement | null = document.getElementById("pImage");
    let pAbilities: HTMLElement | null = document.getElementById("pAbilities");
    //Check if the modal is not null
    if (modal != null)
        modal.style.display = "block";
    else return;

    // Click somewhere outside the modal to close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    //Getting the details about a pokemon
    const response = await fetch(url);
    const pokemon = await response.json();
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
        let abilities: string = "<strong>Abilities:</strong><br/>";
        for (const ability of pokemon.abilities) {
            abilities += ability.ability.name + "<br/>";
        }
        pAbilities.innerHTML = abilities;
    }
}
//Operator 1 or -1 is valid
function changePage(operator: number): void {
    if (operator == 1 || operator == -1) {
        if (offset + (operator * 20) >= 0 || offset + (operator * 20) <= 949)
            offset += operator * 20;
        page();
    }
}