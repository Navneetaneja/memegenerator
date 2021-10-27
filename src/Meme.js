import React, { useState } from 'react';
import './Meme.css';

const Meme=()=>{
    const [top,setTop]=useState("");
    const [bottom,setBottom]=useState("");
    const [image,setImg]=useState("");
    const topText=(e)=>{
        setTop(e.target.value);
    }
    const bottomText=(e)=>{
        setBottom(e.target.value);
    }
    const setImage=(e)=>{
        setImg(e.target.value);
    }
    const setImageviaUpload=()=>{
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("upload").files[0]);

        oFReader.onload = function (oFREvent) {
            setImg(oFREvent.target.result);
        };
    }
    return(
        <div className="container">
            <div class="navbar">
                <img height="50px" width="50px" alt="meme" src="https://www.pngplay.com/wp-content/uploads/7/Troll-Face-Internet-Meme-PNG-Clipart-Background.png"/>&nbsp;&nbsp;
                <h1>Meme Generator</h1>
            </div>
            <form>
                <input onChange={(e)=>topText(e)} type="text" placeholder="Top Text"/>&nbsp;
                <input onChange={(e)=>bottomText(e)} type="text" placeholder="Bottom text"/>&nbsp;
                <input onChange={(e)=>setImage(e)} type="text" placeholder="Image Link"/>&nbsp;
                <span> OR </span>&nbsp;
                <input onChange={()=>setImageviaUpload()} id="upload" type="file" accept="image/png , image/jpeg , image/jpg , image/HFEC"/>
            </form>
            <div style={{background:`url('${image}') center/cover`}} className="image">
                <h3>{top}</h3>
                <h3>{bottom}</h3>
            </div>
        </div>
    );
}
export default Meme;