const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require('./routes/student');
const setupSwagger = require("./swagger");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

app.use(express.json({ extended: false }));

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use('/api/students',studentRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
