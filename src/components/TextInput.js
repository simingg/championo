//implements mui TextField input
//check material ui Component API documentation for more details
//"content" prop is the default value
//examples in TextInput.stories.js
import React from "react"

import { TextField } from '@mui/material'

export default function TextInput({
    content,
    label,
    variant = "outlined",
    color = "primary",
    action,
    margin = "normal",
    fullWidth = true,
    inputProps = {}
}) {
    return (
        <TextField
            id="outlined-multiline-static"
            multiline
            defaultValue={content}
            label={label}
            variant={variant}
            color={color}
            onChange={(e) => action(e.target.value)}
            margin={margin}
            rows={12}
            fullWidth={fullWidth}
        />
    )
}
