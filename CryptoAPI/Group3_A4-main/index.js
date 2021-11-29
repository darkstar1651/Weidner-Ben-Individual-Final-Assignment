const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());

//mongoDB Package
const mongoose = require('mongoose');

const PORT = 1200;

//const dbUrl = 'mongodb+srv://Drickikcha:1234@cluster0.iwesf.mongodb.net/Project1?retryWrites=true&w=majority';
const dbUrl = 'mongodb+srv://admin:Password1@cluster0.wdioz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

//Mongo DB Connection

const db = mongoose.connection;

//handle DB Error, display connection

db.on('error', ()=>{
    console.error.bind(console,'connection error: ');
});

db.once('open', () => {
    console.log('MongoDB Connected');
});

//Schema/Model Declaration
require('./Models/studentObject');
require('./Models/courseObject');

const Student = mongoose.model('Student');
const Course = mongoose.model('Course');

app.get('/',(req,res) => {
    return res.status(200).json("(message: OK)");
});

app.post('/addCourse', async (req,res) => {
    try{
        let course = {
            courseInstructor: req.body.courseInstructor,
            courseCredits: req.body.courseCredits,
            courseID: req.body.courseID,
            courseName: req.body.courseName
        }
        await Course(course).save().then(c => {
            return res.status(201).json("Course Added");
        });
    }
    catch{
        return res.status(400).json("(message: Failed to Add Course - Bad Data)");
    }
});

app.get('/getAllCourses', async (req,res) => {
    try{
        let courses = await Course.find({}).lean();
        return res.status(200).json({"courses": courses});
    }
    catch{
        return res.status(400).json("(message: Failed to Access Course Data)")
    }
});

app.get('/findCourse', async (req,res) => {
    try{
        let query = req.body.courseID;
        let courses = await Course.find({"courseID" : query});
        return res.status(200).json(courses);
    }
    catch{
        return res.status(400).json("(message: Failed to Access Course Data)")
    }
});

app.post('/addStudent', async (req,res) => {
    try{
        let student = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID
        }
        await Student(student).save().then(s => {
            return res.status(201).json("Student Added");
        });
    }
    catch {
        return res.status(400).json("(message: Failed to Add Student - Bad Data)");
    }
});

app.get('/getAllStudents', async (req,res) => {
    try{
        let students = await Student.find({}).lean();
        return res.status(200).json({"students": students});
    }
    catch{
        return res.status(400).json("(message: Failed to Access Student Data)")
    }
});

app.get('/findStudent', async (req,res) => {
    try{
        let query = req.body.fname;
        let students = await Student.find({"fname" : query});
        return res.status(200).json(students);
    }
    catch{
        return res.status(400).json("(message: Failed to Access Student Data)")
    }
});
//edit student by id added----------------------------------------------------
app.post('/editStudentById', async (req, res) =>{
    try{
        student = await Student.updateOne({"_id": req.body.id}
        , {
        fname: req.body.fname
        }, {upsert: true});
        if(student)
       {
         res.status(200).json("(message: Student Edited)");
            }
        else
        {
         res.status(200).json("(message: No Student Changed)");
        }
    }
    catch
    {
        res.status(500).json("(message: Failed to Edit Student)");

    }
});
    


//edit student by fname added---problems---------------------------------------
app.post('/editStudentByFname', async (req, res) =>{
    try{
        student = await Student.updateOne({"fname": req.body.querryFname}
        , {
        fname: req.body.fname,
        lname: req.body.lname
        }, {upsert: true});
        if(student)
       {
         res.status(200).json("(message: Student Edited)");
            }
        else
        {
         res.status(200).json("(message: No Student Changed)");
        }
    }
    catch
    {
        res.status(500).json("(message: Failed to Edit Student)");

    }
});
//----------edit Course by course name-----------------------------------
app.post('/editCourseByCourseName', async (req, res) =>{
    try{
        course = await Course.updateOne({"courseName": req.body.courseName}
        , {
        courseInstructor: req.body.instructorName,
        }, {upsert: true});
        if(course)
       {
         res.status(200).json("(message: Course Edited)");
            }
        else
        {
         res.status(200).json("(message: No Course Changed)");
        }
    }
    catch
    {
        res.status(500).json("(message: Failed to Edit Course)");

    }
});
//delete student by id (not required but usefull)
app.post('/deleteStudent', async (req,res) =>{
    try{
        let student = await Student.findOne({"_id": req.body.id});

        if(student){
            await Student.deleteOne({"_id": req.body.id});
            res.status(200).json("(message: deleted student successful)");

        }
        else{
            res.status(200).json("{message: No student deleted -- querry null}");
        }
    }
    catch{
        res.status(500).json("(message: Failed to delete student)");
    }
});


//remove student from classes--------------------------------
app.post('/removeStudentFromClasses', async (req,res) =>{
    try{
        let student = await Student.findOne({"studentID": req.body.studentId});

        if(student){
            await Student.deleteOne({"studentID": req.body.studentId});
            res.status(200).json("(message: Removed Student Successful)");

        }
        else{
            res.status(200).json("{message: No Student Removed -- Querry Null}");
        }
    }
    catch{
        res.status(500).json("(message: Failed to Remove Student)");
    }
});


//delete course by course ID---------------------------------------------------------
app.post('/deleteCourseById', async (req,res) =>{
    try{
        let course = await Course.findOne({"_id": req.body.id});

        if(course){
            await Course.deleteOne({"_id": req.body.id});
            res.status(200).json("(message: Deleted Course Successful)");

        }
        else{
            res.status(200).json("(message: No Course Deleted -- Querry Null)");
        }
    }
    catch{
        res.status(500).json("(message: Failed to Delete Course)");
    }
});




//--------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});


//11:27
//15 going over potential problem