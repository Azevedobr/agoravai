import { Routes, Route } from "react-router-dom";
import App from "./App";
import { CadastroAluno, Login, EsqueceuSenha } from "./telas/autenticacao";
import Termos from "./telas/autenticacao/Termos";
import { TelaInicial, Dashboard, PaginaInicial, Pedidos } from "./telas/inicio";
import { Carrinho, EditarPerfil as EditarPerfilAluno, PagamentoCartao, Menu } from "./telas/aluno";
import { Funcionarios, Historico, CadastrarProduto, EditarPerfil as EditarPerfilEscola } from "./telas/escola";
import CentralAjuda from "./components/CentralAjuda";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/app" element={<App />} />
      <Route path="/tab" element={<div>Esta é a página do Aluno (rota /tab)</div>} /> 

      <Route path="/entraraluno" element={<Login />} />
      <Route path="/cadastroaluno" element={<CadastroAluno />} />
      <Route path="/telainicial" element={<TelaInicial />} /> 
      <Route path="/telainicio" element={<Dashboard />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/paginaeditarperfil" element={<EditarPerfilAluno />} /> 
      <Route path="/pagamentocartao" element={<PagamentoCartao />} /> 
      <Route path="/funcionarios" element={<Funcionarios />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/esqueceu" element={<EsqueceuSenha />} />
      <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
      <Route path="/editarperfil" element={<EditarPerfilEscola />} />
      <Route path="/central-ajuda" element={<CentralAjuda />} />
      <Route path="/termos" element={<Termos />} />


    </Routes>
  )
}

export default AppRoutes;

