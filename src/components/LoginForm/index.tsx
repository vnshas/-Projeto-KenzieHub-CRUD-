import { useContext } from "react"
import { useForm } from "react-hook-form"
import { UserContext } from "../../providers/UserContext"
import "./styles.scss"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export interface ILogin{
    email:string
    password: string
}

export const LoginForm = () => {
    
    const loginSchema = yup.object({
        email: yup.string().email().required("Email obrigatório"),
        password: yup.string().required("Senha Obrigatória")

    })

    const {register, handleSubmit, formState:{errors}} = useForm<ILogin>({
        resolver: yupResolver(loginSchema)
    })

    const { userLogin } = useContext(UserContext)

    const submit = (formData: ILogin) =>{
        userLogin(formData)
    }

   

    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit(submit)}>

            <label className="headline"  htmlFor="email">Email</label>
            <input className="title2 light" id="email" type="email" placeholder="Digite seu email" {...register("email") } />
            <p>{errors.email?.message}</p>

            <label className="headline" htmlFor="password">Senha</label>
            <input className="title2 light" type="password" id="password" placeholder="Digite sua senha" {...register("password") } />
            <p>{errors.password?.message}</p>

            <button className="title2 light" type="submit">Entrar</button>
           
            </form>
        </div>
    )
}