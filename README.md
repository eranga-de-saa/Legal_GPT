# LawGPT - AI-Powered Legal Assistant with Advanced RAG

🏛️ **LawGPT** is an intelligent legal assistant powered by **Retrieval-Augmented Generation (RAG)** technology, providing accurate legal insights by combining large language models with a comprehensive database of legal cases and precedents.

## 🎯 RAG Architecture Overview

This application implements a sophisticated RAG pipeline that enhances AI responses with relevant legal context from a curated dataset of **25,000 legal cases**:

```
User Query → Embedding Generation → Vector Similarity Search → Context Injection → AI Response
```

### Key Components:
- **Vector Database**: DataStax Astra DB with 1536-dimensional vector storage
- **Embeddings**: OpenAI `text-embedding-3-small` model
- **Knowledge Base**: Legal Text Classification Dataset from Kaggle
- **LLM**: OpenAI GPT models with legal specialization
- **Chunking Strategy**: RecursiveCharacterTextSplitter (1024 chars, 200 overlap)

## 📊 Dataset: Legal Text Classification

**Source**: [Kaggle - Legal Text Classification Dataset](https://www.kaggle.com/datasets/amohankumar/legal-text-classification-dataset)
- **Volume**: 25,000 annotated legal case documents
- **License**: Apache 2.0
- **Structure**: Case ID, Outcome, Title, Full Text
- **Content**: Catchphrases, Citations, Case Classifications
- **Size**: 15.6 MB compressed

### Dataset Schema:
```csv
case_id,case_outcome,case_title,case_text
Case1,cited,Alpine Hardwood (Aust) Pty Ltd v Hardys Pty Ltd (No 2),<full legal text>
```

## 🚀 Technical Implementation

### RAG Pipeline Flow:

1. **Data Ingestion** (`scripts/loadDb.ts`):
   - Parses CSV legal dataset
   - Splits documents into semantic chunks
   - Generates embeddings using OpenAI API
   - Stores vectors in Astra DB collection

2. **Query Processing** (`app/api/chat/route.ts`):
   - Converts user queries to embeddings
   - Performs vector similarity search (top 5 results)
   - Injects relevant legal context into prompt
   - Generates contextually-aware responses

3. **Vector Search Configuration**:
   - **Dimension**: 1536 (OpenAI text-embedding-3-small)
   - **Similarity Metric**: Dot product
   - **Retrieval Count**: 5 most similar cases
   - **Context Integration**: JSON-formatted case law injection

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript and App Router
- **Vector Database**: DataStax Astra DB
- **AI/ML**: OpenAI GPT models + Embeddings API
- **Data Processing**: LangChain text splitters and document loaders
- **Frontend**: React with AI SDK for streaming responses
- **Deployment**: Vercel-ready configuration

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ and npm
- DataStax Astra DB account
- OpenAI API key
- Legal dataset CSV file

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nextjs-lawgpt
   npm install
   ```

2. **Environment Configuration**:
   Create `.env` file with:
   ```env
   ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint
   ASTRA_DB_APPLICATION_TOKEN=your_astra_token
   ASTRA_DB_NAMESPACE=your_namespace
   ASTRA_DB_COLLECTION=your_collection_name
   OPENAI_API_key=your_openai_api_key
   CSV_PATH=./data/legal_text_classification.csv
   ```

3. **Dataset Setup**:
   - Download the [Legal Text Classification Dataset](https://www.kaggle.com/datasets/amohankumar/legal-text-classification-dataset)
   - Extract `legal_text_classification.csv` to `./data/` directory

4. **Database Initialization**:
   ```bash
   npm run seed
   ```
   This will:
   - Create the Astra DB vector collection
   - Process and chunk the legal documents
   - Generate embeddings for all text chunks
   - Populate the vector database

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to access LawGPT

## 📁 Project Structure

```
├── app/
│   ├── api/chat/route.ts         # RAG-powered chat API endpoint
│   ├── components/               # UI components
│   │   ├── Bubble.tsx           # Chat message bubbles
│   │   ├── LoadingBubble.tsx    # Loading states
│   │   └── PromptSuggestionsRow.tsx # Suggested prompts
│   ├── page.tsx                 # Main chat interface
│   └── layout.tsx              # App layout
├── scripts/
│   └── loadDb.ts               # Database seeding script
├── data/
│   └── legal_text_classification.csv # Legal dataset
└── CLAUDE.md                   # Development configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run seed` - Initialize database with legal documents
- `npm run lint` - Run code linting

## 🎯 Key Features

### Advanced RAG Capabilities:
- **Semantic Search**: Vector-based similarity matching across legal cases
- **Contextual Responses**: AI answers enhanced with relevant case law
- **Real-time Processing**: Streaming responses with live context injection
- **Legal Specialization**: Trained on comprehensive legal document corpus

### User Experience:
- **Interactive Chat Interface**: Clean, responsive legal assistant UI
- **Prompt Suggestions**: Pre-built queries for common legal questions
- **Loading States**: Visual feedback during document retrieval
- **Markdown Support**: Formatted legal responses with proper structure

### Technical Excellence:
- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: Next.js App Router with React Server Components
- **Scalable Vector Storage**: Enterprise-grade Astra DB integration
- **Error Handling**: Comprehensive error management and fallbacks

## 🔍 RAG Query Examples

The system excels at queries like:
- "What are the precedents for indemnity costs in Australian federal court?"
- "Find cases similar to Colgate Palmolive Co v Cussons Pty Ltd"
- "Explain the legal principles around Calderbank offers"
- "What factors determine cost awards in civil litigation?"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for RAG functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. The legal dataset is licensed under Apache 2.0.

## Acknowledgments

- **Dataset**: A. Mohan Kumar for the Legal Text Classification Dataset
- **Infrastructure**: DataStax for Astra DB vector capabilities
- **AI Models**: OpenAI for embeddings and language models
- **Framework**: Vercel for Next.js and deployment platform

---

**Note**: This application is for educational and research purposes. Always consult qualified legal professionals for actual legal advice.