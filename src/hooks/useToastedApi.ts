import { toast } from "react-toastify"

export const useToastedApi = <Model>({
    api, successMessage, errorMessage, params
}: {
    successMessage: string,
    errorMessage: string,
    api: <Model>(p: API<Model>) => void,
    params: API<Model>
}
) => {
    api<Model>({
        ...params,
        handleError: (err: any) => {          
            params?.handleError?.(err)
            toast.error(errorMessage)
        },
        handleResponse: (res: any) => {
            params?.handleResponse?.(res)
            toast.success(successMessage)
        }
    })
}