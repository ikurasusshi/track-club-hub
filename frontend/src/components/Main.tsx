import { useState } from "react";
import AttendanceReport from "./attendanceReportPage/AttendanceReport";
import CompetitionReport from "./competitionReportPage/CompetitionReport";

type TabTypes = "欠席連絡" | "試合報告";

const Main = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("欠席連絡");
  return (
    <div className="">
      <div className="bg-white dark:bg-darkTheme space-x-6 border-b-[0.5px] border-slate-700">
        <button
          className={`ml-43 font-bold mr-15 pb-3 cursor-pointer ${
            activeTab === "欠席連絡"
              ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
              : "hover:text-black dark:hover:text-white duration-75 text-slate-400 dark:text-slate-500"
          }`}
          onClick={() => setActiveTab("欠席連絡")}
        >
          欠席連絡
        </button>
        <button
          className={`font-bold pb-3 cursor-pointer ${
            activeTab === "試合報告"
              ? "text-black dark:text-white border-b-[1.5px] border-black dark:border-white"
              : "hover:text-black dark:hover:text-white duration-75 text-slate-400 dark:text-slate-500"
          }`}
          onClick={() => setActiveTab("試合報告")}
        >
          試合報告
        </button>
      </div>
      <div className="mt-6">
        {activeTab === "欠席連絡" && <AttendanceReport />}
        {activeTab === "試合報告" && <CompetitionReport />}
      </div>
    </div>
  );
};
export default Main;
