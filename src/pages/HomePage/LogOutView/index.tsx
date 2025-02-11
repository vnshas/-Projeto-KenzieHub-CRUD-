import { useForm } from "react-hook-form"
import { LoginForm } from "../../../components/LoginForm"
import { useContext } from "react"
import { Link } from "react-router-dom"
import "./styles.scss"
import Logo from "../../../assets/Logo.png"

export const LogOutView = () =>{
    
    
    return(
    
        
        <div>
            
            <div className="logoutView">
            <div className="logo"><img src={Logo} alt="" /></div>
                <div className="container sm">
                    <div className="login">
                        <h1 className="title1">Login</h1>
                        <LoginForm />
                        <span className="headline bold">Ainda não possui uma conta?</span>
                        <Link className="button lg grey title2" to={"/register"}>Cadastre-se</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}