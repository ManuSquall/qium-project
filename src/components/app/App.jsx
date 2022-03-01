import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

// custom components
import NavBar from './components/NavBar/NavBar';
import Images from './components/Images/Images';
import DivSolution from './components/DivSolution/DivSolution';
import DivShuffledWord from './components/DivShuffledWord/DivShuffledWord';

const NBRBUTTON = 12;
const SOLUTION = ['FEU','GLACE','TERRE','EAU'];

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
    
    // counter that will count the number of letters selected
    const [essai, setEssai] = React.useState(0);

    // tableau des blanc qui a pour key les id blanc et value les lettreid correspondant ainsi que les value blanc
    const [position, setPosition] = React.useState({});

    // tableau des lettres noires qui a pour key les id lettres et value les btnid correspondant ainsi que les value blanc assignées
    const [positionTwo, setPositionTwo] = React.useState({});


    const apiUrl = 'https://pixabay.com/api';
    const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
    const amount = 4;
    const [images, setImages] = React.useState([]);

    function LoadImages() {
        axios
        .get(`${apiUrl}/?key=${apiKey}&q=${
            solution
          }&per_page=${amount}&safesearch=true`
          )
          .then(res => setImages(res.data.hits))
          .catch(err => {
              console.log(apiKey);
              console.log(err);
            });
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
