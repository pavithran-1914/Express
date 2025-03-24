const express=require('express');
const bodyparser=require('body-parser')
const app=express();
const port=4010;
let users=[]
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { id: users.length + 1, name, email, password };
    console.log(newUser)
    users.push(newUser);
    res.status(201).send(`User registered successfully! ID: ${newUser.id}`);
});
app.put('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name, email, password };
        res.status(200).send(`User updated successfully! ID: ${userId}`);
    } else {
        res.status(404).send('User not found');
    }
});
app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(200).send(`User deleted successfully! ID: ${userId}`);
})
app.listen(port,()=>console.log(`lisitening port number ${port} `))