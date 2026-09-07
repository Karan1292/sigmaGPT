import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 10,
    message: { error: "Demo limit reached. This project uses a free API tier with limited daily requests — please try again tomorrow, or check out the code on GitHub!" },
    standardHeaders: true,
    legacyHeaders: false,
});

export const deleteThreadLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: {
        error: "You can delete only 1 thread per day in this demo."
    },
    standardHeaders: true,
    legacyHeaders: false,
});