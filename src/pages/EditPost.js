import Editor from "../Editor";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`http://localhost:8080/post/${id}`, {
        credentials: "include",
      });
      const postInfo = await response.json();
      setTitle(postInfo.title);
      setSummary(postInfo.summary);
      setContent(postInfo.content);
    }
    getPost();
  }, [id]);

  async function updatePost(e) {
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files?.[0]);
    }
    e.preventDefault();

    const response = await fetch("http://localhost:8080/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
      navigate("/");
    }
  }

  if (redirect) {
    navigate("/post/" + id);
  }

  return (
    <form onSubmit={updatePost}>
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

      <button style={{ marginTop: "0.5rem" }}>Update post</button>
    </form>
  );
}
