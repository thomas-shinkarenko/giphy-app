import { Router } from "express";
import searchRoutes from "./search";

const router = Router();

router.use("/search", searchRoutes);

export default router;
