import { FC, PropsWithChildren, Fragment } from 'react'
const UserSession: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default UserSession