# Moltimate Frontend

Moltimate is an open source tool built to aid in protein function analysis. The project start with a group of student developers in the Software Engineering Department at Rochester Institute of Technology. Main dependencies for this project are  [React](https://reactjs.org/docs/getting-started.html) , [Material UI](https://material-ui.com/), [NGL View](https://github.com/arose/nglview).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Must have Node version greater than 10 
```
node -v
```
If not installed then use the below command
```
brew install node
```
Checkout [n](https://github.com/tj/n) for Node version management

If you have not installed Yarn before:
```
brew install yarn
```

### Installing

To run locally you must download dependencies if it is your first time running the project, or anytime there is an addition to the packages.

```
yarn install
```

After the install

```
yarn start
```

If there are unit tests available to run:
```
yarn run test
```

Custom yarn scripts can be made such as `yarn build` which can be found in the `package.json`

### Unit Tests

Currently this project is not set up with any unit tests. This was done intentionally. Selenium driven integration tests unnecessary  increase developer time and do not provide useful checks for this software. This is built to simply display a protein visualization. Possible unit testable code is the advanced hook logic found in the `util` directory.

## Project Structure

Two core sections is the search form flow and the results page. Code is organized through actions, reducers, sagas, and components. Components are divided based on views. Containers are linked to the store and components are mostly stateless. 

## Coding Style
### General
Use function based components when you can as they are lighter weight and performant
Use Hooks and Context API 
Generalize components as much as possible
Put strings in the `strings.json` file at the top level of the directory and use throughout the project
Do NOT use deprecated React Lifecycle methods such as `didComponentMount`
If you are new to React take a comprehensive read of the below: 
    Follow the [React Guidelines](https://reactjs.org/docs/hello-world.html) 
    Follow [Hooks Guidelines](https://reactjs.org/docs/hooks-rules.html)

### Style
Following suggested linting from Airbnb
Build small and reusable components. This project is highly generalizable. 

### Why keep the custom Webpack?
Create React App is quick and easy way to get things setup, however it is incredibly heavy and introduces many dependencies not required for this project. If you `eject` a Create React App project then it becomes difficult to update and read. Follow the standards of [Webpack](https://webpack.js.org/)  

### Resuable Code
Great deal of time and resources were spent on making this code reusable and high quality with the goal that future development teams would be able to build on this foundation and add more features.
   
## License

This project is licensed under ??????? 
