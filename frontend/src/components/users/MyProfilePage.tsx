import { UPDATE_USER } from "@/mutations/authMutations";
import { ME } from "@/queries/userQueries";
import type { Block, Grade, User } from "@/types/user";
import { formatBlock } from "@/utils/blockFormatter";
import { formatGrade } from "@/utils/gradeFormatter";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MyProfilePage = () => {
  const [changeMode, setChangeMode] = useState(false);
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery<{ me: User }>(ME);
  const [
    updateUser,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_USER);

  // フォームの状態管理
  const [formData, setFormData] = useState({
    name: "",
    block: "" as Block,
    grade: "" as Grade,
  });

  if (meLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (updateLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (meError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {meError.message}</div>
      </div>
    );
  }

  if (updateError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error: {updateError.message}</div>
      </div>
    );
  }

  const user = meData?.me;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">ユーザー情報が見つかりません</div>
      </div>
    );
  }

  // 編集モードに入る時にフォームデータを初期化
  const handleEditClick = () => {
    setFormData({
      name: user.name,
      block: user.block,
      grade: user.grade,
    });
    setChangeMode(true);
  };

  // 保存処理(mutation呼び出しはユーザーが実装)
  const handleSave = async () => {
    const updateUserInput = { id: user.id, ...formData };
    try {
      await updateUser({
        variables: { updateUserInput },
        refetchQueries: [{ query: ME }], // MEクエリを再実行
      });
    } catch (err: any) {
      console.log(err.message);
    }

    console.log("保存するデータ:", formData);
    setChangeMode(false);
  };

  // キャンセル処理
  const handleCancel = () => {
    setChangeMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">マイプロフィール</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {changeMode ? (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                名前
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="block"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                ブロック
              </label>
              <Select
                value={formData.block}
                onValueChange={(value) =>
                  setFormData({ ...formData, block: value as Block })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ブロックを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sprints">短距離</SelectItem>
                  <SelectItem value="MiddleAndLongDistance">
                    中長距離
                  </SelectItem>
                  <SelectItem value="Jumps">跳躍</SelectItem>
                  <SelectItem value="Throws">投擲</SelectItem>
                  <SelectItem value="Others">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                学年
              </label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData({ ...formData, grade: value as Grade })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="学年を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIRST">1年生</SelectItem>
                  <SelectItem value="SECOND">2年生</SelectItem>
                  <SelectItem value="THIRD">3年生</SelectItem>
                  <SelectItem value="FOURTH">4年生</SelectItem>
                  <SelectItem value="GRADUATE_STUDENT">院生</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                className="border rounded-2xl border-gray-400 cursor-pointer dark:border-gray-600 flex-1"
                onClick={handleCancel}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                variant="ghost"
                className="border rounded-2xl border-black cursor-pointer dark:border-white flex-1"
                onClick={handleSave}
              >
                保存する
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                名前
              </label>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                メールアドレス
              </label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ブロック
              </label>
              <p className="text-lg font-semibold">{formatBlock(user.block)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                学年
              </label>
              <p className="text-lg font-semibold">{formatGrade(user.grade)}</p>
            </div>
            <div>
              <Button
                variant="ghost"
                className="border rounded-2xl border-black cursor-pointer dark:border-white"
                onClick={handleEditClick}
              >
                変更する
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
