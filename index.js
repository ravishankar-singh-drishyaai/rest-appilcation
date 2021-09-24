const Joi = require("joi")
const express = require("express")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

courses = [
    {id: 1, name : 'course1'},
    {id: 2, name : 'course2'},
    {id: 3, name : 'course3'}
]
app.get("/", (req, res) =>{
    res.send("Hello world!")
});

app.get("/api/courses", (req, res) =>{
    res.send(courses)
});

app.get("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("This course id is not present in the courses")
    
    res.send(course)
});

app.post("/api/courses", (req, res) =>{

    const { error } = validateCourse(req.body)

    if(error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id : courses.length + 1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course)
})


app.put("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
       return res.status(404).send("This course id is not present in the courses")
    }

    const { error } = validateCourse(req.body)

    if(error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    course.name = req.body.name

    res.send(course)
});

app.delete("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("This course id is not present in the courses")

    const index = courses.indexOf(course)

    courses.splice(index, 1)

    res.send(courses)
})

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

app.listen(port, ()=>{
    console.log(`App is running on port ${port}` );
})