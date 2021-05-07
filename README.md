# Mars Camp

This project started out as part of a course on database management systems at IIITAllahabad. The main aim behind doing this project is to learn how relational databases help us to work with data.

## Features

Mars Camp is a Online Course Portal that imbibes to replicate all the necessities of a college or a university.\
It has all the features that a Teacher or a Faculty member would need.\
We have envisioned 3 types of users who will be using this website.

1. Admin (short for "adminstrator") who handles all the necessary functions that this portal would need.
2. Faculty (or a Teacher) , he teaches or add's course content to this portal.
3. Student , The ultimate user the learner .

## Prerequisites

For setting up this project on your local machine you need to install

1. nodejs
2. npm (comes along with nodejs installation)
3. MySQL Workbench (for managing users if necessary)
4. Having MySQL server installed would also be sufficient.

## Gallery

## Getting Started

1. Clone this repository using the link above or run `git clone https://github.com/Evadore/MarsCamp.git` in your terminal.
2. Go to `marscamp` directory and run `npm install` to automatically install all necessary dependencies required for running the frontend of this project .
3. Now before starting with the backend make sure you have all the necessary dependencies installed and you are able to view the signin page by running `npm start` in your terminal and visit [http://localhost:3000](http://localhost:3000) in your favorite browser .
4. If you had any problem till this point please google your error and if you are still unable to fix it consider raising a ISSUE here.
5. Now for setting up the backend server Go to the `Server` directory and repeat step 2.
6. Now setup your mysql script in the `scripts` folder remember to replace `your_password` with your MySQL password. \
   copy and paste this script in `Server/scripts/mysql.js`

```
var mysql = require('mysql')
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "marscamp",
    connectionLimit: 10,
    multipleStatements: true
})

module.exports = pool
```

7. Test your connection by visiting [http://localhost:5000](http://localhost:5000) after running `npm start` in a new terminal window in the Server directory.
8. congratulations you have successfully completed setting up your node+Express API to act as a connnection between your frontend react app and your database. Now all that's left is to setup your database for the course portal. If you had any problems till this point reconsider step 4.
9. For setting up your database run `init.sql` file present in queries folder in your MySQL Workbench . There shouldn't be any errors in this step.
10. The last and Final Step, Since a user cannot signup as a adminstrator of the portal so you have to manually add a adminstrator to your database by running the following script in your browser console

```
await fetch('http://localhost:5000/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({reg_no: "IIT2019062", ph_no: "9873453216", email: "iit2019062@iiita.ac.in", name: "Prasanth Kota", user_type: "ADMIN", pwd: "adminpwd"})
})
```

Congrats on Setting up Mars Camp. If you have any feature suggestions or found any bugs please consider raising an ISSUE or contact us on Twitter.

Happy Learning!

P.S : We are working on making a deployed version available soon
