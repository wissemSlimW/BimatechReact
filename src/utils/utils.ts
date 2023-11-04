export const getMode = ({ pathname }: { pathname: string, }) => {
    switch (pathname.split('/')[2]) {
        case 'add':
            return 'add'
        case 'view':
            return 'display'
        default:
            return 'update'
    }
}
