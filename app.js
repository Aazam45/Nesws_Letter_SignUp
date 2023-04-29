// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const mailchimp = require("@mailchimp/mailchimp_marketing");
// const https = require("https");
//
// const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
//
// // app.use(express.static("public"));
// // app.use(express.static(__dirname + "public"));
// //The public folder which holds the CSS
// app.use("/public",express.static(__dirname+"/public"));
//
//
// app.get("/", function(req, res){
//   res.sendFile(__dirname + "/signup.html");
// });
// //Setting up mailchimp
// mailchimp.setConfig({
//   apiKey: "angela1:10176498afbc2101af00547a402f1768-us21",
//   //us21-- is a api key PREFIX
//   server: "us21"
// });
// let options = {   method: "POST",   headers: {     Authorization: "random text: your API key",   }, };
// //as soon as the sign in button pressed execute this.
// app.post("/", function(req, res){
//   const firstName = req.body.fName;
//   const lastName = req.body.lName;
//   const email = req.body.email;
//   const listId = "98e97baa20";
//   // //creating an object with the users data
//   const subscribingUser = {
//     firstName: firstName,
//     lastName: lastName,
//     email: email
//   };
//
//   // const data = {
//   //   members: {
//   //     email_address: email,
//   //     status: "subscribed",
//   //     merge_fields: {
//   //       FNAME: firstName,
//   //       LNAME: lastName
//   //     }
//   //   }
//   // };
//   //Uploading the data to the servers
//   async function run() {
//     const response = await mailchimp.lists.addListMember(listId, {
//       email_address: subscribingUser.email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: subscribingUser.firstName,
//         LNAME: subscribingUser.lastName
//       }
//     });
//
// //     res.sendFile(__dirname + "/sucess.html")
//     console.log(
//    `Successfully added contact as an audience member. The contact's id is ${
//      response.id}.`
//  );
// };
// //
// run();
//
//   // const data = {
//   //   members: {
//   //     email_address: email,
//   //     status: "subscribed",
//   //     merge_fields: {
//   //       FNAME: firstName,
//   //       LNAME: lastName
//   //     };
//   //   };
//   // };
//
//   // const jsonData = JSON.stringify(data);
//   // //
//   // const url = "http://us21.api.mailchimp.com/3.0/lists/98e97baa20.";
//   // // "https://<data center>.api.mailchimp.com/3.0/lists/98e97baa20";
//   // //
//   // const options = {
//   //   method: "POST",
//   //   auth: "angela1:10176498afbc2101af00547a402f1768-us21"
//   // };
//   //
//   // const request = https.request(url, options, function(response) {
//   //   response.on("data", function(data) {
//   //     console.log(JSON.parse(data));
//   //   });
//   // });
//   //
//   // request.write(jsonData);
//   // request.end();
// });
//
//
// app.listen(3000, function() {
//   console.log("Server is running on port 3000");
// });
// //Mailchimp Api
// // 10176498afbc2101af00547a402f1768-us21
//
// //Unique audience list id
//  //98e97baa20.




const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use("/public",express.static(__dirname+"/public"));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }

      }]
    }
    //stringify converts the data into string in JSON format.
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/98e97baa20"
    const options = {
        method: "POST",
        auth: "aazam:10176498afbc2101af00547a402f1768-us21"
      }
    const request = https.request(url, options, function(response) {

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data) {
        console.log(JSON.parse(data));
      })
    })
    request.write(jsonData);
    request.end();

  });
app.post("/success", function(req, res){
  res.redirect("/")
});

  app.post("/failure", function(req, res){
    res.redirect("/")
  });

app.listen(process.env.PORT || port, function(){
    console.log(`App listening on localhost:${port}`);
});
