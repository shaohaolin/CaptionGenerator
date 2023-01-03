import Head from "next/head";
import { useState } from "react";
import UploadImages from "../components/UploadImages";
import styles from "./index.module.css";

export default function Home() {
  const [photoDescriptionInput, setPhotoDescriptionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoDescription: photoDescriptionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setPhotoDescriptionInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Photo Caption Idea</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="photoDescription"
            placeholder="Describe what Bowser is doing"
            value={photoDescriptionInput}
            onChange={(e) => setPhotoDescriptionInput(e.target.value)}
          />
          <input type="submit" value="Generate caption" />
        </form>
        <div className={styles.result}>{result}</div>
        <div>
          <UploadImages />
        </div>
      </main>
    </div>
  );
}
