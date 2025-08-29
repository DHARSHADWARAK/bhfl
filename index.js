import express from "express";
import bodyParser from "body-parser";

const serv = express();
serv.use(bodyParser.json());

const fullName = "Ravuri_Dharsha_Dwarak";
const dob = "31122005";
const email = "dharshadwarakravuri@gmail.com";
const Reg = "22BDS0347";

// POST route
serv.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Create concat string
    let letters = data.filter(item => /^[a-zA-Z]+$/.test(item)).join("");
    letters = letters.split("").reverse().join("");
    let concat_string = "";
    for (let i = 0; i < letters.length; i++) {
      concat_string += i % 2 === 0
        ? letters[i].toUpperCase()
        : letters[i].toLowerCase();
    }

    res.json({
      is_success: true,
      user_id: `${fullName.toLowerCase()}_${dob}`,
      email: email,
      roll_number: Reg,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// for local testing
serv.listen(3000, () => {
  console.log("Server running on port 3000");
});
