## FRONT-END

### Directories structure
* There are two main directories, `public` and `src`
* The components written by me are in the `src` directory
* The installed packages are in the `npm_installs.txt` and are the:
    * [react-bootstrap](https://react-bootstrap.github.io)
    * [react-router](https://reactrouter.com)
    * [axios](https://axios-http.com)
    * [react-notifications-component](https://www.npmjs.com/package/react-notifications-component)
    * [canvas js react charts](https://canvasjs.com/react-charts)
* Favicon was generated by [favicon.io](https://favicon.io/favicon-generator)

* To run the project locally, assuming you have already installed `npm`, cd into the `front-end` directory, run `npm install` and all the packages (following the dependencies of the `package.json` file) will be installed. 
* In the same directory, run `npm start` to get the server running.

# Explanation of switching between the two back-end architectures
* I keep a variable in the localStorage of the browser, indicating the back-end that is being used right now (if the variable is null, I use the SOA back-end by default)
* As you can see in the `front-end/src/api.js` file, I access this variable to determine the async calls that are being made to the back-end
* This way, according to the value returned by the `using_SOA_Back_end()` method, I modify the target of the api calls
* Whenever the user updates this variable from the `about page`, I logout the user, by clearing the auth_tokens saved and I start using the other back-end

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
