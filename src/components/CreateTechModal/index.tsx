import { useContext } from "react"
import { TechContext } from "../../providers/TechContext"
import { useForm } from "react-hook-form"
import "./styles.scss"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export interface ICreateTech{
    title:string
    status:string
}

 const createTechSchema = yup.object({
        title: yup.string().required("Tecnologia obrigatória"),
        status: yup.string().required("Status Obrigatório")

    })


export const CreateTechModal = () =>{
    const {setIsOpen, CreateTech} = useContext(TechContext)
    
    const {register, handleSubmit , formState:{errors}} = useForm<ICreateTech>({
        resolver: yupResolver(createTechSchema)
    })

    const submit = async (formData: ICreateTech) =>{
        CreateTech(formData)
    }

    return(
        <div className="modalOverlay" role="dialog">
            <div className="modalBox">
                <div className="container">
                    <div className="modalHeader">
                        <h2 className="title2">Cadastrar Tecnologia</h2>
                        <button className="closeModalButton" onClick={() => setIsOpen(false)}>X</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <label className="headline" htmlFor="title">Nome</label>
                    <input className="title2 light" id="title" type="text" placeholder="Digite sua tecnologia" {...register("title")} />
                    <p>{errors.title?.message}</p>

                    <label className="headline" htmlFor="techStatus">Selecionar status</label>
                    <select className="title2 light" id="techStatus" {...register("status")}>
                        <option value={"Iniciante"}>Iniciante</option>
                        <option value={"Intermediário"}>Intermediário</option>
                        <option value={"Avançado"}>Avançado</option>
                    </select>
                    <p>{errors.status?.message}</p>

                    <button type="submit" className="addTechButton">Cadastrar Tecnologia</button>
                </form>
            </div>
        </div>
    )
}