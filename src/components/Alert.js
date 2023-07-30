import React from 'react'

function Alert(props) {


    return (
        <>
            <div className="alert alert-primary" style={{ height: '50px' }} role="alert">
                {props.msg}
            </div>
        </>
    )
}

export default Alert

