import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { UserContext } from "../../Context/UserContext/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import Note from "../../components/Note/Note";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { token } = useContext(UserContext);
  let[notes, setNotes] = useState([]);

  async function getNotes(){
    const options = {
      url:"https://note-sigma-black.vercel.app/api/v1/notes",
      method:"GET",
      headers:{
        token: `3b8ny__${token}`
      }
    }

    const {data}= await axios.request(options);
    // console.log(data.notes);
    setNotes(data.notes)
  }

  useEffect(()=>{
    getNotes();
  },[])

  async function onSubmit(formValues) {
    // console.log(formValues);
    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/notes",
      method:"POST",
      data: formValues,
      headers:{
        token: `3b8ny__${token}`
      }
    }

    const {data} = await axios.request(options);
    // console.log(data);
    if(data.msg == "done"){
      console.log(data);
      getNotes();
      handleClose();
    }
    
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
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
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="">
        <div className="d-flex bg-light">
          <div className="col-md-2">
            <div className="position-sticky top-0">
              <Sidebar />
            </div>
          </div>
          <div className="col-md-9">
            <button
              className="btn btn-info d-block mt-3 ms-auto"
              onClick={handleShow}
            >
              <i className="fa-solid fa-plus"></i> Add note
            </button>
            <div className="row g-4 ms-3 mt-3">
              {notes? notes.map((note)=>{return <Note key={note._id} getNotes={getNotes} note={note} />}): nul}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
