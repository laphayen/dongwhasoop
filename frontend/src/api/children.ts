import api from "../lib/axiosInstance";
import {
  CreateChildRequest,
  ApiResponse,
  GetChildListApiResponse,
  UpdateChildRequest,
  UpdateChildProfileApiResponse,
  DeleteChildProfileApiResponse,
} from "../types/children";

// 자녀 등록
export const createChildProfile = async (childData: CreateChildRequest) => {
  const response = await api.post<ApiResponse<null>>("/children", childData);
  return response.data;
};

// 자녀 목록 조회
export const getChildProfiles = async () => {
  const response = await api.get<GetChildListApiResponse>("/children");
  return response.data.data.childList;
};

// 자녀 정보 수정
export const updateChildProfile = async (childId: number, updateData: UpdateChildRequest) => {
  // console.log("Put 요청 URL:", `/children/${childId}`);
  // console.log("updateData:", updateData);

  const response = await api.put<UpdateChildProfileApiResponse>(`/children/${childId}`, updateData);
  return response.data.data;
};

// 자녀 삭제
export const deleteChildProfile = async (childId: number) => {
  const response = await api.delete<DeleteChildProfileApiResponse>(`/children/${childId}`);
  return response.data.success;
};
