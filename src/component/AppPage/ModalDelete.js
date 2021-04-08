export default function ModalDelete({message, confirmRemove, cancelRemove}){
    return(
        <div id="modal">
            <h1>{message}</h1>
            <button className="modal-btn" onClick={confirmRemove}>OK</button>
            <button className="modal-btn" onClick={cancelRemove}>Cancel</button>
        </div>
    );
}

