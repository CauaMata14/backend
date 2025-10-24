//importa framework
const express = require("express");

// criar uma instancia da aplicaçao 
const app = express();


app.use((req, res) => {
    console.log("passei aqui");
    next();
});

//middleware de rota 
const router = express.Router();
router.get("/:id",(req, res) => {

    const{ id } = req.params; // {id: 1, param2: 5, param3: 6}
if (id == 1) return res.send("achei");
throw error("nao achei");

})














// inicia 
app.listen(3000, ()=>{
    console.log("App está on");

});