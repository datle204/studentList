import "./App.css";
import { useState } from "react";
import ModalAdd from "./component/ModalAdd";
import ModalDelete from "./component/ModalDelete";

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
  }

]

function App() {

  const [studentList, setStudentList] = useState(STUDENTLIST);
  const [modalAdd, modalAddVisible] = useState(false);
  const [modalDelete, modalDeleteVisible] = useState(false);
  const [buttonId, setButtonId] = useState();

  const [inputName, setInputName] = useState();
  const [inputDob, setInputDob] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();

  function updateName(event){
    const inputNameValue = event.target.value;
    console.log(inputNameValue);
    setInputName(inputNameValue);
  }
  function updateDob(event){
    const inputDobValue= event.target.value;
    setInputDob(inputDobValue);
  }
  function updateEmail(event){
    const inputEmailValue= event.target.value;
    setInputEmail(inputEmailValue);
  }
  function updatePhone(event){
    const inputPhoneValue= event.target.value;
    setInputPhone(inputPhoneValue);
  }


  const studentlist = studentList.map((student) => (
    
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.dob}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <button class="edit" id = "" ><i class="fas fa-edit"> Chỉnh sửa</i></button> |
        <button class="delete" id=""><i class="fas fa-trash-alt" onClick={() => openModalDelete(student.id)}> Xóa</i></button>
      </td>
    </tr>
    
    
  ));

  // Mở modal thêm sinh viên
  function openModalAdd(){
    modalAddVisible(true);
  }

  // Tắt modal thêm sinh viên
  function backToList(){
    setStudentList(studentList);
    modalAddVisible(false);
  }

  const [newStudentId, setNewStudentId] = useState(4);
 


  // Thêm sinh viên
  function saveNewStudent(){
    
    setNewStudentId(newStudentId+1);

    let newStudent = 
    
    {
      id: newStudentId,
      name : inputName,
      dob : inputDob,
      email : inputEmail,
      phone : inputPhone
    }
    
    studentList.unshift(newStudent);
    // setStudentList(studentList);
    modalAddVisible(false);
  }

  // Mở modal xóa sinh viên
  function openModalDelete(studentId){
    setButtonId(studentId)
    modalDeleteVisible(true);
  }

  // Confirm xóa sinh viên
  function confirmRemove(){
    const newStudentList = studentList.filter(
      (student) => student.id !== buttonId
    );

    setStudentList(newStudentList);
    modalDeleteVisible(false);
  }

  // Không xóa sinh viên
  function cancelRemove(){
    modalDeleteVisible(false);
  }



  return (
    <main>
    <div className="container">
      <h1 className="title">Danh sách học viên</h1>
      <button id="add-student">
        <i className="fas fa-plus-circle" onClick={openModalAdd}> Thêm học viên</i>
      </button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Năm sinh</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th></th>
            </tr>
          </thead>

          <tbody id="content">
            {studentlist}
          </tbody>
        </table>
      </div>
      {
        modalAdd && <ModalAdd 
        updateName = {updateName}
        updateDob = {updateDob}
        updateEmail = {updateEmail}
        updatePhone = {updatePhone}
        backToList={backToList}
        saveNewStudent={saveNewStudent}
        />
      }
      {
        modalDelete && <ModalDelete 
        message="Bạn có muốn xóa sinh viên này không?" 
        confirmRemove={confirmRemove}
        cancelRemove={cancelRemove}/>
      }

    </div>
    
    </main>

  );
}

export default App;
