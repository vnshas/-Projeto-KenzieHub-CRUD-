import { TechCard } from "./TechCard";
import "./styles.scss"
import { UserContext } from "../../providers/UserContext";
import { useContext } from "react";


export const TechList = () =>{
    
    const {techs} = useContext(UserContext)
    
    return(
        <ul>
            {techs.map((tech) => (
                <TechCard key={tech.id} tech={tech}/>
            ))}
            
        </ul>
    ) 
    
}