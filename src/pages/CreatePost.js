import Editor from "../Editor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function createNewPost(e) {
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("file", files[0]);
    e.preventDefault();
    // console.log(files);
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      body: data,
      credentials: "include",
      //   JSON.stringify({ title, content }),
      //     headers: { "Content-Type": "application/json" },
      //     credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    navigate("/");
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />

      <button style={{ marginTop: "0.5rem" }}>Create post</button>
    </form>
  );
}
