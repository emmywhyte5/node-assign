import e from "express";
import { createauthor, del1author, get1author, getAllAuthors, update1author } from "../controllers/authorController.js";
import authorize from "../middlewares/authorize.js";

const router = e.Router();

router.post("/", createauthor);

router.get("/:id", authorize(["admin", "librarian"]), get1author);

router.get("/:fetch", authorize(["admin", "librarian"]), getAllAuthors);

router.put("/:id", authorize(["admin", "librarian"]), update1author);

router.delete("/:id", authorize(["admin"]), del1author);

export default router
