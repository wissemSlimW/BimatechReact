import { ArrowBack, Delete, Edit, Visibility } from '@mui/icons-material';
import { Button, Grid, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { DeleteDialog } from '../../components';
import { ActionBlock } from '../../components/Table/ActionsBlock';
import { routes } from '../../config/routes';
import { useGetAllApi } from '../../hooks/useGetAllApi';
import { useRemoveApi } from '../../hooks/useRemoveApi';
import { useToastedApi } from '../../hooks/useToastedApi';

export const SkillsList = () => {
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState<string>(null! as string)

    const handleView = (_id: string) => {
        navigate(`/${routes.skillsView}/${_id}`)
    };
    const handleUpdate = (_id: string) => {
        navigate(`/${routes.skills}/${_id}`)
    };
    const handleRemove = (_id: string) => {
        setDeleteId(_id)
    };
    const handleReturn = () => {
        navigate("/")
    }
    const { data } = useGetAllApi<Skill>({ endpoint: 'skills' })
    const columns = useMemo((): GridColDef<Skill>[] => [
        { field: 'name', headerName: 'Name', },
        {
            field: '_id', headerName: 'Actions', headerAlign: 'right', align: 'right', flex: 1,filterable:false,sortable:false,disableColumnMenu:true,
            renderCell: (params: GridRenderCellParams<Skill>) => <ActionBlock
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
            <h1><IconButton onClick={handleReturn}><ArrowBack/></IconButton> Skills</h1>
            <Grid container justifyContent={'end'}><Button onClick={() => navigate(`/${routes.skillsAdd}`)}>Add</Button></Grid>
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
                title='Delete Skill'
                handleConfirm={() => useToastedApi({
                    api: useRemoveApi,
                    errorMessage: 'Delete operation failed, try again later',
                    successMessage: 'Deleted successfully',
                    params: { endpoint: 'skills', id: deleteId, setReady: () => { } }
                })}
                handleClose={() => setDeleteId(null! as string)} />}

        </div>
    )
}
