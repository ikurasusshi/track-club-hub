import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { GET_USERS } from "../../queries/userQueries";
import type { User } from "../../types/user";
import JumpsMemberTab from "./blockMember/JumpsMemberTab";
import MiddleAndLongDistanceMemberTab from "./blockMember/MiddleAndLongDistanceMemberTab";
import OthersMemberTab from "./blockMember/OthersMemberTab";
import SprintsMemberTab from "./blockMember/SprintsMemberTab";
import ThrowsMemberTab from "./blockMember/ThrowsMemberTab";

type TabTypes = "短距離" | "中距離" | "跳躍" | "投擲" | "その他";

const UsersList = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("短距離");
  const { loading, error, data } = useQuery<{ getUsers: User[] }>(GET_USERS);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-red-500">
          エラーが発生しました: {error.message}
        </div>
      </div>
    );
  }

  const users = data?.getUsers || [];

  return (
    <div>
      <div className="">
        <div className="bg-white dark:bg-darkTheme space-x-6 border-b-[0.5px] border-slate-700">
          <h1 className="font-bold text-3xl my-3">部員一覧</h1>
          <button
            className={`ml-43 font-bold mr-15 pb-3 ${
              activeTab === "短距離"
                ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setActiveTab("短距離")}
          >
            短距離
          </button>
          <button
            className={`font-bold mr-15 pb-3 ${
              activeTab === "中距離"
                ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setActiveTab("中距離")}
          >
            中距離
          </button>
          <button
            className={`font-bold mr-15 pb-3 ${
              activeTab === "跳躍"
                ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setActiveTab("跳躍")}
          >
            跳躍
          </button>
          <button
            className={`font-bold mr-15 pb-3 ${
              activeTab === "投擲"
                ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setActiveTab("投擲")}
          >
            投擲
          </button>
          <button
            className={`font-bold pb-3 ${
              activeTab === "その他"
                ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
            onClick={() => setActiveTab("その他")}
          >
            その他
          </button>
        </div>
        <div className="mt-6">
          {activeTab === "短距離" && (
            <SprintsMemberTab
              users={users.filter((user) => user.block === "Sprints")}
            />
          )}
          {activeTab === "中距離" && (
            <MiddleAndLongDistanceMemberTab
              users={users.filter(
                (user) => user.block === "MiddleAndLongDistance"
              )}
            />
          )}
          {activeTab === "跳躍" && (
            <JumpsMemberTab
              users={users.filter((user) => user.block === "Jumps")}
            />
          )}
          {activeTab === "投擲" && (
            <ThrowsMemberTab
              users={users.filter((user) => user.block === "Throws")}
            />
          )}
          {activeTab === "その他" && (
            <OthersMemberTab
              users={users.filter((user) => user.block === "Others")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
