import axios from "axios";
const URL_API = "https://todo-list-json-server.onrender.com/allTasks";

export const getTasks = async () => {
  try {
    const { data } = await axios.get(URL_API);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postTask = async (obj) => {
  try {
    const { data } = await axios.post(URL_API, obj);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`${URL_API}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const patchTask = async (id, obj) => {
  try {
    const { data } = await axios.patch(`${URL_API}/${id}`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
};
