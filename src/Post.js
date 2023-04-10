import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Post({
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  _id,
}) {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={"http://localhost:8080/" + cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          {author && (
            <p className="author">
              Posted by <Link className="author">{author.username}</Link>
            </p>
          )}

          <time>{format(new Date(createdAt), "d. MMM. yyyy  HH:mm")}</time>

          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
}
