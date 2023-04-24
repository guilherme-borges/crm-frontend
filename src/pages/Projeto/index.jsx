import Menu from '../../components/Menu'
import instance from '../../service/api'
import { useState, useEffect } from 'react'

function Projeto() {

  useEffect(() => {
    buscarProjetos()
  }, [])

  const [projetos, setProjetos] = useState([])
  const [id, setId] = useState(0)
  const [nome, setNome] = useState([])

  async function buscarProjetos() {
    try {
      const response = await instance.get('/projetos')
      setProjetos(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function salvar() {
    try {
      await instance.post('/projetos', {
        id: id,
        nome: nome
      }) 

      buscarProjetos()
    } catch (error) {
      console.log(error);
      alert("Erro ao tentar cadastrar projeto.")
    }
  }

  async function excluir(id) {
    try {
      await instance.delete(`/projetos/${id}`)
      buscarProjetos()
    } catch (error) {
      console.log(error)
      alert("Erro ao tentar excluir projeto.")
    }
  }

  function carregarCampos(projeto) {
    setId(projeto.id)
    setNome(projeto.nome)
  }

  function limparCampos() {
    setId(0)
    setNome('')
  }

  return (
    <>
      <Menu />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Cadastro de Projetos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label htmlFor="txtNome" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="txtNome"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
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
            </tr>
          </thead>
          <tbody>
            {
              projetos.map((projeto) => (
                <tr key={projeto.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => carregarCampos(projeto)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => excluir(projeto.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                  <td>{projeto.nome}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Projeto