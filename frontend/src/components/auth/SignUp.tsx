import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      block
    }
  }
`;

const BLOCKS = [
  "SPRINTS",
  "MIDDLE_AND_LONG_DISTANCE",
  "JUMPS",
  "THROWS",
  "OTHER",
] as const;

type Block = (typeof BLOCKS)[number];

type CreateUserDate = {
  createUser: {
    id: string;
    name: string;
    email: string;
    block: Block;
  };
};

type CreateUserVars = {
  input: {
    name: string;
    email: string;
    password: string;
    block: Block;
  };
};

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [block, setBlock] = useState<Block>("SPRINTS");

  const navigate = useNavigate();

  const [createUser, { loading, error, data }] = useMutation<
    CreateUserDate,
    CreateUserVars
  >(CREATE_USER, {
    onCompleted: () => {
      navigate("./signin");
    },
  });

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!email.trim()) return false;
    if (password.length < 8) return false;
    if (!block) return false;
    return true;
  }, [name, email, password, block]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    await createUser({
      variables: {
        input: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          block,
        },
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
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
        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            登録に失敗しました: {error.message}
          </p>
        )}

        {data && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            登録完了: {data.createUser.name} ({data.createUser.block})
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
};
export default SignUp;
