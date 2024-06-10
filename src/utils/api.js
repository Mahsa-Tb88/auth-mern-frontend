import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

export async function registerUser(user) {
  try {
    const { data } = await axios.post("/auth/register", user);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}

export async function login(user) {
  try {
    const { data } = await axios.post("/auth/login", user);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}

export async function initialize() {
  try {
    const { data } = await axios.get("/misc/initialize");
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export async function updateUser(id, username, password) {
  console.log(id, username, password);
  try {
    const { data } = await axios.put(`/user/${id}`, { username, password });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function signOut() {
  try {
    const { data } = await axios.get("/auth/signout");
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete("/user/" + id);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
