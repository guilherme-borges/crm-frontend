import Menu from '../../components/Menu'
import instance from '../../service/api'
import { useState, useEffect } from 'react'

function Clientes() {

  useEffect(() => {
    buscarClientes()
  }, [])

  const [clientes, setClientes] = useState([])
  const [id, setId] = useState(0)
  const [nome, setNome] = useState([])
  const [email, setEmail] = useState([])
  const [telefone, setTelefone] = useState([])

  async function buscarClientes() {
    try {
      const response = await instance.get('/clientes')
      setClientes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function salvar() {
    try {
      await instance.post('/clientes', {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone
      })

      buscarClientes()
    } catch (error) {
      console.log(error);
      alert("Erro ao tentar cadastrar cliente.")
    }
  }

  async function excluir(id) {
    try {
      await instance.delete(`/clientes/${id}`)
      buscarClientes()
    } catch (error) {
      console.log(error)
      alert("Erro ao tentar excluir cliente.")
    }
  }

  function carregarCampos(cliente) {
    setId(cliente.id)
    setNome(cliente.nome)
    setEmail(cliente.email)
    setTelefone(cliente.telefone)
  }

  function limparCampos() {
    setId(0)
    setNome('')
    setEmail('')
    setTelefone('')
  }

  return (
    <>
      <Menu />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastro de Clientes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="txtNome" className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="txtNome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtTelefone" className="form-label">Telefone</label>
                <input
                  type="phone"
                  className="form-control"
                  id="txtTelefone"
                  onChange={(e) => setTelefone(e.target.value)}
                  value={telefone}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
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
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => carregarCampos(cliente)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => excluir(cliente.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Clientes