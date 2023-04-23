import Menu from '../../components/Menu'
import axios from 'axios'
import { useState, useEffect } from 'react'

function Home() {

  const [oportunidades, setOportunidades] = useState([])
  const [clientes, setClientes] = useState([])
  const [projetos, setProjetos] = useState([])

  const [oportunidadeId, setOportunidadeId] = useState(0)
  const [clienteId, setClienteId] = useState(0)
  const [projetoId, setProjetoId] = useState(0)
  const [valor, setValor] = useState(0)

  useEffect(() => {
    buscarOportunidades()
    buscarClientes()
    buscarProjetos()
  }, [])

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
  })

  async function buscarOportunidades() {
    try {
      const response = await instance.get('/oportunidades')
      setOportunidades(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function buscarClientes() {
    try {
      const response = await instance.get('/clientes')
      setClientes(response.data)
      console.log(clientes)
    } catch (error) {
      console.error(error)
    }
  }

  async function buscarProjetos() {
    try {
      const response = await instance.get('/projetos')
      setProjetos(response.data)
      console.log(projetos)
    } catch (error) {
      console.error(error)
    }
  }

  async function salvar() {
    try {

      const response = await instance.post('/oportunidades', {
        id: oportunidadeId,
        cliente: {
          id: clienteId
        },
        projeto: {
          id: projetoId
        },
        valor: valor
      })

      buscarOportunidades()

      alert("Oportunidade salva.")
    } catch (error) {
      console.error(error)
    }
  }

  async function excluir(id) {
    try {
      await instance.delete(`/oportunidades/${id}`)
      buscarOportunidades()
      alert("Oportunidade excluída.")
    } catch (error) {
      console.log(error)
      alert("Erro ao tentar excluir oportunidade.")
    }
  }

  function carregarCampos(oportunidade) {
    setOportunidadeId(oportunidade.id)
    setValor(oportunidade.valor)
    setClienteId(oportunidade.cliente.id)
    setProjetoId(oportunidade.projeto.id)
  }

  function limparCampos() {
    setOportunidadeId(0)
    setValor(0)
    setClienteId(0)
    setProjetoId(0)
  }

  return (
    <>
      <Menu />

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastro de Oportunidade</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="cbxClientes" className="form-label">Clientes</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="cbxClientes"
                  onChange={(e) => setClienteId(e.target.value)}
                  value={clienteId}
                >
                  <option selected>Selecione o cliente</option>
                  {
                    clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id} >{cliente.nome}</option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="cbxProjetos" className="form-label">Projetos</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="cbxProjetos"
                  onChange={(e) => setProjetoId(e.target.value)}
                  value={projetoId}
                >
                  <option selected>Selecione o projeto</option>
                  {
                    projetos.map((projeto) => (
                      <option key={projeto.id} value={projeto.id} >{projeto.nome}</option>
                    ))
                  }
                </select>
              </div>
              <label htmlFor="txtValor" className="form-label">Valor</label>
              <div className="input-group mb-3">
                <span className="input-group-text">R$</span>
                <input
                  type="number"
                  className="form-control"
                  id="txtValor"
                  onChange={(e) => setValor(e.target.value)}
                  value={valor}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => salvar()}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mt-5">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => limparCampos()}
          >
            <i className="bi bi-plus-lg"></i>
            Novo
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Editar</th>
              <th scope="col">Excluir</th>
              <th scope="col">Projeto</th>
              <th scope="col">Cliente</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>

            {
              oportunidades.map((oportunidade) => (
                <tr key={oportunidade.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => carregarCampos(oportunidade)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => excluir(oportunidade.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                  <td>{oportunidade.projeto.nome}</td>
                  <td>{oportunidade.cliente.nome}</td>
                  <td>R$ {oportunidade.valor}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </main>
    </>
  )
}

export default Home