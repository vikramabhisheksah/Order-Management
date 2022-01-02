#Order Management
-The project includes a  a portal where your can raise changes to an existing order.

-Adheres to all the MVC Design principles

-The type of requests are customizeable.

-The portal is Microsoft SSO enabled & can be activated after Azure App registration.

-The portal has an admin panel to decide who can access the portal with elevated roles.

-The requests which are raised can be viewed in a Dashboard table and individual requests can be modified.

-The portal also has a bulk upload feature where multiple Order change requests can be placed in bulk.

#Getting Started with OOC.

Download and run npm install in cmd(make sure node is installed)
Make sure apis are up and running
run npm start in cmd

#HOMEPAGE
- Login via SSO authentication
- Select request type, enter the relevant details and create the Requests.
-  Upon submitting a Request ID will be generated.
-  The homepage also has an option to mass upload the requests by uploading an excel file of by filling the template (By clicking on download template button)
<img width="1440" alt="Screen Shot 2021-12-18 at 1 42 48 PM" src="https://user-images.githubusercontent.com/27946181/146653833-35167cca-2fb5-4b9f-bb4f-7a370d3a9186.png">

#DASHBOARD
- The orders which are placed can be tracked.
- The 4 order status are Pending Approval,Approved, Work in Progress(WIP), Completed.
- The Approve button is only visible to users who have the Approver role.
- The Approver can multi select the rows and approve in multiple requests in a go.
- The dashboard with all the requests(from all users) in the queue are visible to the approver and the Admin roles.
- A user with no priviledged roles, will only be able to see the orders created by him in the dashboard
- Multiple filters can be applied, for example: Filter with a long list of comma separated order numbers
- Individual sort and filter column capability is provided
- Extensive use of react bootstrap table
<img width="1440" alt="Screen Shot 2021-12-18 at 1 42 55 PM" src="https://user-images.githubusercontent.com/27946181/146653842-13c6cfa7-8b2e-4e57-90e1-d54497341a71.png">

#ADMINISTRATION
-This page is only visible to users with admin role.
-Admin can add and revoke admin and approver roles.
- They can see a list of all the users under a certain role.
- Currently there are 3 distinct roles - Admin, approver and regular user with no priviledges.
<img width="1440" alt="Screen Shot 2021-12-18 at 1 43 35 PM" src="https://user-images.githubusercontent.com/27946181/146653846-c62f402d-957b-4590-b724-d250b0b4757e.png">


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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
