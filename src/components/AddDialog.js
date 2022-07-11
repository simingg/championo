import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';
export default function AddDialog({ action, title }) {
    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleAddField = () => {
        action(field);
        handleToggle();
        setField("");
        //add to group 1 data table
    }

    return (
        <div>
            <Button variant="outlined" style={{ marginLeft: "10px", marginBottom: "5px" }} onClick={handleToggle}>
                {title}
            </Button>
            <Dialog open={open} onClose={handleToggle}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextInput
                        label={title}
                        content={field}
                        action={setField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddField}>Add</Button>
                    <Button onClick={handleToggle}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
