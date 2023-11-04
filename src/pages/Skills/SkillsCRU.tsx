import { Button, Checkbox, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useAddApi } from '../../hooks/useAddApi'
import { useFindOneApi } from '../../hooks/useFindOneApi'
import { useToastedApi } from '../../hooks/useToastedApi'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { getFormErrorMessage, isFormFieldValid } from '../../utils/formikUtils'
import { getMode } from '../../utils/utils'
import { routes } from '../../config/routes'

export const SkillsCRU = () => {

    const navigate = useNavigate()
    const [sendRequest, setSendRequest] = useState<boolean>(true)

    const { pathname } = useLocation()
    const mode = getMode({ pathname })
    const handleClose = () => {
        navigate(`/${routes.skills}`)
    }
    const { id } = useParams()
    const { data: skill, ready } = useFindOneApi<Skill>({ endpoint: 'skills', id })
    const initialValues = useMemo((): Skill => ({
        _id: skill?._id || null! as string,
        name: skill?.name || null! as string,
        status: skill?.status || false as boolean,

    }), [skill])
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validate: (data) => {
            let errors: Partial<Record<keyof Skill, string>> = {}
            errors = { ...errors, ...!data.name ? { name: "Field required." } : {} }
            return errors
        },
        onSubmit: (data) => {
            useToastedApi({
                api: mode === 'add' ? useAddApi : useUpdateApi,
                errorMessage: mode === 'add' ? "Failed to create" : "Failed to update",
                successMessage: mode === 'add' ? "Created successfully" : "Updated successfully.",
                params: {
                    endpoint: "skills",
                    body: data,
                    ...data._id ? { id: data._id } : {},
                    setReady: setSendRequest,
                    handleError(err) {
                    },
                    handleResponse(res) {
                        handleClose()
                    },
                }
            })
        }
    })
    return (
        <div>
            <h1>Skills {mode}</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1} p={6}>
                        <Grid container item xs={12} md={6} alignItems={"center"} >
                            <Grid item xs={12} md={6}>Name : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.name :
                                    <>
                                        <TextField fullWidth name='name' value={formik.values.name || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'name')} />
                                        {getFormErrorMessage(formik, 'name')}
                                    </>
                                }

                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"} >
                            <Grid item xs={12} md={6}>Active :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.status ? "Active" :"Not active" :
                                    <>
                                        <Checkbox
                                            checked={formik.values.status}
                                            onChange={formik.handleChange}
                                            name="status"
                                            color="primary" // You can customize the color here
                                        />
                                        {getFormErrorMessage(formik, 'statut')}
                                    </>
                                }
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' gap='10px'>
                        <Button variant='contained' disabled={!sendRequest} color='success' type='submit'>Save</Button>
                        <Button variant='contained' onClick={handleClose} color='error'>Cancel</Button>
                    </Grid>
                </form>
            </div>

        </div >
    )
}
