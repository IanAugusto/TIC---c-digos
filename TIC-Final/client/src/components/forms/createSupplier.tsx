import CheckboxComponent from "../checkbox";
import ToggleComponent from "../toggle";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface DeclareSupplier 
{
    ID: number,
    PESSOA: string,
    NOM_PESSOA:string,
    DAT_CADASTRO: Date,
    NUM_CGC:string,
    NUM_CPF:string,
    EMAIL: string,
    NOM_CONTATO:string,
    STA_ATIVO:string,
    NOM_APELIDO:string,
    NOM_FANTASIA:string,
    NUM_RG:string,
    DES_HISTORICO:string,
    NOM_CARGO:string,
    RAMO_ATIVIDADE:string,
    FONE:string,
    STA_POSSUI_NFE:string,
    WEBSITE:string,
    NUM_INSC_ESTATUAL:string,
    USER_CAD:number,
    DATA_CAD: Date
}

export default function CreateSupplier({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    const handleReloadClick = () => {
        window.location.reload();
      };

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID'])
    const User_cad = cookie.ID

    const [suppliers, setSuppliers] = useState<DeclareSupplier[]>([])


    const [PESSOA, setPessoa] = useState('')
    const [NOM_PESSOA, setNomPessoa] = useState('')
    const [NUM_CGC, setCNPJ] = useState('')
    const [NUM_CPF, setCpf] = useState('')
    const [EMAIL, setEmail] = useState('')
    const [NOM_CONTATO, setContato] = useState('')
    const [STA_ATIVO, setStaAtivo] = useState('')
    const [NOM_APELIDO, setNomeApelido] = useState('')
    const [NOM_FANTASIA, setNomeFantasia] = useState('')
    const [NUM_RG, setNumRg] = useState('')
    const [DES_HISTORICO, setDesHistorico] = useState('')
    const [NOM_CARGO, setNomeCargo] = useState('')
    const [RAMO_ATIVIDADE, setRamoAtiv] = useState('')
    const [FONE, setFone] = useState('')
    const [STA_POSSUI_NFE, setNfe] = useState('')
    const [WEBSITE, setWeb] = useState('')
    const [NUM_INSC_ESTATUAL, setNumInsc] = useState('')
    const [USER_CAD, setUserCad] = useState('')


    /*função para criar o fornecedor */

    const registerSupplier = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto fornecedor
        let fornecedor
          fornecedor = {
            PESSOA,
            NOM_PESSOA,
            DAT_CADASTRO:  currenteDate,  
            NUM_CGC,
            NUM_CPF,
            EMAIL,
            NOM_CONTATO,
            STA_ATIVO,
            NOM_APELIDO,
            NOM_FANTASIA,
            NUM_RG,
            DES_HISTORICO,
            NOM_CARGO,
            RAMO_ATIVIDADE,
            FONE,
            STA_POSSUI_NFE,
            WEBSITE,
            NUM_INSC_ESTATUAL,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/fornecedor`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar o fornecedor
          console.log(url)
          console.log(verb)
          const createdSupplier = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de usuario
        setSuppliers([...suppliers, createdSupplier])
        handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }
     /*fim da função para criar o fornecedor */

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerSupplier}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Fornecedor</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                    <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="ativo"
                                            name="ativo"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            value={STA_ATIVO}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'S' : 'N';
                                                setStaAtivo(value) } 
                                            }                                        
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="admin" className="font-medium text-gray-700">
                                            Ativo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="PJ"
                                            name="PJ"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            value={NUM_CGC}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'J' : 'F';
                                                setPessoa(value) } 

                                            }                                        
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="admin" className="font-medium text-gray-700">
                                            PJ
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome/Razão social
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="razao"
                                    id="razao"
                                    autoComplete="given-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NOM_PESSOA}
                                    onChange={ (e) => setNomPessoa(e.target.value) } 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="fantasy-name" className="block text-sm font-medium text-gray-700">
                                Nome Fantasia
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="fantasy-name"
                                    id="fantasy-name"
                                    autoComplete="fantasy-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NOM_FANTASIA}
                                    onChange={ (e) => setNomeFantasia(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="CNPJ" className="block text-sm font-medium text-gray-700">
                                CNPJ
                            </label>
                            <div className="mt-1">
                                <input
                                    id="CNPJ"
                                    name="cnpj"
                                    type="text"
                                    autoComplete="CNPJ"
                                    maxLength={14}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NUM_CGC}
                                    onChange={ (e) => setCNPJ(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="ie" className="block text-sm font-medium text-gray-700">
                                Incrição Estadual
                            </label>
                            <div className="mt-1">
                                <input
                                    id="ie"
                                    name="inscricao-estadual"
                                    type="number"
                                    autoComplete="inscricao-estadual"
                                    maxLength={12}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NUM_INSC_ESTATUAL}
                                    onChange={ (e) => setNumInsc(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="CPF" className="block text-sm font-medium text-gray-700">
                                CPF
                            </label>
                            <div className="mt-1">
                                <input
                                    id="CPF"
                                    name="cpf"
                                    type="text"
                                    autoComplete="CNPJ"
                                    maxLength={11}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NUM_CPF}
                                    onChange={ (e) => setCpf(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="rg" className="block text-sm font-medium text-gray-700">
                                RG
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rg"
                                    name="rg"
                                    type="text"
                                    autoComplete="rg"
                                    maxLength={9}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NUM_RG}
                                    onChange={ (e) => setNumRg(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descrição/Histórico
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    value={DES_HISTORICO}
                                    onChange={ (e) => setDesHistorico(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome de Contato
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NOM_CONTATO}
                                    onChange={ (e) => setContato(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                Apelido
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    autoComplete="surname"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NOM_APELIDO}
                                    onChange={ (e) => setNomeApelido(e.target.value) } 
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
                                    required
                                    value={EMAIL}
                                    onChange={ (e) => setEmail(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                                Cargo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="cargo"
                                    name="cargo"
                                    type="text"
                                    autoComplete="cargo"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={NOM_CARGO}
                                    onChange={ (e) => setNomeCargo(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="nfe" className="block text-sm font-medium text-gray-700">
                                Possui NFE
                            </label>
                            <div className="mt-1">
                                <input
                                    id="nfe"
                                    name="nfe"
                                    type="text"
                                    placeholder="S / N"
                                    autoComplete="nfe"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={STA_POSSUI_NFE}
                                    onChange={ (e) => setNfe(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                Website
                            </label>
                            <div className="mt-1">
                                <input
                                    id="website"
                                    name="website"
                                    type="text"
                                    placeholder="www.exemplo.com.br"
                                    autoComplete="website"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={WEBSITE}
                                    onChange={ (e) => setWeb(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                Telefone
                            </label>
                            <div className="mt-1">
                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="text"
                                    placeholder="99999-9999"
                                    autoComplete="website"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={FONE}
                                    onChange={ (e) => setFone(e.target.value) } 
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                Ramo de Atividade
                            </label>
                            <div className="mt-1">
                                <input
                                    id="ramo"
                                    name="ramo"
                                    type="text"
                                    placeholder="Insira aqui o ramo de atividade"
                                    autoComplete="ramo"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={RAMO_ATIVIDADE}
                                    onChange={ (e) => setRamoAtiv(e.target.value) } 
                                />
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