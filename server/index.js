const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();

const app = express();

const UserModel = require('./models/User');

app.use(express.json());
app.use(cors());

const port = 3014;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser : true
});

const connection = mongoose.connection;
connection.once('open', () => { 
    console.log('MongoDB database connection established');
});

app.post("/insert", async (req, res) => {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    mobileNo = req.body.mobileNo;

    const user = new UserModel({
        firstName: firstName, 
        lastName: lastName,
        email: email,
        mobileNo: mobileNo});

    try{
        await user.save()
        res.send("inserted user");

    }catch(err){
        console.log(err)
    }
})

app.get("/read", async (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.put("/update", async (req, res) => {
    id = req.body.id;
    newFirstName = req.body.newFirstName;
    newLastName = req.body.newLastName;
    newEmail = req.body.newEmail;
    newMobileNo = req.body.newMobileNo;

    console.log(id, newFirstName, newLastName, newEmail, newMobileNo);

    try{
        await UserModel.findById(id, (err, updatedUser) => {
            if(newFirstName) updatedUser.firstName = newFirstName;
            if(newLastName) updatedUser.lastName = newLastName;
            if(newEmail) updatedUser.email = newEmail;
            if(newMobileNo) updatedUser.mobileNo = newMobileNo;
            updatedUser.save();
            res.send("update");
        })

    }catch(err){
        console.log(err)
    }
})

app.delete("/delete/:id", async (req, res) => {
    id = req.params.id;
    console.log(id);

    await UserModel.findByIdAndDelete(id);
    res.send("deleted");
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});