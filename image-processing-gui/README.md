This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# BME590Final ImageProcessing Frontend Folder #

#### [Go to App hosted on FireBase](https://bmetester-484d1.firebaseapp.com/) ####



## Running the web app locally: ##

1) Once cd'd into this folder in the Terminal, run: 
<br>(You may need to install Node Package)

    #### `npm install`

2) In Input>Input.js & Output>Output.js, find & replace. 
<br>**Do not modified anything outside of '<>'**

    #### `axios.post/get("<link to your local server>",...)`

3) Run the following command in the terminal where you ran npm install

    #### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## How it works: ###

Every user can only upload images ONCE per session, but can reprocess their already uploaded files as many times as they want. Once they choose to reset the session, they will not be able to find their processed files in their previous session. 

To prevent server overload the file sizes should be limited to the specified size. Users can only upload 10 files at a time (can be all .zip files). 

Most of the instructions are explained. If the user navigates to another page while the either page is loading (when the progress bar is showing), a warning will pop up. Should the user chooses to proceed, the entire app will be reset, and the user will be in a new session. 



