import { Router } from "express";

import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Get comments for a video - Public
router
    .route("/:videoId")
    .get(getVideoComments);

// Add comment - Login required
router
    .route("/:videoId")
    .post(verifyJWT, addComment);

// Update/Delete comment - Login required
router
    .route("/c/:commentId")
    .delete(verifyJWT, deleteComment)
    .patch(verifyJWT, updateComment);

export default router;