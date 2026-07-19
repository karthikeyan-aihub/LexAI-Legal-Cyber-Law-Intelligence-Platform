"""
==========================================================
LexAI - Document Chunker
Author : Karthikeyan S

Splits LangChain documents into smaller chunks for
embedding and retrieval.
==========================================================
"""

from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocumentChunker:
    """
    Splits loaded documents into smaller chunks.
    """

    def __init__(
        self,
        chunk_size: int = 600,
        chunk_overlap: int = 150
    ):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ]
        )

    def split_documents(self, documents):
        """
        Split documents into chunks.

        Parameters
        ----------
        documents : list
            LangChain Document objects.

        Returns
        -------
        list
            Chunked LangChain Document objects.
        """

        return self.text_splitter.split_documents(documents)


if __name__ == "__main__":

    from loader import DocumentLoader

    # Load documents
    loader = DocumentLoader("data/raw")
    documents = loader.load_documents()

    # Split documents
    chunker = DocumentChunker(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = chunker.split_documents(documents)

    print("=" * 60)
    print(f"Loaded Pages : {len(documents)}")
    print(f"Total Chunks : {len(chunks)}")
    print("=" * 60)

    if chunks:
        print("\nFirst Chunk\n")
        print(chunks[0].page_content)

        print("\nMetadata\n")
        print(chunks[0].metadata)