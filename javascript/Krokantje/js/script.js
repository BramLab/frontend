var jsonData = {};
var bestellingList = [];
init();

async function init(){
    await loadJson();
    populateGangenAndKeuze();
}

async function loadJson() {
    const response = await fetch("json/menus.json");
    jsonData = await response.json();
}

function populateGangenAndKeuze(){
    const gangenSelect = document.getElementById("gangenSelect");
    const gangenKeys = Object.keys(jsonData);
    gangenSelect.innerHTML = gangenKeys.map(
            gangKey => "<option value=\"" + gangKey + "\">" + gangKey + "</option>"
        ).join("");

    populateKeuzeSelect(gangenKeys[0]);
}

function populateKeuzeSelect(gang) {							
    const keuzeSelect = document.getElementById("keuzeSelect");
    const keuzeList = jsonData[gang];
    
    keuzeSelect.innerHTML = keuzeList.map(
        keuze => "<option value=\"" + keuze.Naam + "\">" + keuze.Naam + "</option>"
    ).join("");

    displayKeuze(gang, keuzeList[0].Naam);
}

function displayKeuze(gang, keuze) {
    const keuzeObject = jsonData[gang].find(menu => menu.Naam === keuze);
    if (keuzeObject) {
        document.getElementById("naamSpan").textContent = keuzeObject.Naam;
        document.getElementById("beschrijvingSpan").textContent = keuzeObject.Beschrijving;
        document.getElementById("prijsSpan").textContent = keuzeObject.Prijs.toFixed(2);
        document.getElementById("fotoImg").src = "img/" + keuzeObject.img;
    }
}

document.getElementById("gangenSelect").addEventListener("change", function() {
    populateKeuzeSelect(this.value);
});

document.getElementById("keuzeSelect").addEventListener("change", function() {
    const gangenSelect_value = document.getElementById("gangenSelect").value;
    displayKeuze(gangenSelect_value, this.value);
});

document.getElementById("bestelButton").addEventListener("click", function() {
    const gangKey = document.getElementById("gangenSelect").value;
    const keuzeNaam = document.getElementById("keuzeSelect").value;
    const aantalInt = document.getElementById("aantalInput").value;
    changeBestelling(gangKey, keuzeNaam, aantalInt);
});

function changeBestelling(gangKey, keuzeNaam, aantalInt){
    /* gather data into object */
    const keuzeObject = jsonData[gangKey].find(menu => menu.Naam === keuzeNaam);
    const bestellingObject = {
        gang:       gangKey,
        menuNaam:   keuzeNaam,
        menuBeschrijving: keuzeObject.Beschrijving,
        prijs:      keuzeObject.Prijs,
        aantal:     aantalInt
    };
    
    /* Do we update/delete/insert? */
    var doesBestellingExist = false;
    for (let i=0; i < bestellingList.length; i++){
        if (bestellingList[i].gang === bestellingObject.gang && bestellingList[i].menuNaam === bestellingObject.menuNaam ){
            doesBestellingExist = true;
            if(bestellingObject.aantal >= 1){
                bestellingList[i] = bestellingObject;
            }
            else {
                bestellingList.splice(i,1);
            };
            break;
        }
    }
    if(doesBestellingExist === false && bestellingObject.aantal >= 1){
        bestellingList[bestellingList.length] = bestellingObject;
    };

    /* calculate totalSum to pay */
    var totalSum = 0;
    for (let i=0; i < bestellingList.length; i++){
        totalSum += (bestellingList[i].prijs * bestellingList[i].aantal);
        // console.log(totalSum + ", " + bestellingList[i].prijs + ", " + bestellingList[i].aantal);
    }
   
    /* display data */
    const bestellingListSection = document.getElementById("bestellingListSection");
    var bestellingLines = bestellingList.map(
        bestelling => "<button class=\"bestellingLine\">" + bestelling.gang + "<br />" 
        + (bestelling.menuNaam) + ": " + (bestelling.menuBeschrijving) + ", prijs: €" + bestelling.prijs + ", aantal: " + bestelling.aantal + "</button>"
    ).join("");
    var totalSumLine = "<button class=\"bestellingLine totalSum\">Totaal prijs = €" + totalSum.toFixed(2); + "</button>"

    bestellingListSection.innerHTML = bestellingLines + totalSumLine;
}
