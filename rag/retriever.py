"""
==========================================================
LexAI - Document Retriever
Author : Karthikeyan S

Retrieves the most relevant document chunks from
the Chroma vector database.
==========================================================
"""

from rag.vector_store import VectorStore
from rag.embeddings import EmbeddingModel


class DocumentRetriever:
    """
    Retrieves relevant document chunks from ChromaDB.
    """

    def __init__(
        self,
        embedding_model=None,
        persist_directory="chroma_db",
        collection_name="lexai_documents",
        search_type="mmr",
        k=6,
        fetch_k=20
    ):

        # Load embedding model if not provided
        if embedding_model is None:
            embedding_model = EmbeddingModel().get_embeddings()

        # Load vector database
        self.vector_store = VectorStore(
            embedding_model=embedding_model,
            persist_directory=persist_directory,
            collection_name=collection_name
        ).load_vector_store()

        # Create retriever
        self.retriever = self.vector_store.as_retriever(
            search_type=search_type,
            search_kwargs={
                "k": k,
                "fetch_k": fetch_k
            }
        )

    def retrieve(self, query: str):
        """
        Retrieve relevant documents.
        """

        documents = self.retriever.invoke(query)

        # Remove duplicate chunks
        seen = set()
        unique_docs = []

        for doc in documents:
            key = (
                doc.metadata.get("source"),
                doc.metadata.get("page"),
                doc.page_content[:150]
            )

            if key not in seen:
                seen.add(key)
                unique_docs.append(doc)

        return unique_docs


if __name__ == "__main__":

    embedding_model = EmbeddingModel().get_embeddings()

    retriever = DocumentRetriever(
        embedding_model=embedding_model,
        k=6,
        fetch_k=20
    )

    question = input("\nAsk LexAI: ")

    documents = retriever.retrieve(question)

    print("\n" + "=" * 70)
    print(f"Retrieved {len(documents)} document(s)")
    print("=" * 70)

    for i, document in enumerate(documents, start=1):

        print(f"\nDocument {i}")
        print("-" * 70)

        print("Source :", document.metadata.get("source", "Unknown"))
        print("Page   :", document.metadata.get("page", "N/A"))

        print("\nContent:\n")
        print(document.page_content[:700])