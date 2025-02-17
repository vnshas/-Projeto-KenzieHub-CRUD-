import { useContext} from "react"
import { useForm } from "react-hook-form"
import { UserContext } from "../../providers/UserContext"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./styles.scss"
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom"

export interface IUserRegister {
  email: string
  password: string
  password_confirm: string
  name: string
  bio: string
  contact: string
  course_module: string
}

export const RegisterPage = () => {
  const schema = yup.object({
    name: yup.string().required("Nome obrigatório."),

    email: yup.string().email().required("Email obrigatório."),

    password: yup
      .string()
      .min(8, "Deve conter ao menos oito numeros.")
      .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula.")
      .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula.")
      .matches(/[\d]/, "Deve conter ao menos um número.")
      .matches(/(\W)|_ /, "Deve conter ao menos um caracter especial.")
      .required("Senha obrigatória."),

    password_confirm: yup
      .string()
      .required("Por favor confirme sua senha.")
      .oneOf([yup.ref("password")], "Senhas nao condizem."),

    bio: yup.string().required("Bio obrigatória."),

    contact: yup.string().required("Contato obrigatorio."),

    course_module: yup.string().required("Curso obrigatorio."),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(schema),
  })

  const { userRegister } = useContext(UserContext)
  const submit = async (formData : IUserRegister) => {
    userRegister(formData)
  }

  return (
    <main>
      <div className="container sm">
        <div className="logo">
          <img src={Logo} alt="Logo Kenzie" />
          <Link className="button headline bold" to={"/"}>
            Voltar
          </Link>
        </div>
      </div>
      <div className="container sm">
        <div className="register">
          <h1 className="title1">Crie sua conta</h1>
          <span className="headline">Rapido e grátis, vamos nessa</span>

          <form onSubmit={handleSubmit(submit)}>
            <label className="headline" htmlFor="name">
              Nome
            </label>
            <input
              className="title2 light"
              type="text"
              id="name"
              placeholder="Digite Aqui seu nome"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>

            <label className="headline" htmlFor="email">
              Email
            </label>
            <input
              className="title2 light"
              type="email"
              id="email"
              placeholder="Digite Aqui seu email"
              {...register("email")}
              
            />

            <p>{errors.email?.message}</p>
            <label className="headline" htmlFor="password">
              Senha
            </label>
            <input
              className="title2 light"
              type="password"
              id="password"
              placeholder="Digite Aqui sua senha"
              {...register("password")}
            />

            <p>{errors.password?.message}</p>
            <label className="headline" htmlFor="password_confirm">
              Confirmar Senha
            </label>
            <input
              className="title2 light"
              type="password"
              id="password_confirm"
              placeholder="Confirme sua senha"
              {...register("password_confirm")}
            />

            <p>{errors.password_confirm?.message}</p>
            <label className="headline" htmlFor="bio">
              Bio
            </label>
            <input
              className="title2 light"
              type="text"
              placeholder="Fale sobre você"
              id="bio"
              {...register("bio")}
            />

            <p>{errors.bio?.message}</p>
            <label className="headline" htmlFor="contact">
              Contato
            </label>
            <input
              className="title2 light"
              type="text"
              placeholder="Opção de Contato"
              id="contact"
              {...register("contact")}
            />
            <p>{errors.contact?.message}</p>
            <label className="headline" htmlFor="course_module">
              Selecionar Módulo
            </label>
            <select
              className="title2 light"
              id="course_module"
              {...register("course_module")}
            >
              <option id="1">Primeiro módulo (Introdução ao Frontend)</option>
              <option>Segundo módulo (Frontend Avançado)</option>
              <option>Terceiro módulo (Introdução ao Backend)</option>
              <option>Quarto módulo (Backend Avançado)</option>
            </select>
            <p className="headline bold">{errors.course_module?.message}</p>

            <button type="submit">Cadastrar-se</button>
          </form>
        </div>
      </div>
    </main>
  )
}
