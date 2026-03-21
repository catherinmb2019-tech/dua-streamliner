import { useAuthContext } from "../../app/providers/AuthProvider";

export const LoginPage = () => {
  const { login } = useAuthContext();

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => login("admin", "123")}>
        Login
      </button>
    </div>
  );
};