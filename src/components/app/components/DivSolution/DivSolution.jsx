import React, { useEffect } from 'react';

/**
 * Div displaying X solution buttons depending on the solution string length
 * @param {*} props 
 * @returns 
 */
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

/**
 * Button used for solution proposal
 * @param {*} props 
 * @returns button
 */
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

export default DivSolution;