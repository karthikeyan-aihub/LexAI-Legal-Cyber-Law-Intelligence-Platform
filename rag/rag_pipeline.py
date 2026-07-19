"""
==========================================================
LexAI - RAG Pipeline
Author : Karthikeyan S

End-to-End Retrieval-Augmented Generation Pipeline.

Workflow:

Documents
    ↓
Loader
    ↓
Chunker
    ↓
Embeddings
    ↓
ChromaDB
    ↓
Retriever
    ↓
Prompt
    ↓
Llama3 (Ollama)
==========================================================
"""

from rag.loader import DocumentLoader
from rag.chunker import DocumentChunker
from rag.embeddings import EmbeddingModel
from rag.vector_store import VectorStore
from rag.retriever import DocumentRetriever
from rag.prompt import PromptBuilder

from models.llm import LLMModel

from langchain_core.output_parsers import StrOutputParser


class LexAIRAG:
    """
    End-to-End Retrieval-Augmented Generation Pipeline.
    """

    def __init__(self):

        # Embedding Model
        self.embedding_model = EmbeddingModel().get_embeddings()

        # Large Language Model
        self.llm = LLMModel().get_llm()

        # Prompt Template
        self.prompt = PromptBuilder().get_prompt()

        # Document Retriever
        self.retriever = None

    # ======================================================
    # Build Vector Database
    # ======================================================

    def build_database(self):

        print("\nLoading documents...")

        loader = DocumentLoader("data/raw")
        documents = loader.load_documents()

        print(f"Loaded {len(documents)} pages")

        print("\nChunking documents...")

        chunker = DocumentChunker()
        chunks = chunker.split_documents(documents)

        print(f"Created {len(chunks)} chunks")

        print("\nCreating vector database...")

        vector_store = VectorStore(
            embedding_model=self.embedding_model
        )

        db = vector_store.create_vector_store(chunks)

        print("\n==============================================")
        print("Database created successfully.")
        print(f"Stored Chunks : {db._collection.count()}")
        print("==============================================")

    # ======================================================
    # Ask Question
    # ======================================================

    def ask(self, question: str):
        
        if self.retriever is None:
            self.retriever = DocumentRetriever(
                embedding_model=self.embedding_model
            )

        print(f"\nQuestion : {question}")

        docs = self.retriever.retrieve(question)

        print(f"Retrieved Documents : {len(docs)}")

        if not docs:

            return {
                "answer": (
                    "I couldn't find relevant information in the legal knowledge base."
                ),
                "sources": []
            }

        # -----------------------------------------------
        # Build Context
        # -----------------------------------------------

        context = "\n\n" + ("\n" + "=" * 60 + "\n\n").join(

            [
                f"[Document {i+1}]\n"
                f"Source : {doc.metadata.get('source','Unknown')}\n"
                f"Page   : {doc.metadata.get('page','N/A')}\n\n"
                f"{doc.page_content}"

                for i, doc in enumerate(docs)
            ]
        )

        print(f"Context Size : {len(context)} characters")

        # -----------------------------------------------
        # Create Chain
        # -----------------------------------------------

        chain = (
            self.prompt
            | self.llm
            | StrOutputParser()
        )

        print("Generating answer...")

        answer = chain.invoke(
            {
                "context": context,
                "question": question
            }
        )

        # Add legal disclaimer
        answer += (
            "\n\n---\n"
            "This response is for informational purposes only and "
            "should not be considered legal advice."
        )

        print("Answer generated successfully.")

        # -----------------------------------------------
        # Remove Duplicate Sources
        # -----------------------------------------------

        seen = set()
        sources = []

        for doc in docs:

            source = doc.metadata.get("source", "Unknown")
            page = doc.metadata.get("page", "N/A")

            key = (source, page)

            if key not in seen:

                seen.add(key)

                sources.append(
                    {
                        "source": source,
                        "page": page
                    }
                )

        return {
            "answer": answer.strip(),
            "sources": sources
        }

    # ======================================================
    # CLI Chat
    # ======================================================

    def chat(self):

        print("=" * 60)
        print("LexAI - Legal & Cyber Law Assistant")
        print("Type 'exit' to quit.")
        print("=" * 60)

        while True:

            question = input("\nYou : ").strip()

            if question.lower() == "exit":
                break

            if not question:
                continue

            result = self.ask(question)

            print("\nLexAI:\n")
            print(result["answer"])

            if result["sources"]:

                print("\nSources:")

                for source in result["sources"]:

                    print(
                        f"- {source['source']} "
                        f"(Page {source['page']})"
                    )


# ==========================================================
# Main
# ==========================================================

if __name__ == "__main__":

    rag = LexAIRAG()

    print("\n1. Build Vector Database")
    print("2. Chat with LexAI")

    choice = input("\nSelect option: ").strip()

    if choice == "1":

        rag.build_database()

    elif choice == "2":

        rag.chat()

    else:

        print("Invalid option.")