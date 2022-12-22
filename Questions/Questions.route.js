const express = require("express");
const details = require("./Questions.model");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const newdetails = await details.find({});
    if (newdetails) return res.send(newdetails);
    else {
      return res.send("Nothing is there yet");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
app.get("/Search", async (req, res) => {
  let search = req.query
  console.log(search)
  try {
    const newQuestions = await details.find({
      category: search.category,
      difficulty: search.difficulty
    });
    res.send(newQuestions)
    // if (newdetails) return res.send(newdetails);
    // else {
    //   return res.send("Nothing is there yet");
    // }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// router.get("/Search", authenticateToken, async (req, res) => {
//   let search = req.query.tearms;
//   // Create expression
//   var re = new RegExp(search, "i");
//   let find = {};
//   let find2 = {};
//   if (search != undefined && search != "") {
// 	//This all are the fields that will used as match
// 	find = {
//       $or: [
//         { firstName: { $regex: re } },
//         { lastName: { $regex: re } },
//         { username: { $regex: re } },
//       ],
//     };
//   }
//   let dataSearched = await accounts
//     .find(find)
//     .select("firstName lastName username profileImage")
//     .limit(10);
//   res.json(dataSearched);
// });




app.post("/", async (req, res) => {
  try {
    let newdetails = await details.insertMany(req.body);
    console.log(newdetails);
    return res.status(201).send(req.body);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let data = await details.findByIdAndRemove(id, { new: true });
    console.log(data);
    return res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
