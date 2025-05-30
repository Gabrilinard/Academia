import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  background: rgba(227, 228, 222, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StatBlock = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
`;

const StatTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
`;

const StatInfo = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
`;

const CourseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CourseContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseInfo = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  color: #444;
`;

const ViewCourseButton = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #f4a261;
  }
`;

const NoResultsMessage = styled.p`
  font-size: 1.2rem;
  color: #d9534f;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
`;

const MeusCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [gendersStats, setGendersStats] = useState({ masculino: 0, feminino: 0 });
  const [ageGroupsStats, setAgeGroupsStats] = useState({
    "16-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46+": 0,
  });
  const [modalitiesStats, setModalitiesStats] = useState({
    Personalizado: 0,
    Avançado: 0,
    Intermediário: 0,
    Iniciante: 0,
  });
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchCoursesFromDatabase = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alunos");
        if (!response.ok) {
          throw new Error("Erro ao buscar cursos");
        }
        const cursosData = await response.json();
        setCursos(cursosData);
        calculateStatistics(cursosData);
      } catch (error) {
        console.error("Erro ao carregar cursos", error);
      }
    };

    fetchCoursesFromDatabase();
  }, [user]);

  const calculateStatistics = (cursos) => {
    let genderCount = { masculino: 0, feminino: 0 };
    let ageGroupsCount = { "16-25": 0, "26-35": 0, "36-45": 0, "46+": 0 };
    let modalityCount = { Personalizado: 0, Avançado: 0, Intermediário: 0, Iniciante: 0 };

    cursos.forEach((curso) => {
      if (curso.genero === "masculino") genderCount.masculino++;
      if (curso.genero === "feminino") genderCount.feminino++;

      const age = curso.idade;
      if (age >= 16 && age <= 25) ageGroupsCount["16-25"]++;
      if (age >= 26 && age <= 35) ageGroupsCount["26-35"]++;
      if (age >= 36 && age <= 45) ageGroupsCount["36-45"]++;
      if (age >= 46) ageGroupsCount["46+"]++;

      if (curso.modalidade === "Personalizado") modalityCount.Personalizado++;
      if (curso.modalidade === "Avançado") modalityCount.Avançado++;
      if (curso.modalidade === "Intermediário") modalityCount.Intermediário++;
      if (curso.modalidade === "Iniciante") modalityCount.Iniciante++;
    });

    const totalCourses = cursos.length;

    setGendersStats({
      masculino: totalCourses ? (genderCount.masculino / totalCourses) * 100 : 0,
      feminino: totalCourses ? (genderCount.feminino / totalCourses) * 100 : 0,
    });

    setAgeGroupsStats({
      "16-25": totalCourses ? (ageGroupsCount["16-25"] / totalCourses) * 100 : 0,
      "26-35": totalCourses ? (ageGroupsCount["26-35"] / totalCourses) * 100 : 0,
      "36-45": totalCourses ? (ageGroupsCount["36-45"] / totalCourses) * 100 : 0,
      "46+": totalCourses ? (ageGroupsCount["46+"] / totalCourses) * 100 : 0,
    });

    setModalitiesStats({
      Personalizado: totalCourses ? (modalityCount.Personalizado / totalCourses) * 100 : 0,
      Avançado: totalCourses ? (modalityCount.Avançado / totalCourses) * 100 : 0,
      Intermediário: totalCourses ? (modalityCount.Intermediário / totalCourses) * 100 : 0,
      Iniciante: totalCourses ? (modalityCount.Iniciante / totalCourses) * 100 : 0,
    });
  };

  const filteredCursos = cursos
  .filter(curso => curso.modalidade === "Personalizado")
  .filter(curso =>
    `${curso.nome} ${curso.sobrenome}`.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const getRedirectLink = (curso) => {
    if (!curso.usuario_id) return "#";

    if (curso.genero === "masculino") {
      if (curso.modalidade === "Personalizado") {
        return `/Masculino/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Avançado") {
        return `/SeuCursoAM/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Intermediário") {
        return `/SeuCursoITM/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Iniciante") {
        return `/SeuCursoIM/${curso.usuario_id}/${curso.id}`;
      }
    }

    if (curso.genero === "feminino") {
      if (curso.modalidade === "Personalizado") {
        return `/Feminino/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Avançado") {
        return `/SeuCursoAF/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Intermediário") {
        return `/SeuCursoITF/${curso.usuario_id}/${curso.id}`;
      } else if (curso.modalidade === "Iniciante") {
        return `/SeuCursoIF/${curso.usuario_id}/${curso.id}`;
      }
    }

    return `/cursos/${curso.usuario_id}`;
  };


  const handleLogout = () => {
    logout();
    navigate("/Entrar");
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <h2>Administração de Cursos</h2>
        <NavLinks>
          <StyledLink to="/Produtos">Loja</StyledLink>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </HeaderContainer>
      <ContentWrapper>
        <Title>Estatísticas</Title>
        <StatsContainer>
          <StatBlock>
            <StatTitle>Gênero</StatTitle>
            <StatInfo>Masculino: {gendersStats.masculino.toFixed(2)}%</StatInfo>
            <StatInfo>Feminino: {gendersStats.feminino.toFixed(2)}%</StatInfo>
          </StatBlock>
          <StatBlock>
            <StatTitle>Idade</StatTitle>
            <StatInfo>16-25 anos: {ageGroupsStats["16-25"].toFixed(2)}%</StatInfo>
            <StatInfo>26-35 anos: {ageGroupsStats["26-35"].toFixed(2)}%</StatInfo>
            <StatInfo>36-45 anos: {ageGroupsStats["36-45"].toFixed(2)}%</StatInfo>
            <StatInfo>46+ anos: {ageGroupsStats["46+"].toFixed(2)}%</StatInfo>
          </StatBlock>
          <StatBlock>
            <StatTitle>Modalidades</StatTitle>
            <StatInfo>Personalizado: {modalitiesStats.Personalizado.toFixed(2)}%</StatInfo>
            <StatInfo>Avançado: {modalitiesStats.Avançado.toFixed(2)}%</StatInfo>
            <StatInfo>Intermediário: {modalitiesStats.Intermediário.toFixed(2)}%</StatInfo>
            <StatInfo>Iniciante: {modalitiesStats.Iniciante.toFixed(2)}%</StatInfo>
          </StatBlock>
        </StatsContainer>
        <SearchBar
          type="text"
          placeholder="Pesquisar usuário..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CourseGrid>
          {filteredCursos.map((curso) => (
            <CourseContainer key={curso.id}>
              <h3>Curso</h3>
              <CourseInfo>
                Nome: {curso.nome} {curso.sobrenome}
              </CourseInfo>
              <CourseInfo>Gênero: {curso.genero}</CourseInfo>
              <CourseInfo>Idade: {curso.idade}</CourseInfo>
              <CourseInfo>Modalidade: {curso.modalidade}</CourseInfo>
              {curso.tempo_restante !== undefined && (
                <CourseInfo>Tempo Restante: {curso.tempo_restante} dias</CourseInfo>
              )}
              {curso.tempo_restante === 0 ? (
                <ViewCourseButton
                  as="button"
                  disabled
                  style={{
                    backgroundColor: "#d9534f",
                    cursor: "not-allowed",
                  }}
                >
                  Curso Inativo
                </ViewCourseButton>
              ) : (
                <ViewCourseButton to={getRedirectLink(curso)}>
                  Ver Curso
                </ViewCourseButton>
              )}
            </CourseContainer>
          ))}
        </CourseGrid>
        
        {filteredCursos.length === 0 && searchQuery && (
          <NoResultsMessage>Nenhum usuário encontrado</NoResultsMessage>
        )}

      </ContentWrapper>
    </PageContainer>
  );
};

export default MeusCursos;
