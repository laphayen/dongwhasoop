import { useQuery } from "@tanstack/react-query";
import { getChildProfiles } from "../api/children";
import { ChildProfile } from "../types/children";

// 자녀 프로필 조회
export const useChildProfile = () => {
  return useQuery<ChildProfile[]>({
    queryKey: ["children"],
    queryFn: getChildProfiles,
  });
};
