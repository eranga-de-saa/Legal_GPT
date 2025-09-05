import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";


const{ ASTRA_DB_API_ENDPOINT, 
    ASTRA_DB_APPLICATION_TOKEN, 
    ASTRA_DB_NAMESPACE, 
    ASTRA_DB_COLLECTION, 
    OPENAI_API_key,
    CSV_PATH
} = process.env


const openai = new OpenAI({
    apiKey: OPENAI_API_key
})

const astraClient = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = astraClient.db(ASTRA_DB_API_ENDPOINT, {
    keyspace: ASTRA_DB_NAMESPACE
})

export async function POST(req: Request) {
    try {
        const {messages} = await req.json()
        const latestMessage = messages[messages?.length - 1].content 

        let docContext = ""

        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: latestMessage,
            encoding_format: "float"})


        try{
            const collection = await db.collection(ASTRA_DB_COLLECTION)
            const  cursor = collection.find(null, {
                sort: {
                    $vector: embedding.data[0].embedding
                },
                limit: 5
            })

            const doccuments = await cursor.toArray()
            const docsMap =  doccuments?.map(doc => doc.text) 

            docContext = JSON.stringify(docsMap)


        }  catch (error) {
        console.log(error)
        docContext = ""
    }  

    const template = {
        role: "system",
        content: `You are an AI assistant who knows everything about law and legal cases. Use the given context to assist you. 
        If the context doesn't include the information you need, answer it based on what you already know. 
        Don't expose the source of your informayion or what context does or doesn't include. 
        Format the response using markdown where neccsassary and don't return images. 
        -------------------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        -------------------------
        Question: ${latestMessage}`

    }

    const response = await openai.chat.completions.create({
        model: "gpt-5-nano",
        stream: true,
        messages: [template, ...messages]

    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
    }

    catch (error) {
        console.log(error)
        return new Response('Internal Server Error', { status: 500 })
    }
}