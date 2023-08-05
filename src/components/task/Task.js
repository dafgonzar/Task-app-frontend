import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
    
    const taskData = [
        {
            id: 1,
            accion: "Realizar prueba",
            finishStatus : 0
        },
        {
            id: 2,
            accion: "limpiar oficina",
            finishStatus : 0
        }
    ]

    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [accion, setAccion] = useState('');
    const [finishStatus, setFinishStatus] = useState(false);

    const [editId, setEditId] = useState('');
    const [editAccion, setEditAccion] = useState('');
    const [editFinishStatus, setEditFinishStatus] = useState(false);
    

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {        
        await axios.get('https://localhost:7124/api/Task/get-all')
        .then((result) => {
            setData(result.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleEdit =(id) => {        
        handleShow();
        axios.get('https://localhost:7124/api/Task?Id='+id)
        .then((result) => {
            setEditId(id);
            setEditAccion(result.data.data.accion);
            setEditFinishStatus(result.data.data.finishStatus);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleDelete =(id) => {
        if(window.confirm("Esta seguro de eliminar esta tarea?") == true)
        {
            axios.delete('https://localhost:7124/api/Task?Id='+id).then((result) => {
                if(result.status === 200){                    
                    toast.success('La Tarea fue eliminada');
                    getData();
                }
            }).catch((error) => {
                toast.error(error);
            }) 
        }
    }

    const handleUpdate = () => 
    {
        const url = 'https://localhost:7124/api/Task?Id='+editId;
        const data = {
            "taskId": editId,
            "accion": editAccion,
            "finishStatus": editFinishStatus
          }   
        axios.put(url, data, {headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        }})
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Tarea Actualizada');
        }).catch((error) => {
            toast.error(error);
        }) 

    }

    const handleSave = () => {    
        const url = 'https://localhost:7124/api/Task';
        const data = {
            "accion": accion,
            "finishStatus": finishStatus
          }   
        axios.post(url, data, {headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        }})
        .then((result) => {
            getData();
            clear();
            toast.success('Tarea Creada');
        }).catch((error) => {
            toast.error(error);
        }) 
    }

    const clear = () => {
        setAccion('');
        setFinishStatus(false);
        setEditAccion('');
        setEditFinishStatus(false);
        setEditId('');
    }

    const handleActiveChange = (e) => {
        if(e.target.checked)
        {
            setFinishStatus(true);
        }
        else
        {
            setFinishStatus(false);
        }
    }

    const handleEditActiveChange = (e) => {
        if(e.target.checked)
        {
            setEditFinishStatus(true);
        }
        else
        {
            setEditFinishStatus(false);
        }
    }

    return(
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Ingrese la tarea" value={accion} onChange={(acc) => setAccion(acc.target.value)}></input>
                    </Col>
                    <Col>
                        <input type="checkbox" checked = {finishStatus === true ? true : false } onChange={ (e) => handleActiveChange(e)} value={finishStatus}></input>
                        <label>Terminada</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}> Guardar</button>
                    </Col>
                </Row>                
            </Container>
            <br></br>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tarea</th>
                        <th scope="col">Terminada</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index)=> {
                            return(
                                    <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.accion}</td>
                                            <td>{item.finishStatus === true ? 'Si':'No'}</td> 
                                            <td colspan={2}> 
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.taskId)}>Edit</button> &nbsp;                                   
                                                <button className="btn btn-danger" onClick={() => handleDelete(item.taskId)}>delete</button>
                                            </td>                    
                                    </tr>
                            )
                        }) : 'Loading ....'
                    }                   
                </tbody>
            </table>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Ingrese la tarea" value={editAccion} onChange={(acc) => setEditAccion(acc.target.value)}></input>
                        </Col>
                        <Col>
                            <input type="checkbox" checked = {editFinishStatus === true ? true : false } onChange={ (e) => handleEditActiveChange(e)} value={editFinishStatus}></input>
                            <label>Terminada</label>
                        </Col>       
                    </Row>  
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            
        </Fragment>
    );
}

export default Task;