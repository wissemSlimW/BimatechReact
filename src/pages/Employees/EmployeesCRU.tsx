import { Autocomplete, Button, Checkbox, Grid, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useAddApi } from '../../hooks/useAddApi'
import { useFindOneApi } from '../../hooks/useFindOneApi'
import { useToastedApi } from '../../hooks/useToastedApi'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { getFormErrorMessage, isFormFieldValid } from '../../utils/formikUtils'
import { getMode } from '../../utils/utils'
import { useGetAllApi } from '../../hooks/useGetAllApi'
import { format, isValid } from 'date-fns'
import { routes } from '../../config/routes'

export const EmployeesCRU = () => {

    const navigate = useNavigate()
    const [sendRequest, setSendRequest] = useState<boolean>(true)
    const { pathname } = useLocation()
    const mode = getMode({ pathname })
    const { id } = useParams()
    const { data: employee, ready } = useFindOneApi<Employee>({ endpoint: 'employees', id })
    const { data: skills } = useGetAllApi<Skill>({ endpoint: 'skills' })

    const handleClose = () => {
        navigate(`/${routes.employees}`)
    }
    const initialValues = useMemo((): Employee => ({
        _id: employee?._id || null! as string,
        firstName: employee?.firstName || null! as string,
        lastName: employee?.lastName || null! as string,
        email: employee?.email || null! as string,
        phone: employee?.phone || null! as string,
        birthDate: employee?.birthDate || new Date(),
        address: employee?.address || null! as string,
        department: employee?.department || null! as string,
        position: employee?.position || null! as string,
        salary: employee?.salary || null! as number,
        hiringDate: employee?.hiringDate || new Date(),
        status: employee?.status || true,
        profilePicture: employee?.profilePicture || null! as string,
        skillIds: employee?.skillIds
    }), [employee])
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validate: (data) => {
            let errors: Partial<Record<keyof Employee, string>> = {}
            errors = { ...errors, ...!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email) ? { email: "Email not valid" } : {} }
            errors = { ...errors, ...!data.email ? { email: "Field required." } : {} }
            errors = { ...errors, ...!data.firstName ? { firstName: "Field required." } : {} }
            errors = { ...errors, ...!data.lastName ? { lastName: "Field required." } : {} }
            errors = { ...errors, ...!data.department ? { department: "Field required." } : {} }
            errors = { ...errors, ...!data.birthDate ? { birthDate: "Field required." } : {} }
            errors = { ...errors, ...!isValid(new Date(data.birthDate)) ? { birthDate: "Invalid date format." } : {} }
            errors = { ...errors, ...!data.hiringDate ? { hiringDate: "Field required." } : {} }
            errors = { ...errors, ...!isValid(new Date(data.hiringDate)) ? { hiringDate: "Invalid date format." } : {} }
            return errors
        },
        onSubmit: (data) => {
            useToastedApi({
                api: mode === 'add' ? useAddApi : useUpdateApi,
                errorMessage: mode === 'add' ? "Failed to create" : "Failed to update",
                successMessage: mode === 'add' ? "Created successfully" : "Updated successfully.",
                params: {
                    endpoint: "employees",
                    body: data,
                    ...data._id ? { id: data._id } : {},
                    setReady: setSendRequest,
                    handleError: (err) => {
                        if(err?.data?.error==="Email already in use."){formik.setErrors({ ...formik.errors, email: err?.data?.error })
                    }},
                    handleResponse: () => {
                        handleClose()
                    },

                }
            })
        }
    })

    return (
        <div>
            <h1>Employees {mode}</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1} p={6} >
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>FirstName :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.firstName :
                                    <>
                                        <TextField fullWidth name='firstName' value={formik.values.firstName || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'firstName')} />
                                        {getFormErrorMessage(formik, 'firstName')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>LastName : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.lastName :
                                    <>
                                        <TextField fullWidth name='lastName' value={formik.values.lastName || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'lastName')} />
                                        {getFormErrorMessage(formik, 'lastName')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Email : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.email :
                                    <>
                                        <TextField fullWidth name='email' value={formik.values.email || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'email')} />
                                        {getFormErrorMessage(formik, 'email')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Phone : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.phone :
                                    <>
                                        <TextField fullWidth name='phone' value={formik.values.phone || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'phone')} />
                                        {getFormErrorMessage(formik, 'phone')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>BirthDate : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? format(new Date(formik.values.birthDate), "dd-MM-yyyy") :
                                    <>
                                        <DatePicker value={new Date(formik.values.birthDate)} defaultValue={null} onChange={(val) => formik.setFieldValue("birthDate", val)} sx={{ width: "100%" }} />
                                        {getFormErrorMessage(formik, 'birthDate')}  
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Address :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.address :
                                    <>
                                        <TextField fullWidth name='address' value={formik.values.address || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'address')} />
                                        {getFormErrorMessage(formik, 'address')}  </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Department :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.department :
                                    <>
                                        <TextField fullWidth name='department' value={formik.values.department || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'department')} />
                                        {getFormErrorMessage(formik, 'department')}  </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Position :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.position :
                                    <>
                                        <TextField fullWidth name='position' value={formik.values.position || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'position')} />
                                        {getFormErrorMessage(formik, 'position')}  </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Salary : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.salary :
                                    <>
                                        <TextField fullWidth name='salary' type='number' value={formik.values.salary || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'salary')} />
                                        {getFormErrorMessage(formik, 'salary')}  </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Hiring Date : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? format(new Date(formik.values.hiringDate), "dd-MM-yyyy") :
                                    <>
                                        <DatePicker value={new Date(formik.values.hiringDate)} onChange={(val) => formik.setFieldValue("hiringDate", val)} sx={{ width: "100%" }} />
                                        {getFormErrorMessage(formik, 'hiringDate')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Active : </Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.status ? "Active" : "Not active" :
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
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Skills :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? skills.filter((s) => formik.values?.skillIds?.some(id => id === s._id)).map(s => s.name).join(",") :
                                    <>
                                        <Autocomplete
                                            id="skillIds"
                                            multiple
                                            options={skills}
                                            value={skills.filter((s) => formik.values.skillIds?.some(id => id === s._id))}
                                            getOptionLabel={(option) => `${option?.name}`}
                                            onChange={(event, value) => formik.setFieldValue("skillIds", value.map((skill) => skill?._id))}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                        {getFormErrorMessage(formik, 'skillIds')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} md={6} alignItems={"center"}>
                            <Grid item xs={12} md={6}>Profile Picture :</Grid>
                            <Grid item xs={12} md={6}>
                                {mode === "display" ? formik.values.profilePicture :
                                    <>
                                        <TextField fullWidth type='file' name='profilePicture'
                                            inputProps={{ accept: '.jpg, .png ,.jpeg' }}
                                            value={formik.values.profilePicture || ''}
                                            onChange={formik.handleChange}
                                            error={isFormFieldValid(formik, 'profilePicture')} />
                                        {getFormErrorMessage(formik, 'profilePicture')}
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent='center' gap='10px'>
                        {mode !== 'display' && <Button variant='contained' disabled={!sendRequest} color='success' type='submit'>Save</Button>}
                        <Button variant='contained' onClick={handleClose} color='error'>Cancel</Button>
                    </Grid>
                </form>
            </div>

        </div >
    )
}


