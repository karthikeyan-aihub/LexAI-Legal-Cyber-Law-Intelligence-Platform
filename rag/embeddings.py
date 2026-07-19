"""
==========================================================
LexAI - Embedding Model
Author : Karthikeyan S

Creates embeddings for document chunks using
Sentence Transformers.

Model:
    sentence-transformers/all-MiniLM-L6-v2
==========================================================
"""
import torch
from langchain_huggingface import HuggingFaceEmbeddings


class EmbeddingModel:

    def __init__(
        self,
        model_name: str = "BAAI/bge-base-en-v1.5"
    ):
        self.model_name = model_name

        device = "cuda" if torch.cuda.is_available() else "cpu"

        print(f"Using embedding device: {device}")

        self.embeddings = HuggingFaceEmbeddings(
            model_name=self.model_name,
            model_kwargs={
                "device": device,
                "trust_remote_code": True
            },
            encode_kwargs={
                "normalize_embeddings": True,
                "batch_size": 32
            }
        )

    def get_embeddings(self):
        return self.embeddings

if __name__ == "__main__":

    embedding_model = EmbeddingModel().get_embeddings()

    sample_text = [
        "What is Section 43 of the Information Technology Act?"
    ]

    vector = embedding_model.embed_documents(sample_text)

    print("=" * 60)
    print("Embedding Model Loaded Successfully")
    print("=" * 60)

    print(f"\nEmbedding Dimension : {len(vector[0])}")
    print(f"\nFirst 10 Values :\n{vector[0][:10]}")