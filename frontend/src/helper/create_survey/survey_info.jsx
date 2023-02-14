import React from "react";

export const SurveyInfoFields = ({name, description, onChange }) => {
        
    return (<>
        <div className="form-group">
        <label>Survey name</label>
            <input className="form-control"
            data-testid='survey-name'
            type='text'
            name='name'
            placeholder='Survey name'
            value={name}
            onChange={e => onChange(e)}
            required
        />
        </div>
        <div className="form-group">
            <label>Description</label>
            <textarea className='form-control'
            data-testid='Description'
            name='description'
            placeholder='Description' 
            value={description} 
            onChange={e => onChange(e)}
            />
        </div>
    </>);
}