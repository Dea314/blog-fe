import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserPostsPage() {
  const { userId } = useParams();
  console.log(userId);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/user/${userId}/posts`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong while fetching the posts!");
        }
      })
      .then((posts) => setPosts(posts))
      .catch((error) => console.error(error));
  }, [userId]);

  return (
    <div>
      <h1>Posts by {userId}</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
