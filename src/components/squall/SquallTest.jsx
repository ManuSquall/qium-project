import React, { useEffect } from 'react';
import Logo from './../../assets/raw.jpg'
import axios from 'axios';
import $ from 'jquery';

const NBRBUTTON = 12;
const SOLUTION = ['FEU','GLACE','TERRE','EAU'];


function SquallTest(){

    
    
        return (
            <>
                <div className="container">
                     <FirstContainer value="test" />
                     
                </div>
            </>
        );
    
}

function FirstContainer(props){
    const [value, setValue] = React.useState(props.value);
    return (
        <>
    
                 <p>{value}</p>
                 
                 <Input/>
                 <Button1 setValue={(newPosition)=>{setValue(newPosition)}} />
                 <Button2 setValue={(newPosition)=>{setValue(newPosition)}} value={value} />
        </>
    );
}

function Input(){
    return (<input type="text" id="uname" name="name"/>);
}

function Button1(props){
    function handleClick() {
        props.setValue($("#uname").val());
    }

    return (<button type="button" value="" onClick={handleClick}> -> </button>);
}

function Button2(props){
    return (<button type="button" value="">{props.value}</button>);
}
export default SquallTest;
