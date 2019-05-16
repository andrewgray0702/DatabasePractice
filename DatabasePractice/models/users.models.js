const pool = require('../connections').pool;
const bcrypt = require('bcrypt');

function create(req, res){
    pool.query("SELECT * FROM USER WHERE username = ?", 
    [req.body.username], (err, queryReturn)=>{
        if(queryReturn[0]){
           return res.send('USERNAME ALREADY EXISTS')
        }
        let password = bcrypt.hashSync(req.body.password, 5);
        let username = req.body.username;
        console.log(password);
        console.log(req.body);
        pool.query("INSERT INTO USER (username, password) VALUES(?,?)", [username, password], (err, result)=>{
            if(!err){
                return res.send('Signed Up!')
            }
            res.status(500).send("OOPS! SOMETHING WENT WRONG")
        })
    })
}

function getAll(req, res){
    pool.query('SELECT id, username FROM USER', (err, result)=>{
        res.send({
            error: err,
            users: result
        })
    })
}

function login(req, res){
    pool.query('SELECT * FROM WHERE username = ?', [req.body.username], (err, result) => {
        if(result){
            if(bcrypt.compareSync(req.body.password, result[0].password)){
                return res.send({message: "Welcome Back!"})
            } else {
                return res.send({error: "Invalid Username or Password"});
            }
        }
        res.send({error: "Invalid Username or Password"})
    })
}

module.exports.getAll = getAll;
module.exports.login = login;
module.exports.create = create;