import e from "express";
import { del1User, forLogin, forSignup, get1User, getAllusers, update1User } from "../controllers/userController.js";
import authorize from "../middlewares/authorize.js";

const router = e.Router();

router.post('/signup', forSignup)

router.post('/login', forLogin)

router.get('/', getAllusers)

router.get('/:id', get1User)

router.delete('/:id', del1User)

router.put('/:id', update1User)







// router.get('/posts', getAllposts);


export default router