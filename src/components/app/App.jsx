import React, { useEffect } from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import DefaultImg from './../../assets/_1_1.jpg'
import axios from 'axios';

const NBRBUTTON = 12;
const SOLUTION = ['FEU','GLACE','TERRE','EAU'];


function DivSolution(props){

    function displaySolutionButton(number){
        return Array.from(Array(number), (notUsed, index) => {
            return <SolutionButton id={index+1} key={index} class="lettre" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} positionTwo={props.positionTwo} setPositionTwo={(newPositionTwo)=>{props.setPositionTwo(newPositionTwo)}} />;
        })
    }

        return (
        <div className="divLettre">
            {displaySolutionButton(props.solution.length)}
        </div>
    );
}

function NavBar(props) {
    return (
    <nav className="navigation-bar" >
        <img className="logo" src={Logo} alt=""/>
        <h3>Quatre Images Un Mot</h3>
        <div className="divNiveau" >
            <span className="niveau">{props.level}</span>
        </div>
    </nav>
    )
}

function DivShuffledWord(props){

     let itemList = Array.from(Array(NBRBUTTON)).map((notUsed,i)=>{
        return <ShuffledButton key={props.shuffled + i} id={i}  value={props.shuffledWord[i]} class="btn" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}} positionTwo={props.positionTwo} />;

     });
    
        return (
            <> 
                <div id="btnLettre">
                    {itemList}
                </div>
            </>
        );
    
}

