function ModalEdit({ Button, Modal, show, handleClose,inputNameEdit, inputDobEdit, inputEmailEdit, inputPhoneEdit, updateNameEdit, updateDobEdit, updateEmailEdit, updatePhoneEdit, handleEdit}) {

  return (
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap">
            <div className="row">
              <label htmlFor="name">
                Họ tên <span> *</span>
              </label>
              <input type="text" defaultValue={inputNameEdit} onChange={(event) => updateNameEdit(event)}/>
            </div>
            <div className="row">
              <label htmlFor="yearOfBirth">Năm sinh</label>
              <input type="text"  defaultValue={inputDobEdit} onChange={(event) => updateDobEdit(event)}/>
            </div>
            <div className="row">
              <label htmlFor="email">
                Email <span> *</span>
              </label>
              <input type="text"  defaultValue={inputEmailEdit} onChange={(event) => updateEmailEdit(event)} />
            </div>
            <div className="row">
              <label htmlFor="phone">
                Phone <span> *</span>
              </label>
              <input type="tel"  defaultValue={inputPhoneEdit} onChange={(event) => updatePhoneEdit(event)}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => handleEdit(event)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
}

export default ModalEdit;
