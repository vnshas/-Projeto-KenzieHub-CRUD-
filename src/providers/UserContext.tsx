import { createContext, useEffect, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import { IUserRegister } from "../pages/RegisterPage"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { ILogin } from "../components/LoginForm"

export const UserContext = createContext({} as IUserContext)

interface IUserProviderProps {
  children: ReactNode
}

interface IUserContext {
  userRegister: (data: IUserRegister) => void
  userLogin: (formData: ILogin) => Promise<void>
  user: IUser
  userLogout: () => void
  techs: IUserTechs[]
  setTechs: React.Dispatch<React.SetStateAction<IUserTechs[]>>
}

export interface IUser {
  avatar_url: null
  bio: string
  contact: string
  course_module: string
  created_at: string
  email: string
  id: string
  name: string
  techs: []
  updated_at: string
  works: []
}

export interface IUserTechs {
  created_at: string
  id: string
  status: string
  title: string
  updated_at: string
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState({} as IUser)
  const [techs, setTechs] = useState<IUserTechs[]>([])

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("@TOKEN")
      const userId = localStorage.getItem("@USERID")

      if (token && userId) {
        try {
          const { data } = await api.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUser(data)
          setTechs(data.techs)
          navigate("/dashboard")
        } catch (error) {
          console.log(error)
          localStorage.removeItem("@TOKEN")
          localStorage.removeItem("@USERID")
        }
      }
    }
    loadUser()
  }, [])

  const navigate = useNavigate()

  const userLogin = async (formData: ILogin) => {
    try {
      const { data } = await api.post("/sessions", formData)
      localStorage.setItem("@TOKEN", data.token)
      localStorage.setItem("@USERID", data.user.id)
      localStorage.setItem("@USER", JSON.stringify(data.user))
      setUser(data.user)
      setTechs(data.user.techs)
      toast.success("Login efetuado com sucesso.")
      navigate("/dashboard")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error((error.response?.data as AxiosError).message)
      } else {
        console.log(error)
      }
    }
  }
  const userRegister = async (data: IUserRegister) => {
    try {
      await api.post("/users", data)
      toast.success("Registro efetuado com sucesso.")
      navigate("/")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error((error.response?.data as AxiosError).message)
      } else {
        console.log(error)
      }
    }
  }

  const userLogout = () => {
    localStorage.removeItem("@TOKEN")
    localStorage.removeItem("@USERID")
    setUser({} as IUser)
    navigate("/")
  }

  return (
    <UserContext.Provider
      value={{ userRegister, userLogin, user, userLogout, techs, setTechs }}
    >
      {children}
    </UserContext.Provider>
  )
}
