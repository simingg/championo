import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';

export default function AddTableDialog({ action }) {
    const [open, setOpen] = useState(false);
    const [teams, setTeams] = useState("");

    const handleToggle = () => {
        setOpen(!open);
    }

    const handleAddTeam = () => {
        action(teams);
        handleToggle();
        setTeams("");
        //add to group 1 data table
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleToggle}>
                Add Team
            </Button>
            <Dialog open={open} onClose={handleToggle}>
                <DialogTitle>Add Team</DialogTitle>
                <DialogContent>
                    <TextInput
                        label={"Teams"}
                        content={teams}
                        action={setTeams}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTeam}>Add</Button>
                    <Button onClick={handleToggle}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}