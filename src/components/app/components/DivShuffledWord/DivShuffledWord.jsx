import React, { useEffect } from 'react';

const NBRBUTTON = 12;

/**
 * Div displaying 12 shuffled letter buttons
 * @param {*} props
 * @returns div of ShuffledButton
 */
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




/**
* Shuffled buttons used to suggest solution
* @param {*} props 
* @returns button
*/
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
       if(Object.keys(props.position).length < props.solution.length && props.essai === Object.keys(props.positionTwo).length){

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

export default DivShuffledWord;