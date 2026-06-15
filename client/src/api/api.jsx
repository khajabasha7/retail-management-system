const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-real-vercel-url.vercel.app"
  ],
  credentials: true
}));