'use client'
import {useChat} from "ai/react" // '@ai-sdk/react'
import Image from 'next/image'
import legalGPTLogo from './assets/legalGPTLogo.png'
import Bubble from './components/Bubble'
import LoadingBubble from './components/LoadingBubble'
import PropmptSuggestionsRow from './components/PropmptSuggestionsRow'
//

import { Message } from 'ai'


const Home = () => {

    const  {append, isLoading, messages, input, handleInputChange, handleSubmit} = useChat()


    const noMessages = !messages || messages.length === 0

    const handlePrompt= (promptText) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content:promptText,
            role: "user"
        }
        append(msg)
    }

    return(
        <main>
            <Image src={legalGPTLogo} alt="LegalGPT Logo" width={250}/>
            <section className={noMessages ? "":"populated"}>
                {noMessages?(
                    <>
                    <p className = "starter-text">
                        Hi, I am LawGPT, your AI Paralegal Assistant.
                        How can I help you today?
                    </p>
                    <br />
                     <PropmptSuggestionsRow onPromptClick={handlePrompt}/> 
                    </>
                ) 
                : (
                    <>
                    {messages.map((message, index) => <Bubble key={`message-${index}`} message={message} />)}
                    {isLoading && <LoadingBubble/>}
        
                    </>
                )}
               
            </section>
             <form onSubmit={handleSubmit}>
                    <input className= "question-box" onChange={handleInputChange} value={input} placeholder ="Ask me something .." />
                    <input type ="submit"></input>
            </form>

        </main>
    )

}

export default Home

