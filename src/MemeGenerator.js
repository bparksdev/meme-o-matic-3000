import React, {useState, useEffect} from "react"

import upbtn from './up.png'
import downbtn from './down.png'
//import rotatebtn from './rotate-right.png'

function MemeGenerator() {
    const fontOptions = ["Anton","Teko","Arial"]
    const defaultShadowStyle = "1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,0 1px 0 #000,1px 0 0 #000,0 -1px 0 #000,-1px 0 0 #000,1px 1px 4px #000"

    const [topText, setTopText] = useState("top")
    const [bottomText, setBottomText] = useState("bottom")
    const [allMemeImgs, setAllMemeImgs] = useState([])
    const [currentImg, setCurrentImg] = useState("http://i.imgflip.com/1bij.jpg")
    const [currentImgName, setCurrentImgName] = useState("One Does Not Simply")
    const [justifyTop, setJustifyTop] = useState("center")
    const [justifyBottom, setJustifyBottom] = useState("center")
    const [topTop, setTopTop] = useState(0)
    const [bottomTop, setBottomTop] = useState(0)
    const [topLeft, setTopLeft] = useState("50%")
    const [bottomLeft, setBottomLeft] = useState("50%")
    const [fontSize, setFontSize] = useState("2.9vw")
    const [fontSizeValue, setFontSizeValue] = useState(2.9)
    const [textShadow, setTextShadow] = useState(1)
    const [memeWidth, setMemeWidth] = useState("70%")
    const [currentFont, setCurrentFont] = useState("Anton")
    const [textShadowText, setTextShadowText] = useState(defaultShadowStyle)
    const [loading, setLoading] = useState(true)
    
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            setAllMemeImgs(response.data.memes)
            setLoading(false)
        })
        
    }, [loading])

     function clearForm() { 
        document.getElementById("frmMain").reset()
        setTopText("top")
        setBottomText("bottom")
        setMemeWidth("70%")
        setTopTop(0) 
        setBottomTop(0)
        setJustifyTop("center")
        setJustifyBottom("center")
        setCurrentImg("http://i.imgflip.com/1bij.jpg")
        setCurrentFont("Anton")
        setCurrentImgName("One Does Not Simply")
        setFontSize("2.9vw")     
        setTopLeft("50%")
        setBottomLeft("50%")
    }
    
    const handleChange = (event) => {
        const {value, selectedIndex} = event.target
        try {
            setCurrentImgName(event.target[selectedIndex].text)	
            setCurrentImg(value)
        } catch(event) {

        }
    }

    const handleTopTextChange = (event) => {
        console.log(event.target)
        const {value} = event.target
        setTopText(value)
    }

    const handleBottomTextChange = (event) => {
        const {value} = event.target
        setBottomText(value)
    }

    const handleAlign = (event) => {
        if(event.nativeEvent.target.name === 'justifyTop') {
            setJustifyTop(event.nativeEvent.target.value)
        } else {
            setJustifyBottom(event.nativeEvent.target.value)
        }
    }

    const handleFontSize = (event) => {
        if(event.target.className === 'more') {
            setFontSizeValue(prevFontSizeValue => prevFontSizeValue + .1)
            setFontSize(fontSizeValue + "vw")
        } else {
            setFontSizeValue(prevFontSizeValue => prevFontSizeValue - .1)
            setFontSize(fontSizeValue + "vw")
        }
    }

    const handleMovement = (event) => {
        if(event.target.className === 'down') {
            if(event.target.name === 'topTopDown') {
                setTopTop(topTop + 2)
            } else {
                setBottomTop(bottomTop - 2)
            }
        } else {
            if(event.target.name === 'topTopUp') {
                setTopTop(topTop - 2)
            } else {
                setBottomTop(bottomTop + 2)
            }
        }
    }    

    const handleLRMovement = (event) => {
        if(event.target.className === 'right') {
            console.log("right " + event.target.name)
            if(event.target.name === 'topRight') {
                setTopLeft(parseInt(topLeft) + 1 + "%")
            } else {
                setBottomLeft(parseInt(bottomLeft) + 1 + "%")
            }
        } else {
            console.log("left " + event.target.name)
            if(event.target.name === 'topLeft') {
                setTopLeft(parseInt(topLeft) - 1 + "%")
            } else {
                setBottomLeft(parseInt(bottomLeft) - 1 + "%")
            }
        }
    }      

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    const handleFont = (event) => {
        setCurrentFont(event.nativeEvent.target.value)
    }

    const handleWidth = (event) => {
        setMemeWidth(event.nativeEvent.target.value)
    }

    const handleShadow = (event) => {
        var {checked} = event.target
        checked ? checked = false : checked = true
        checked ? setTextShadow(0) : setTextShadow(1)
        checked ? setTextShadowText('none') : setTextShadowText(defaultShadowStyle)
    }

        return (
            <div style={{width:"70%", textAlign: "center", marginLeft:"auto", marginRight: "auto"}}>
                <form id="frmMain" className="meme-form" onSubmit={handleSubmit}>
                    <div style={{textAlign:"center",height:"40px"}}>
                        <select name="currentImg" className="meme-select" onChange={handleChange} value={currentImg}>
                            <option value="">*** Choose a Meme Template ***</option>
                            {allMemeImgs.map(item => <option key={item.id} value={item.url}>{item.name}</option>)}
                        </select>
                        <button onClick={clearForm} style={{float:"right"}}>Start Over</button>
                    </div>

                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={topText}
                        onChange={handleTopTextChange}
                    />
                    <input type="radio" name="justifyTop" value="center" onChange={handleAlign} checked={justifyTop === 'center'} /><label>Center</label>
                    <input type="radio" name="justifyTop" value="right" onChange={handleAlign} /><label>Right</label>
                    <input type="radio" name="justifyTop" value="left" onChange={handleAlign} /><label>Left</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="image" src={upbtn} className="up" name="topTopUp" title="Up 2 Pixels" onClick={handleMovement} />
                    &nbsp;
                    <input type="image" src={downbtn} className="down" name="topTopDown" title="Down 2 Pixels" onClick={handleMovement} />
                    &nbsp;&nbsp;
                    <input type="image" src={downbtn} style={{transform:"rotate(90deg)"}} className="left" name="topLeft" title="Left 2 Pixels" onClick={handleLRMovement} />
                    &nbsp;&nbsp;
                    <input type="image" src={upbtn} style={{transform:"rotate(90deg)"}} className="right" name="topRight" title="Right 2 Pixels" onClick={handleLRMovement} />
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={handleBottomTextChange}
                    /> 
                    <input type="radio" name="justifyBottom" value="center" onChange={handleAlign} checked={justifyBottom === 'center'} /><label>Center</label>
                    <input type="radio" name="justifyBottom" value="right" onChange={handleAlign} /><label>Right</label>
                    <input type="radio" name="justifyBottom" value="left" onChange={handleAlign} /><label>Left</label>
                    &nbsp;&nbsp;&nbsp;
                    <input type="image" src={upbtn} className="up" name="bottomTopUp" title="Up 2 Pixels" onClick={handleMovement} />
                    &nbsp;
                    <input type="image" src={downbtn} className="down" name="bottomTopDown" title="Down 2 Pixels" onClick={handleMovement} />
                    &nbsp;&nbsp;
                    <input type="image" src={downbtn} style={{transform:"rotate(90deg)"}} className="left" name="bottomLeft" title="Left 2 Pixels" onClick={handleLRMovement} />
                    &nbsp;&nbsp;
                    <input type="image" src={upbtn} style={{transform:"rotate(90deg)"}} className="right" name="bottomRight" title="Right 2 Pixels" onClick={handleLRMovement} />

                    <div>
                        <label>Font: </label>
                        &nbsp;&nbsp;
                        <select name="fontOptions" onChange={handleFont} value={currentFont}>
                            {fontOptions.map(font => <option key={font} value={font}>{font}</option>)}
                        </select>
                        &nbsp;&nbsp;
                        <input type="button" value="A" className="more" onClick={handleFontSize}></input>
                        <input type="button" value="a" className="less" onClick={handleFontSize}></input>
                        &nbsp;&nbsp;
                        <label>Text Outline:</label>
                        <input type="checkbox" onChange={handleShadow} checked={textShadow === 1} />
                        &nbsp;&nbsp;
                        <label>Meme Size: </label>
                        <select name="memewidth" onChange={handleWidth} value={memeWidth}>
                            <option value="30%">30%</option>
                            <option value="40%">40%</option>
                            <option value="50%">50%</option>
                            <option value="60%">60%</option>
                            <option value="70%">70%</option>
                            <option value="80%">80%</option>
                            <option value="90%">90%</option>
                            <option value="100%">100%</option>
                        </select>
                        
                        
                    </div>
                </form>
                <div style={{textAlign:"center", fontSize:"20px", paddingBottom: "10px"}}>{currentImgName}</div>
                <div className="meme" style={{width: memeWidth}}>
                    <img src={currentImg} alt="" />
                    <h2 className="top" 
                        style={{fontSize:fontSize, textAlign:justifyTop, top:topTop, fontFamily:currentFont, textShadow:textShadowText, left:topLeft}}>
                        {topText}
                    </h2>
                    <h2 className="bottom" 
                        style={{fontSize:fontSize, textAlign:justifyBottom, bottom:bottomTop, fontFamily:currentFont, textShadow:textShadowText, left:bottomLeft}}>
                        {bottomText}
                    </h2>
                </div>
                <div style={{marginTop:"30px"}}></div>
            </div>
        )
    }

export default MemeGenerator