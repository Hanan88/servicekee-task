import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DATA from './DATA.json'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Modal, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addTicket, deleteTicket, updateTicket } from '../feature/ticket/ticketSlice'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [ticketName, setTicketName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')

    const [updateTicketName, setUpdateTicketName] = useState('')
    const [updateStartDate, setUpdateStartDate] = useState('')
    const [updateEndDate, setUpdateEndDate] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')

    const dispatch = useDispatch()
    const tickets = useSelector(state => state.ticket.ticket)

    const handleOpen = (id) => {
        setId(id)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const handleForm = () => setShowForm(true);

    const handleDelete = () => {
        dispatch(deleteTicket(id))
        console.log('delete', id);
    }

    const handleAddTicket = () => {
        const data = {id: tickets.length + 1, ticketName, startDate, endDate, description }
        dispatch(addTicket(data))
    }

    const handleUpdate = () => {
        console.log("Done");
        const data = { updateTicketName, updateStartDate, updateEndDate, updateDescription }
        dispatch(updateTicket(data))
    }

    console.log(tickets, 'tickets', showForm);
    return (

        <div>
            <TableContainer component={Paper}>
                <h2> We Have {tickets.length} Tickets</h2>
                <Table sx={{ maxWidth: '80%', margin: '0 auto' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.length > 0 && tickets.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ticketName}
                                </TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Button variant="text" onClick={() => handleOpen(row.id)}><DeleteIcon /></Button>
                                    <Button variant="text" onClick={() => handleForm(row.id)}><EditIcon /></Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showForm ? (<section style={{ borderBottom: '2px solid #ddd', padding: '10px 0' }}>
                <h1>Update Your Ticket</h1>
                <TextField id="outlined-basic" label="Please enter text" variant="outlined" onChange={(e) => setUpdateTicketName(e.target.value)} value={updateTicketName} />
                <TextField id="outlined-basic" label="Please enter start date" variant="outlined" onChange={(e) => setUpdateStartDate(e.target.value)} value={updateStartDate} />
                <TextField id="outlined-basic" label="Please enter end date" variant="outlined" onChange={(e) => setUpdateEndDate(e.target.value)} value={updateEndDate} />
                <TextField id="outlined-basic" label="Please enter description" variant="outlined" onChange={(e) => setUpdateDescription(e.target.value)} value={updateDescription} />

                <Button onClick={handleUpdate}>Update Ticket</Button>
            </section>) : null}

            <section style={{ borderBottom: '2px solid #ddd', padding: '10px 0' }}>
                <h1>Create New Ticket</h1>
                <TextField id="outlined-basic" label="Please enter text" variant="outlined" onChange={(e) => setTicketName(e.target.value)} value={ticketName} />
                <TextField id="outlined-basic" label="Please enter start date" variant="outlined" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                <TextField id="outlined-basic" label="Please enter end date" variant="outlined" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                <TextField id="outlined-basic" label="Please enter description" variant="outlined" onChange={(e) => setDescription(e.target.value)} value={description} />

                <Button onClick={handleAddTicket}>Create Ticket</Button>
            </section>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are You Sure To Delete?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Home