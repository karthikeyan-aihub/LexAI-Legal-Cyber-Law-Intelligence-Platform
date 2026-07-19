"""
==========================================================
LexAI - Vector Store
Author : Karthikeyan S

Stores document embeddings in ChromaDB.
==========================================================
"""

from pathlib import Path
import shutil

from langchain_chroma import Chroma


class VectorStore:
    """
    Creates and manages the Chroma vector database.
    """

    def __init__(
        self,
        embedding_model,
        persist_directory: str = "chroma_db",
        collection_name: str = "lexai_documents",
        batch_size: int = 200
    ):
        self.embedding_model = embedding_model
        self.persist_directory = Path(persist_directory)
        self.collection_name = collection_name
        self.batch_size = batch_size

    def create_vector_store(self, documents):
        """
        Create a new Chroma vector database using batch insertion.

        Parameters
        ----------
        documents : list
            Chunked LangChain documents.

        Returns
        -------
        Chroma
        """

        # Delete existing database
        if self.persist_directory.exists():
            print("\nRemoving existing vector database...")
            shutil.rmtree(self.persist_directory)

        self.persist_directory.mkdir(parents=True, exist_ok=True)

        print("\nCreating Chroma database...")

        vector_db = Chroma(
            persist_directory=str(self.persist_directory),
            embedding_function=self.embedding_model,
            collection_name=self.collection_name
        )

        total = len(documents)

        print(f"Total Chunks : {total}")
        print(f"Batch Size   : {self.batch_size}")
        print()

        for i in range(0, total, self.batch_size):

            batch = documents[i:i + self.batch_size]

            print(
                f"Embedding Batch {i // self.batch_size + 1} "
                f"({i + 1}-{min(i + self.batch_size, total)}/{total})"
            )

            vector_db.add_documents(batch)

        print("\nSaving vector database...")

        final_count = vector_db._collection.count()

        print("\nVector database created successfully!")
        print(f"Stored Chunks : {final_count}")

        return vector_db

    def load_vector_store(self):
        """
        Load an existing Chroma vector database.

        Returns
        -------
        Chroma
        """

        if not self.persist_directory.exists():
            raise FileNotFoundError(
                f"Vector database not found: {self.persist_directory}"
            )

        print("Loading existing vector database...")

        return Chroma(
            persist_directory=str(self.persist_directory),
            embedding_function=self.embedding_model,
            collection_name=self.collection_name
        )


if __name__ == "__main__":

    from loader import DocumentLoader
    from chunker import DocumentChunker
    from embeddings import EmbeddingModel

    print("=" * 60)
    print("Loading Documents...")
    print("=" * 60)

    # Load PDFs
    loader = DocumentLoader("data/raw")
    documents = loader.load_documents()

    print(f"Loaded Pages : {len(documents)}")

    # Split into chunks
    chunker = DocumentChunker()
    chunks = chunker.split_documents(documents)

    print(f"Total Chunks : {len(chunks)}")

    # Load embedding model
    embedding_model = EmbeddingModel().get_embeddings()

    # Create vector database
    vector_store = VectorStore(
        embedding_model=embedding_model,
        batch_size=200
    )

    db = vector_store.create_vector_store(chunks)

    print("\n" + "=" * 60)
    print("Vector Store Created Successfully")
    print("=" * 60)
    print(f"Total Stored Chunks : {db._collection.count()}")