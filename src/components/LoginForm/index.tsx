import { useContext } from "react"
import { useForm } from "react-hook-form"
import { UserContext } from "../../providers/UserContext"
import "./styles.scss"

export const LoginForm = () => {
    
    const {register, handleSubmit} = useForm()

    const { userLogin } = useContext(UserContext)

    const submit = (formData) =>{
        userLogin(formData)
    }

    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit(submit)}>

            <label className="headline"  htmlFor="email">Email</label>
            <input className="title2 light" id="email" type="email" placeholder="Digite seu email" {...register("email") } />
            
            <label className="headline" htmlFor="password">Senha</label>
            <input className="title2 light" type="password" id="password" placeholder="Digite sua senha" {...register("password") } />
            
            <button className="title2 light" type="submit">Entrar</button>
           
            </form>
        </div>
    )
}