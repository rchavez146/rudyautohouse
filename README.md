# Car Dealership Website Template

This is a static dealership site template with a code-based inventory manager.

## Files
- `/Users/rodrigochavez/Documents/Car dealership website/index.html` - home page (featured vehicles + dealership content)
- `/Users/rodrigochavez/Documents/Car dealership website/inventory.html` - full inventory page (all vehicles with filters)
- `/Users/rodrigochavez/Documents/Car dealership website/styles.css` - design and responsive styling
- `/Users/rodrigochavez/Documents/Car dealership website/js/inventory.js` - inventory list (edit this to add/remove/update cars)
- `/Users/rodrigochavez/Documents/Car dealership website/js/app.js` - inventory rendering and filters for both pages

## How to update inventory
1. Open `/Users/rodrigochavez/Documents/Car dealership website/js/inventory.js`.
2. Edit vehicle objects in `inventory`.
3. For a sold vehicle:
   - Either set `status: "sold"`, or
   - Remove that object from the array.
4. Save and refresh the site.

## Vehicle object template
```js
{
  id: "c006",
  year: 2021,
  make: "Nissan",
  model: "Rogue SV",
  price: 23995,
  mileage: 28400,
  drivetrain: "AWD",
  fuel: "Gas",
  status: "available", // or "sold"
  image: "https://image-url.jpg"
}
```

## Preview locally
Run this from `/Users/rodrigochavez/Documents/Car dealership website`:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
