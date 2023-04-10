import Post from "../Post";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); // Change this value to the number of posts you want to display per page
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setDisplayedPosts(posts.slice(0, postsPerPage));
      });
    });
  }, [postsPerPage]);
  console.log(posts);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDisplayedPosts(
      posts.slice((pageNumber - 1) * postsPerPage, pageNumber * postsPerPage)
    );
  };

  return (
    <>
      {displayedPosts.length > 0 &&
        displayedPosts.map((post) => <Post key={post._id} {...post} />)}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
}
