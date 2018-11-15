# Moltimate Frontend

Project Description here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Must have node version greater than 10 

If you have not installed yarn before:
```
brew install yarn
```

### Installing

To run locally you must download dependencies if it is your first time running the project, or anytime there is an update

```
yarn install
```

After the install

```
yarn start
```
To run unit tests

```
yarn run test
```

### Running With Docker

Build and run the image in a container with:

		docker-compose up

### Unit Tests

Actions and reducers will be tested through [this](https://redux.js.org/recipes/writingtests) 
Sagas will be tested using [this](https://redux-saga.js.org/docs/advanced/Testing.html)
Tests for React Components using [this](https://jestjs.io/docs/en/tutorial-react)

## Project Structure

Two core sections is the search form flow and the results page. Code is organized through actions, reducers, sagas, and components. Components are divided based on views. Containers are linked to the store and components are mostly stateless. 

Use function based components when you can as they are lighter weight and performant.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
