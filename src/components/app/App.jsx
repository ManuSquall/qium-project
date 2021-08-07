import React from 'react';
import './App.css';
import Logo from './../../assets/raw.jpg'
import ImgSoluce from './../../assets/_1_1.jpg'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            level : 1,
            alphabet : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }
    }
    render(){
        return (
            <div>
            <nav className="navigation-bar" >
                <img className="logo" src={Logo} alt=""/>;
                <h3>Quatre Images Un Mot</h3>
            </nav>
    <div className="container">
        <div className="exam1">
            <div className="jeu">
            
            
                
                <div>
                    <div className="divNiveau" ><span className="niveau">{this.state.level}</span></div>
                    

                    <hr/>
                    
                    <div className="image">
                        <table>
                            <tr>
                                <td><img id="img1" className="img" src={ImgSoluce}  alt=""/></td>
                                <td><img id="img2" className="img" src={ImgSoluce}  alt=""/></td>
                            </tr>
                            <tr>
                                <td><img id="img3" className="img" src={ImgSoluce}  alt=""/></td>
                                <td><img id="img4" className="img" src={ImgSoluce}  alt=""/></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <hr/>
                
                
                
                <div className="btn-group divLettre">
                
                </div>
                <div id="btnLettre">
                <div className="btn-group">
                <button type="button" value="" id="1" className="btn">_</button>
                <button type="button" value="" id="2" className="btn">_</button>
                <button type="button" value="" id="3" className="btn">_</button>
                <button type="button" value="" id="4" className="btn">_</button>
                <button type="button" value="" id="5" className="btn">_</button>
                <button type="button" value="" id="6" className="btn">_</button>
                </div>
                <div className="btn-group">
                    <button type="button" value="" id="7" className="btn">_</button>
                    <button type="button" value="" id="8" className="btn">_</button>
                    <button type="button" value="" id="9" className="btn">_</button>
                    <button type="button" value="" id="10" className="btn">_</button>
                    <button type="button" value="" id="11" className="btn">_</button>
                    <button type="button" value="" id="12" className="btn">_</button>
                </div>
                </div>
        
                
                
            
        </div>
        
        
        <form action="" method="" id="squall">
            <button type="button" id="Exo2">
                    VALIDER
        </button>
    </form>
    
    </div>
    
    </div>
    </div>
  
        );
    }
}
function AppFunc() {
  return (<h1>Test</h1>
    );
}

export default App;
