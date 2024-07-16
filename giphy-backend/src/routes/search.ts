import { Router } from "express";
import {
  getSearch,
  clearSearchHistory,
  getSearchHistory,
} from "../controllers/search";

const router = Router();

router.get("/", getSearch);
router.get("/history", getSearchHistory);
router.delete("/history/:username", clearSearchHistory);

export default router;
