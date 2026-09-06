import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 1, // each visitor (by IP) can send max 3 messages per day
    message: { error: "Demo limit reached. This project uses a free API tier with limited daily requests — please try again tomorrow, or check out the code on GitHub!" },
    standardHeaders: true,
    legacyHeaders: false,
});