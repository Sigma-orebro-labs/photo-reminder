# photo-reminder

Photo-reminder is an application which allows users to create Reminder-notes from pictures with minimal effort. The front end is based on the Ionic Hybrid Mobile Framework. Image content is parsed using the (node-)tesseract OCR reader. 

The backend api is built using  the node.js Expresss server software, utilizing passport authentication, and Sequelize ORM for persistence. 

To Debug in a  browser you need to start the Node app from the ./server-folder, then run ionic serve from the photo-reminder folder. This will start the API on localhost:3000 and the ionic-app on localhost:8100 which allows you. 

The Azure DB Connection String or configs are not uploaded to github. 
