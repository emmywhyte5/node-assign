import e from "express";
import {  } from "../controllers/userController.js";
import book from "../models/book.js";
import {  createbook, del1book, get1book, getAllbooks, update1book } from "../controllers/bookController.js";
import authorize from "../middlewares/authorize.js";

const router = e.Router();

router.post("/:authorid",authorize(["admin","librarian"]),createbook);

router.get("/:id", authorize(["admin", "librarian"]), get1book);

router.get("/fetch", getAllbooks);

router.put("/:id", authorize(["admin", "librarian"]), update1book);

router.delete("/:id", authorize(["admin"]), del1book);

export default router
