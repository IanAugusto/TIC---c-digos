import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';


interface CreateModalProps {
    closeModal: () => void;
}


interface DeclareUser 
{
    USUARIO: string,
    SENHA: string,
    NOME: string,
    EMAIL: string,
    DDD_CELULAR: number,
    CELULAR: number,
    ADMIN: string
}

export default function CreateUser({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }
    const handleReloadClick = () => {
        window.location.reload();
      };

    const [users, setUsers] = useState<DeclareUser[]>([])


    const [USUARIO, setUsuario] = useState('')
    const [SENHA, setSenha] = useState('')
    const [NOME, setNome] = useState('')
    const [EMAIL, setEmail] = useState('')
    const [DDD_CELULAR, setDdd] = useState(0)
    const [CELULAR, setCelular] = useState(0)
    const [ADMIN, setAdmin] = useState('')


    /*função para criar o usuario */

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto usuario
        let usuario
          usuario = {
            USUARIO,
            SENHA,
            NOME,
            EMAIL,
            DDD_CELULAR,
            CELULAR,
            ADMIN
          }

        let url
        let verb

          url = `http://localhost:3333/api/usuario`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar o usuario
          console.log(url)
          console.log(verb)
          const createdUser = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de usuario
        setUsers([...users, createdUser])
        handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }
     /*fim da função para criar o usuario */

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerUser}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Usuário</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome completo
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={NOME}
                                    onChange={ (e) => setNome(e.target.value) } 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                Usuário
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    autoComplete="user-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={USUARIO}
                                    onChange={ (e) => setUsuario(e.target.value) } 
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={EMAIL}
                                    onChange={ (e) => setEmail(e.target.value) } 
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={SENHA}
                                    onChange={ (e) => setSenha(e.target.value) } 
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">
                                DDD
                            </label>
                            <div className="mt-1">
                                <input
                                    id="ddd"
                                    name="ddd"
                                    type="tel"
                                    maxLength={2}
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={DDD_CELULAR}
                                    onChange={ (e) => setDdd(Number((e.target.value))) } 
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                Celular
                            </label>
                            <div className="mt-1">
                                <input
                                    id="telephone"
                                    name="phone"
                                    type="tel"
                                    maxLength={9}
                                    autoComplete="telephone"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={CELULAR}
                                    onChange={ (e) => setCelular(Number(e.target.value)) } 
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="admin"
                                            name="admin"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            value={ADMIN}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'S' : 'N';
                                                setAdmin(value) } 
                                            }                                                
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="admin" className="font-medium text-gray-700">
                                            Usuário Admin
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={setOpen}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={setOpen}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}