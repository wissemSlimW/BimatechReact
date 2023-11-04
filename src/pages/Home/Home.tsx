import { Grid } from "@mui/material";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <Grid container justifyContent="center" alignItems="center" flexDirection='column' height={"100vh"}>
            <Link to='/employees'  >Employees</Link>
            <Link to='/skills' >Skills</Link>
        </Grid>
    )
}
