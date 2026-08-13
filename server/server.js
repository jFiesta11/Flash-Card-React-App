const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://localhost:5173",
  }),
);
app.use(express.json);

app.get("/api/data", (req, res) => {
  res.json({ message: "CORS online" });
});

app.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
