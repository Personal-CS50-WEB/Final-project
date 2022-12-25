import React from "react";
import Datetime from 'react-datetime';

export const ModalForm = ({closeModal, newDate, setNewDate, editDeadline, modalIndex}) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Edit deadline</h5>       
                <button type="button"
                className="close"   
                data-dismiss="modal" aria-label="Close"
                onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <label>Deadline</label>
                <Datetime
                minDate={newDate}
                utc={true}
                isValidDate ={(date) =>{
                    return date > new Date();
                }}
                name ='newDate'
                value={newDate}
                onChange={ setNewDate }
                />
            </div>
            <div className="modal-footer">
                <button 
                onClick={e => editDeadline(e, modalIndex) }
                className="btn btn-primary">
                    Save changes
                </button>
            </div>
        </div>
    );
};
