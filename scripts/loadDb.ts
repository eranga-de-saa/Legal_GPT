import {DataAPIClient} from "@datastax/astra-db-ts"
// import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";

import OpenAI from "openai"

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import "dotenv/config"
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";

import {
  AstraDBVectorStore,
  AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";

type SimilarityMetric = "cosine" | "euclidean" | "dot_product";




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
const db = astraClient.db(ASTRA_DB_API_ENDPOINT,{ namespace: ASTRA_DB_NAMESPACE })

const text_splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1024, chunkOverlap: 200 });

const createCollection = async (_similarityMetric: SimilarityMetric = 'dot_product' ) => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,
            metric: _similarityMetric,
        }
    })
    console.log(res)
}

async function readCsvToDocuments(csvPath: string): Promise<Document[]> {
  return new Promise((resolve, reject) => {
    const docs: Document[] = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const title = row["case_title"];
        const body = row["case_text"];
        const combined = `${title}\n\n${body}`;
        const metadata: Record<string, any> = {
          case_id: row["case_id"] ?? undefined,
          outcome: row["case_outcome"] ?? undefined,
        };
        docs.push(new Document({ pageContent: combined, metadata }));
      })
      .on("end", () => resolve(docs))
      .on("error", (err) => reject(err));
  });
}

const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION)

    const rawDocs = await readCsvToDocuments(CSV_PATH);
    console.log(`Loaded ${rawDocs.length} documents.`);

    const chunks = await text_splitter.splitDocuments(rawDocs);

    for await (const chunk of chunks) {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: chunk.pageContent,
            encoding_format: 'float'
        });

        const vector = embedding.data[0].embedding;

        const res = await collection.insertOne({
            text: chunk.pageContent,
            $vector: vector
        });
        console.log(res)
    }
    
}

createCollection().then(() => loadSampleData())





 