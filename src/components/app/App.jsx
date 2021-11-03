import React, { useEffect } from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import ImgSoluce from './../../assets/_1_1.jpg'
import axios from 'axios';

const NBRBUTTON = 12;
const SOLUTION = ['FEU','GLACE','TERRE','EAU'];


function DivLettre(props){

    function displayButton(number){
        return Array.from(Array(number), (notUsed, index) => {
            return <BtnLettreButton id={index+1} key={index} class="lettre" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}} positionTwo={props.positionTwo} setPositionTwo={(newPositionTwo)=>{props.setPositionTwo(newPositionTwo)}} />;
        })
    }

        return (
        <div className="divLettre">
            {displayButton(props.solution.length)}
        </div>
    );
    
}

function NavBar(props) {
    return (
    <nav className="navigation-bar" >
        <img className="logo" src={Logo} alt=""/>;
        <h3>Quatre Images Un Mot</h3>
        <div className="divNiveau" >
            <span className="niveau">{props.level}</span>
        </div>
    </nav>
    )
}

function BtnLettre(props){

    const [Shuffled, setShuffled] = React.useState();

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
    function createstring(level) {
        let answer = props.solution;
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

    useEffect(()=> {
        console.log("Shuffled has changed");
        

     },[Shuffled]);

    useEffect(()=> {
        console.log("solution has changed");
        setShuffled(props.solution);
        console.log(props.solution);
        console.log(s);

     },[props.solution]);
     
     

        

    let s = createstring(props.level);
    let itemList = Array.from(Array(NBRBUTTON)).map((item,i)=>{
        return <BtnGroupButton id={i} key={i} value={s[i]} class="btn" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}} positionTwo={props.positionTwo} setPositionTwo={(newPositionTwo)=>{props.setPositionTwo(newPositionTwo)}} />;

     });

        return (
            <> 
            <p>{s}</p>
            <div id="btnLettre">
            {/* {Array.from(Array(NBRBUTTON), (notUsed, i)=>{
                return <BtnGroupButton id={i} key={i} value={s[i]} class="btn" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}} positionTwo={props.positionTwo} setPositionTwo={(newPositionTwo)=>{props.setPositionTwo(newPositionTwo)}} />;
                })} */}

{itemList}
            </div>
            </>
        );
}

