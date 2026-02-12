# Het Krokantje - Restaurant Ordering System

Een webapplicatie voor het selecteren en bestellen van gerechten in restaurant "Het Krokantje".

## Functionaliteiten

✅ **Bij opstarten**: Het eerste gerecht en beschrijving worden automatisch getoond
✅ **Gang wijzigen**: Bij het wijzigen van de gang worden de bijbehorende gerechten getoond, standaard het eerste gerecht
✅ **Bestellen**: Gebruiker kan aantal personen invoeren (met controle) en op "Bestellen" klikken
✅ **Bestellingsoverzicht**: Bij geldige invoer wordt de bestelling onderaan getoond
✅ **Bestelling annuleren/wijzigen**: Selecteer gerecht en zet aantal personen op 0, dan wordt de bestelling verwijderd
✅ **Totaalprijs**: Wordt automatisch berekend en aangepast bij elke bestelling of wijziging

## Bestanden

- `index.html` - HTML structuur van de website
- `styles.css` - Styling en layout
- `script.js` - JavaScript functionaliteit
- `menus.json` - Menu data in JSON formaat

## Gebruik

1. Open `index.html` in een webbrowser
2. Selecteer een gang (Voorgerechten, Hoofdgerechten, Nagerechten)
3. Kies een gerecht uit de keuze dropdown
4. Voer het aantal personen in
5. Klik op "Bestellen" om toe te voegen aan de bestelling
6. Om een bestelling te verwijderen: selecteer het gerecht, zet aantal op 0, en klik "Bestellen"

## Menu Data Structuur

Het `menus.json` bestand bevat een object met gangreeksen als keys:

```json
{
  "Voorgerechten": [
    {
      "Naam": "Gerechtnaam",
      "Beschrijving": "Beschrijving van het gerecht",
      "Prijs": 8.50,
      "Afbeelding": "bestandsnaam.jpg"
    }
  ]
}
```

## Afbeeldingen

Plaats gerecht afbeeldingen in een `images/` map. Als een afbeelding niet gevonden wordt, wordt een placeholder getoond.

## Technische Details

- Geen externe libraries nodig (pure JavaScript, HTML, CSS)
- Responsive design voor mobiele apparaten
- JSON validatie voor menu data
- Input validatie voor aantal personen
- Dynamische prijsberekening

## Browser Compatibiliteit

Werkt in alle moderne browsers die ES6+ ondersteunen (Chrome, Firefox, Safari, Edge).

## Uitbreidingsmogelijkheden

- Afbeeldingen toevoegen voor elk gerecht
- Allergenen informatie
- Print functie voor bestelling
- Opslaan van bestellingen in localStorage
- Backend integratie voor daadwerkelijke bestellingen
