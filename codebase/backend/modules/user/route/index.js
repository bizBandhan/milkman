/* 
Resposible for following routes:
    /me
    /login
    /register
    /user
    /user/:id
*/
import { Router } from "express";
const router=Router();
router
.route('/me')
.get    (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.post   (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.put    (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.patch  (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.delete (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;