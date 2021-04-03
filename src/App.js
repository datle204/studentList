import "./App.css";
import { useState, useEffect } from "react";
import ModalDelete from "./component/ModalDelete";
import Body from "./component/Body";
import FormModal from "./component/FormModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function App() {
  const [students, setStudentList] = useState([]);
  const [modalDelete, modalDeleteVisible] = useState(false);
  const [buttonDeleteId, setButtonDeleteId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal");
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setStudentList(data);
    }
    getUsers();
  }, []);

  async function setItem(item) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
  }

  async function deleteItem(userDeleteId) {
    return fetch(`http://localhost:3000/users/${userDeleteId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  async function editItem(item) {
    return fetch(`http://localhost:3000/users/${editStudentId}`, {
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

  function NewStudent(data) {
    students.unshift(data);
    setItem(data);
    console.log(students);
    setShowModal(false);
  }

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

  return (
    <main>
      <Body
        students={students}
        openModalDelete={openModalDelete}
        openModal={openModal}
      />
      <FormModal
        visible={showModal}
        title={modalTitle}
        closeModal={() => setShowModal(false)}
        handleSave={isEdit ? editStudent : NewStudent}
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
