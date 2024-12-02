import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://codiment:coderhouse@cluster0.upyu7.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err));