import random
import os
import nltk
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
from nltk.util import bigrams

app = FastAPI()
allowed_origins = os.environ.get("ALLOWED_ORIGINS", "").split(",")
if not allowed_origins:
    raise ValueError("No allowed origins set in the environment variable ALLOWED_ORIGINS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ErrorRequest(BaseModel):
    input_text: str


@app.post("/app")
def error_generator(request: ErrorRequest):
    text = request.input_text
    error_text = introduce_errors(text)
    return {"error_text": error_text}


def introduce_errors(text):
    words = nltk.word_tokenize(text)
    pos_tags = nltk.pos_tag(words)
    pos_bigrams = list(bigrams(pos_tags))

    error_text = []

    for i, (word, pos) in enumerate(pos_tags):
        if random.random() < 0.15:  # Adjust this value to control error frequency
            if pos.startswith('NN'):  # Nouns
                error_text.append(random.choice(["a", "the"]) + " " + word)
            elif pos.startswith('VB'):  # Verbs
                # Introduce subject-verb agreement errors
                if i > 0 and pos_tags[i - 1][1].startswith('NN'):
                    if pos_tags[i - 1][1] == 'NN':
                        error_text.append(word + "s" if word.endswith('e') else word + "ed")
                    else:
                        error_text.append(word)
                else:
                    error_text.append(word)
            elif pos.startswith('JJ'):  # Adjectives
                error_text.append("more" + word if word.endswith('y') else word + "er")
            elif pos.startswith('RB'):  # Adverbs
                error_text.append("more" + word if word.endswith('y') else word + "ly")
            elif pos.startswith('PRP'):  # Pronouns
                if word.lower() in ["i", "he", "she", "it", "they"]:
                    error_text.append("me" if word.lower() == "i" else word.lower() + "s")
                else:
                    error_text.append("I" if word.lower() == "me" else word[:-1])
            else:
                error_text.append(word)
        else:
            error_text.append(word)
    # Shuffle conjunctions to introduce subordination, coordination, and parallel structure errors
    for i, ((_, pos1), (_, pos2)) in enumerate(pos_bigrams):
        if pos1 in ["CC", "IN"] and random.random() < 0.15:
            error_text[i], error_text[i + 1] = error_text[i + 1], error_text[i]

    # Introduce modifier placement errors
    for i, (word, pos) in enumerate(pos_tags[:-1]):
        if pos.startswith("JJ") and pos_tags[i + 1][1].startswith("NN") and random.random() < 0.15:
            error_text[i], error_text[i + 1] = error_text[i + 1], error_text[i]

    return ' '.join(error_text)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")
