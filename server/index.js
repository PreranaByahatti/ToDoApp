const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const EmployeeModel = require('./models/Employee')
const TodoModel = require('./models/Todo')


const app = express()
app.use(express.json())
app.use(cors())



mongoose.connect("mongodb://127.0.0.1:27017/employee");
//mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
} )

app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    //console.log(id);
    TodoModel.findByIdAndUpdate({_id:id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
} )

app.post("/Login", (req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            } else {
                //alert("The password is incorrect.")
                res.json("The password is incorrect")
            }
        } else {
           // alert("No record exists.")
            res.json("No record exists")
        }
    })
})

app.post('/register', (req,res) =>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})



app.post('/add', (req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})