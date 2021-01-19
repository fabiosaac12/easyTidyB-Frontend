# Easy Tidy B - Frontend 
This is the frontend of Easy Tidy Business App. This app objective is to supply an easy to use user interface for the user to be able to have a efficient and simple administration of his business.

To use this app for your business administration or see how it looks, you can visit [this URL](https://easytidyb.herokuapp.com).

### Frameworks and libraries used:
- React with hooks.
- Redux to make easier the components comunication with a global state.
- Highcharts for the dashboard graphs.
- Bootstrap for pre-established styles.
- Sha256 for the password encryption.

### App complementations:
- This app depends on an API, whose code is on the [easyTidyB-API repository](https://github.com/fabiosaac12/easyTidyB-API)
- The API, at the same time, depends on a MySQL database, whose code is on the [easyTidyB-DB repository](https://github.com/fabiosaac12/easyTidyB-DB)

### How to clone this repository and start using this app locally:
1. Open the terminal
2. `git clone https://github.com/fabiosaac12/easyTidyB-Frontend` --> clone the repository
3. `cd easyTidyB-Frontend` --> move to the generated folder
4. `npm install` --> this will install all the required modules
5. Set the necessary environment variables in the .env file.
6. `npm start` --> this will start the development server on port 3000

### Other npm commands:
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.\
- `npm run eject`: If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
