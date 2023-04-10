import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify({ username, password, avatar }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="file"
        accept="image/png,image/jpeg,image/gif, image/webp, image/jpg"
        value=""
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <button type="submit">Register</button>
    </form>
  );
}
