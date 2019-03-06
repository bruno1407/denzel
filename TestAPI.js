var express = require('express');
var hostname = 'localhost'; 
var port = 3000;

var app = express(); 
var myRouter = express.Router();


app.use(myRouter);  
 
// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});

myRouter.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
});

myRouter.route('/piscines/:piscine_id')
.get(function(req,res){ 
	  res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.piscine_id});
})
.put(function(req,res){ 
	  res.json({message : "Vous souhaitez modifier les informations de la piscine n°" + req.params.piscine_id});
})
.delete(function(req,res){ 
	  res.json({message : "Vous souhaitez supprimer la piscine n°" + req.params.piscine_id});
});

myRouter.route('/piscines')
.get(function(req,res){ 
 res.json({
 message : "Liste les piscines de Lille Métropole avec paramètres :",
 ville : req.query.ville,
 nbResultat : req.query.maxresultat, 
 methode : req.method });
 
}).post(function(req,res){
  res.json({message : "Ajoute une nouvelle piscine à la liste", 
  nom : req.body.nom, 
  ville : req.body.ville, 
  taille : req.body.taille,
  methode : req.method});
})
 
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());