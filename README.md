# CookMyFridge 🍳🍽️

[![Node.js CI](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/node.js.yml)
[![Build and deploy Node.js app to Azure Web App - CookMyFridge-Backend](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/master_cookmyfridge-backend.yml/badge.svg)](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/master_cookmyfridge-backend.yml)
[![Azure Static Web Apps CI/CD](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/azure-static-web-apps-orange-pond-0e4be601e.yml/badge.svg)](https://github.com/luisdavidgarcia/CookMyFridge/actions/workflows/azure-static-web-apps-orange-pond-0e4be601e.yml) 

A website designed to automate cooking reciepes for ingredients the user has in their fridge at the current momement. View the list site here ➡️ [CookMyFridge](https://orange-pond-0e4be601e.3.azurestaticapps.net/)

## Table of Contents

- [Overview](#overview)
  - [Summary](#summary)
  - [Demo Video](#demo-video)
  - [Team](#team)
- [Getting Started](#getting-started)
  - [Setup](#setup)
  - [Project Structure](#project-structure)
- [Contributing](#contributing)
  - [Making Changes](#making-changes)
  - [Committing Changes](#commiting-changes)
  - [Making Pull Requests](#making-pull-requests)
- [Documents and Artifacts](#documents-and-artifacts)
  - [Code Coverage](#code-coverage)

## Overview

### Summary

This project was developed as part of CSC 307 Intro to Software Engineering instructed by Professor BJ Klingenberg. Technologies used in this project are React on the frontend, Node.js and Express on the backend, and MongoDB for the database. Development took place over three sprints (two weeks each). We went through the entire software development lifecycle from planning and design to implementation and deployment. We also implemented CI/CD with Github Actions and Azure.

Key Features:
[In development]


### Demo Video 

[In development]
[Video on Youtube](url_to_paste_here)

### Team

The CookMyFridge team consists of 5 Cal Poly students. The team members are listed below:

- [Aaron Ahmadyar](https://github.com/aahmadyar123)
- [Killian Brait](https://github.com/killian-brait)
- [Luis D. Garcia](https://github.com/luisdavidgarcia)
- [Junseo Lee](https://github.com/junseo-lee-git)
- [Wesley Luu](https://github.com/Westluu)

## Getting Started

Here is all you need to know to setup this repo on your local machine to start developing!

### Setup

1. Clone this repository `git clone https://github.com/luisdavidgarcia/CookMyFridge.git`
2. Change directories into the `/react-frontend` subfolder
3. Install yarn with your OS package manager (apt install, brew, pacman)
3. Run `yarn install` in the react-frontend subfolder of the repository
4. Change directories to `/backend` subfolder
5. Run `npm i` in the backend subfolder of the repository
6. Install IDE Extensions
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
7. Enable format on save in your IDE
   1. Click the settings button in the bottom left
   2. Search "formatter" and set your default formatter to Prettier
   3. Search "format on save" and click the checkbox
8. Reach out to an existing developer for environment variables
9. Verify by running `npm start` in the react-frontend folder and `npm run dev` in the backend folder

### Project Structure

- [.github](./github/) Github Actions CI/CD
- [backend](./backend/) Root folder for backend API - `index.js` Top level file
  - [models](./backend/models/) Schema definitions for data
  - [routes](./backend/routes/) Express endpoint definitions and controllers
  - [tests](./backend/tests/) All test cases for functions
- [react-frontend](./react-frontend/) Root folder for React app
  - [public](./react-frontend/public/) Assets for frontend
  - [src](./react-frontend/src/) Frontend code - `App.js` Top level React component
    - [components](./react-frontend/src/components/) All React components
    - [pages](./react-frontend/src/pages/) Pages for frontend
    - [images](./react-frontend/src/images/) All images for pages
    - [css](./react-frontend/src/css/) All CSS

## Contributing

Here are all of the steps you should follow whenever contributing to this repo!

### Making Changes

1. Before you start making changes, always make sure you're on the main branch, then `git pull` and `npm i` on both frontend and backend to make sure your code is up to date
2. Create a branch with the name relating to the change you will make `git checkout -b <name-of-branch>`
3. Make changes to the code
4. `npm run test` in the backend and react-frontend subfolder to ensure code standards. (running `npx prettier --write .` will fix most of the styling errors)

### Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m " <description>"` or
   `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`
5. Check the [Github Actions](https://github.com/bbmcmann/307MovieProject/actions) page to ensure all workflows are successful

### Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/luisdavidgarcia/CookMyFridge/pulls)
2. Find your PR, and provide a description of your change, steps to test it, and any other notes.
3. Link your PR to the corresponding **Issue**
4. Request a reviewer to check your code
5. Once approved, your code is ready to be merged in 🎉

## Documents and Artifacts

- [UI Prototype on Figma](https://www.figma.com/file/aiMV0RDdwZRwe6ndwtWHBT/CookMyFridge-StoryBoard?node-id=0-1&t=QBe2OVX9WKU5nJmk-0) _Last updated 05/02/23_
- [Class Diagram](https://drive.google.com/file/d/1b9TPzRBATNbwP3GYv5hafMv3em1Qn5tf/view?usp=share_link) _Last updated 05/10/23_
- [Project Board](https://github.com/users/luisdavidgarcia/projects/1/views/1) _Last updated 05/23/23_
- [Deployed Backend](Paste Link Here)

### Code Coverage

