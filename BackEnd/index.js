const express = require("express");
const app = express();
app.use(express.json());

// Middleware
const cors = require("cors");
const pool = require("./db");

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

// Authenticate
function authenticate(req, res, next) {
  // Check for JWT token
  if (req.headers.authorization) {
    let decode = jwt.verify(req.headers.authorization, "secretkey");
    if (decode) {
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(404).json({ message: "User is Unauthorized" });
  }
}

// Routes
const bcrypt = require("bcryptjs");

// SignUp
app.post("/register", async (req, res) => {
  try {
    let { email, password, confirm_password, user_name, contact_number } =
      req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    password = hash;
    confirm_password = hash;
    const addUser = await pool.query(
      "INSERT INTO login (inputemail, inputpassword,confirmpassword, username, phonenumber) VALUES ($1,$2,$3, $4,$5) RETURNING *",
      [email, password, confirm_password, user_name, contact_number]
    );
    res.status(201).json(addUser.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration went wrong",
    });
  }
});

// Log In
const jwt = require("jsonwebtoken");
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await pool.query("SELECT * FROM login WHERE inputemail=$1", [
      email,
    ]);
    user = user.rows[0];
    // console.log(user);
    if (user) {
      let compare = bcrypt.compareSync(password, user.inputpassword);
      if (compare) {
        let token = jwt.sign(
          { inputemail: user.inputemail, id: user.id },
          "secretkey"
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "Password doesn't match" });
      }
    } else {
      res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "LogIn went wrong" });
  }
});

// Get Products
app.get("/products", authenticate, async (req, res) => {
  try {
    let products = await pool.query("SELECT * FROM products");
    res.status(200).json(products.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Getting Products went wrong" });
  }
});

// Post A Product
app.post("/products", authenticate, async (req, res) => {
  try {
    const { product_name, sales_price, cost, product_category } = req.body;
    const AddProduct = await pool.query(
      "INSERT INTO products(cost, product_name,sales_price, product_tags) VALUES($1,$2,$3,$4) RETURNING *",
      [cost, product_name, sales_price, product_category]
    );
    res.status(201).json(AddProduct.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Posting the Product went wrong" });
  }
});

// Delete A Product
app.delete("/products/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteProduct = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deleting went wrong" });
  }
});

// Add Receipts

app.post("/addreceipt", authenticate, async (req, res) => {
  try {
    const { contact_name, scheduled_date, status, source_document } = req.body;
    const AddReceipt = await pool.query(
      "INSERT INTO receipts(contact_name, scheduled_date, status, source_document) VALUES ($1,$2,$3,$4) RETURNING * ",
      [contact_name, scheduled_date, status, source_document]
    );
    res.status(201).json(AddReceipt.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Adding receipt went wrong" });
  }
});

// Get Receipts
app.get("/receipts", async (req, res) => {
  try {
    let receipts = await pool.query(
      "SELECT id,contact_name,to_char(scheduled_date, 'dd/mm/yyyy'), status, source_document FROM receipts"
    );
    res.status(200).json(receipts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Getting Receipts went wrong" });
  }
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    pool(null, "/images");
  },
  filename: (req, file, callback) => {
    pool(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
const path = require("path");
// Post image
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
});
// Web Server
const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Web Server Started");
});
