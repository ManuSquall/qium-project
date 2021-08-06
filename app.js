//on inclue le framework
const express = require('express');
const app = express();

//middleware bodyparser pour recup des donnee de l'url
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//specifier le dossier qui sert à distribuer les fichiers statics
app.use(express.static('public'));

//le port d'ecoute
const port = 47;

//on definie le moteur de template et le dir des vues
app.set('views', './views');
app.set('view engine', 'ejs');

//#########################################################################################

//                      CONNEXION A LA BASE DE DONNE

//on inclue le module mysql
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "qimgumot"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("database connected");
});

//#########################################################################################
//REQUETE

//      quand on arrive sur le port
app.get("/", (req, res) => {

    let sql = 'select * from solution where idsoluce = 1';
    let query = db.query(sql, (error, result, fields) => {
        if (error) {
            console.log(error);
        }
        res.render("index", {
            id: 1,
            mot: (result[0]['motsoluce']),
        });
    });
});


//      requete pour passer au niveau suivant
app.get('/:id', function (req, res) {
    if (!isNaN(req.params.id)) //si l'id est un nombre
    {
        if (req.params.id < 13) {

            // console.log(req.params.id);
            let sql = 'select * from solution where idsoluce = ' + req.params.id;
            let query = db.query(sql, (error, result, fields) => {
                if (error) {
                    console.log(error);
                    res.render("index", {
                        id: 1,
                        mot: (result[0]['motsoluce']),
                    });
                }
                res.render("index", {
                    id: (result[0]['idsoluce']),
                    mot: (result[0]['motsoluce']),
                });

            });
        }else{
            if(req.params.id == 13){
                res.render("squall");
            }else{
                res.render("index", {
                    id: 1,
                    mot: (result[0]['motsoluce']),
                });
            }
            
        }
    }
});

















app.listen(port, (err) => {
    if (err) throw err;
    console.log("App started on port " + port);
});