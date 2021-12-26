import React, { createRef, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Meme.css';
import { exportComponentAsJPEG} from 'react-component-export-image';

var i=0;
const Meme=()=>{
    const [top,setTop]=useState("");
    const [bottom,setBottom]=useState("");
    const [image,setImg]=useState("");
    const [mtop,setmTop]=useState(0);
    const [mbottom,setmBottom]=useState(0);
    const [topcolor,setTopColor]=useState("black");
    const [bottomcolor,setBottomColor]=useState("black");
    const [memes,setMemes]=useState([]);
    const [topleft,setTopleft]=useState(0);
    const [bottomleft,setBottomleft]=useState(0);
    const [topsize,setTopsize]=useState(1);
    const [bottomsize,setBottomsize]=useState(1);
    const meme=createRef();

    useEffect(()=>{
        firebase
        .firestore()
        .collection('memes')
        .onSnapshot((snapshot)=>{
            const meme=snapshot.docs.map((doc)=>{
                const data=doc.data();
                data['id']=doc.id;
                return data;
            })
            setMemes(meme);
        })
    },[])

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
        try{
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("upload").files[0]);
        
        oFReader.onload=function(s){
            setImg(s.target.result);
        }
        }
        catch(error)
        {
            setImg("");
        }
    }
    const getRandomImage=()=>{
        try{
        if(i===memes.length)
        {
            i=0;
        }
        setImg(memes[i].img);
        i++;
    }
    catch(error)
    {
        i++;
    }
    }
    const uploadimage=()=>{
        var x=prompt("Are you sure to add your data to our database ? (type y/n)");
        if(x==='y')
        {
        var z=prompt("enter secret code");
        if(z==="2001")
        {
        firebase
        .firestore()
        .collection('memes')
        .add({
            img:image
        })
        alert("Data added successfully");
        }
        else
        {
            alert("Incorrect code !! upload cancelled !! To upload contact owner of site via email (navand60@gmail.com) and get secret code...");
        }
        }
        else
        {
            alert("Data addition cancelled !!");
        }
        
    }
    
    const downloadimage=()=>{
        exportComponentAsJPEG(meme,{fileName:"meme-downloaded.jpeg",html2CanvasOptions:{border:"none"}});  
    }
    
    return(
        <div className="container">
            <div className="navbar">
                <img height="50px" width="50px" alt="meme" src="https://www.pngplay.com/wp-content/uploads/7/Troll-Face-Internet-Meme-PNG-Clipart-Background.png"/>&nbsp;&nbsp;
                <h1>Meme Generator</h1>
            </div>
            <form>
                <div>
                <div>
                <input onChange={(e)=>topText(e)} type="text" maxLength="100" placeholder="Top Text *" />&nbsp;
                <input onChange={(e)=>bottomText(e)} type="text" maxLength="100" placeholder="Bottom text *" />&nbsp;
                </div>
                <input onChange={(e)=>setImage(e)} type="text" placeholder="Image Link"/>&nbsp;
                </div>
                <span> OR </span>&nbsp;
                <input onChange={()=>setImageviaUpload()} id="upload" type="file" accept="image/png , image/jpeg , image/jpg , image/HFEC"/>
                <span> OR </span>&nbsp;
                <button onClick={()=>getRandomImage()} id="random" type="button">GET RANDOM</button>
                <div id="printmeme" ref={meme} style={{backgroundImage:`url('${image}')`,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",border:"2px dotted black"}} className="image">
                <div style={{height:"100%",width:"100%",display:"block",position:"relative"}}>
                <h3 style={{top:`${mtop}vh`,left:`${topleft}%`,fontSize:`${topsize}rem`,color:`${topcolor}`,wordBreak:"break-word",position:"absolute"}}>{top}</h3>
                <h3 style={{bottom:`${mbottom}vh`,left:`${bottomleft}%`,fontSize:`${bottomsize}rem`,color:`${bottomcolor}`,wordBreak:"break-word",position:"absolute"}}>{bottom}</h3>
                </div>
                </div>
                <div style={{marginTop:"2vh"}}>

                <div><label>Select Top Color &nbsp;</label><input onChange={(e)=>{setTopColor(e.target.value)}} style={{width:"10vw"}} type="color"/>
                <label>&nbsp;Select Bottom Color &nbsp;</label><input onChange={(e)=>{setBottomColor(e.target.value)}} style={{width:"10vw"}} type="color"/></div>
                <div><label>&nbsp;Adjust Top text &nbsp;</label><input onChange={(e)=>{setmTop(e.target.value)}}  min="0"  max="20" type="range"/>
                <label>&nbsp;Adjust Bottom text &nbsp;</label><input onChange={(e)=>{setmBottom(e.target.value)}} min="0" max="20" type="range"/></div>

                <div><label>Adjust Top text from side &nbsp;</label><input onChange={(e)=>{setTopleft(e.target.value)}} min="0" max="70" type="range"/>
                <label>&nbsp;Adjust Bottom text from side &nbsp;</label><input onChange={(e)=>{setBottomleft(e.target.value)}} min="0" max="70" type="range"/></div>

                <div><label>&nbsp;Adjust Top text size &nbsp;</label><input onChange={(e)=>{setTopsize(e.target.value)}} min="0.5" step="0.5"  max="3" type="range"/>
                <label>&nbsp;Adjust Bottom text size &nbsp;</label><input onChange={(e)=>{setBottomsize(e.target.value)}} min="0.5" step="0.5" max="3" type="range"/></div>

                </div>
                <button id="download" type="button" onClick={()=>downloadimage()}>Download</button><br/>
                <button id="uploadimage" type="button" onClick={()=>uploadimage()}>Upload</button><br/>
            </form>
        </div>
    );
}
export default Meme;