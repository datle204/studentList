import { Link } from "react-router-dom";

export default function Body({
  students,
  openModal,
  openModalDelete,
  sortStudents,
}) {
  const studentList = students.map((student) => (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.dob}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <button
          className="edit"
          onClick={() => openModal("Edit User", true, student.id)}
        >
          Chỉnh sửa
        </button>
        <button className="delete" onClick={() => openModalDelete(student.id)}>
          Xóa
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="change-page">
        <Link to="/login">
          <button className="change-to-login">Logout</button>
        </Link>
        <Link to="/profile">
          <button className="change-to-login">Profile</button>
        </Link>
      </div>
      <h1 className="title">Danh sách User</h1>
      <button id="add-student" onClick={() => openModal("Add New User", false)}>
        Thêm Mới
      </button>
      <table>
        <thead>
          <tr>
            <th>
              Họ tên
              <button
                className="fa fa-sort sort"
                onClick={() => sortStudents("name")}
              ></button>
            </th>
            <th>Năm sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th></th>
          </tr>
        </thead>

        <tbody id="content">{studentList}</tbody>
      </table>
    </div>
  );
}
