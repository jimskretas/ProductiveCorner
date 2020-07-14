# Productive Corner

![Productive Corner](https://res.cloudinary.com/jimskretas/image/upload/v1594736760/productive-corner-wide.png)

## Overview

Created this app to get more experience in MERN(MongoDB, Express, React, Node.js) stack, Material-UI, React hooks and testing.

The node.js REST API is [here](https://github.com/jimskretas/productive-corner-api).

#### LIVE LINK : https://productive-corner.netlify.com/

## How to run

1. Clone this project locally
2. Run `npm install`
3. After it is done, run: `npm start`
4. To run jest test, run: `npm test`
5. To run cypress test: `npm run cypress:open`. More about cypress [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html).

## Features

- [x] Auntentication and authorization(using JWT).
- [x] Ability to create and delete cards/notes.
- [x] Cards can be moved between the different lists(Kanban style board).
- [x] Cards are editable(inline editing).
- [x] Lists can hold a fixed amount of cards, for productivity purposes.
- [x] User can create Text cards for note-taking.
- [x] User can create Pomodoro Cards(read more [here](https://en.wikipedia.org/wiki/Pomodoro_Technique)):
  - [x] Start/stop buttons.
  - [x] Notification/alarm.
  - [x] Work & break sessions.
- [x] Delete all cards button in each list. (with "Are you sure" prompt)
- [x] Setting panel:
  - [x] Ability to change the work & break sessions length.
  - [x] Ability to change list card limits.

## Tech Used / Dependencies

- This is a React App boostrapped with CRA.
- Add-on packages include: <br>
  - [Material-UI](https://www.npmjs.com/package/@material-ui/core)
  - [React <Countdown />](https://www.npmjs.com/package/react-countdown)
  - [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
  - [axios](https://www.npmjs.com/package/axios)
  - [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- Packages used for testing: <br>
  - [Cypress](https://www.npmjs.com/package/cypress)
