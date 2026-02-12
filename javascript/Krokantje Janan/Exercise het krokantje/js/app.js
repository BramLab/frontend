// ===== DATA (JSON) =====
//Dit is jouw “database” in JavaScript: een lijst met gerechten.
//Deze data gebruik je om:
//de gang-select te vullen
//de keuze-lijst te vullen
//de detailkaart te tonen (foto, naam, prijs, beschrijving)
//de bestellingen bij te houden
const MENU = [
  {
    id: "sprinkhaan",
    naam: "Sprinkhaan",
    gang: "Voorgerechten",
    prijs: 5.99,
    img: "img/sprinkhan.png",
    beschrijving: "Krokante sprinkhaan op een bedje van kakkerlak"
  },
  {
    id: "tandoori",
    naam: "Tandoori Burger",
    gang: "Voorgerechten",
    prijs: 4.99,
    img: "img/tandoori.png",
    beschrijving: "Burger op basis van Tandoori, een snelle hap als hongerstillertje"
  },
  {
    id: "cupcake",
    naam: "Cupcake",
    gang: "Voorgerechten",
    prijs: 2.99,
    img: "img/cupcake.jpg",
    beschrijving: "Eetbare Cupcake, met wormpjes"
  },
  {
    id: "lolly",
    naam: "Lolly",
    gang: "Desserts",
    prijs: 2.99,
    img: "img/lolly.jpg",
    beschrijving: "Een lolly met inhoud, een vleugje nostalgie"
  },
  {
    id: "ijsje",
    naam: "Ijsje",
    gang: "Desserts",
    prijs: 1.99,
    img: "img/ijsje.jpg",
    beschrijving: "Verfrissend ijsje met verrassende topping"
  }
];

// ===== DOM =====  elementen ophalen uit HTML
const gangSel  = document.getElementById("gangSel");
const keuzeSel = document.getElementById("keuzeSel");
const imgEl    = document.getElementById("dishImg");
const nameEl   = document.getElementById("dishName");
const priceEl  = document.getElementById("dishPrice");
const descEl   = document.getElementById("dishDesc");
const aantalEl = document.getElementById("aantal");
const bestelBtn= document.getElementById("btnBestel");
const lijstEl  = document.getElementById("bestellingen");
const totaalEl = document.getElementById("totaal");

// ===== STATE =====
const cart = new Map(); // id -> {item, qty}

// ===== HELPERS =====
const euro = n => n.toLocaleString("nl-BE", {style:"currency", currency:"EUR"});

function uniekeGangen(){
  return [...new Set(MENU.map(m => m.gang))];
}
function byGang(g){ return MENU.filter(m => m.gang === g); }
function byId(id){ return MENU.find(m => m.id === id); }

function fillGang(){
  gangSel.innerHTML = uniekeGangen().map(g => `<option value="${g}">${g}</option>`).join("");
}
function fillKeuze(gang){
  const items = byGang(gang);
  keuzeSel.innerHTML = items.map(m => `<option value="${m.id}">${m.naam}</option>`).join("");
  if(items.length) showDetail(items[0].id);
}
function showDetail(id){
  const it = byId(id);
  if(!it) return;
  imgEl.src = it.img; imgEl.alt = it.naam;
  nameEl.textContent = it.naam;
  priceEl.textContent = euro(it.prijs);
  descEl.textContent = it.beschrijving;
  keuzeSel.value = it.id;
}

function renderCart(){
  lijstEl.innerHTML = "";
  let totaal = 0;

  if(cart.size === 0){
    lijstEl.innerHTML = `<p class="notice">Nog geen bestellingen.</p>`;
  } else {
    cart.forEach(({item, qty}) => {
      totaal += item.prijs * qty;
      const div = document.createElement("div");
      div.className = "order-line";
      div.textContent = `${item.gang} : ${item.naam}, Prijs: ${item.prijs.toFixed(2)}, Aantal Besteld : ${qty}`;
      lijstEl.appendChild(div);
    });
  }
  totaalEl.textContent = euro(totaal);
}

function bestel(){
  const id = keuzeSel.value;
  const it = byId(id);
  const qty = Number(aantalEl.value);

  if(Number.isNaN(qty) || !Number.isInteger(qty) || qty < 0){
    alert("Geef een geldig aantal (0 of meer, enkel hele getallen).");
    return;
  }
  if(qty === 0){
    // 0 = verwijderen indien aanwezig
    cart.delete(id);
  } else {
    cart.set(id, {item: it, qty});
  }
  renderCart();
  // (optioneel) reset aantal terug naar 0
  // aantalEl.value = 0;
}

// ===== EVENTS =====
gangSel.addEventListener("change", e => fillKeuze(e.target.value));
keuzeSel.addEventListener("change", e => showDetail(e.target.value));
bestelBtn.addEventListener("click", bestel);

// ===== INIT =====
fillGang();
fillKeuze(gangSel.value || "Voorgerechten"); // start: Voorgerechten + eerste item
aantalEl.value = 0;
renderCart();
