import Menu from '../../components/Menu'
import axios from 'axios'
import { useState, useEffect } from 'react'

function Home() {

  const [oportunidades, setOportunidades] = useState([])

  useEffect(() => {
    buscarOportunidades()
  }, [])

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
  })

  async function buscarOportunidades() {
    try {
      const response = await instance.get('/oportunidades')
      setOportunidades(response.data)
      console.log(oportunidades);
    } catch (error) {
      console.error(error)
    }
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
                <select className="form-select" aria-label="Default select example" id="cbxClientes">
                  <option selected>Selecione o cliente</option>
                  <option value="1">Cliente 1</option>
                  <option value="2">Cliente 2</option>
                  <option value="3">Cliente 3</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="cbxProjetos" className="form-label">Projetos</label>
                <select className="form-select" aria-label="Default select example" id="cbxProjetos">
                  <option selected>Selecione o projeto</option>
                  <option value="1">Projeto 1</option>
                  <option value="2">Projeto 2</option>
                  <option value="3">Projeto 3</option>
                </select>
              </div>
              <label htmlFor="txtValor" className="form-label">Valor</label>
              <div className="input-group mb-3">
                <span className="input-group-text">R$</span>
                <input type="number" className="form-control" id="txtValor" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-primary">Salvar</button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mt-5">
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
              oportunidades.map((oportunidade) => {
                <tr>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="bi bi-pencil-fill"></i></button></td>
                  <td><button type="button" className="btn btn-danger"><i className="bi bi-trash-fill"></i></button></td>
                  <td>{oportunidade.projeto.nome}</td>
                  <td>{oportunidade.cliente.nome}</td>
                  <td>R$ {oportunidade.valor}</td>
                </tr>
              })
            }

          </tbody>
        </table>
      </main>
    </>
  )
}

export default Home