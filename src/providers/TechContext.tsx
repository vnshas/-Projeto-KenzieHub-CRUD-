import { useContext, useState, ReactNode, } from "react"
import { createContext } from "react"
import { UserContext} from "./UserContext"
import { ICreateTech } from "../components/CreateTechModal"
import { api } from "../services/api"
import axios, {AxiosError} from "axios"
import { toast } from "react-toastify"

export const TechContext = createContext({} as ITechContext)

interface ITechProviderProps{
  children:  ReactNode
}

export interface IEditModal{
  title:string 
  status:string
  id:string
}

interface ITechContext{
  isOpen: boolean
  editModal: IEditModal
  setIsOpen: (arg0: boolean) => void
   setEditModal: React.Dispatch<React.SetStateAction<IEditModal>>
  CreateTech: (formData: ICreateTech) => Promise<void>
  EditTech: (id: string, formData: ICreateTech) => Promise<void>
  DeleteTech: (deletingId: string) => Promise<void>
}



export const TechProvider = ({children}:ITechProviderProps) =>{
    
  const {techs,setTechs} = useContext(UserContext)

    

    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const [editModal, setEditModal] = useState<IEditModal>({} as IEditModal)

    console.log(editModal)
    

    const CreateTech = async (formData:ICreateTech) =>{
      const token = localStorage.getItem("@TOKEN")
      try {
          const {data} = await api.post("/users/techs", formData, {
            headers:{
              Authorization:  `Bearer ${token}`,
            },
          })
          toast.success("Tecnologia adicionada com sucesso!")
          setTechs([...techs, data])
          setIsOpen(false)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.log(error)
            toast.error((error.response?.data as AxiosError).message)
          } else {
            console.log(error)
          }
        }
    }

    const EditTech = async (id:string, formData:ICreateTech) =>{
      const token = localStorage.getItem("@TOKEN")

      try {
        const { data } = await api.put(`users/techs/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const newtechs = techs.map((tech) =>{
          if(tech.id === id){
            return data
          } else{
            return tech
          }
        })
        toast.success("Tecnologia editada com sucesso!")
        setTechs(newtechs)
        setEditModal({} as IEditModal)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error)
          toast.error((error.response?.data as AxiosError).message)
        } else {
          console.log(error)
        }
      }
    } 

    const DeleteTech = async (deletingId:string) =>{
        try {
          const token = localStorage.getItem("@TOKEN")
          await api.delete(`users/techs/${deletingId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const newTechs = techs.filter(tech => tech.id !== deletingId)
        toast.success("Tecnologia deletada com sucesso!")
        setTechs(newTechs)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.log(error)
            toast.error((error.response?.data as AxiosError).message)
          } else {
            console.log(error)
          }
        }
    }
   

    return (
        <TechContext.Provider
          value={{isOpen, setIsOpen,CreateTech,editModal,setEditModal,EditTech,DeleteTech}}
        >
          {children}
        </TechContext.Provider>
      )
}