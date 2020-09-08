import React from 'react';

function addParcours() {
    return(
        <form>
            <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
            </div>
        </form>
    )
}

export default addParcours;