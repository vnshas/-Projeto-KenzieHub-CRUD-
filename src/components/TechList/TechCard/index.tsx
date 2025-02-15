import { useContext } from "react"
import { IUserTechs } from "../../../providers/UserContext"
import "./styles.scss"
import { TechContext } from "../../../providers/TechContext"
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

interface ITechCardProps{
  tech: IUserTechs
}

export const TechCard = ({tech}:ITechCardProps) =>{
    
    const {DeleteTech,setEditModal} = useContext(TechContext)  

    return (
      <div className="techItem">
        <li key={tech.id}>
          <div className="techTitle">
            
              <h3  className="title3">{tech.title}</h3>
             
          </div>
          
          <div className="techNav">
          <p className="headline">{tech.status}</p>
            <button onClick={() => setEditModal(tech)}><MdOutlineModeEdit color="var(--grey0)" size={18} /></button>
            <button onClick={() => DeleteTech(tech.id)}><FaRegTrashAlt color="var(--grey0)" size={18} /></button>
          </div>
        </li>
        
      </div>
      
    )
}