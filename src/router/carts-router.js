import { Router } from "express";
import { ManagerCarts } from "../dao/managerMongo/managerCartsMongo.js";
import { cartsModel } from "../dao/models/cartsModel.js";
import multer from "multer";
import mongoose from "mongoose";
import { io } from "../app.js";
import { managerProducts } from "./products-router.js";
import { auth } from "./viewsRouter.js";
import { passportCall, securityAcces } from "../utils.js";
import { CartsController } from "../controller/cartsController.js";
export const router = Router();
const managerCarts = new ManagerCarts();
const upload = multer();

router.get("/", passportCall('jwt'), CartsController.render);

router.get("/:id", passportCall('jwt'),CartsController.getCartById);

router.post("/:cid/product/:pid", passportCall('jwt'),securityAcces(["user"]),CartsController.addProductInCart);

router.post("/", passportCall('jwt'),upload.none(), securityAcces(["admin"]),CartsController.createCart);

router.delete("/:cid/product/:pid",  passportCall('jwt'),securityAcces(["public"]),CartsController.deleteProductInCart);

router.delete("/:cid", passportCall('jwt'),securityAcces(["admin"]),CartsController.deleteAllProductsInCart);

router.put("/:id", passportCall('jwt'),securityAcces(["admin"]),CartsController.updateCart);

router.put("/:cid/product/:pid", passportCall('jwt'),securityAcces(["public"]),CartsController.modifiedProductInCart);