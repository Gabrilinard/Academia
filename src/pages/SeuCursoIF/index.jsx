import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import Footer from '../../Components/Footer';
import styled from 'styled-components';
import {
  ProgressBar, Checkbox, Container, Title, SubTitle,
  VideoSection, Wrapper, ContentContainer, Message,
  RenameButton, ChangeVideoButton, RemoveButton, AddButton, Container_geral, Cont, Title_2
} from './style';

const BackButton = styled(Link)`
  background-color: #555;
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #777;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

const MasculinoAvancado = () => {
  const { userId } = useParams();
  const { cursoId} = useParams();
  const [progress, setProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [treinos, setTreinos] = useState([]);
  const [nome, setNome] = useState('');
  const [titulo, setTitulo] = useState('');
  const [video, setVideo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/treinos/solicitar/${userId}/${cursoId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(treinosData => {
        console.log("Dados recebidos da API:", treinosData);
        setTreinos(Array.isArray(treinosData) ? treinosData : []); // Garante que seja um array
        setWatchedVideos(treinosData.map(() => false));
      })
      .catch(err => setError('Erro ao carregar os treinos: ' + err.message));    
  }, [userId]);
  

  useEffect(() => {
    const watchedCount = watchedVideos.filter(v => v).length;
    const newProgress = treinos.length > 0 ? (watchedCount / treinos.length) * 100 : 0;
    setProgress(newProgress);

    if (newProgress === 100) {
      setMessage("Parabéns, você concluiu 100% do curso!");
      setTimeout(() => setMessage(""), 5000);
    }

    localStorage.setItem('watchedVideosMasculinoAvancado', JSON.stringify(watchedVideos));
  }, [watchedVideos, treinos]);

  const handleCheckboxChange = (index) => {
    setWatchedVideos(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nome.trim() || !video.trim()) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const response = await fetch('http://localhost:5000/adicionar-treino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        titulo,
        video,
        assistido: false,
        userId,
        cursoId
      })
    });
    
    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      setTreinos(prevTreinos => [...prevTreinos, { nome, video, assistido: false }]);
      setWatchedVideos(prevWatched => [...prevWatched, false]);
      setNome('');
      setVideo('');
    }
  };

  const handleRename = async (index) => {
    const newName = prompt('Novo nome para o treino:', treinos[index].nome);
    if (newName) {
      try {
        const response = await fetch(`http://localhost:5000/api/treinos/${treinos[index].id}/renomear`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: newName })
        });
  
        const data = await response.json();
        alert(data.message);
  
        if (response.ok) {
          setTreinos(prevTreinos => {
            const updatedTreinos = [...prevTreinos];
            updatedTreinos[index].nome = newName;
            return updatedTreinos;
          });
        }
      } catch (err) {
        console.error('Erro ao renomear o treino:', err);
      }
    }
  };
  

  const handleChangeVideo = async (index) => {
    const newVideoUrl = prompt('Novo URL do vídeo:', treinos[index].video);
    if (newVideoUrl) {
      try {
        const response = await fetch(`http://localhost:5000/api/treinos/${treinos[index].id}/trocar-video`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ video: newVideoUrl })
        });
  
        const data = await response.json();
        alert(data.message);
  
        if (response.ok) {
          setTreinos(prevTreinos => {
            const updatedTreinos = [...prevTreinos];
            updatedTreinos[index].video = newVideoUrl;
            return updatedTreinos;
          });
        }
      } catch (err) {
        console.error('Erro ao trocar o vídeo:', err);
      }
    }
  };
  

  const handleRemove = async (index) => {
    const confirmDelete = window.confirm('Tem certeza que deseja remover esse treino?');
    if (confirmDelete) {
      const treinoId = treinos[index].id;
      console.log(treinoId);  // Log the id to check its value
      const response = await fetch(`http://localhost:5000/api/treinos/${treinoId}`, {
        method: 'DELETE'
      });
  
      const data = await response.json();
      alert(data.message);
  
      if (response.ok) {
        setTreinos(prevTreinos => prevTreinos.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <Container_geral>
      <Header>
            <h1>Detalhes do Curso</h1>
            <BackButton to="/AdminDashboard">Voltar</BackButton>
          </Header>
      <Container_geral>
        <Container>
          <Title>Treino Iniciante Feminino: Corpo Total (ID: {userId})</Title>
          <Wrapper>
            <ContentContainer>
              <ProgressBar progress={progress}>
                <div className="progress-bar-green" />
                <span>{Math.round(progress)}%</span>
              </ProgressBar>
              {message && <Message>{message}</Message>}
              {treinos.map((treino, index) => (
                <div key={index}>
                  <Cont>
                    <SubTitle>{treino.nome}</SubTitle>
                    <Checkbox>
                        <input
                          type="checkbox"
                          checked={watchedVideos[index] || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label>Assisti ao vídeo</label>
                      </Checkbox>
                  </Cont>
                  <Title_2>{treino.titulo}</Title_2>
                  <RenameButton onClick={() => handleRename(index)}>Renomear</RenameButton>
                  <ChangeVideoButton onClick={() => handleChangeVideo(index)}>Trocar Vídeo</ChangeVideoButton>
                  <RemoveButton onClick={() => handleRemove(index)}>Remover Treino</RemoveButton>
                  <VideoSection>
                    <div>
                      <video controls>
                        <source src={treino.video} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>
                  </VideoSection>
                </div>
              ))}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nome do treino"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mensagem do treino"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="URL do vídeo"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
                <AddButton type="submit">Adicionar Novo Treino</AddButton>
              </form>
            </ContentContainer>
          </Wrapper>
        </Container>
        <Footer />
      </Container_geral>
    </Container_geral>
  );
};

export default MasculinoAvancado;
