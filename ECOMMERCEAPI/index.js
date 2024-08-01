const express = require("express");
const app = express();
const moongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
console.log("hello1")
dotenv.config();

moongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/api/test", () => {
  console.log("test is successful");
});

app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// fvrwlefjwlejnwflwnflkw