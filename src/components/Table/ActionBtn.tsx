import { IconButton } from "@mui/material"
import { ReactElement } from "react"

export const ActionBtn = ({ _id, action, icon }: {
    action: (_id: string) => void,
    _id: string,
    icon: ReactElement,
}) => {
    return (
        <IconButton onClick={() => action(_id)}>
            {icon}
        </IconButton>
    )
}