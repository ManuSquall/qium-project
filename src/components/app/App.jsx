import React, { useEffect } from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import ImgSoluce from './../../assets/_1_1.jpg'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NBRBUTTON = 12;
let POSITION = [];
class DivLettre extends React.Component {

    displayButton(number){
        return Array.from(Array(number), (notUsed, index) => {
            return <BtnLettreButton id={"lettre" + (index+1)} key={index} class="lettre"/>;
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

    // fill the propositions buttons with solution words
    useEffect(()=>{
        fillWithSolutionWord(props.solution);        
    });
    
    // fill the propositions buttons with random words
    useEffect(()=>{
        fillWithRandomWord(props.solution);        
    });

        return ( 
            <div id="btnLettre">
            {Array.from(Array(NBRBUTTON), (notUsed, i)=>{
                return <BtnGroupButton id={i} key={i} class="btn" solution={props.solution}/>;
                })}
            </div>
        );
}

function BtnLettreButton(props) {


    const [value, setValue] = React.useState("_");
    const [disabledAttribute, setDisabledAttribute] = React.useState("disabled");

    function handleClick(params) {
        for (let j = 0; j < NBRBUTTON; j++) {
            
            if(POSITION[props.id]===j){
                document.getElementById((""+(j+1))).removeAttribute("disabled");
                setDisabledAttribute("");
                setValue("_");
                // cpt--;
            }
        }
    }

    return (
        <button type="button" value="" id={props.id} key={props.id} className={props.class} disabled={disabledAttribute} >{value}</button>
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

    const [value, setValue] = React.useState("_");
    const [disabledAttribute, setDisabledAttribute] = React.useState("");

    function handleClick() {
        for (let j = 0; j < props.solution.length; j++) {
            
            if(document.getElementById(("lettre"+(j+1))).getAttribute("disabled")===""){

                document.getElementById(("lettre"+(j+1))).textContent=value;
                POSITION[j]=props.id;
                document.getElementById(("lettre"+(j+1))).removeAttribute("disabled");


                // this.setAttribute("disabled","");
                setDisabledAttribute("");
                // cpt++;
                break;
            }
            
        }
    }

    return (
        <button type="button" value="" id={props.id+1} className={props.class} onClick={handleClick} disabled={disabledAttribute} >{value}</button>
    );
}

function Button(props) {
    return (<button type="button" value="" id={props.id} className={props.class}>{props.value}</button>);
}
class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            level : 1,
            solution : "FEU"
        }
    }

    render(){
        return (
            <>
                <div className="container">
                    <NavBar level={this.state.level}/>
                    <hr/>
                    <Images/>
                    <hr/>
                    <DivLettre nbrRep={this.state.solution.length} />
                    <BtnLettre solution={this.state.solution}/>
                    <br/>
                    <Button id="Exo2" value="VALIDER"/>
                </div>
            </>
        );
    }
}

export default App;
