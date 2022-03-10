const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const sequelize = require("./db");
const homeRouter = require("./routers/indexRouter");
const userRouter = require("./routers/userRouter");

app.use(cors());

app.use(express.json());
app.use("/home", homeRouter);
app.use("/user", userRouter);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`"Server started on ${PORT}"`);
    });
  } catch (error) {}
}

start();
