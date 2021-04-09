import axios from "axios";

const apis = axios.create({
  baseURL: "https://studentlist2020.herokuapp.com",
  headers: { Authorization: 'token' }
});

const DOMAIN = "https://studentlist2020.herokuapp.com";
const USER_API = DOMAIN + "/users";
const PAGE_LIMIT = 3;


// DISPLAY LIST STUDENTS
export async function getUsers(page = 1, sort, order) {
  let sortParam = sort ? `&_sort=${sort}` : "";
  let orderParam = sort ? `&_order=${order}` : "";

  apis
    .get(`/users?_page=${page}&_limit=${PAGE_LIMIT}${sortParam}${orderParam}`,{
      headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`},
    })
    
    .then((res)=> {
      
      console.log(res);
      
    })
    .catch((err) => console.log(err)
    );
   
    return {users:[], totalCount:1};
}
// ADD NEW STUDENT
export async function createUser(user) {
  return fetch(USER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}
// UPDATE STUDENT
export async function updateUser(user, editStudentId) {
  return fetch(`${USER_API}/${editStudentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}
// DELETE STUDENT
export async function deleteUser(userDeleteId) {
  return fetch(`${USER_API}/${userDeleteId}`, {
    method: "DELETE",
  }).then((res) => res.json());
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
