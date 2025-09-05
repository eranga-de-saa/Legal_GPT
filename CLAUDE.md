# Claude Code Configuration

This is a Next.js LawGPT application with AI-powered legal assistance capabilities.

## Project Structure
- **Framework**: Next.js 14 with TypeScript
- **Database**: DataStax Astra DB
- **AI/LLM**: OpenAI integration with LangChain
- **Data Processing**: CSV parsing for legal document ingestion

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Load database with legal documents
- `npm run lint` - Run ESLint

## Key Dependencies
- **AI/ML**: `openai`, `langchain`, `@langchain/community`, `ai`
- **Database**: `@datastax/astra-db-ts`
- **Utilities**: `csv-parser`, `dotenv`, `ts-node`

## Development Notes
- Uses App Router architecture (app/ directory)
- TypeScript configuration present
- ESLint configured for code quality
- Database seeding script available for legal document ingestion