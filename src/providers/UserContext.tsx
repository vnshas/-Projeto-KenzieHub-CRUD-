import { createContext, useEffect, useState,ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { IUserRegister } from "../pages/RegisterPage";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
 
export const UserContext = createContext<IUserContext>({} as IUserContext);

interface IUserProviderProps {
    children: ReactNode;
  }

  interface IUserContext {
    
    userRegister: (data: IUserRegister) => void;
    
   
    
    
  }
  

export const UserProvider = ({children}: IUserProviderProps) => {
  
  const [user, setUser] = useState(null);

  useEffect(() =>{

    const loadUser = async () =>{
      const token = localStorage.getItem("@TOKEN")
      const userId = localStorage.getItem("@USERID")

      if(token && userId){
        try {
          const { data } = await api.get(`/users/${userId}`, {
            headers: {
              Autorization: `Bearer ${token}`
            }
          })
          setUser(data)
          navigate("/dashboard")
        } catch (error) {
          console.log(error)
          localStorage.removeItem("@TOKEN");
          localStorage.removeItem("@USERID");
        }
      }
    }
    loadUser()
  },[])


  const navigate = useNavigate();

 /* const userLogin = async (formData) =>{
    try {
      const { data } = await api.post("/sessions", formData);
      localStorage.setItem("@TOKEN", data.token);
      localStorage.setItem("@USERID", data.user.id)
      localStorage.setItem("@USER", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
    }
  }*/

  const userRegister = async (data:IUserRegister) => {
    try {
      await api.post("/users", data);
      navigate("/");
      alert("Cadastro efetuado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error((error.response?.data as AxiosError).message);
      } else {
        console.log(error);
      }
    }

    const userLogout = () => {
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@USERID");
      setUser(null);
      navigate("/");
    };

    return (
      <UserContext.Provider
        value={{ userRegister,}}
      >
        {children}
      </UserContext.Provider>
    );
  }
}
