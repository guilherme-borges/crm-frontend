import Menu from '../../components/Menu'

function Home() {
  return (
    <>
      <Menu />

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Cadastro de Oportunidade</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="cbxClientes" class="form-label">Clientes</label>
                <select class="form-select" aria-label="Default select example" id="cbxClientes">
                  <option selected>Selecione o cliente</option>
                  <option value="1">Cliente 1</option>
                  <option value="2">Cliente 2</option>
                  <option value="3">Cliente 3</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="cbxProjetos" class="form-label">Projetos</label>
                <select class="form-select" aria-label="Default select example" id="cbxProjetos">
                  <option selected>Selecione o projeto</option>
                  <option value="1">Projeto 1</option>
                  <option value="2">Projeto 2</option>
                  <option value="3">Projeto 3</option>
                </select>
              </div>
              <label for="txtValor" class="form-label">Valor</label>
              <div class="input-group mb-3">
                <span class="input-group-text">R$</span>
                <input type="number" class="form-control" id="txtValor" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary">Salvar</button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mt-5">
        <div className="d-flex justify-content-end">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="bi bi-plus-lg"></i>
            Novo
          </button>
        </div>
        <table class="table">
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
            <tr>
              <td><button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button></td>
              <td><button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
              <td>Projeto 1</td>
              <td>Cliente 1</td>
              <td>R$ 2000,00</td>
            </tr>
            <tr>
              <td><button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button></td>
              <td><button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
              <td>Projeto 2</td>
              <td>Cliente 2</td>
              <td>R$ 4000,00</td>
            </tr>
            <tr>
              <td><button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button></td>
              <td><button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
              <td>Projeto 3</td>
              <td>Cliente 3</td>
              <td>R$ 3000,00</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Home