function BtnLettreButton(props) {


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
                ;


                if(element.lettreId ===props.id){
                    // console.log("btn lettre useEffect start")
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

    // Dans le cas où un niveau est passé essai est de nouveau égal à 0: on remet les valeurs à "_"
     if(props.essai === 0){
         setValue("_");
     }

    }
     },[props.essai]);


        
    function handleClick() {
        

        if(Object.keys(props.positionTwo).length === Object.keys(props.position).length){
        // console.log("btn lettre handleclik start");
 
        //delete the specific character
        
        // loop position
        for (const key in props.positionTwo) {
            if (Object.hasOwnProperty.call(props.positionTwo, key)) {
                const element = props.positionTwo[key];

                // delete the corresponding lettre in essai
                if(key===(props.id+"")){
                    
                    setValue("_");
                    setDisabledAttribute("disabled");
                    delete props.positionTwo[(props.id+"")];

                    props.setEssai(props.essai-1);
                    console.log("Lettre à supprimé : "+ element.value+" idlettre : " + element.btnId);

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

function ImgSolutions(props) {

    // ! add the possibility to zoom an image

    return (<img id={"img" + props.id} className="img" src={props.ImgSoluce}  alt=""/>);
}

function Images(props) {

    const apiUrl = 'https://pixabay.com/api';
    const apiKey = '14103325-b948c3fc34be7c939206bed1b';
    const amount = 4;
    const [images, setImages] = React.useState([]);

    function LoadImages() {
        axios
        .get(`${apiUrl}/?key=${apiKey}&q=${
            props.solution
          }&per_page=${amount}&safesearch=true`
          )
          .then(res => setImages(res.data.hits))
          .catch(err => console.log(err));
    }

    return (
            <table>
                <tbody>
                    <tr>
                        <td><ImgSolutions id="1" ImgSoluce={ImgSoluce} /></td>
                        <td><ImgSolutions id="2" ImgSoluce={ImgSoluce} /></td>
                    </tr>
                    <tr>
                        <td><ImgSolutions id="3" ImgSoluce={ImgSoluce} /></td>
                        <td><ImgSolutions id="4" ImgSoluce={ImgSoluce} /></td>
                    </tr>
                </tbody>
            </table>
    );
}

function BtnGroupButton(props) {

    const [value, setValue] = React.useState(props.value);
    const [disabledAttribute, setDisabledAttribute] = React.useState("");

    // event quand une lettre noire est cliquée (on l'a déjà supprimé de essai) on sélectionne le blanc qui convient pour le réactiver (et delete au niveau de position)
    useEffect(()=> {

        if(Object.keys(props.positionTwo).length < Object.keys(props.position).length && (props.essai < Object.keys(props.position).length)){
        // console.log("btn group useEffect start");
        // console.log("essai change : " + props.essai);
        // console.log("\nposition : ");
        // console.log(props.position);
        
        // console.log("\npositionTwo : ");
        // console.log(props.positionTwo);


        
                
               let aSupprimer = 0;
               let cptPosition = 0;

               // on check si le bouton n'est pas dans  positionTwo
               for (const keyTwo in props.positionTwo) {
                   if (Object.hasOwnProperty.call(props.positionTwo, keyTwo)) {
                       const elementTwo = props.positionTwo[keyTwo];
                       if(elementTwo.btnId === (props.id+"") && elementTwo.value===value){
                        //    s'il est dans position on incrémente
                            aSupprimer= aSupprimer +1;
                       }
                       
                   }
               }


               // on check si le bouton est tjrs dans  position
               for (const key in props.position) {
                   if (Object.hasOwnProperty.call(props.position, key)) {
                       const element = props.position[key];

                       if((key === (props.id+"") && element.value===value)){
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
            b[(props.id)]={value: value, lettreId: a};
            props.setPosition(b);
            // making this only to react in black button (lettre)
            props.setEssai((props.essai+1));
        }
         
    }

    return (
        <button type="button" value="" id={props.id+1} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

/// bouton de validation de réponse
function Button(props) {
    function handleClick(){
        if(props.solution.length === props.essai){
            // console.log(props.positionTwo);
            let a = '';
            for (const keyTwo in props.positionTwo) {
                if (Object.hasOwnProperty.call(props.positionTwo, keyTwo)) {
                    const elementTwo = props.positionTwo[keyTwo];
                    // console.log(elementTwo);
                    a+=elementTwo.value;
                    
                }
            }
            if(props.solution===a){
                props.setLevel(props.level + 1)
            }
        }
    }

    return (<button type="button" value="" id={props.id} onClick={handleClick}  className={props.class}>{props.value}</button>);
}
function App(){

    const [level, setLevel] = React.useState(1);
    const [solution, setSolution] = React.useState(SOLUTION[0]);
    
    // compteur qui va compter le nombre de lettre appuyée
    const [essai, setEssai] = React.useState(0);

    // tableau des blanc qui a pour key les id blanc et value les lettreid correspondant ainsi que les value blanc
    const [position, setPosition] = React.useState({});

    // tableau des lettres noires qui a pour key les id lettres et value les btnid correspondant ainsi que les value blanc assignées
    const [positionTwo, setPositionTwo] = React.useState({});

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(()=> {
        setSolution(SOLUTION[(level-1)]);
        setEssai(0);
    },[level]);
    
        return (
            <>
                <div className="container">
                    <NavBar level={level}/>
                    <hr/>
                    <Images solution={solution} />
                    <hr/>
                    <DivLettre solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} positionTwo={positionTwo} setPositionTwo={(newPositionTwo)=>{setPositionTwo(newPositionTwo)}} />
                    <BtnLettre solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} positionTwo={positionTwo} setPositionTwo={(newPositionTwo)=>{setPositionTwo(newPositionTwo)}} />

                    <br/>
                    <Button id="Exo2" solution={solution} setSolution={(newSolution)=>{setSolution(newSolution)}} essai={essai} positionTwo={positionTwo} level={level} setLevel={(newLevel)=>{setLevel(newLevel)}} value="VALIDER"/>
                </div>
            </>
        );
    
}

export default App;
