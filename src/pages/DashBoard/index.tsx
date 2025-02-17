import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"
import Logo from "../../assets/Logo.png"
import "./styles.scss"
import { TechList } from "../../components/TechList"
import { TechContext } from "../../providers/TechContext"
import { CreateTechModal } from "../../components/CreateTechModal"
import { EditTechModal } from "../../components/EditTechModal"




export const DashBoard = () => {
    
    const {user, userLogout} = useContext(UserContext)
    const {editModal,isOpen, setIsOpen} = useContext(TechContext)
    
    
    return (
        <main>
           
                <header className="header">
                    <div className="container">
                        <img src={Logo} alt="" />
                        <button onClick={() => userLogout()}>Sair</button>
                    </div>
                </header>
    
            <section className="userSection">
                <div className="container">
                    <h1 className="title1">Ola, {user.name}</h1>
                    <p className="headline bold">{user.course_module}</p>
                </div>
            </section>
            <section className="techSection">
                <div className="container">
                    <div className="techsHeader">
                        <h2 className="title2">Tecnologias</h2>
                        <button className="addButton headline bold"  onClick={() => setIsOpen(true)}>+</button>
                        </div>
                        <div className="container md">
                            <TechList />
                        </div>
                </div>
                {isOpen ? <CreateTechModal /> : null}
                {editModal.title ? <EditTechModal/> : null}
            </section>
        </main>
    )
}