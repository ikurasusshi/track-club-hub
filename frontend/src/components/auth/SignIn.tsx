import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignInResponse } from "../../types/signInResponse";
import { SIGN_IN } from "../../mutations/authMutations";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failSignIn, setFailSignIn] = useState(false);
  const [signIn] = useMutation<SignInResponse>(SIGN_IN);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInInput = { email, password };
    try {
      const result = await signIn({
        variables: { signInInput },
      });
      if (result.data) {
        localStorage.setItem("token", result.data.signIn.accessToken);
        if (result.data.signIn.user) {
          localStorage.setItem("user", JSON.stringify(result.data.signIn.user));
        }
      }
      localStorage.getItem("token") && navigate("/");
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        setFailSignIn(true);
        return;
      }
      console.log(err.message);
      alert("予期せぬエラーが発生しました");
    }
  };

  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-md gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900">ログイン</h2>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-gray-700">
            メールアドレス
          </span>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-gray-700">パスワード</span>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
          {password.length > 0 && password.length < 8 && (
            <small className="text-xs font-medium text-rose-600">
              パスワードは８文字以上にしてください
            </small>
          )}
        </label>
        {failSignIn && (
          <span className="text-red-500">
            メールアドレスまたはパスワードを確認してください
          </span>
        )}
        <button
          type="submit"
          className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};
export default SignIn;
