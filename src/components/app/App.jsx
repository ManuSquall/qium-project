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

    
    

    // lorsque l'essai change quand un bouton blanc est appuyé
    // si la length du tableau est = au numéro de button et = à la longueur de l'essai
     useEffect(()=> {
        

        if(props.essai.length === Object.keys(props.position).length){
        // find the white button associated with this lettre
        for (const key in props.position) {
            if (Object.hasOwnProperty.call(props.position, key)) {
                const element = props.position[key];
                ;


                if(element.lettreId ===props.id){
                    console.log("btn lettre useEffect start")
                    setValue(element.value);
                    setDisabledAttribute("");
                }
                
            }
        }

        
    }
     },[props.essai]);


     function remove_character(str, char_pos) 
        {
            let part1 = str.substring(0, char_pos);
            let part2 = str.substring(char_pos + 1, str.length);
            return (part1 + part2);
        }

        
    function handleClick() {
        

        if(props.essai.length === Object.keys(props.position).length){
        console.log("btn lettre handleclik start");
 
        //delete the specific character
        let newEssai = "";
        
        // loop position
        for (const key in props.position) {
            if (Object.hasOwnProperty.call(props.position, key)) {
                const element = props.position[key];

                // delete the corresponding lettre in essai
                if(element.lettreId===props.id){
                    
                    newEssai = remove_character(props.essai, (element.lettreId-1));
                    break;
                }
                
            }
        }

        //################################
        
        setValue("_");
        setDisabledAttribute("disabled");
        props.setEssai(newEssai);
        console.log("new essai : "+newEssai);
        console.log("props.essai : "+props.essai);
    }
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

    // event quand une lettre noire est cliquée (on l'a déjà supprimé de essai) on sélectionne le blanc qui convient pour le réactiver (et delete au niveau de position)
    useEffect(()=> {
        

       
        if(props.essai.length < Object.keys(props.position).length){
        console.log("btn group useEffect start");
        for (const key in props.position) {
            if (Object.hasOwnProperty.call(props.position, key)) {
                const element = props.position[key];
                
                // console.log("Si la valeur supprimée est toujours dans sa place à essai");
                // console.log("props.essai[element.lettreId-1]!==value"+ props.essai[(element.lettreId-1)] + " " +value);
                // console.log("Si la valeur n'as pas reculé d'un pas à cause de celle supprimée avant");
                // console.log("props.essai[element.lettreId-1]!==value"+ props.essai[(element.lettreId-2)] + " " +value);
                // si il est dans position && (que sa position de essai n'est plus la même, ou n'as pas diminué d'un rang vers la gauche dû à une autre lettre supprimé) c'est celle qu'on a delete
                if(key === (props.id+"") && (props.essai[element.lettreId-1]!==value && props.essai[element.lettreId-2]!==value)){
                    console.log("element supprimé dans essai : "+element.value);
                    console.log(key);
                    console.log(element);
                    delete props.position[(props.id+"")];
                    setDisabledAttribute("");
                }
                
            }
        }

        }

        
     },[props.essai]);

    //  useEffect(()=> {
    //     console.log("position change = ");
    //     console.log(props.position);
    // },[props.position[props.id]]);

    
    // une fois cliqué ajoute à position la key avec l'id btn blanc assigné
    function handleClick() {
        if(Object.keys(props.position).length < props.solution.length ){
            console.log("btn group handleclik start");


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

            // ! new letter isn't always added at the end
            // ! props.setEssai(props.essai + value);
            setDisabledAttribute("disabled");
            let b = props.position;
            b[(props.id)]={value: value, lettreId: a};
            props.setPosition(b);

            // making this only to react in black button (lettre)
            props.setEssai(props.essai+value);
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
    const [solution, setSolution] = React.useState("AMAS");
    const [essai, setEssai] = React.useState("");
    const [position, setPosition] = React.useState({});


    // useEffect(()=> {
    //     console.log("essai change : " + essai +"\nposition : ");
    //     console.log(position);
    // },[essai]);
    
    
    
    
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
