import { teamApi } from "../utils/api";

export const getMembers = async () => {
  const response = await teamApi.getMembers();
  return response.data;
};

export const getMember = async (memberId) => {
  const response = await teamApi.getMember(memberId);
  return response.data;
};

export const createMember = async (memberData) => {
  const response = await teamApi.createMember(memberData);
  return response.data;
};

export const updateMember = async (memberId, memberData) => {
  const response = await teamApi.updateMember(
    memberId,
    memberData
  );

  return response.data;
};

export const deleteMember = async (memberId) => {
  await teamApi.deleteMember(memberId);
  return memberId;
};