import React, {useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'

export default function ProtectRoute({children}) {
    const {token} = useContext(UserContext);
    if(token != null){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }

}
