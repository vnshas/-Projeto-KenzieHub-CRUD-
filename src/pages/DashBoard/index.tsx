import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"

export const DashBoard = () => {
    
    const {user, userLogout} = useContext(UserContext)
    
    return (
        <main>
            <button onClick={() => userLogout()}>Sair</button>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
        </main>
    )
}