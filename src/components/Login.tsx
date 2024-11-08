import { useContext } from "react";
import { AuthContext } from "../context";
import { LinkButton } from "./LinkButton";

export const Login = () => {
  const { login } = useContext(AuthContext);

  const submitLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    let username = "";
    let password = "";

    for (const [name, value] of form.entries()) {
      switch (name) {
        case "username":
          username = value.toString();
          break;
        case "password":
          password = value.toString();
          break;
      }
    }

    if (!username || !password) {
      alert("You must provide a username and password");
      return;
    }

    username.trim();

    if (username.includes(" ")) {
      alert("No spaces allowed in username");
      return;
    }

    let success = false;

    try {
      success = await login(username, password);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      return;
    }

    if (success) window.location.href = window.location.origin;
    else alert("Wrong username or password");
  };

  return (
    <>
      <form
        id="login-form"
        className="session-form"
        method="get"
        action="index.html"
        onSubmit={submitLogin}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
        />
        <button className="link-btn" type="submit">
          Login
        </button>
      </form>
      <p>
        Don{"'"}t have an account?
        <LinkButton
          label="Create Account"
          to="/create-account"
          className="link-btn"
        />
      </p>
    </>
  );
};
