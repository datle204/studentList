import "./App.css";
import { useState, useEffect } from "react";
import ModalDelete from "./ModalDelete";
import Body from "./Body";
import FormModal from "./FormModal";
import Pagination from "./Pagination";
import { getUsers, createUser, updateUser, deleteUser } from "../api";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { useHistory } from "react-router-dom";

function App() {
  // STATE

  // Check token
  const history = useHistory();
  if (localStorage.getItem("token") === null) {
    history.push("/login");
  }

  const [students, setStudentList] = useState([]);
  // State modal delete
  const [modalDelete, modalDeleteVisible] = useState(false);
  const [buttonDeleteId, setButtonDeleteId] = useState();
  //State modal add + modal edit
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal");
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [editStudentId, setEditStudentId] = useState();
  // State sort
  const [totalItems, setTotalItems] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  // Check sort button is clicked or not
  const [checkSort, setCheckSort] = useState(false);
  // Set currentPage when pagination is clicked
  const [currentPage, setCurrentPage] = useState(1);
  // END STATE

  // Gọi lên server để lấy dữ liệu (GET)
  useEffect(() => {
    async function fetchData() {
      const { users, totalCount } = await getUsers(1);
      setStudentList(users);
      setTotalItems(totalCount);
    }
    fetchData();
  }, []);

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
    deleteUser(buttonDeleteId);
    setStudentList(newStudentList);
    modalDeleteVisible(false);
  }

  // Không xóa sinh viên
  function cancelRemove() {
    modalDeleteVisible(false);
  }

  // FORM MODAL : MODAL ADD + MODAL EDIT

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
    createUser(data);
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
    updateUser(data, editStudentId);
    setShowModal(false);
  }

  // SORT FUNCTION

  async function sortStudents(column) {
    let data;
    if (checkSort) {
      data = await getUsers(1, column, "desc");
    } else {
      data = await getUsers(1, column, "asc");
    }
    setSortColumn(column);
    setCheckSort(!checkSort);
    setCurrentPage(1);
    setStudentList(data.users);
  }

  // PAGINATION
  async function changePage(pageId) {
    let order = checkSort ? "asc" : "desc";
    const { users } = await getUsers(pageId, sortColumn, order);
    console.log(users);
    setCurrentPage(pageId);
    setStudentList(users);
  }

  return (
    <main>
      <Body
        students={students}
        openModalDelete={openModalDelete}
        openModal={openModal}
        sortStudents={sortStudents}
      />
      <Pagination
        changePage={changePage}
        totalItems={totalItems}
        currentPage={currentPage}
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
