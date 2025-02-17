import { useContext } from "react"
import { IEditModal, TechContext } from "../../providers/TechContext"
import { useForm } from "react-hook-form"
import "./styles.scss"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { ICreateTech } from "../CreateTechModal"




 const editTechSchema = yup.object({
        title: yup.string().required("Tecnologia obrigatória"),
        status: yup.string().required("Status Obrigatório")

    })


export const EditTechModal = () =>{
    const {setEditModal,editModal, EditTech } = useContext(TechContext)
    
    
    const {register, handleSubmit , formState:{errors}} = useForm<ICreateTech>({
        resolver: yupResolver(editTechSchema),
        values:{
            title:editModal.title,
            status: editModal.status,
        }
        
    })

    const submit = async (formData: ICreateTech) =>{
        EditTech(editModal.id,formData)
    }

    return(
        <div className="modalOverlay" role="dialog">
            <div className="modalBox">
                <div className="container">
                    <div className="modalHeader">
                        <h2 className="title2">Tecnologia Detalhes</h2>
                        <button className="closeModalButton" onClick={() => setEditModal({} as IEditModal)}>X</button>
                    </div>
                </div>
                <form className="editForm" onSubmit={handleSubmit(submit)}>
                    <label className="headline" htmlFor="title">Nome</label>
                    <input className="title2 light" id="title" type="text" placeholder="Digite sua tecnologia" {...register("title")} />
                    <p>{errors.title?.message}</p>

                    <label className="headline" htmlFor="techStatus">Selecionar status</label>
                    <select className="title2 light" id="techStatus" {...register("status")}>
                        <option className="selectedEdit" value={"Iniciante"}>Iniciante</option>
                        <option value={"Intermediário"}>Intermediário</option>
                        <option value={"Avançado"}>Avançado</option>
                    </select>
                    <p>{errors.status?.message}</p>

                    <button type="submit" className="addTechButton">Salvar alterações</button>
                </form>
            </div>
        </div>
    )
}