  // require("dotenv").config();
  // const { GoogleGenerativeAI } = require("@google/generative-ai");

  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // async function testGemini() {
  //   try {
  //     const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
  //     const result = await model.generateContent("Say hello and give a joke!");
  //     console.log("✅ API is working!");
  //     console.log("Response:", result.response.text());
  //   } catch (err) {
  //     console.error("❌ API test failed:", err.message);
  //   }
  // }

  // testGemini();
  import express from "express";
  import "dotenv/config";
  import cors from "cors";
  import mongoose from "mongoose";
  // import getAPIResponse from "./utils/gemini_api.js";
  import chatRoutes from './routes/chat.js';
  const app = express();
  const PORT = 8080;

  app.use(express.json());
  app.use(cors());
  app.use("/api",chatRoutes);

  // app.post("/test", async (req, res) => {
  //   try {
  //     const { message } = req.body;

  //     if (!message) {
  //       return res.status(400).json({ error: "message is required" });
  //     }

  //     const response = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           system_instruction: {
  //             parts: [{
  //               text: `You are a concise coding assistant.
  // Rules:
  // - Give ONE clear answer, not multiple language versions unless asked
  // - Keep explanations short and to the point
  // - Use simple formatting: short paragraphs, minimal headers
  // - Only include code when necessary, in one language (default to JavaScript unless the user specifies otherwise)
  // - No long "how it works" essays unless the user asks for a detailed explanation`
  //             }]
  //           },
  //           contents: [{ role: "user", parts: [{ text: message }] }],
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       console.error("Gemini API error:", data);
  //       return res.status(response.status).json({ error: data.error?.message || "API error" });
  //     }

  //     const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  //     res.json({ reply });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Something went wrong" });
  //   }
  // });

  app.listen(PORT, () => {
    console.log("Server is listening to the port", PORT);
    connectDb();
  });

  const connectDb=async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected with DB:)");
    }
    catch(err){
      console.log(err);
    }
  }