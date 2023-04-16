import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [errorText, setErrorText] = useState(null);

  // @ts-ignore
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/app", { input_text: inputText });
      setErrorText(response.data.error_text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div>
        <h1>Error Generator</h1>
        <form onSubmit={handleSubmit}>
        <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text"
        />
          <button type="submit">Generate Errors</button>
        </form>
        {errorText && (
            <div>
              <h2>Text with Errors</h2>
              <p>{errorText}</p>
            </div>
        )}
      </div>
  );
}
