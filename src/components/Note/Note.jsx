import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from '../../Context/UserContext/UserContext';

export default function Note({note,  getNotes}) {
    const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const{token} = useContext(UserContext);


     async function handleDelete(){
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
            method: "DELETE",
            headers:{
                token: `3b8ny__${token}`
            }
        }
        const {data} = await axios.request(options);
        // console.log(data);
        if(data.msg == "done"){
            getNotes();
        }
        
      }

      async function onSubmit(formValues) {
        console.log(formValues);
        const options = {
          url: `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
          method:"PUT",
          data: formValues,
          headers:{
            token: `3b8ny__${token}`
          }
        }
        const {data} = await axios.request(options);
        // console.log(data);
        if(data.msg == "done"){
            handleClose();
            getNotes();

        }
      }
    
      const formik = useFormik({
        initialValues: {
          title: note.title,
          content: note.content,
        },
        onSubmit
      });


  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add title"
              className="form-control"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-label mt-3" htmlFor="content">
              Discription
            </label>
            <textarea
              rows={3}
              cols={3}
              id="content"
              name="content"
              placeholder="Add discription"
              className="form-control"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="col-md-4">
            <div className="note-card bg-white rounded shadow p-3">
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <i onClick={handleShow} className="fa-solid fa-pen-to-square fs-4 text-warning me-3"></i>
                <i onClick={handleDelete} className="fa-solid fa-trash text-danger fs-4"></i>
            </div>
        </div>
    </>
  )
}
