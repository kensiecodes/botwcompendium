# Hyrule Compendium

![App](https://pbs.twimg.com/media/FwMtAeWWICoU8ej?format=jpg&name=4096x4096)

This is an app for searching through the BoTW api by [gadhagod](https://github.com/gadhagod/Hyrule-Compendium-API). It's purpose is to be a simple user interface for accessing information on all in game items. The target user is a mobile user, picking up their phone to briefly search an item while playing the game.
Credits - [Hylia Serif](https://artsyomni.com/hyliaserif) - [BoTW API (Hyrule Compendium)](https://github.com/gadhagod/Hyrule-Compendium-API)

[Vector Graphics](https://www.patreon.com/KraftHP)

## Contributions

Contributions are welcome on this project. If you have any feature ideas, feel free to pitch them to me on [Twitter](https://twitter.com/MackensieJack). If you do contribute, please document your changes and comment around your code so it is as newbie friendly as possible! I would love for this to be someone's first open source contribution.

## Technologies

Currently, this project is very barebones. I used Tailwind for the styling, but everything else was done manually due to it's simplicity.

![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Roadmap

- ~~Multi-device responsiveness~~
- Implement error page
- Click out of autocomplete window?
- Search on enter key
- Known bug on iOS Safari where the #suggestion box doesn't display when the suggestion array populates

## Merge notes

### Initial commit (Feb 18, 2023)

Spent a few days working on this and am happy with where it currently stands! Not happy with overall feel from the user standpoint, but pleasantly happy with the functionality after refactoring the JS down to simpler components.

### Begin UI overhaul (Feb 21, 2023)

I'm currently learning OOP and async/await, so I'm quickly realizing the issues left in my script. I have generally been tinkering and troubleshooting certain functions and styling issues. I added 'Roboto' font which is, in italics, very similar to the in-game font. Next will be working out the details of the API -> DOM and seriously refactoring my JS.

### Total refactoring, restyling, and added features (March 5, 2023)

I've implemented an auto-complete search feature which required some async/await to store the names at page load. This also will store the array to local storage. I am matching the styling to the wireframe I created in Figma. Seems like a nesting doll of issues-- once I implement a new feature to solve a problem, a new one arises.

### Converting to Tailwind (May 14, 2023)

This update is essentially just a face lift for this app in order to put in on my portfolio. I'm leaving the old stylesheet (./css/style.css) for posterity, however all of the styling has been converted to Tailwind barring a few complex state-based styles, such as the autocomplete feature, as well as font-faces.
</br> I've also notated the purpose of each function in the main.js file to demonstrate my logic behind everything.
</br> I've learned a lot since I began this project so I was able to smoothe out all of the wrinkles in only a day or two. There are some remaining QoL features that could be added but it works and I'm happy with it.
'
