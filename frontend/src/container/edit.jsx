import React from "react";

import Datetime from 'react-datetime';
import Modal from 'react-modal';

export default function EditSurvey(modalIsOpen, closeModal){

    return(
        <Modal
        style={{
            content: {
                position: 'absolute',
                top: '100px',
                left: '40px',
                right: '40px',
                bottom: '100px',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
                border: 'none'
            }}}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        >
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
                    name ='deadline'
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" 
                    className="btn btn-primary">
                        Save changes
                    </button>
                </div>
            </div>
       
        </Modal>
    )
}