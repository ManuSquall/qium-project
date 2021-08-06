//################################################################################################






//################################################################################################



//on recup les données qui sont venu avec la réponse de la page
var niv =id;
var solution=mot;

console.log(niv);
console.log(solution);


// nbrRep représente le nombre de lettre de la solution
// doit varier selon les niveau
var nbrRep = solution.length;
// console.log(solution.length);

// nbrBtn représente le nombre de button de proposition
// doit varier selon les niveaux
//finalement ne variera pas
var nbrBtn = 12;

// solution est la chaine de char représentant la soluce
// elle sera comparée à la proposition pour changer de niveau
//var solution="CHALEUR";


//################################################################################################



//on initialise tout le temps le niveau au démarrage de la page

//le niveau
var nivHTML = document.querySelector(".niveau");
nivHTML.textContent=niv;

//les images
var imgs=document.querySelectorAll("img");
            //console.log(imgs);
            //i=1 cause of the first img in the navbar
            for (let i = 1; i < imgs.length; i++) {
                imgs[i].setAttribute("src","assets/img/_"+niv+"_"+(i)+".jpg");
            }


//le nombre de bloc de la rep: doit etre egal a la longueur de la solution
var divRep = document.getElementsByClassName("divLettre")[0];
divRep.innerHTML="";


for (let i = 0; i < nbrRep; i++) {
    var btnRep = document.createElement("button");
    btnRep.setAttribute("type","button");
    btnRep.setAttribute("class","lettre");
    btnRep.setAttribute("id",("lettre"+(i+1)));
    btnRep.setAttribute("disabled","");
    btnRep.textContent="_";

    divRep.appendChild(btnRep);
    
}


//les propositions: les lettres de la solution
//remplissage aleatoire
//le cpta est pour indiquer les positions du mot soluce a partir de la derniere lettre 
var cpta = nbrRep;
var manu;
// manu est un nombre aleatoire entre un intervalle donné
for (let i = 0; i < (nbrRep); i++) {
    //pour chaque lettre de la solution
    manu = (""+Math.ceil(Math.random()*(12-1)+1));
    // console.log(manu);
    // console.log(typeof(manu));
    //on choisit un emplacement aleatoire parmis les 12 cases
    var alea = document.getElementById(manu);
    //console.log(alea);

    if(alea.textContent=="_"){
        //si la case est vide on y met une lettre solution
        alea.textContent=solution[(cpta-1)];
        cpta--;
    }
    else{
        i--;
    }
    
}

let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//console.log(alphabet.length);
//on remplie les autres cases vides de lettres random
for (let i = 0; i < (nbrBtn); i++) {
    var alea = document.getElementById((""+(i+1)));
    if(alea.textContent=="_"){
        //je répète manu intentionnellement
        manu = (""+Math.ceil(Math.random()*(25)));
        alea.textContent=alphabet[manu];
        
        
    }
}






var cpt=0;


var position =[];

//################################################################################################

//      cliquer sur un bouton pour ajouter une lettre

for (let i = 0; i < nbrBtn; i++) {
    

    document.getElementById((""+(i+1))).addEventListener('click', function(){
        // alert("Vous avez cliqué sur "+this.textContent);

        for (let j = 0; j < nbrRep; j++) {
            
            if(document.getElementById(("lettre"+(j+1))).getAttribute("disabled")==""){

                document.getElementById(("lettre"+(j+1))).textContent=this.textContent;
                position[j]=i;
                document.getElementById(("lettre"+(j+1))).removeAttribute("disabled");


                this.setAttribute("disabled","");
                cpt++;
                break;
            }
            
        }



    });
    
}

//###############################################################################################################


//          cliquer sur un bouton pour enlever une lettre


for (let i = 0; i < nbrRep; i++) {
    
    document.getElementById(("lettre"+(i+1))).addEventListener('click', function(){


        for (let j = 0; j < nbrBtn; j++) {
            
            if(position[i]==j){

                document.getElementById((""+(j+1))).removeAttribute("disabled");
                this.setAttribute("disabled","");
                this.textContent="_";
                cpt--;
            }
        }
    });
    
}

//#######################################################################################################


// si on clique sur le bouton suivant pour valider

var valider= document.getElementById("Exo2");

valider.addEventListener("click",function(){
    if(cpt!=nbrRep){
        alert("Veuillez former un mot de "+nbrRep+" lettre!");
    }
    else{
        //alert("Avez vous trouvé?");
        //console.log(cpt);
        var rep = document.getElementsByClassName("lettre");
        var repchaine="";
         for (let i = 0; i < rep.length; i++) {
             repchaine+=rep[i].textContent;
             
         }
        //console.log(repchaine);
        if(repchaine!=solution){
                alert("Ce n'est pas le bon mot!! Veuillez reesayer svp!");
        }
        else{
            //      quand on a trouve le mot
            //alert("Bravoo vous avez trouve!!");


            //on augmente le niveau
            niv++;

            var form = document.getElementById("squall");
            form.setAttribute("action", "/"+niv);
            form.setAttribute("method", "get");
            valider.setAttribute("type", "submit");

            


            
            
                
            
        }


    }



});

//*/





