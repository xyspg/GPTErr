from flask import Flask, render_template, request, redirect, url_for
import random
import nltk
from nltk.util import bigrams

app = Flask(__name__)

import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

@app.route('/')
def index():
    return render_template('app.html')

@app.route('/app', methods=['GET', 'POST'])
def error_generator():
    if request.method == 'POST':
        text = request.form['input_text']
        error_text = introduce_errors(text)
        return render_template('app.html', error_text=error_text)
    return render_template('app.html')

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

        # Introduce sentence boundary errors
        if i < len(pos_tags) - 1 and pos_tags[i+1][1] in [".", "!", "?"] and random.random() < 0.15:
            if error_text[-1] != ",":
                error_text.append(",")

    # Shuffle conjunctions to introduce subordination, coordination, and parallel structure errors
    for i, ((_, pos1), (_, pos2)) in enumerate(pos_bigrams):
        if pos1 in ["CC", "IN"] and random.random() < 0.15:
            error_text[i], error_text[i + 1] = error_text[i + 1], error_text[i]

    # Introduce modifier placement errors
    for i, (word, pos) in enumerate(pos_tags[:-1]):
        if pos.startswith("JJ") and pos_tags[i + 1][1].startswith("NN") and random.random() < 0.15:
            error_text[i], error_text[i + 1] = error_text[i + 1], error_text[i]

    return ' '.join(error_text)

if __name__ == '__main__':
    app.run(debug=False)
