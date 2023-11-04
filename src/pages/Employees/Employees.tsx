import { DataGrid, GridColDef, GridRenderCellParams, } from '@mui/x-data-grid';
import { Button, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { routes } from '../../config/routes';
import { useGetAllApi } from '../../hooks/useGetAllApi';
import { useMemo, useState } from 'react';
import { ActionBlock } from '../../components/Table/ActionsBlock';
import { Delete, Edit, Visibility ,ArrowBack} from '@mui/icons-material';
import { DeleteDialog } from '../../components';
import { useToastedApi } from '../../hooks/useToastedApi';
import { useRemoveApi } from '../../hooks/useRemoveApi';
export const EmployeesList = () => {
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState<string>(null! as string)

    const handleView = (_id: string) => {
        navigate(`/${routes.employeesView}/${_id}`)
    };
    const handleUpdate = (_id: string) => {
        navigate(`/${routes.employees}/${_id}`)
    };
    const handleRemove = (_id: string) => {
        setDeleteId(_id)
    }
    const handleReturn = () => {
        navigate("/")
    }
    const { data } = useGetAllApi<Employee>({ endpoint: 'employees' })
    const columns: GridColDef<Employee>[] = useMemo(() => [
        { field: 'firstName', headerName: 'FirstName', },
        { field: 'lastName', headerName: 'LastName', },
        { field: 'department', headerName: 'Department', },
        {
            field: '_id', headerName: 'Actions', headerAlign: 'right', align: 'right', flex: 1,filterable:false,sortable:false,disableColumnMenu:true,
            renderCell: (params: GridRenderCellParams<Employee>) => <ActionBlock
                _id={params.row._id!}
                actions={[
                    { icon: <Visibility color={'warning'} />, action: handleView },
                    { icon: <Edit color={'info'} />, action: handleUpdate },
                    { icon: <Delete color={'error'} />, action: handleRemove }
                ]} />
        },
    ], [])
    return (
        <div >
            <h1><IconButton onClick={handleReturn}><ArrowBack/></IconButton> Employees</h1> 
            <Grid container justifyContent={'end'}> <Button onClick={() => navigate(`/${routes.employeesAdd}`)}>Add</Button></Grid>
            <DataGrid
                filterMode='client'
                rows={data.map(d => ({ ...d, id: d._id }))}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            {!!deleteId && <DeleteDialog
                title='Delete employee'
                handleConfirm={() => useToastedApi({
                    api: useRemoveApi,
                    errorMessage: 'Delete operation failed, try again later',
                    successMessage: 'Deleted successfully',
                    params: { endpoint: 'employees', id: deleteId, setReady: () => { } }
                })}
                handleClose={() => setDeleteId(null! as string)} />}

        </div>
    )
}
