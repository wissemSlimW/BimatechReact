interface FindOneApi {
    endpoint: string,
    id?: string | null,
    handleError?: (err: any) => void
}
interface GetAllApi {
    endpoint: string,
    handleError?: (err: any) => void;
}
interface RemoveApi {
    endpoint: string,
    id?: string,
    handleError?: (err: any) => void
    handleResponse?: (res: any) => void,
    setReady: React.Dispatch<React.SetStateAction<boolean>>,
}
interface UpdateApi<T> {
    endpoint: string,
    id?: string,
    body?: Partial<T>,
    handleError?: (err: any) => void
    handleResponse?: (res: any) => void,
    setReady: React.Dispatch<React.SetStateAction<boolean>>,
}
interface AddApi<T> {
    endpoint: string,
    body?: Partial<T>,
    handleError?: (err: any) => void
    handleResponse?: (res: any) => void,
    setReady: React.Dispatch<React.SetStateAction<boolean>>,
}
type API<T> = RemoveApi | UpdateApi<T> | AddApi<T>