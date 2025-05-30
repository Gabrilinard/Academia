// MeusCursos
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(227, 228, 222);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
`;

const CourseContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  margin: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CourseInfo = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ViewCourseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isRenew ? "#d9534f" : "#4caf50")};

  &:hover {
    background-color: ${(props) => (props.isRenew ? "#c9302c" : "#45a049")};
  }
`;

const MeusCursos = () => {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchCoursesFromDatabase = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/cursos/${user.id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar cursos");
        }
        const cursosData = await response.json();

        const formattedCursos = cursosData.map((item) => ({
          ...item,
          idade: Number(item.idade),
        }));

        setCursos(formattedCursos);
        setLoading(false);
      } catch (error) {
        setError("Nenhum curso encontrado");
        setLoading(false);
      }
    };

    fetchCoursesFromDatabase();
  }, [user]);

  const handleRenew = (curso) => {
    if (curso.modalidade === "Personalizado") {
      localStorage.setItem(
        "formData",
        JSON.stringify({
          modalidade: curso.modalidade,
          genero: curso.genero,
          idade: curso.idade,
        })
      );
    }
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        {loading ? (
          <CourseContainer>
            <Title>Carregando seus cursos...</Title>
          </CourseContainer>
        ) : error ? (
          <CourseContainer>
            <Title>{error}</Title>
          </CourseContainer>
        ) : (
          cursos.map((curso, index) => {
            const isRenew = curso.tempo_restante === 0;
            const buttonText = isRenew ? "Renove seu plano" : "Ver Treino";
            const redirectTo = isRenew
            ? "/Renovar"
            : curso.genero === "masculino" && curso.modalidade === "Avançado"
            ? `/UserAM/${user.id}/${curso.id}`
            : curso.genero === "feminino" && curso.modalidade === "Avançado"
            ? `/UserAF/${user.id}/${curso.id}`
            : curso.genero === "masculino" && curso.modalidade === "Intermediário"
            ? `/UserITM/${user.id}/${curso.id}`
            : curso.genero === "feminino" && curso.modalidade === "Intermediário"
            ? `/UserITF/${user.id}/${curso.id}`
            : curso.genero === "masculino" && curso.modalidade === "Iniciante"
            ? `/UserIM/${user.id}/${curso.id}`
            : curso.genero === "feminino" && curso.modalidade === "Iniciante"
            ? `/UserIF/${user.id}/${curso.id}`
            : curso.genero === "masculino" && curso.modalidade === "Personalizado"
            ? `/UserPM/${user.id}/${curso.id}`
            : curso.genero === "feminino" && curso.modalidade === "Personalizado"
            ? `/UserPF/${user.id}/${curso.id}`
            : "/";
          

            return (
              <CourseContainer key={index}>
                <Title>Meu Curso</Title>
                <CourseInfo>Modalidade: {curso.modalidade}</CourseInfo>
                <CourseInfo>Gênero: {curso.genero}</CourseInfo>
                <CourseInfo>Idade: {curso.idade}</CourseInfo>
                <CourseInfo>
                  Tempo Restante: {curso.modalidade === "Personalizado" 
                    ? `${curso.tempo_restante} dias` 
                    : "Vitalício"}
                </CourseInfo>
                <Link to={redirectTo} onClick={() => isRenew && handleRenew(curso)}>
                  <ViewCourseButton isRenew={isRenew}>{buttonText}</ViewCourseButton>
                </Link>
              </CourseContainer>
            );
          })
        )}
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default MeusCursos;
