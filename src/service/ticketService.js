import { ticketApi } from "../utils/api";

export const getTickets = async () => {
  const response = await ticketApi.getTickets();
  return response.data;
};

export const getTicket = async (id) => {
  const response = await ticketApi.getTicket(id);
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await ticketApi.createTicket(ticketData);
  return response.data;
};

export const editTicket = async (id, ticketData) => {
  const response = await ticketApi.updateTicket(id, ticketData);
  return response.data;
};

export const deleteTicket = async (id) => {
  await ticketApi.deleteTicket(id);
  return id;
};

export const assignTicket = async (ticketId, memberId) => {
  const response = await ticketApi.assignTicket(
    ticketId,
    memberId
  );

  return response.data;
};

export const addComment = async (ticketId, content) => {
  const response = await ticketApi.addComment(
    ticketId,
    content
  );

  return response.data;
};

export const changeStatus = async (ticketId, status) => {
  const response = await ticketApi.changeStatus(
    ticketId,
    status
  );

  return response.data;
};