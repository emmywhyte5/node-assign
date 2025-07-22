import e from "express";
import { del1User, forLogin, forSignup, get1User, getAllusers, update1User } from "../controllers/userController.js";
import authorize from "../middlewares/authorize.js";

const router = e.Router();

router.get('/', authorize(['Admin']), getAllusers)

router.get('/:id', authorize(['Admin']), get1User)

router.delete('/:id', authorize(['Admin']), del1User)

router.put('/:id', authorize(['Admin']), update1User)

router.post('/login', forLogin)

router.post('/', forSignup)




// router.get('/posts', getAllposts);


export default router