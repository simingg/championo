import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';

export default function AddScoreDialog({ action }) {
    const [open, setOpen] = useState(false);
    const [scores, setScores] = useState("");

    const handleToggle = () => {
        setOpen(!open);
        setScores("");
    }

    const handleAddScore = () => {
        action(scores);
        handleToggle();
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleToggle}>
                Add Score
            </Button>
            <Dialog open={open} onClose={handleToggle}>
                <DialogTitle>Add Score</DialogTitle>
                <DialogContent>
                    <TextInput
                        label={"Set Scores"}
                        content={scores}
                        action={setScores}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddScore}>Add</Button>
                    <Button onClick={handleToggle}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}