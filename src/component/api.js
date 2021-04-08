const API = "https://studentlist2020.herokuapp.com/users";
const PAGE_LIMIT = 3;

// DISPLAY LIST STUDENTS
export async function getUsers(page = 1, sort, order) {
  let sortParam = sort ? `&_sort=${sort}` : "";
  let orderParam = sort ? `&_order=${order}` : "";

  let url = `${API}?_page=${page}&_limit=${PAGE_LIMIT}${sortParam}${orderParam}`;
  const res = await fetch(url);
  const users = await res.json();
  const totalCount = res.headers.get("X-Total-Count");
  return { users, totalCount };
}
// ADD NEW STUDENT
export async function createUser(user) {
  return fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}
// UPDATE STUDENT
export async function updateUser(user, editStudentId) {
  return fetch(`${API}/${editStudentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}
// DELETE STUDENT
export async function deleteUser(userDeleteId) {
  return fetch(`${API}/${userDeleteId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

// CHECK LOGIN

export async function checkLogin(loginEmail, loginPassword) {
  return fetch("https://studentlist2020.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  })
}
