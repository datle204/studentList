import "./App.css";
import { useState, useEffect } from "react";
import ModalAdd from "./component/ModalAdd";
import ModalDelete from "./component/ModalDelete";
import ModalEdit from "./component/ModalEdit";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

const STUDENTLIST = [
  {
    id: 1,
    name: "Hieu",
    dob: "20/02/1994",
    email: "ABC@gmail.com",
    phone: "01242433434",
  },
  {
    id: 2,
    name: "Dat",
    dob: "20/02/1994",
    email: "ABC@gmail.com",
    phone: "01242433434",
  },
  {
    id: 3,
    name: "Dung",
    dob: "20/02/1994",
    email: "ABC@gmail.com",
    phone: "01242433434",
  },
  {
    id: 4,
    name: "Huy",
    dob: "20/02/1994",
    email: "ABC@gmail.com",
    phone: "01242433434",
  },
];

function App() {
  // const [users, setUsers] = useState();
  const [students, setStudentList] = useState(STUDENTLIST);
  useEffect(() =>{
    console.log("component did mounted");
    async function getUsers(){
      const res = await fetch("https://studentlist2020.herokuapp.com/");
      const data = await res.json();
      setStudentList(data);
    }
    getUsers();

  }, []);


  
  const [modalAdd, modalAddVisible] = useState(false);
  const [modalDelete, modalDeleteVisible] = useState(false);
  const [buttonDeleteId, setButtonDeleteId] = useState();

  // Tạo mới
  const [inputName, setInputName] = useState();
  const [inputDob, setInputDob] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();

  function updateName(event) {
    const inputNameValue = event.target.value;
    setInputName(inputNameValue);
  }

  function updateDob(event) {
    const inputDobValue = event.target.value;
    setInputDob(inputDobValue);
  }
  function updateEmail(event) {
    const inputEmailValue = event.target.value;
    setInputEmail(inputEmailValue);
  }
  function updatePhone(event) {
    const inputPhoneValue = event.target.value;
    setInputPhone(inputPhoneValue);
  }

  // Chỉnh sửa
  // Dùng map hoặc vòng lặp for

  const [inputNameEdit, setInputNameEdit] = useState();
  const [inputDobEdit, setInputDobEdit] = useState();
  const [inputEmailEdit, setInputEmailEdit] = useState();
  const [inputPhoneEdit, setInputPhoneEdit] = useState();

  function updateNameEdit(event) {
    const inputNameValueEdit = event.target.value;
    setInputNameEdit(inputNameValueEdit);
  }
  function updateDobEdit(event) {
    const inputDobValueEdit = event.target.value;
    setInputDobEdit(inputDobValueEdit);
  }
  function updateEmailEdit(event) {
    const inputEmailValueEdit = event.target.value;
    setInputEmailEdit(inputEmailValueEdit);
  }
  function updatePhoneEdit(event) {
    const inputPhoneValueEdit = event.target.value;
    setInputPhoneEdit(inputPhoneValueEdit);
  }

  const studentlist = students.map((student) => (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.dob}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <button className="edit" onClick={() => handleShow(student.id)}>
          Chỉnh sửa
        </button>
        <button className="delete" onClick={() => openModalDelete(student.id)}>
          {" "}
          Xóa
        </button>
      </td>
    </tr>
  ));

  // Mở modal thêm sinh viên
  function openModalAdd() {
    
    modalAddVisible(true);
  }

  // Tắt modal thêm sinh viên
  function backToList() {
    setStudentList(students);
    modalAddVisible(false);
  }

  const [newStudentId, setNewStudentId] = useState(5);
  
  const [disableBtn, setDisableBtn] = useState(true);

  // Thêm sinh viên
  function saveNewStudent() {
    let newId = newStudentId + 1;
    setNewStudentId(newId);
  

    if(inputName !== "undefined"){
      setDisableBtn(false);
      console.log(disableBtn);
    }

    let newStudent = {
      id: newId,
      name: inputName,
      dob: inputDob,
      email: inputEmail,
      phone: inputPhone,
    };

    students.unshift(newStudent);
    console.log(students);
    modalAddVisible(false);
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

    setStudentList(newStudentList);
    modalDeleteVisible(false);
  }

  // Không xóa sinh viên
  function cancelRemove() {
    modalDeleteVisible(false);
  }

  // Chỉnh sửa thông tin sinh viên

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [editStudentId, setEditStudentId] = useState();

  function handleShow(studentID) {

    let index = students.findIndex((student) => student.id === studentID);
    if (index > -1) {
      let newStudent = [...students];
      setEditStudentId(studentID);
      setInputNameEdit(newStudent[index].name);
      setInputDobEdit(newStudent[index].dob);
      setInputEmailEdit(newStudent[index].email);
      setInputPhoneEdit(newStudent[index].phone);
    }

    setShow(true);
  }
  function handleEdit() {
    let index = students.findIndex((student) => student.id === editStudentId);
    if (index > -1) {
      let newStudentList = [...students];
      newStudentList[index].name = inputNameEdit;
      newStudentList[index].dob = inputDobEdit;
      newStudentList[index].email = inputEmailEdit;
      newStudentList[index].phone = inputPhoneEdit;

      setStudentList(newStudentList);
    }

    console.log(students);
    setShow(false);
  }

  // Sắp xếp dữ liệu

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function sortName() {
    students.sort(compare);
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Danh sách học viên</h1>
        <button id="add-student" onClick={openModalAdd}>
          Thêm học viên
        </button>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  Họ tên{" "}
                  <button className="fa fa-sort" onClick={sortName}></button>
                </th>
                <th>Năm sinh</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th></th>
              </tr>
            </thead>

            <tbody id="content">{studentlist}</tbody>
          </table>
        </div>
        {modalAdd && (
          <ModalAdd
            updateName={updateName}
            updateDob={updateDob}
            updateEmail={updateEmail}
            updatePhone={updatePhone}
            backToList={backToList}
            saveNewStudent={saveNewStudent}
            disableBtn={disableBtn}
            inputName={inputName}
            
          />
        )}
        {modalDelete && (
          <ModalDelete
            message="Bạn có muốn xóa sinh viên này không?"
            confirmRemove={confirmRemove}
            cancelRemove={cancelRemove}
          />
        )}

        {show && (
          <ModalEdit
            Button={Button}
            Modal={Modal}
            show={show}
            handleClose={handleClose}
            students={students}
            updateNameEdit={updateNameEdit}
            updateDobEdit={updateDobEdit}
            updateEmailEdit={updateEmailEdit}
            updatePhoneEdit={updatePhoneEdit}
            handleEdit={handleEdit}
            inputNameEdit={inputNameEdit}
            inputDobEdit={inputDobEdit}
            inputEmailEdit={inputEmailEdit}
            inputPhoneEdit={inputPhoneEdit}
          />
        )}
      </div>
    </main>
  );
}

export default App;
