import type { Block } from "@/types/user";

export const formatBlock = (block: Block): string => {
  const blockMap: Record<Block, string> = {
    Sprints: "短距離",
    MiddleAndLongDistance: "中長距離",
    Jumps: "跳躍",
    Throws: "投擲",
    Others: "その他",
  };
  return blockMap[block];
};
