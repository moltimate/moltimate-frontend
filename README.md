# Moltimate Frontend

Moltimate is an open source tool built to aid in protein function analysis. The project start with a group of student developers in the Software Engineering Department at Rochester Institute of Technology. Main dependencies for this project are  [React](https://reactjs.org/docs/getting-started.html) , [Material UI](https://material-ui.com/), [NGL View](https://github.com/arose/nglview).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js - [Download and install Node](https://nodejs.org/en/download/) and the Node Package Manager
* Yarn - [Download and install](https://yarnpkg.com/en/docs/install) Yarn if you have not used it before


### Installing

To run locally you must download dependencies if it is your first time running the project, or anytime there is an addition to the packages. If running the moltimate backend server alongside the moltimate frontend, you must edit the src/util/request.js file to point the testQuery and searchQuery constants to the moltimate frontend, as it will not be running on the same port.

```
yarn install
```

After installing the project dependencies 

```
yarn start
```

Build the project dist directory

```
yarn run build
```

If there are unit tests available to run:
```
yarn run test
```

Custom yarn scripts can be made such as `yarn build` which can be found in the `package.json`

## Testing

Currently this project is not set up with any unit tests. This was done intentionally. Possible unit testable code is the advanced hook logic found in the `util` directory.

Selenium driven integration tests will be used to validate user workflows, and provide transparent assurances to users and stakeholders. Tests will be automated via Travis-CI.

### Big Thanks
Cross-browser Testing Platform and Open Source ❤️ provided by [Sauce Labs](https://saucelabs.com)

## Coding Style
### General
* Use function based components when you can as they are lighter weight and performant
* Use Hooks and Context API 
* Generalize components as much as possible
* Put strings in the `strings.json` file at the top level of the directory and use throughout the project
* Do NOT use deprecated React Lifecycle methods such as `didComponentMount`
If you are new to React take a comprehensive read of the below: 
    Follow the [React Guidelines](https://reactjs.org/docs/hello-world.html) 
    Follow [Hooks Guidelines](https://reactjs.org/docs/hooks-rules.html)

### Style
Build small and reusable components. This project is highly generalizable. 

### Why keep the custom Webpack?
Create React App is quick and easy way to get things setup, however it is incredibly heavy and introduces many dependencies not required for this project. If you `eject` a Create React App project then it becomes difficult to update and read. Follow the standards of [Webpack](https://webpack.js.org/)  

### Resuable Code
Great deal of time and resources were spent on making this code reusable and high quality with the goal that future development teams would be able to build on this foundation and add more features.

## License

This project is licensed under GPLv2
