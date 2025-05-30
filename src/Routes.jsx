import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Entrar";
import Registro from "./pages/Registrar";
import Conta from "./pages/Conta";
import Serviço from "./pages/Serviço";
import Premium from "./pages/Premium";
import Curso from "./pages/Curso";
import Loja from "./pages/Loja";
import QuemSomos from "./pages/QuemSomos";
import Assinar from "./pages/Assinar";
import Agendar from "./pages/Agendar";
import Curso_i from "./pages/Curso_i";
import Curso_avancado from "./pages/Curso_avancado";
import Masculino from "./pages/Masculino";
import Feminino from "./pages/Feminino";
import Carrinho from "./pages/Carrinho";
import Iniciante_h from "./pages/Iniciante_h";
import Iniciante_m from "./pages/Iniciante_m";
import Contato from "./pages/Contato";
import Avancado_h from "./pages/Avancado_h";
import Avancado_m from "./pages/Avancado_m";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Selecionar from "./pages/Selecionar";
import PagarLoja from "./pages/PagarLoja";
import MeusCursos from "./pages/MeusCursos";
import SeuCursoAM from "./pages/SeuCursoAM";
import SeuCursoAF from "./pages/SeuCursoAF";
import Renovar from "./pages/Renovar";
import Curso_intermediario from "./pages/Curso_intermediario";
import Intermed_h from "./pages/Intermed_h";
import Intermed_m from "./pages/Intermed_m";
import SeuCursoIM from "./pages/SeuCursoIM";
import SeuCursoIF from "./pages/SeuCursoIF";
import SeuCursoITM from "./pages/SeuCursoITM";
import SeuCursoITF from "./pages/SeuCursoITF";
import Produtos from "./pages/Produtos";
import Agenda from "./pages/Agenda";
import UserITM from "./pages/UserITM";
import UserITF from "./pages/UserITF";
import UserIM from "./pages/UserIM";
import UserIF from "./pages/UserIF";
import UserPM from "./pages/UserPM";
import UserPF from "./pages/UserPF";
import UserAM from "./pages/UserAM";
import UserAF from "./pages/UserAF";
import { useAuth } from "./contexts/AuthContext"

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    // Se não estiver logado e tentando acessar uma rota protegida, redireciona para a página de login
    return <Navigate to="/Entrar" />;
  }

  // Se o usuário estiver logado, mostra a página solicitada
  return element;
};


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Entrar" element={<Login />} />
        <Route path="/Registrar" element={<Registro />} />
        <Route path="/Conta" element={<Conta />} />
        <Route path="/Serviço" element={<Serviço />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/Curso" element={<Curso />} />
        <Route path="/Loja" element={<Loja />} />
        <Route path="/QuemSomos" element={<QuemSomos />} />
        <Route path="/Assinar" element={<Assinar />} />
        <Route path="/Agendar" element={<Agendar />} />
        <Route path="/Curso_i" element={<Curso_i />} />
        <Route path="/Curso_avancado" element={<Curso_avancado />} />
        <Route path="/Avancado_h" element={<Avancado_h />} />
        <Route path="/Avancado_m" element={<Avancado_m />} />
        <Route path="/Carrinho" element={<Carrinho />} />
        <Route path="/Iniciante_h" element={<Iniciante_h />} />
        <Route path="/Iniciante_m" element={<Iniciante_m />} />
        <Route path="/Curso_intermediario" element={<Curso_intermediario />} />
        <Route path="/Intermed_h" element={<Intermed_h />} />
        <Route path="/Intermed_m" element={<Intermed_m />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Selecionar" element={<Selecionar />} />
        <Route path="/PagarLoja" element={<PagarLoja />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/MeusCursos" element={<MeusCursos />} />
        <Route path="/SeuCursoIM" element={<SeuCursoIM/>} />
        <Route path="/SeuCursoIF" element={<SeuCursoIF/>} />
        <Route path="/SeuCursoITM" element={<SeuCursoITM />} />
        <Route path="/SeuCursoITF" element={<SeuCursoITF />} />
        <Route path="/Agenda" element={<Agenda />} />
        <Route path="/SeuCursoAM/:userId/:cursoId" element={<SeuCursoAM />} />
        <Route path="/SeuCursoAF/:userId/:cursoId" element={<SeuCursoAF />} />
        <Route path="/Masculino/:userId/:cursoId" element={<Masculino />} />
        <Route path="/SeuCursoIM/:userId/:cursoId" element={<SeuCursoIM />} />
        <Route path="/SeuCursoIF/:userId/:cursoId" element={<SeuCursoIF />} />
        <Route path="/SeuCursoITM/:userId/:cursoId" element={<SeuCursoITM />} />
        <Route path="/SeuCursoITF/:userId/:cursoId" element={<SeuCursoITF />} />
        <Route path="/Feminino/:userId/:cursoId" element={<Feminino />} />
        <Route path="/UserITM/:userId/:cursoId" element={<UserITM />} />
        <Route path="/UserITF/:userId/:cursoId" element={<UserITF />} />
        <Route path="/UserIM/:userId/:cursoId" element={<UserIM />} />
        <Route path="/UserIF/:userId/:cursoId" element={<UserIF />} />
        <Route path="/UserPM/:userId/:cursoId" element={<UserPM />} />
        <Route path="/UserPF/:userId/:cursoId" element={<UserPF />} />
        <Route path="/UserAM/:userId/:cursoId" element={<UserAM />} />
        <Route path="/UserAF/:userId/:cursoId" element={<UserAF />} />
        <Route path="/Renovar" element={<Renovar />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;