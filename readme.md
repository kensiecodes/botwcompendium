# Hyrule Compendium

This is an app for searching through the BoTW api by the same name by [gadhagod](https://github.com/gadhagod/Hyrule-Compendium-API). It's purpose is to be a simple user interface for accessing information on all in game items. The target user is a mobile user, picking up their phone to briefly search an item while playing the game.
Credits - [Hylia Serif](https://artsyomni.com/hyliaserif) - [BoTW API (Hyrule Compendium)](https://github.com/gadhagod/Hyrule-Compendium-API)

[Vector Graphics](https://www.patreon.com/KraftHP)

## To-do

- Multi-device responsiveness
- Implement error page
- Click out of autocomplete window?
- Styling details
- Search on enter key

## Merge History

- Initial commit (Feb 18, 2023)
  Spent a few days working on this and am happy with where it currently stands! Made the Sheikah asset, due to import a few more. Not happy with overall feel from the user standpoint, but pleasantly happy with the functionality after refactoring the JS down to simpler components. Will continue refactoring as I learn more about OOP.
- Begin UI overhaul (Feb 21, 2023)
  I'm currently learning OOP and async/await, so I'm quickly realizing the issues left in my script. I was also not super happy with the quality of the UI and know I can do better. Granted, the initial stage of the project was completed in 1-2 days. I commented out the entire CSS and am beginning from the mobile site. I added 'Roboto' font which is, in italics, very similar to the in-game font. Next will be working out the details of the API -> DOM and seriously refactoring my JS.
- Total refactoring, restyling, and added features (March 5, 2023)
  I've implemented an auto-complete search feature which required some async/await to store the names at page load. I am matching the styling to the wireframe I created in Figma. Seems like a nesting doll of issues-- once I implement a new feature to solve a problem, a new one arises. Next, will complete matching styling to wireframe.
