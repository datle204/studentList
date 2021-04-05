import "./App.css";
import { useState, useEffect } from "react";
import ModalDelete from "./component/ModalDelete";
import Body from "./component/Body";
import FormModal from "./component/FormModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Pagination from "./component/Pagination";

function App() {
  const [students, setStudentList] = useState([]);
  const [modalDelete, modalDeleteVisible] = useState(false);
  const [buttonDeleteId, setButtonDeleteId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal");
  const [isEdit, setEdit] = useState(false);

  const [totalItems, setTotalItems] = useState(0);

  // Gọi lên server để lấy dữ liệu (GET)
  useEffect(() => {
    async function getUsers() {
      let pageLimit = 3;
      let url = "https://studentlist2020.herokuapp.com/users";
      url += "?_page=" + 1;
      url += "&_limit=" + pageLimit;
      const res = await fetch(url);
      const data = await res.json();
      let totalCount = res.headers.get("X-Total-Count");
      setTotalItems(totalCount);
      setStudentList(data);
    }
    getUsers();
  }, []);

  // Gọi lên server để truyền dữ liệu vào
  async function setItem(item) {
    return fetch("https://studentlist2020.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
  }

  // Gọi lên server để xóa dữ liệu
  async function deleteItem(userDeleteId) {
    return fetch(`https://studentlist2020.herokuapp.com/users/${userDeleteId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  // Gọi lên server để update dữ liệu
  async function editItem(item) {
    return fetch(`https://studentlist2020.herokuapp.com/users/${editStudentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
  }

  // Mở modal xóa sinh viên
  function openModalDelete(studentId) {
    setButtonDeleteId(studentId);
    modalDeleteVisible(true);
  }

  // Confirm xóa sinh viên
  function confirmRemove() {
    const newStudentList = students.filter(
      (student) => student.id !== buttonDeleteId
    );
    deleteItem(buttonDeleteId);
    setStudentList(newStudentList);
    modalDeleteVisible(false);
  }

  // Không xóa sinh viên
  function cancelRemove() {
    modalDeleteVisible(false);
  }

  // Form Modal : Modal add + Modal edit

  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [editStudentId, setEditStudentId] = useState();

  // OPEN MODAL
  function openModal(title, isEdit, studentID) {
    let index = students.findIndex((student) => student.id === studentID);
    if (index > -1) {
      setEditStudentId(studentID);
      let newStudent = [...students];
      console.log(newStudent[index]);
      setName(newStudent[index].name);
      setDob(newStudent[index].dob);
      setEmail(newStudent[index].email);
      setPhone(newStudent[index].phone);
    }

    if (isEdit === false) {
      setName();
      setDob();
      setEmail();
      setPhone();
    }

    setShowModal(true);
    setModalTitle(title);
    setEdit(isEdit);
  }

  // ADD NEW STUDENT

  function newStudent(data) {
    students.unshift(data);
    setItem(data);
    console.log(students);
    setShowModal(false);
  }

  // EDIT STUDENT
  function editStudent(data) {
    let index = students.findIndex((student) => student.id === editStudentId);
    if (index > -1) {
      let newStudent = [...students];
      newStudent[index].name = name;
      newStudent[index].dob = dob;
      newStudent[index].email = email;
      newStudent[index].phone = phone;
    }
    console.log(data);
    editItem(data);
    setShowModal(false);
  }

  // SORT FUNCTION

  const [checkSort, setCheckSort] = useState(false);

  async function sortItemsASC(pageId) {
    let pageLimit = 3;
    let url = "https://studentlist2020.herokuapp.com/users";
    url += "?_page=" + pageId + "&_limit=" + pageLimit;
    url += "&_sort=name&_order=asc";
    const res = await fetch(url);
    const data = await res.json();

    setStudentList(data);
  }

  async function sortItemsDESC(pageId) {
    let pageLimit = 3;
    let url = "https://studentlist2020.herokuapp.com/users";
    url += "?_page=" + pageId + "&_limit=" + pageLimit;
    url += "&_sort=name&_order=desc";
    const res = await fetch(url);
    const data = await res.json();

    setStudentList(data);
  }

  const [sortNameBtn, setSortNameBtn] = useState(false);

  function sortName(pageId) {
    if (checkSort === false) {
      sortItemsASC(pageId);
      setCheckSort(true);
      setSortNameBtn(true);
    }
    if (checkSort === true) {
      sortItemsDESC(pageId);
      setCheckSort(false);
    }
  }

  // PAGINATION

  async function getPage(pageId) {
    let pageLimit = 3;
    let url = "https://studentlist2020.herokuapp.com/users";
    url += "?_page=" + pageId + "&_limit=" + pageLimit;

    if (sortNameBtn === true) {
      if (checkSort === true) {
        url += "&_sort=name&_order=asc";
      }
      if (checkSort === false) {
        url += "&_sort=name&_order=desc";
      }
    }

    const res = await fetch(url);
    const data = await res.json();
    console.log(pageId);
    console.log(data);
    setStudentList(data);
  }

  // Change Page
  const [changePageBtn, setChangePageBtn] = useState(1);

  function changePage(pagiItem) {
    let pageId = pagiItem;
    setChangePageBtn(pagiItem);
    getPage(pageId);
  }

  return (
    <main>
      <Body
        students={students}
        openModalDelete={openModalDelete}
        openModal={openModal}
        sortName={sortName}
      />

      <Pagination
        changePage={changePage}
        totalItems={totalItems}
        changePageBtn={changePageBtn}
        // className={className}
      />

      <FormModal
        visible={showModal}
        title={modalTitle}
        closeModal={() => setShowModal(false)}
        handleSave={isEdit ? editStudent : newStudent}
        isEdit={isEdit}
        students={students}
        editStudentId={editStudentId}
        name={name}
        dob={dob}
        email={email}
        phone={phone}
        setName={setName}
        setDob={setDob}
        setEmail={setEmail}
        setPhone={setPhone}
      />

      {modalDelete && (
        <ModalDelete
          message="Bạn có muốn xóa sinh viên này không?"
          confirmRemove={confirmRemove}
          cancelRemove={cancelRemove}
        />
      )}
    </main>
  );
}

export default App;
