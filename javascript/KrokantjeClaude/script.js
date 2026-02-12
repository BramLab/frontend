// Global variables
var jsonData = {};
var bestellingen = [];

// Load menu data when page loads
async function loadMenu() {
    try {
        const response = await fetch('menus.json');
        jsonData = await response.json();
        
        // Get categories (gangen) & fill select element
        const gangenSelect = document.getElementById('gangen');
        const categories = Object.keys(jsonData);
        gangenSelect.innerHTML = categories.map(
            gang => `<option value="${gang}">${gang}</option>`
        ).join('');
        
        // Populate keuze dropdown with first category's items
        if (categories.length > 0) {
            populateKeuzeSelect(categories[0]);
            // Display first dish of first category
            displayDish(categories[0], jsonData[categories[0]][0].Naam);
        }
    } catch (error) {
        console.error('Error loading menu:', error);
        alert('Er is een fout opgetreden bij het laden van het menu.');
    }
}

// Populate the keuze (choice) dropdown based on selected category
function populateKeuzeSelect(category) {
    const keuzeSelect = document.getElementById('keuze');
    const items = jsonData[category];
    
    keuzeSelect.innerHTML = items.map(
        item => `<option value="${item.Naam}">${item.Naam}</option>`
    ).join('');
}

// Display dish information
function displayDish(category, dishName) {
    const dish = jsonData[category].find(item => item.Naam === dishName);
    
    if (dish) {
        document.getElementById('dishName').textContent = dish.Naam;
        document.getElementById('dishDescription').textContent = dish.Beschrijving;
        document.getElementById('dishPrice').textContent = dish.Prijs.toFixed(2);
        
        // Set image or placeholder
        const dishImage = document.getElementById('dishImage');
        if (dish.Afbeelding) {
            dishImage.src = `images/${dish.Afbeelding}`;
            dishImage.alt = dish.Naam;
        } else {
            dishImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e9ecef" width="200" height="200"/%3E%3Ctext fill="%23999" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EGeen afbeelding%3C/text%3E%3C/svg%3E';
            dishImage.alt = 'Geen afbeelding beschikbaar';
        }
    }
}

// Update orders display
function updateBestellingenDisplay() {
    const bestellingenLijst = document.getElementById('bestellingenLijst');
    
    if (bestellingen.length === 0) {
        bestellingenLijst.innerHTML = '<p class="empty-orders">Nog geen bestellingen</p>';
    } else {
        bestellingenLijst.innerHTML = bestellingen.map((bestelling, index) => `
            <div class="order-item" data-index="${index}">
                <div class="order-item-info">
                    <div class="order-item-name">${bestelling.naam}</div>
                    <div class="order-item-details">${bestelling.aantal} ${bestelling.aantal === 1 ? 'persoon' : 'personen'}</div>
                </div>
                <div class="order-item-price">€${bestelling.totaalPrijs.toFixed(2)}</div>
            </div>
        `).join('');
    }
    
    updateTotaalPrijs();
}

// Update total price
function updateTotaalPrijs() {
    const totaal = bestellingen.reduce((sum, bestelling) => sum + bestelling.totaalPrijs, 0);
    document.getElementById('totaalPrijs').textContent = totaal.toFixed(2);
}

// Add or update order
function changeBestelling(gang, naam, aantal, prijsPerPersoon) {
    // Check if dish already exists in orders
    const bestaandeBestelling = bestellingen.find(b => b.naam === naam);
    
    if (aantal === 0) {
        // Remove order if aantal is 0
        bestellingen = bestellingen.filter(b => b.naam !== naam);
    } else if (bestaandeBestelling) {
        // Update existing order
        bestaandeBestelling.aantal = aantal;
        bestaandeBestelling.totaalPrijs = aantal * prijsPerPersoon;
    } else {
        // Add new order
        bestellingen.push({
            gang: gang,
            naam: naam,
            aantal: aantal,
            prijsPerPersoon: prijsPerPersoon,
            totaalPrijs: aantal * prijsPerPersoon
        });
    }
    
    updateBestellingenDisplay();
}

// Initialize when page loads
loadMenu();

// Event listener for gang (category) selection change
document.getElementById('gangen').addEventListener('change', function() {
    const selectedCategory = this.value;
    
    if (selectedCategory) {
        populateKeuzeSelect(selectedCategory);
        // Display first dish of selected category
        const firstDish = jsonData[selectedCategory][0].Naam;
        displayDish(selectedCategory, firstDish);
        // Reset keuze select to first item
        document.getElementById('keuze').value = firstDish;
    }
});

// Event listener for keuze (dish) selection change
document.getElementById('keuze').addEventListener('change', function() {
    const selectedDish = this.value;
    const selectedCategory = document.getElementById('gangen').value;
    
    if (selectedDish && selectedCategory) {
        displayDish(selectedCategory, selectedDish);
    }
});

// Event listener for order button
document.getElementById('bestelBtn').addEventListener('click', function() {
    const aantalInput = document.getElementById('aantalPersonen');
    const aantal = parseInt(aantalInput.value);
    
    // Validation
    if (isNaN(aantal) || aantal < 0) {
        alert('Voer een geldig aantal personen in (0 of meer).');
        return;
    }
    
    const selectedCategory = document.getElementById('gangen').value;
    const selectedDish = document.getElementById('keuze').value;
    
    if (!selectedCategory || !selectedDish) {
        alert('Selecteer eerst een gang en een gerecht.');
        return;
    }
    
    // Get dish info
    const dish = jsonData[selectedCategory].find(item => item.Naam === selectedDish);
    
    if (dish) {
        changeBestelling(selectedCategory, dish.Naam, aantal, dish.Prijs);
        
        // Reset aantal personen to 1 after ordering
        aantalInput.value = 1;
        
        // Show feedback
        if (aantal === 0) {
            alert(`${dish.Naam} is verwijderd van de bestelling.`);
        } else {
            alert(`${dish.Naam} (${aantal} ${aantal === 1 ? 'persoon' : 'personen'}) toegevoegd aan bestelling!`);
        }
    }
});