function SolutionButton(props) {

    const [value, setValue] = React.useState("_");
    const [disabledAttribute, setDisabledAttribute] = React.useState("disabled");

    // lorsque l'essai change quand un bouton blanc est appuyé
    // si la length du tableau est = au numéro de button et = à la longueur de l'essai
     useEffect(()=> {
        
        if(props.essai === Object.keys(props.position).length && Object.keys(props.positionTwo).length < Object.keys(props.position).length ){
        // find the white button associated with this lettre
        for (const key in props.position) {
            if (Object.hasOwnProperty.call(props.position, key)) {
                const element = props.position[key];

                if(element.lettreId ===props.id){
                    setValue(element.value);
                    setDisabledAttribute("");

                    // on ajoute ensuite à positionTwo 
                    let b = props.positionTwo;
                    b[(props.id)]={value: element.value, btnId: key};
                    props.setPositionTwo(b);
                }
            }
        }
    }else{

    // Dans le cas où un niveau est passé essai est de nouveau égal à 0: on remet les valeurs à "_" et on désactive les boutons précédemment activé
     if(props.essai === 0){
         setValue("_");
         setDisabledAttribute("disabled");
     }

    }
     },[props.essai]);


        
    function handleClick() {
        

        if(Object.keys(props.positionTwo).length === Object.keys(props.position).length){
        //delete the specific character
        
        // loop position
        for (const key in props.positionTwo) {
            if (Object.hasOwnProperty.call(props.positionTwo, key)) {

                // delete the corresponding lettre in essai
                if(key===(props.id+"")){
                    
                    setValue("_");
                    setDisabledAttribute("disabled");
                    delete props.positionTwo[(props.id+"")];

                    props.setEssai(props.essai-1);
                    break;
                }
                
            }
        }
    }
    }

    return (
        <button type="button" value="" id={("lettre" + props.id)} key={props.id} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

function ImgSolution(props) {

    // ! add the possibility to zoom an image

    return (<img id={"img" + props.id} className="img" src={props.ImgSoluce}  alt=""/>);
}

function Images(props) {

    return (
            <table>
                <tbody>
                    <tr>
                        <td><ImgSolution id="1" ImgSoluce={(!props.images[0])?DefaultImg:props.images[0].previewURL} /></td>
                        <td><ImgSolution id="2" ImgSoluce={(!props.images[1])?DefaultImg:props.images[1].previewURL} /></td>
                    </tr>
                    <tr>
                        <td><ImgSolution id="3" ImgSoluce={(!props.images[2])?DefaultImg:props.images[2].previewURL} /></td>
                        <td><ImgSolution id="4" ImgSoluce={(!props.images[3])?DefaultImg:props.images[3].previewURL} /></td>
                    </tr>
                </tbody>
            </table>
    );
}

function ShuffledButton(props) {

    const [disabledAttribute, setDisabledAttribute] = React.useState("");



    

    // event quand une lettre noire est cliquée (on l'a déjà supprimé de essai) on sélectionne le blanc qui convient pour le réactiver (et delete au niveau de position)
    useEffect(()=> {

        if(Object.keys(props.positionTwo).length < Object.keys(props.position).length && (props.essai < Object.keys(props.position).length)){

                
               let aSupprimer = 0;
               let cptPosition = 0;

               // on check si le bouton n'est pas dans  positionTwo
               for (const keyTwo in props.positionTwo) {
                   if (Object.hasOwnProperty.call(props.positionTwo, keyTwo)) {
                       const elementTwo = props.positionTwo[keyTwo];
                       if(elementTwo.btnId === (props.id+"") && elementTwo.value===props.value){
                        //    s'il est dans position on incrémente
                            aSupprimer= aSupprimer +1;
                       }
                       
                   }
               }


               // on check si le bouton est tjrs dans  position
               for (const key in props.position) {
                   if (Object.hasOwnProperty.call(props.position, key)) {
                       const element = props.position[key];

                       if((key === (props.id+"") && element.value===props.value)){
                            cptPosition = 0;
                            break;
                        }else{
                            cptPosition= cptPosition +1;
                        }
                   }
               }
                       


               if(aSupprimer ===0 && cptPosition===0 ) {
                    //    ce boutton est dans position mais pas dans positionTwo: il doit être supprimé
                    delete props.position[(props.id+"")];
                    setDisabledAttribute("");
               }
          

        }

        
     },[props.essai]);
    
    // une fois cliqué ajoute à position la key avec l'id btn blanc assigné
    function handleClick() {
        if(props.essai ===0){
            console.log(props.positionTwo);
            console.log(Object.keys(props.positionTwo).length);
        }
        if(Object.keys(props.position).length < props.solution.length && props.essai === Object.keys(props.positionTwo).length){
            // console.log("btn group handleclik start");


            // todo: loop trought essai and check button which contains "_" to replace it
            let a;
            let c = document.getElementsByClassName("lettre");
            for (let i = 0; i < c.length; i++) {
                if(c[i].textContent==="_"){
                    // lettre button id begin with 1
                    a=(i+1);
                    break;
                }
            }

            setDisabledAttribute("disabled");
            let b = props.position;
            b[(props.id)]={value: props.value, lettreId: a};
            props.setPosition(b);
            // making this only to react in black button (lettre)
            props.setEssai((props.essai+1));
        }
         
    }

    return (
        <button type="button" value="" id={props.id+1} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{props.value}</button>
    );
}


function App(){
   //////////////////////////////////////////////////////////////////////////////////
    // Code from Stack Overflow to generate a shuffled string
    // function for random shuffling
    String.prototype.shuffle = function () {
        let a = this.split("");
        let n = a.length;
    
        for(let i = n - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }
    /*
    creates string by padding the answer string with
    random letter that are not already in the answer
    string. Then returns the shuffled string in the end.
    */
    function createstring(solution) {
        
        let answer = solution;
        let numberremaining = NBRBUTTON - answer.length;
        let s = answer;
        let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let possible = "";
        for (let i = 0; i < ALPHABET.length; ++i) {
            if (answer.indexOf(ALPHABET[i]) === -1)
                possible += ALPHABET[i];
        }
        possible = possible.shuffle();
        for (let i = 0; i < numberremaining; ++i)
            s += possible[i];
        s = s.shuffle();
        
        return s;
    }
    //////////////////////////////////////////////////////////////////////////////////

    
     


    const [level, setLevel] = React.useState(1);
    const [solution, setSolution] = React.useState(SOLUTION[0]);


    const [shuffledWord, setshuffledWord] = React.useState(createstring(solution));
    
    // compteur qui va compter le nombre de lettre appuyée
    const [essai, setEssai] = React.useState(0);

    // tableau des blanc qui a pour key les id blanc et value les lettreid correspondant ainsi que les value blanc
    const [position, setPosition] = React.useState({});

    // tableau des lettres noires qui a pour key les id lettres et value les btnid correspondant ainsi que les value blanc assignées
    const [positionTwo, setPositionTwo] = React.useState({});



    const apiUrl = 'https://pixabay.com/api';
    const apiKey = '14103325-b948c3fc34be7c939206bed1b';
    const amount = 4;
    const [images, setImages] = React.useState([]);

    function LoadImages() {
        axios
        .get(`${apiUrl}/?key=${apiKey}&q=${
            solution
          }&per_page=${amount}&safesearch=true`
          )
          .then(res => setImages(res.data.hits))
          .catch(err => console.log(err));
    }

    useEffect(()=> {
        setSolution(SOLUTION[(level-1)]);
        setEssai(0);
        setPositionTwo({});
    },[level]);

    useEffect(()=> {        
        setshuffledWord(createstring(solution));
        LoadImages();
    },[solution]);

    useEffect(()=> {        
        if(solution.length === essai){
            let a = '';
            for (const keyTwo in positionTwo) {
                if (Object.hasOwnProperty.call(positionTwo, keyTwo)) {
                    a+=positionTwo[keyTwo].value;
                }
            }
            if(solution===a){
                setTimeout(function(){ 
                    alert("Bravo vous avez trouvé le mot!");
                    setLevel(level + 1);
                }, 500);
            }
        }
    },[essai]);
    
        return (
            <>
                <div className="container">
                    <NavBar level={level}/>
                    <hr/>
                    <Images images={images} />
                    <hr/>
                    <DivSolution solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} positionTwo={positionTwo} setPositionTwo={(newPositionTwo)=>{setPositionTwo(newPositionTwo)}} />
                    <br/>
                    <DivShuffledWord solution={solution} shuffledWord={shuffledWord} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} positionTwo={positionTwo} />
                    <br/>
                </div>
            </>
        );
    
}

export default App;
