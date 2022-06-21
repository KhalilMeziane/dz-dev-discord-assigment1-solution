# React/TypeScript/Redux Assigment
build front-end application with react, redux-toolkit based on API

## Usage 
These instructions will get you a copy of the project up and running on your local machine

### Requirement 
- [nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## How To Use
From your command line, first clone the repository into your local machine:

```bash
# Clone this repository
$ git clone https://github.com/MezianeKhalil/dz-dev-discord-assigment1-solution.git
# Go to the project directory
$ cd dz-dev-discord-assigment1-solution
# Then remove current remote repository
$ git remote rm origin
```
## Project Structure 
┌ `src` \
├─ `components` \
├─ `pages` \
├─ `route` \
├─ `store` \
├─ `App.jsx` \
├─ `main.jsx` \
├ `.eslintrc.json` \
├ `index.html` \
├ `vite.config.js` \
└ `README.md`

#### Client-side Dependencies
* React
* React-router-dom
* Redux-toolkit
* Chakra Ui
* Formik
* Axios

#### Quick Setup for Client

```bash
# Then install dependencies
$ npm install
# then run the client application
$ npm run dev
```

#### API Reference

#### Post https://dz-dev-discord-assigment1-api.herokuapp.com/login

```http
  POST  https://dz-dev-discord-assigment1-api.herokuapp.com/login
``` 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. password |

#### GET https://dz-dev-discord-assigment1-api.herokuapp.com/data
```http
  GET  https://dz-dev-discord-assigment1-api.herokuapp.com/data
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. token |
