import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";
import { getUser } from '../controllers/general.js';

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/customer/:id", getUser);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
