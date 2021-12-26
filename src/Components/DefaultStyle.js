import React from "react"
const InputBox = (props) =>{
    return(
      <div className="mb-3">
      <label className="fw-bolder ">{props.value}</label><sub>{props.sub}</sub>
      <input  required={props.required} name={props.name} type={props.type} className="form-control" placeholder={`Enter ${props.value}`}></input>
    </div>
    )
    }
    const InputButton = props =>{
      return(
        <div className="mb-4 d-grid gap-2">
                <button className="btn btn-primary" title={`${props.title}`} type={props.type}>{`${props.title}`}</button></div>
    
      )
    }
export {InputButton,InputBox};