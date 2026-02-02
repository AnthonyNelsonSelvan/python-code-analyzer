import { Router } from "express";
import upload from "../utils/multer.js";
import { testCodeFunc, testUploadedCodeFunc } from "../controller/testCode.js";

const router = Router();

router.post("/upload/file", upload.single("source_code"), testUploadedCodeFunc);

router.post("/code", testCodeFunc);

export default router;
