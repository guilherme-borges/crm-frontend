import { Link } from "react-router-dom"

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">SalesBoost</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={'/'}>Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/clientes'}>Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/projetos'}>Projetos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu