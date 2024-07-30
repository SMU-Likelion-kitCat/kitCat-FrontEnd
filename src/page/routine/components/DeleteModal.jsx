import React from 'react';

const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p className='modal-p'>루틴을 삭제할까요?</p>
                <div className="modal-actions">
                    <button className="modal-button cancel" onClick={onClose}>아니오</button>
                    <button className="modal-button confirm" onClick={onConfirm}>네</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
