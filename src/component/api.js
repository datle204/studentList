import axios from "axios";

const apis = axios.create({
  baseURL: "https://studentlist2020.herokuapp.com",
  headers: { Authorization: "token" },
});

const DOMAIN = "https://studentlist2020.herokuapp.com";
const USER_API = DOMAIN + "/users";
const PAGE_LIMIT = 3;

// DISPLAY LIST STUDENTS
export async function getUsers(page = 1, sort, order) {
  let sortParam = sort ? `&_sort=${sort}` : "";
  let orderParam = sort ? `&_order=${order}` : "";

  const res = await apis.get(
    `/users?_page=${page}&_limit=${PAGE_LIMIT}${sortParam}${orderParam}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  let users = res.data;
  let totalCount = res.headers["x-total-count"];
  return { users, totalCount };
}

// ADD NEW STUDENT
export async function createUser(user) {
  await axios({
    method: "post",
    url: USER_API,
    data: user,
    auth: window.$auth,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// UPDATE STUDENT
export async function updateUser(user, editStudentId) {
  await axios({
    method: "put",
    url: `${USER_API}/${editStudentId}`,
    data: user,
    auth: window.$auth,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
// DELETE STUDENT
export async function deleteUser(userDeleteId) {
  await axios({
    method: "delete",
    url: `${USER_API}/${userDeleteId}`,
    auth: window.$auth,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// CHECK LOGIN

export async function checkLogin(loginEmail, loginPassword) {
  return apis
    .post(`/login`, {
      email: loginEmail,
      password: loginPassword,
    })
    .then(function (res) {
      const token = res.data.token;
      localStorage.setItem("token", token);
      return res;
    });
}
