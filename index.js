import express from "express";
import bodyParser from "body-parser";

const serv=express();

serv.use(bodyParser.json())

const fullName="Ravuri_Dharsha_Dwarak";
const dob="31122005";
const email="dharshadwarakravuri@gmail.com";
const Reg="22BDS0347";

serv.post("/bfhl",(req,res)=>{ 
  try{
    const{data}=req.body;
    if(!Array.isArray(data)){
      return res.status(400).json({is_success: false, error:"Inavalid input"});

    }

    let odd=[];
    let even=[];
    let alph=[];
    let special=[];
    let sum=0;

    data.forEach(item=>{
      if(/^-?\d+$/.test(item)){
        let num=parseInt(item);
        if(num%2===0) even.push(item.toString());
        else odd.push(item.toString());
        sum+=num;
      } else if (/^[a-zA-Z]+$/.test(item)){
        alph.push(item.toUpperCase());
      } else {
        special.push(item);
      }
    });

    let letters=data.filter(item=>/^[a-zA-Z]+$/.test(item)).join("");
    letters=letters.split("").reverse().join("");
    let concat_string = "";
    for (let i=0;i<letters.length;i++) {
      concat_string+=i%2===0
        ? letters[i].toUpperCase()
        : letters[i].toLowerCase();
    }

    res.json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: Reg,
      odd,
      even,
      alph,
      special,
      sum: sum.toString(),
      concat_string
    });
  }
   catch(err) {
    res.status(500).json({is_success: false,error:err.message});
  }
});

const PORT = process.env.PORT || 3000;
serv.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
