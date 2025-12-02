import express from "express";

const router = express.Router();

router.post("/login", (request, response) => {
  // handle auth here and send cookie back with jwt auth token
});

router.post("/register", (request, response) => {
  // handle registering here and return status if completed
});
