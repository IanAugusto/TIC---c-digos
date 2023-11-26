import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie' // hook para manipular cookies

export default function Login() {



    const [USUARIO, setUsuario] = useState('')
    const [SENHA, setSenha] = useState('')
    // vamos criar um cookie para armazenar o username
    const [cookie, setCookie] = useCookies(['USUARIO','ID'])
    const navigate = useNavigate()



    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        // previne o comportamento padrão do formulário
        e.preventDefault()
        // vamos verificar se usuário e senha estão corretos
        // vamos conectar assincronamente no backend no endpoint /users?username=xxx


        let usuario
        usuario = {
          USUARIO,
          SENHA
        }

 
        try {
            const resp = await fetch(`http://localhost:3333/api/usuario/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then ( resp => { // quando o servidor respondeu
                return resp.json() // transforma em json
            })
        if (resp.length == 0) {
            alert('Usuário / senha incorretos ')
        }
        else {
            // usuário encontrado
            // vamos verificar se a senha está correta
            if (resp[0].SENHA !== SENHA) {
                alert('Usuário / senha incorretos')
            }
            else {
                // senha correta
                // vamos armazenar o username no cookie username
                setCookie('USUARIO', USUARIO)
                setCookie('ID', resp[0].ID)
                // vamos navegar para a página de produtos
                navigate('/products', {state: {USUARIO: USUARIO}})
            }
        }
    }
     catch(error) {
    console.log(error)
  }

}

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-8 w-auto"
                    src="/logo.jpg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Faça o Login com seu usuário</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6"  onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                Usuário
                            </label>
                            <div className="mt-1">
                                <input
                                    id="user"
                                    name="user"
                                    type="user"
                                    autoComplete="user"
                                    value={USUARIO}
                                    onChange={ (e) => setUsuario(e.target.value) } 
                                    required                                    
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={SENHA}
                                    onChange={ (e) => setSenha(e.target.value) } 
                                    required                                    
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Entre
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}