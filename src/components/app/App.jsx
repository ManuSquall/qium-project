import React, { useEffect } from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import ImgSoluce from './../../assets/_1_1.jpg'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NBRBUTTON = 12;
// test 
// const NBRBUTTON = 5;

function DivLettre(props){

    function displayButton(number){
        return Array.from(Array(number), (notUsed, index) => {
            return <BtnLettreButton id={index+1} key={index} class="lettre" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}}/>;
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

    // const [proposedWord, setProposedWord] = React.useState(props.essai);

    function fillWithSolutionWord(solution) {
        let cpt = solution.length;
        for (let i = 0; i < solution.length; i++) {
            let randomPosition = (""+Math.ceil(Math.random()*(12-1)+1));
            let btnElement = document.getElementById(randomPosition);
            if(btnElement.textContent === "_"){
                btnElement.textContent=props.solution[(cpt-1)];
                cpt--;
            }
            else{
                i--;
            }
        }
    }

    function fillWithRandomWord() {
        for (let i = 0; i < NBRBUTTON; i++) {
            let btnElement = document.getElementById((""+(i+1)));
            if(btnElement.textContent==="_"){
                let randomNumber = (""+Math.ceil(Math.random()*(25)));
                btnElement.textContent=ALPHABET[randomNumber];     
            }
        }
    }

    // function for random shuffling
    String.prototype.shuffle = function () {
        let a = this.split(""),
            n = a.length;
    
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
            if (answer.indexOf(ALPHABET[i]) == -1)
                possible += ALPHABET[i];
        }
        possible = possible.shuffle();
        for (let i = 0; i < numberremaining; ++i)
            s += possible[i];
        s = s.shuffle();
        return s;
    }

    function fillWithWord(cpt, solution){
        for (let i = 0; i < NBRBUTTON; i++) {
            let randomNumber = (""+Math.ceil(Math.random()*(25)));

        }
    }

    let s = createstring(props.solution);

    // fill the propositions buttons with solution words on mount
    // useEffect(()=>{
    //     fillWithSolutionWord(props.solution);        
    //     fillWithSolutionWord(props.solution);        
    // });
    
    // fill the propositions buttons with random words on mount
    // useEffect(()=>{
    //     fillWithRandomWord(props.solution);        
    // });

        return ( 
            <div id="btnLettre">
            {Array.from(Array(NBRBUTTON), (notUsed, i)=>{
                return <BtnGroupButton id={i} key={i} value={s[i]} class="btn" solution={props.solution} setEssai={(newEssai)=>{props.setEssai(newEssai)}} essai={props.essai} position={props.position} setPosition={(newPosition)=>{props.setPosition(newPosition)}}/>;
                })}
            </div>
        );
}

function BtnLettreButton(props) {


    const [value, setValue] = React.useState("_");
    const [disabledAttribute, setDisabledAttribute] = React.useState("disabled");

    
    // useEffect(()=> {
    //     console.log("value a changé dans noir");
    //  }, [value]);

    // lorsque l'essai change quand un bouton blanc est appuyé
    // si la length du tableau est = au numéro de button et = à la longueur de l'essai
     useEffect(()=> {
        // console.log("essai dans lettre"+props.id+" : "+props.essai);

        // console.log(document.getElementById(""+props.id));
        // console.log(props.id);
        // console.log(props.position);
        // console.log(props.essai[(Object.keys(props.position).length-1)]);
        if((Object.keys(props.position).length===props.id && Object.keys(props.position).length===props.essai.length)){
            setValue(props.essai[(Object.keys(props.position).length-1)]);
            setDisabledAttribute("")
        }

        

        // setValue(props.essai);
        // setDisabledAttribute("");
     },[props.essai]);


    function handleClick(params) {
 
        //delete the specific character
        let newEssai = "";
        for (let i = 0; i < props.essai.length; i++) {
            if((i)!==(props.id-1-(props.solution.length-props.essai.length))){
                newEssai += props.essai[i]; 
            }
        }
        console.log("specific charrrrrrrrrrrrrrrrrr : " + (newEssai));
        props.setEssai(newEssai);
        setValue("_");
        setDisabledAttribute("disabled");

        // setDisabledAttribute("disabled");
        /*
        for (let j = 0; j < NBRBUTTON; j++) {
            
            console.log((POSITION[(props.id-1)]===(j+1)));

            
            if(POSITION[(props.id-1)]===(j+1)){
                // document.getElementById(("lettre"+(j+1))).removeAttribute("disabled");
                setDisabledAttribute("disabled");
                setValue("_");
                // cpt--;
            }
        }*/
        // return 1;
    }

    return (
        <button type="button" value="" id={("lettre" + props.id)} key={props.id} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

function ImgSolutions(props) {
    return (<img id={"img" + props.id} className="img" src={props.ImgSoluce}  alt=""/>);
}

function Images(props) {
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

    // event quand une lettre noire est cliquée on sélectionne le blanc qui convient
    useEffect(()=> {
        // console.log("essai dans btn"+props.id+" : "+props.essai);
        // console.log("squall1 : " + (props.position[Object.keys(props.position).length-1]===props.id  ));
        // console.log("squall2 : " + (Object.keys(props.position).length===(props.essai.length+1)));
        
        if(props.essai.length < Object.keys(props.position).length){
            for (var key in props.position) {
                // si ce bouton est dans position et était(ou est tjrs) dans essai
                
                if(key === (props.id+"") && props.position[key] ===value){

                    // on check s'il n'est dans essai (donc c'est celui qu'on vient de cliquer
                    console.log("squall");

                    for (let i = 0; i < props.essai.length; i++) {
                        if(props.essai[i]===value){
                            delete props.position[(props.id+"")];
                            setDisabledAttribute("");

                        }
                        
                    }

                }
            }
        }

        
            // props.position.pop();

        
     },[props.essai]);

     useEffect(() => {
        // console.log("");
      }, []);

    

    function handleClick() {
        if(Object.keys(props.position).length < props.solution.length ){
            props.setEssai(props.essai + value);
            setDisabledAttribute("disabled");
            let b = props.position;
            b[props.id]=value;
            props.setPosition(b);
        }
    }

    return (
        <button type="button" value="" id={props.id+1} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

function Button(props) {
    return (<button type="button" value="" id={props.id} className={props.class}>{props.value}</button>);
}
function App(){

    const [level, setLevel] = React.useState(1);
    const [solution, setSolution] = React.useState("FEU");
    const [essai, setEssai] = React.useState("");
    const [position, setPosition] = React.useState({});


    useEffect(()=> {
        console.log("essai change : " + essai);
        console.log(position);
    },[essai]);
    
    useEffect(()=> {
        console.log("position change : ");
        console.log(position);
    },[position]);
    
    
        return (
            <>
                <div className="container">
                    <NavBar level={level}/>
                    <hr/>
                    <Images/>
                    <hr/>
                    <DivLettre solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} />
                    <BtnLettre solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} />



                    {/* <BtnLettreButton id={1} key={1} class="lettre" setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} />
                    <BtnLettreButton id={2} key={2} class="lettre" setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnLettreButton id={3} key={3} class="lettre" setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={1} key={1} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={2} key={2} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={3} key={3} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={4} key={4} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={5} key={5} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={6} key={6} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={7} key={7} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={8} key={8} class="btn" solution={solution} setEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                     */}
                        
                    <br/>
                    <Button id="Exo2" value="VALIDER"/>
                </div>
            </>
        );
    
}

export default App;
