export default function Body({ students, openModal, openModalDelete }) {
  const studentList = students.map((student) => (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.dob}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>
        <button
          className="edit"
          onClick={() => openModal("Edit Student", true, student.id)}
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
      <h1 className="title">Danh sách học viên</h1>
      <button
        id="add-student"
        onClick={() => openModal("Add New Student", false)}
      >
        Thêm học viên
      </button>
      <table>
        <thead>
          <tr>
            <th>
              Họ tên
              <button className="fa fa-sort"></button>
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
