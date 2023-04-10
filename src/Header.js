import { Link } from "react-router-dom";
import slavix_logo from ".//img/slavix_logo.png";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const avatarUrl = userInfo?.avatarUrl;

  return (
    <header>
      <Link to="/" className="logo">
        Simple Blog
        <img src={slavix_logo} alt="" style={{ width: "8rem" }} />
      </Link>

      <nav>
        {username && (
          <>
            <div className="user-info">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={`Avatar for ${username}`}
                  style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
                />
              )}
              <span>
                Howdy, <Link to={`/user/${username}/posts`}> {username}</Link>
              </span>
            </div>
            <Link to="/create">Create new post</Link>
            <a href="/login" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
