"""
==========================================================
LexAI - LLM Module
Author : Karthikeyan S

Loads the Large Language Model used by LexAI.

Production:
    Groq - Llama 3.1 8B Instant
==========================================================
"""

import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()


class LLMModel:
    """
    Wrapper class for the LLM.
    """

    def __init__(
        self,
        model: str = "llama-3.1-8b-instant",
        temperature: float = 0.0,
    ):
        """
        Initialize the LLM.
        """

        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError(
                "GROQ_API_KEY not found. Please check your .env file."
            )

        self.llm = ChatGroq(
            model=model,
            temperature=temperature,
            api_key=api_key,
        )

    def get_llm(self):
        return self.llm


if __name__ == "__main__":

    llm = LLMModel().get_llm()

    response = llm.invoke("Introduce yourself.")

    print("=" * 60)
    print("Groq LLM Loaded Successfully")
    print("=" * 60)

    print(response.content)