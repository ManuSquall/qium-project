import React, { useEffect } from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import ImgSoluce from './../../assets/_1_1.jpg'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NBRBUTTON = 12;

class DivLettre extends React.Component {

    displayButton(number){
        return Array.from(Array(number), (notUsed, index) => {
            return <BtnLettreButton id={index+1} key={index} class="lettre"/>;
        })
    }

    render(){
        return (
        <div className="divLettre">
            {this.displayButton(this.props.nbrRep)
            }
        </div>
    );
    }
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

    const [proposedWord, setProposedWord] = React.useState(props.essai);

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
            var btnElement = document.getElementById((""+(i+1)));
            if(btnElement.textContent==="_"){
                let randomNumber = (""+Math.ceil(Math.random()*(25)));
                btnElement.textContent=ALPHABET[randomNumber];     
            }
        }
    }

    // fill the propositions buttons with solution words on mount
    useEffect(()=>{
        fillWithSolutionWord(props.solution);        
    });
    
    // fill the propositions buttons with random words on mount
    useEffect(()=>{
        fillWithRandomWord(props.solution);        
    });

        return ( 
            <div id="btnLettre">
            {Array.from(Array(NBRBUTTON), (notUsed, i)=>{
                return <
                    BtnGroupButton id={i} key={i} class="btn" solution={props.solution} />;
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

     useEffect(()=> {
        console.log("essai dans lettre"+props.id+" : "+props.essai);

        // console.log(document.getElementById(""+props.id));
        // console.log(props.id);
        // console.log(props.position);
        // console.log(props.essai[(props.position.length-1)]);
        if((props.position.length===props.id && props.position.length===props.essai.length)){
            setValue(props.essai[(props.position.length-1)]);
            setDisabledAttribute("")
        }

        // return (() => {setDisabledAttribute("")});
        

        // let a = [];
        // let fullBtn = document.getElementsByClassName("btn");
        // console.log(fullBtn);
        // for (let i = 0; i < fullBtn.length; i++) {
        //     console.log(fullBtn[i].getAttribute("disabled"));
        //     if(fullBtn[i].getAttribute("disabled")!==null){
        //         a.push(fullBtn[i]);
        //     }

        // }

        // setValue(props.essai);
        // setDisabledAttribute("");
     },[props.essai]);


    function handleClick(params) {

        props.onChangeEssai(props.essai.slice(0, -1));
        // if()
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

    const [value, setValue] = React.useState("A");
    const [disabledAttribute, setDisabledAttribute] = React.useState("");


    useEffect(()=> {
        console.log("essai dans btn"+props.id+" : "+props.essai);
        console.log("squall1 : " + (props.position[props.position.length-1]===props.id  ));
        console.log("squall2 : " + (props.position.length===(props.essai.length+1)));
        if((props.position[props.position.length-1]===props.id  ) && (props.position.length===(props.essai.length+1))){
            props.position.pop();
            setDisabledAttribute("")
        }
        
     },[props.essai]);

    

    function handleClick(params) {
        props.onChangeEssai(props.essai + value);
        setDisabledAttribute("disabled");
        props.position.push(props.id);
        // for (let j = 0; j < props.solution.length; j++) {
            
        //     if(document.getElementById(("lettre"+(j+1))).getAttribute("disabled")===""){

        //         // setDisabledAttribute("disabled");

        //         document.getElementById(("lettre"+(j+1))).textContent = document.getElementById((props.id+1)).textContent;
        //         // document.getElementById((props.id+1)).textContent = "_";
        //         setValue("_");
        //         console.log("here dude");
        //         console.log(value);
                
        //         POSITION[j]=props.id;
        //         document.getElementById(("lettre"+(j+1))).removeAttribute("disabled");

        //         // cpt++;
        //         break;
        //     }
            
        // }

        // setDisabledAttribute("disabled");
        // setValue("_");
    }

    function handleChange(event){
        // const {name, value} = event.target;
        // console.log("Quelque chose a changé");
        // console.log(name);
        console.log(event.target.value);
        // const { name, value } = event.target;
        // setValue(prevValue => ({ ...prevValue, [name]: value }));
    }    

    return (
        <button type="button" value="" id={props.id+1} className={props.class} onChange={handleChange} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

function Button(props) {
    return (<button type="button" value="" id={props.id} className={props.class}>{props.value}</button>);
}
function App(){

    const [level, setLevel] = React.useState(1);
    const [solution, setSolution] = React.useState("FEU");
    const [essai, setEssai] = React.useState("");
    const [position, setPosition] = React.useState([]);

    useEffect(()=> {
        console.log("essai change");
    },[essai]);
    
    
        return (
            <>
                <div className="container">
                    <NavBar level={level}/>
                    <hr/>
                    <Images/>
                    <hr/>
                    {/* <DivLettre nbrRep={this.state.solution.length} essai={this.state.essai} /> */}
                    {/* <BtnLettre solution={this.state.solution} essai={this.state.essai}/> */}
                    <BtnLettreButton id={1} key={1} class="lettre" onChangeEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}} />
                    <BtnLettreButton id={2} key={2} class="lettre" onChangeEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={8} key={8} class="btn" solution={solution} onChangeEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <BtnGroupButton id={9} key={9} class="btn" solution={solution} onChangeEssai={(newEssai)=>{setEssai(newEssai)}} essai={essai} position={position} setPosition={(newPosition)=>{setPosition(newPosition)}}/>
                    <br/>
                    <Button id="Exo2" value="VALIDER"/>
                </div>
            </>
        );
    
}

export default App;
