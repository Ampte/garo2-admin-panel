function Modal({ title, children, close }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        {children}

        <button className="close-btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;