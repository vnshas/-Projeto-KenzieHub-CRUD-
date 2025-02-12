import { useContext } from "react"
import { TechContext } from "../../providers/TechContext"
import { useForm } from "react-hook-form"
import "./styles.scss"

export const CreateTechModal = () =>{
    const {setIsOpen} = useContext(TechContext)
    
    const {register, handleSubmit , formState:{errors}} = useForm()

    return(
        <div className="modalOverlay" role="dialog">
            <div className="modalBox">
                <button onClick={() => setIsOpen(false)}>Fechar</button>
                
                <form >
                    <label htmlFor="tech">Nome</label>
                    <input type="text" placeholder="Digite sua tecnologia" {...register("tech")} />

                    <label htmlFor="techStatus">Selecionar status</label>
                    <select id="techStatus">
                        <option id="1">Iniciante</option>
                        <option id="2">Intermediário</option>
                        <option id="3">Avançado</option>
                    </select>

                    <button>Cadastrar Tecnologia</button>
                </form>
            </div>
        </div>
    )
}