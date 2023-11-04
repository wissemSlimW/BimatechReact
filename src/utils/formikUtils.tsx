export const isFormFieldValid = (formik: any, name: string) => {
    const fields = name.split('.')
    const table = fields.reduce((o, k) => o.map(c => c?.[k]), [formik.errors, formik.touched])
    return (!!(table?.[0] && table?.[1]))
}
export const getFormErrorMessage = (formik: any, name: string) => {
    const fields = name.split('.')
    const message = fields.reduce((o, k) => o?.[k], formik.errors)
    return isFormFieldValid(formik, name) && <small style={{ color: '#E11D48' }}>{message}</small>
}
