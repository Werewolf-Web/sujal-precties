const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); // JSON data read karva
app.use(cors());


// ------------------------             👉 Register API
let userData=[];
app.post("/register", (req, res) => {
  const { id,fullName, email, password, confirmPassword ,is_active} = req.body;
    const userDetail ={id,fullName, email, password, confirmPassword , is_active}
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password not match" });
  }
    userData.push(userDetail);
  console.log("User Data:", { id,fullName, email, password , is_active });
console.log("---------------------")
  res.status(201).json({ message: "Register success" });
});

// ------------------------             👉 Register store data in API


app.get("/user",(req,res)=>{
    res.json(userData);
})


// ------------------------             👉 Register get id in API



app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const user = userData.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
// ------------------------             👉 Register update data in API
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, confirmPassword, is_active } = req.body; // Add confirmPassword here if needed
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password not match" });
  }
  const userIndex = userData.findIndex(user => user.id == id);
  if (userIndex === -1) return res.status(404).json({ message: "User not found" });
  // Simplified validation for update
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  // Update user
  userData[userIndex] = {
    ...userData[userIndex],
    fullName,
    email,  
    password,
    confirmPassword,
    is_active,
  };
  res.json({ message: "User updated successfully" });
});

// ------------------------             👉 Register delete data in API


app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  // 👉 user find કરવો
  const userIndex = userData.findIndex(
    (user) => user.id === id
  );

  // 👉 user ના મળે તો
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // 👉 delete કરવો
  userData.splice(userIndex, 1);

  console.log("Deleted:", id);
  console.log("---------------------");

  res.json(userData);
});





// --------------------------------                 👉 Server start

app.listen(4000, () => {
console.log("---------------------")
  console.log("Server running on http://localhost:4000");
  console.log("---------------------")

});