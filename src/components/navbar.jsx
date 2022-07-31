import React from "react"
import trollface from "../troll.gif"

export default function Navbar() {
    return (
        <>
            <nav className="bg-violet-700 text-white">
                <div className="flex justify-between items-center px-8 py-4 group">
                    <div className="flex items-center">
                        <img src={trollface} alt="trollface" className="group-hover:animate-spin mr-4 w-12 rounded-lg"/>
                        <h2 className="text-2xl md:text-3xl font-bold">Meme Generator</h2>
                    </div>
                    <p className="hidden md:block">React Course - Project 3</p>
                </div>
            </nav>
        </>
    )
}