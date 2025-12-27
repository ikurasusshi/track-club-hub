import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import { SIGN_IN, SIGN_UP } from "../../mutations/authMutations";
import type { SignInResponse } from "../../types/signInResponse";

const BLOCKS = [
  "Sprints",
  "MiddleAndLongDistance",
  "Jumps",
  "Throws",
  "Others",
] as const;

type Block = (typeof BLOCKS)[number];

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [block, setBlock] = useState<Block>("Sprints");
  const [signUp] = useMutation<{ createUser: User }>(SIGN_UP);
  const [signIn] = useMutation<SignInResponse>(SIGN_IN);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signUpInput = { name, email, password, block };
    try {
      const result = await signUp({
        variables: { createUserInput: signUpInput },
      });
      if (result.data?.createUser) {
        const signInInput = { email, password };
        const result = await signIn({
          variables: { signInInput },
        });
        if (result.data) {
          localStorage.setItem("token", result.data.signIn.accessToken);
        }
        localStorage.getItem("token") && navigate("/");
      }
    } catch (err: any) {
      alert("ユーザの作成に失敗しました。");
      return;
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-md gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900">新規登録</h2>
        <label className="grid gap-1.5">
          <span>名前</span>
          <input
            type="text"
            placeholder="名前"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          />
        </label>
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
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-gray-700">ブロック</span>
          <select
            value={block}
            onChange={(e) => setBlock(e.target.value as Block)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
          >
            {BLOCKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          登録
        </button>
      </form>
    </div>
  );
};
export default SignUp;
