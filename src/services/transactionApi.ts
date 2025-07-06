import api from "./api";


export const getTransaction = () => api.get("/transaction");
export const getTransactionById = (id: any) => api.get(`/transaction/${id}`);
export const createTransaction = (data: any) => api.post("/transaction", data);
export const deleteTransaction = (id: any) => api.delete(`/transaction/${id}`);