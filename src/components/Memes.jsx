import React, {forwardRef, useRef, useEffect, useState} from "react"
import { exportComponentAsPNG } from 'react-component-export-image'

const ComponentToPrint = forwardRef((props, ref) => {
    const formData = props.formData
    const currentMeme = props.currentMeme

    return (
        <div className="relative max-w-sm mx-auto text-white font-extrabold overflow-hidden" ref={ref}>
            <img src={currentMeme?.url} alt="" className="-z-10" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center absolute top-2 w-full text-border">
                {formData.topText}
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center absolute bottom-2 w-full text-border">
                {formData.bottomText}
            </h1>
        </div>
  )});

export default function Memes() {

    const [formData, setFormData] = useState({
        topText: "",
        bottomText: "",
    });

    const [memesData, setMemesData] = useState([])
    const [currentMeme, setCurrentMeme] = useState()

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setMemesData(data.data.memes))
        .catch(err => console.log(err))
    },[])

    function randomMeme() {
        setCurrentMeme(memesData[Math.floor(Math.random()*memesData.length)])
    }
    
    function handleChange(event) {
        setFormData(prevFormData => {
            const {name, value} = event.target
            return {
                ...prevFormData,
                [name]: value, 
            }
        })
    }

    const componentRef = useRef()

    return (
        <>
            <div className="flex mt-8 md:mt-12">
                <form className="flex flex-col container mx-auto max-w-3xl">
                    <div className="flex">
                        <input 
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            className="input input-bordered input-primary w-full mx-2"
                            value={formData.topText}
                            onChange={handleChange}
                            />
                        <input 
                            type="text"  
                            name="bottomText"
                            placeholder="Bottom Text"
                            className="input input-bordered input-primary w-full mx-2"
                            value={formData.bottomText}
                            onChange={handleChange}
                            />
                    </div>
                    <button type="button" onClick={randomMeme} className="btn btn-primary m-2">
                        Get New Meme Image
                    </button>
                </form>
            </div>

            <ComponentToPrint ref={componentRef} formData={formData} currentMeme={currentMeme}/>
            {currentMeme?.url && (
                <div className="flex mx-2 md:mx-4">
                    <button onClick={() => exportComponentAsPNG(componentRef)} className="btn btn-success m-2 mx-auto w-full max-w-3xl">
                        Save As PNG
                    </button>
                </div>
                )
            }
        </>
    )
}