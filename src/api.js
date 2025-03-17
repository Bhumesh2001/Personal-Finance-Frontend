import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

export const getTransactions = async () => axios.get(`${API_BASE_URL}/transactions`);
export const addTransaction = async (data) => axios.post(`${API_BASE_URL}/transactions`, data);
export const updateTransaction = async (id, data) => axios.put(`${API_BASE_URL}/transactions/${id}`, data);
export const deleteTransaction = async (id) => axios.delete(`${API_BASE_URL}/transactions/${id}`);

export const getBudgets = async () => axios.get(`${API_BASE_URL}/budget`);
export const addBudget = async (data) => axios.post(`${API_BASE_URL}/budget`, data);
export const getBudgetSummary = async () => axios.get(`${API_BASE_URL}/budget/summary`);
