//Getting the Table by ID
let pList:HTMLElement|null=document.getElementById("pList");
//Modal
let modal = document.getElementById('myModal');
//Details about pokemon
let pName=document.getElementById("pName");
let pWeight=document.getElementById("pWeight");
let pImage=document.getElementById("pImage");
let pAbilities=document.getElementById("pAbilities");

//Starting offset is 0
let offset:number=0;

//This function is able to fetch data from the PokeAPI and to display it on the HTML page
async function page() {
    //Calling the API
    const response=await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset="+offset);
    const result=await response.json();

    //Showing the list of pokemons
    let showTable:string="";
    for(const pokemon of result.results){
        let row:string=`<tr><td>${pokemon.name}</td>`;
        row+=`<td><button class='btn btn-default' onclick=details('${pokemon.url}')>Details</button></td></tr>`;
        showTable+=row;
    }
    //Updating the Table
    if(pList!=null)
        pList.innerHTML=showTable;    

}
async function details(url:string){
    //Check if the modal is not null
    if(modal!=null)
        modal.style.display = "block";
    else return;

    // Click somewhere outside the modal to close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    //Getting the details about a pokemon
    const response=await fetch(url);
    const pokemon=await response.json();
    //Setting the name
    if(pName!=null)
        pName.innerHTML=pokemon.name;
    //Setting the weight    
    if(pWeight!=null)
        pWeight.innerHTML="Weight: "+pokemon.weight;
    //Setting the image
    if(pImage!=null){
        pImage.innerHTML="";
        let image=document.createElement("img");
        image.setAttribute("id","image");
        image.setAttribute("src",pokemon.sprites.front_default);
        pImage.appendChild(image);
    }
    //Setting the abilities
    if(pAbilities!=null){
        pAbilities.innerHTML="";
        let abilities:string="<strong>Abilities:</strong><br/>";
        for(const ability of pokemon.abilities){
            abilities+=ability.ability.name+"<br/>";    
        }
        pAbilities.innerHTML=abilities;
    }

        
}
//This function gets called when the user presses the ">" button
//Offset+=20 because the next 20 pokemons should be displayed
function nextPage():void {
    offset+=20;
    page();
}
//This function gets called when the user presses the "<" button
/*

    Shortened form for if which is equivalent to the following:

    if(offset-20>=0){
        offset-=20;
    }

*/
function previousPage():void {
    offset=(offset-20>=0?offset-20:offset);
    page();
}