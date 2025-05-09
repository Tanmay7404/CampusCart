IIT GUWAHATI VIRTUAL QUEUE APPLICATION
A React native based application with NodeJs server powered by PostgreSql database. The following repository is a showcasing for the project,The main repository is private for now. These are the some interfaces of the Application
A React-Node Based Application

Some interfaces from students side
![258306697-7a81f03f-c891-4547-a230-8ee209db2f24](https://github.com/user-attachments/assets/4f9363cc-5227-41d3-85bc-32480b134a66)
![258307571-81cf955e-6d88-41cd-b55f-7c92c4a51d02](https://github.com/user-attachments/assets/9ba8d371-b3c9-4f44-bfc4-7a70c39b7e37)

Stationaries side for printing stuffs remotely
![258307648-06e28695-e173-43e5-897c-618a28406953](https://github.com/user-attachments/assets/9b6aab29-e733-4ff1-82a4-cb649e4f822f)

Development Readme
Prerequisites
Git.
Node & npm (version 18 or greater).
nvm.
Clone of the repo.
Installation of the Project
Clone the project by - git clone --recursive https://github.com/iks1/PickMeUp.git to ensure it clones all the submodules as well.
Go to the directory PickMeUp by - cd PickMeUp
To make sure the submodules are updated run the command - git submodule update --remote
Follow the next procedures to run the project in your local environment.
Running the Project
Steps to run backend
In order to install all packages follow the steps below:

Move to CampusCatalogue---Backend folder
To make sure you have the required npm version run - nvm use 18
If you don't have the desired version of node install it by - nvm install 18 and then run - nvm use 18
Then to install all the required packages run - npm install
Then run - node index.js
Your server should start!
The server will be served on http://localhost:8080/

Steps To Set Up Frontend
customer side
Move to PickMeUp--Customer
npm install
npx expo start
To run the application install the Expo Go application from Play Store and scan the QR Code or run it on emulator
shopkeeper side
Move to PickMeUp--Shopkeeper and repeat the above process
Directory Structure
The following is a high-level overview of relevant files and folders.

CampusCatalogue---Backend/
├── config/
│   ├── default.js
│   └── ...
├── controllers/
|   ├── shopkeeper.js
|   ├── user.js
|   └── ...
├── middlewares/
|   ├── validation
|   |    ├──shopkeeper.js
|   |    └──user.js
|   └── auth.js
├── models/
|   ├── customer_model.js
|   ├── db.js
|   ├── order_model.js
|   └── shop_model.js
├── routes/
|   └── ...
├── .gitignore
├── package-lock.json
└── package.json

PickMeUp--Shopkeeper/
├── assets/
│   └── ...
├── components/
|   ├── Completed.js
|   ├── CompletedActive.js
|   ├── Google.js
|   ├── InputField.js
|   ├── Navbar.js
|   ├── Pending.js
|   └── ...
├── pages/
|   ├── Getstarted.js
|   ├── Login.js
|   └── PendingHomePage.js
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── metro.config.js
├── package-lock.json
├── package.json
└── m-cli.config.js

PickMeUp--Customer/
├── assets/
│   └── ...
├── components/
|   ├── FilterCard.js
|   ├── FoodCard.js
|   ├── FoodCard2.js
|   ├── FoodItemCard.js
|   ├── FoodPopUp.js
|   ├── Google.js
|   └── ...
├── context/
|   ├── AuthContext.js
|   └── ...
├── pages/
|   ├── BillingPage.js
|   ├── foodDashboard.js
|   ├── FoodShopPage.js
|   ├── GetStarted.js
|   ├── Login.js
|   ├── printDashboard.js
|   ├── SignUp.js
|   └── ...
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── metro.config.js
├── package-lock.json
├── react-native.config.js
├── package.json
└── m-cli.config.js
