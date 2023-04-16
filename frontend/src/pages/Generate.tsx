import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@/components/Container";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import ClipboardJS from "clipboard";
import { motion } from "framer-motion";

export default function Generate() {
  const [inputText, setInputText] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clipboard = new ClipboardJS(".cursor-copy");
    clipboard.on("success", onCopySuccess);

    return () => {
      clipboard.destroy();
    };
  }, []);

  const onCopySuccess = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url =
          process.env.NODE_ENV === "development"
              ? "http://127.0.0.1:8000/app"
              : "https://gpterr.onrender.com/app";
      const response = await axios.post(url, {
        input_text: inputText,
      });
      setErrorText(response.data.error_text);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    console.log(errorText);
  };


  const EnterKeySubmit = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e).then((r) => console.log(r));
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container className="text-center pt-4">
      <form onSubmit={handleSubmit}>
        <div className="grid w-full md:w-2/3 mx-auto gap-2 gap-y-2 ">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text"
            onKeyDown={EnterKeySubmit}
            className="h-32 mb-2"
          />
          <Button type="submit" disabled={loading}>
            {loading ?
                `Generating...`
                : `Generate Errors`}
          </Button>
          {errorText && (
            <div>
              <p
                className="text-center mt-8 px-4 py-4 shadow-md rounded-xl border transition hover:bg-gray-100 cursor-copy"
                data-clipboard-text={errorText}
              >
                {errorText}
              </p>
            </div>
          )}
        </div>
      </form>

      {showNotification && (
        <motion.div
          className="fixed bottom-0 right-0 mb-8 mr-8 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={notificationVariants}
          transition={{ duration: 0.4 }}
        >
          Copied
        </motion.div>
      )}
    </Container>
  );
}
