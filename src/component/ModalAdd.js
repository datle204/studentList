export default function ModalAdd({ backToList, saveNewStudent, updateName,updateDob,updateEmail,updatePhone}) {
  return (
    <div className="container">
      <form>
        <h1 className="create-list-title">Thêm mới học viên</h1>
        <div className="row">
          <label htmlFor="name">
            Họ tên <span> *</span>
          </label>
          <input type="text" id="name" defaultValue="" onChange={(event) => updateName(event)} required />
        </div>
        <div className="row">
          <label htmlFor="yearOfBirth">Năm sinh</label>
          <input type="text" id="dob" defaultValue=""  onChange={(event) => updateDob(event)} />
        </div>
        <div className="row">
          <label htmlFor="email">
            Email <span> *</span>
          </label>
          <input type="text" id="email" defaultValue=""   onChange={(event) => updateEmail(event)} required />
        </div>
        <div className="row">
          <label htmlFor="phone">
            Phone <span> *</span>
          </label>
          <input type="tel" id="phone" defaultValue=""  onChange={(event) => updatePhone(event)} required />
        </div>
      </form>
      <div className="button-box">
        <button id="back-button" onClick={backToList}>
          Back 
        </button>
        <button id="save-button" onClick={saveNewStudent}>
          Save
        </button>
      </div>
    </div>
  );
}
