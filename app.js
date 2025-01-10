const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/EY";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//home route
app.get("/home", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/new-home.ejs", { allListings });
});

//Scheme list route
app.get("/home/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/scheme-list.ejs", { allListings });
});

// Scheme details route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const allListings = await Listing.find({});
  res.render("listings/scheme.ejs", { listing, allListings });
});

app.get("/home/eligibility", (req, res) => {
  res.render("listings/animation.ejs");
});

app.get("/home/login", (req, res) => {
  res.render("listings/login.ejs");
});

app.get("/home/registration", (req, res) => {
  res.render("listings/registration.ejs");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Tool Kit Grant for Traditional Handicrafts Experts",
//     department: "Kerala",
//     details:
//       "A sizeable population of OBCs is engaged in traditional occupations like handicrafts, jewellery making, metalwork, weaving, etc. Due to these low-paid occupations and due to modern technological intervention they face tough competition in the market which creates a feeling of inferiority and incapacity threatening their very existence. In order to have the traditional occupation as a sustainable self-employment and income-generating source for the families of traditional craftsmen their traditional skills need to be upgraded and they need to be equipped with modern technology to meet the market demands. The scheme is intended for the above purpose of improving the productivity and competitiveness of the traditional OBC craftsmen ensuring quality goods for enhanced income and thereby qualitative improvement in their living conditions.",
//     benefits:
//       "1.	The training costs, stipend (if found necessary), and tool kit grant together shall be limited to ₹25000/-. 2.	The training and stipend portion is limited to ₹5000/-. 3.	The maximum period of training will be three months.",
//     eligibility:
//       "1.	The applicant should be a permanent resident of the Kerala State. 2.	The applicant should belong to the State Backward Communities of Kerala State. 3.	The applicant should be engaged in traditional craftwork/skilled work. 4.	The upper age limit of the applicant should be 60 years. 5.	The annual family income of the applicant should be ₹1,00,000/-.",
//     process:
//       "Step 01: The application will be invited through public notification in all the leading news dailies. If it is necessary an advertisement will be published. Step 02: The applicants should apply in the prescribed form with all relevant documents and submit it to the Regional Deputy Director. Step 03: On receipt of the applications, the scrutiny will be carried out at the Regional level. Step 04: A draft list will be prepared on the basis of certificates and preliminary field inquiries. This will be subjected to further scrutiny by the Director, BCDD and a final list will be drawn up. Step 05: Those selected will undergo training in their respective field of work if it is necessary.",
//     documents:
//       "Identity proof; Photo of the applicant; Caste Certificate; Income Certificate; Experience Certificate; Certificate regarding Non-receipt of other grants from LSGD, KADCO, etc.; Photograph of the work site; Photocopy of bank passbook; Any other document, if required",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
