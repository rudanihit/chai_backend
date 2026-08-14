import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Get total videos and total views
    const videoStats = await Video.aggregate([
        {
            $match: {
                owner: userId
            }
        },
        {
            $group: {
                _id: null,
                totalVideos: { $sum: 1 },
                totalViews: { $sum: "$views" }
            }
        }
    ]);

    // Get total subscribers
    const totalSubscribers = await Subscription.countDocuments({
        channel: userId
    });

    // Get all videos of this channel
    const videos = await Video.find({
        owner: userId
    }).select("_id");

    const videoIds = videos.map((video) => video._id);

    // Get total likes on all channel videos
    const totalLikes = await Like.countDocuments({
        video: { $in: videoIds }
    });

    const stats = {
        totalVideos: videoStats[0]?.totalVideos || 0,
        totalViews: videoStats[0]?.totalViews || 0,
        totalSubscribers,
        totalLikes
    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                stats,
                "Channel stats fetched successfully"
            )
        );
});


const getChannelVideos = asyncHandler(async (req, res) => {

    const videos = await Video.find({
        owner: req.user._id
    }).sort({
        createdAt: -1
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                videos,
                "Channel videos fetched successfully"
            )
        );
});


export {
    getChannelStats,
    getChannelVideos
};