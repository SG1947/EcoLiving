const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isLoggedin,isReviewAuthor,validateReview}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")

// Reviews
//Post  Review Route
router.post("/", isLoggedin,validateReview,wrapAsync(reviewController.postReview));

//Delete Review Route

router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;