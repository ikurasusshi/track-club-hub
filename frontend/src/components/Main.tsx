import { useState } from "react";

type TabTypes = "基本情報" | "欠席連絡" | "試合報告";

const Main = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("基本情報");
  return (
    <div className="">
      <div className="space-x-6">
        <button className="" onClick={() => setActiveTab("基本情報")}>
          基本情報
        </button>
        <button className="" onClick={() => setActiveTab("欠席連絡")}>
          欠席連絡
        </button>
        <button className="" onClick={() => setActiveTab("試合報告")}>
          試合報告
        </button>
      </div>
      {activeTab === "基本情報" && <div>Content of type 基本情報</div>}
      {activeTab === "欠席連絡" && <div>Content of type 欠席連絡</div>}
      {activeTab === "試合報告" && <div>Content of type 試合報告</div>}
    </div>
  );
};
export default Main;
