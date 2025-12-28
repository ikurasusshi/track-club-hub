import { useState } from "react";
import BasicInfo from "./tabs/BasicInfo";
import AbsenceReport from "./tabs/AbsenceReport";
import MatchReport from "./tabs/MatchReport";

type TabTypes = "基本情報" | "欠席連絡" | "試合報告";

const Main = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("基本情報");
  return (
    <div className="">
      <div className="space-x-6 border-b-[0.5px] border-slate-700">
        <button
          className={`ml-43 font-bold mr-15 pb-3 ${
            activeTab === "基本情報"
              ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
              : "text-slate-400 dark:text-slate-500"
          }`}
          onClick={() => setActiveTab("基本情報")}
        >
          Info
        </button>
        <button
          className={`font-bold mr-15 pb-3 ${
            activeTab === "欠席連絡"
              ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
              : "text-slate-400 dark:text-slate-500"
          }`}
          onClick={() => setActiveTab("欠席連絡")}
        >
          Absence
        </button>
        <button
          className={`font-bold pb-3 ${
            activeTab === "試合報告"
              ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
              : "text-slate-400 dark:text-slate-500"
          }`}
          onClick={() => setActiveTab("試合報告")}
        >
          Reports
        </button>
      </div>
      <div className="mt-6">
        {activeTab === "基本情報" && <BasicInfo />}
        {activeTab === "欠席連絡" && <AbsenceReport />}
        {activeTab === "試合報告" && <MatchReport />}
      </div>
    </div>
  );
};
export default Main;
