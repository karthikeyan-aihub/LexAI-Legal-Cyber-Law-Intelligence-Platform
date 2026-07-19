"""
==========================================================
LexAI - Document Loader
Author : Karthikeyan S

Loads legal documents from the data/raw directory.
Supports:
    • PDF (.pdf)
    • Text (.txt)

Returns:
    List[Document]
==========================================================
"""

from pathlib import Path

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader
)


class DocumentLoader:
    """
    Loads documents from a directory.
    """

    def __init__(self, data_directory: str):
        self.data_directory = Path(data_directory)

    def load_documents(self):
        """
        Load all supported documents.

        Returns
        -------
        list
            LangChain Document objects
        """

        documents = []

        if not self.data_directory.exists():
            raise FileNotFoundError(
                f"Directory not found: {self.data_directory}"
            )

        for file in self.data_directory.iterdir():

            if file.suffix.lower() == ".pdf":

                loader = PyPDFLoader(str(file))
                documents.extend(loader.load())

            elif file.suffix.lower() == ".txt":

                loader = TextLoader(
                    str(file),
                    encoding="utf-8"
                )
                documents.extend(loader.load())

        return documents


if __name__ == "__main__":

    loader = DocumentLoader("data/raw")

    docs = loader.load_documents()

    print("=" * 60)
    print(f"Loaded {len(docs)} document pages.")
    print("=" * 60)

    if docs:
        print("\nFirst document preview:\n")
        print(docs[0].page_content[:700])