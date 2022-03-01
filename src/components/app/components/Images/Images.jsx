import DefaultImg from './../../../../assets/_1_1.jpg'
/**
 * Solution image illustration
 * @param {*} props 
 * @returns 
 */
 function ImgSolution(props) {

    // ! add the possibility to zoom an image

    return (<img id={"img" + props.id} className="img" src={props.ImgSoluce}  alt=""/>);
}

/**
 * Images table
 * @param {*} props 
 * @returns 
 */
function Images(props) {

    return (
            <table>
                <tbody>
                    <tr>
                        <td><ImgSolution id="1" ImgSoluce={(!props.images[0])?DefaultImg:props.images[0].previewURL} /></td>
                        <td><ImgSolution id="2" ImgSoluce={(!props.images[1])?DefaultImg:props.images[1].previewURL} /></td>
                    </tr>
                    <tr>
                        <td><ImgSolution id="3" ImgSoluce={(!props.images[2])?DefaultImg:props.images[2].previewURL} /></td>
                        <td><ImgSolution id="4" ImgSoluce={(!props.images[3])?DefaultImg:props.images[3].previewURL} /></td>
                    </tr>
                </tbody>
            </table>
    );
}
export default Images;