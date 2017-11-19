//Getting the Table by ID
let pList:HTMLElement|null=document.getElementById("pList");
let pName:HTMLElement|null=document.getElementById("pName");
let pWeight:HTMLElement|null=document.getElementById("weight");
let pic:HTMLElement|null=document.getElementById("pic");
let abilities:HTMLElement|null=document.getElementById("abilities");
let btn:HTMLElement|null=document.getElementById("btn");

//Starting offset is 0
let offset:number=0;

//This function is able to fetch data from the PokeAPI and to display it on the HTML page
async function page() {
    //Calling the API
    const response=await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset="+offset);
    const result=await response.json();

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
    //Getting the details about a pokemon
    const response=await fetch(url);
    const pokemon=await response.json();
    window.open("detail.html","_self");
    if(pName!=null)
        pName.innerHTML=pokemon.name;
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