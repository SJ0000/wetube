import express from "express";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("USER INDEX"));
userRouter.get("/edit", (req, res) => res.send("USER EDIT"));
userRouter.get("/password", (req, res) => res.send("USER PASSWORD"));
