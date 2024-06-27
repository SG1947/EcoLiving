const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

router.route("/")
//Index Route
.get( wrapAsync(listingController.index))
//Create Route
.post(isLoggedin,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createNewListing));


//New Route
router.get("/new",isLoggedin, listingController.newForm);


//Show Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
//Update Route
.put(upload.single("listing[image]"),validateListing,isLoggedin,isOwner,wrapAsync(listingController.updateListing))
//Delete Route
.delete(isLoggedin,isOwner,wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editForm));
module.exports=router;