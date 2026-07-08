import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import styled from 'styled-components';
import {
  ProgressBar, Checkbox, Container, Title, SubTitle,
  VideoSection, Message, RemoveButton, AddButton, Container_geral, Cont, Title_2, TreinoCard 
} from './style';

const Header = styled.div`
  background-color: #343a40;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Sansita', sans-serif;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const BackButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    padding: 8px 15px;
  }
`;

const MasculinoAvancado = () => {
  const { userId, cursoId } = useParams();
  const [treinos, setTreinos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState({});
  const [message, setMessage] = useState('');
  const [novoTreinoNome, setNovoTreinoNome] = useState('');
  const [exercicioTitulo, setExercicioTitulo] = useState('');
  const [exercicioMensagem, setExercicioMensagem] = useState('');
  const [exercicioVideo, setExercicioVideo] = useState('');
  const [treinoSelecionado, setTreinoSelecionado] = useState('');

  // Carrega todos os treinos com seus exercícios
  useEffect(() => {
    fetch(`http://localhost:5000/api/treinos-com-exercicios/${userId}/${cursoId}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error('Resposta inesperada da API:', data);
          setTreinos([]);
          return;
        }
        setTreinos(data);

        const watched = {};
        data.forEach(t => t.exercicios.forEach(e => watched[e.id] = false));
        setWatchedVideos(watched);
      })
      .catch(err => {
        console.error("Erro ao buscar treinos:", err);
        setTreinos([]);
      });
  }, [userId, cursoId]);

  // Calcula progresso
  const progress = (() => {
    const total = Object.keys(watchedVideos).length;
    const assistidos = Object.values(watchedVideos).filter(v => v).length;
    return total > 0 ? (assistidos / total) * 100 : 0;
  })();

  useEffect(() => {
    if (progress === 100) {
      setMessage("Parabéns, você concluiu 100% do curso!");
      setTimeout(() => setMessage(''), 5000);
    }
  }, [progress]);

  const handleCheckboxChange = (id) => {
    setWatchedVideos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateTreino = async (e) => {
    e.preventDefault();
    if (!novoTreinoNome.trim()) return;

    const response = await fetch('http://localhost:5000/adicionar-bloco-treino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoTreinoNome, userId, cursoId }),
    });

    const data = await response.json();
    if (response.ok) {
      setTreinos(prev => [...prev, { id: data.id, nome: novoTreinoNome, exercicios: [] }]);
      setNovoTreinoNome('');
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleAddExercicio = async (e) => {
  e.preventDefault();
  if (!exercicioTitulo || !exercicioVideo || !treinoSelecionado) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const formData = new FormData();
  formData.append("titulo", exercicioTitulo);
  formData.append("mensagem", exercicioMensagem);
  formData.append("video", exercicioVideo); // é um arquivo (File)
  formData.append("assistido", false);
  formData.append("treinoId", treinoSelecionado);

  const response = await fetch("http://localhost:5000/adicionar-exercicio", {
    method: "POST",
    body: formData, // importante: NÃO passar headers Content-Type aqui
  });

  const data = await response.json();

  if (response.ok) {
    setTreinos(prev =>
      prev.map(t =>
        t.id === parseInt(treinoSelecionado)
          ? {
              ...t,
              exercicios: [...t.exercicios, {
                id: data.id,
                titulo: exercicioTitulo,
                video: data.videoUrl, // a URL retornada do backend
                mensagem: exercicioMensagem,
                assistido: false
              }]
            }
          : t
      )
    );
    setExercicioTitulo('');
    setExercicioMensagem('');
    setExercicioVideo('');
    setTreinoSelecionado('');
    alert(data.message);
  } else {
    alert(data.message || 'Erro ao adicionar exercício.');
  }
};


  const handleRemoveTreino = async (id) => {
    if (!window.confirm('Deseja remover esse treino e todos os exercícios?')) return;
    const res = await fetch(`http://localhost:5000/api/treinos/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      setTreinos(prev => prev.filter(t => t.id !== id));
      alert(data.message);
    }
  };

  const handleRemoveExercicio = async (treinoId, exercicioId) => {
  if (!window.confirm('Deseja remover este exercício?')) return;

  const res = await fetch(`http://localhost:5000/api/remover/exercicios/${exercicioId}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (res.ok) {
    setTreinos(prev =>
      prev.map(t =>
        t.id === treinoId
          ? { ...t, exercicios: t.exercicios.filter(e => e.id !== exercicioId) }
          : t
      )
    );
    alert(data.message);
  } else {
    alert(data.message || 'Erro ao remover exercício.');
  }
};


  return (
    <Container_geral>
      <Header>
        <h1>Detalhes do Curso</h1>
        <BackButton to="/AdminDashboard">Voltar</BackButton>
      </Header>
      <Container>
        <Title>Treinos Personalizados (ID: {userId})</Title>
        <ProgressBar progress={progress}>
          <div className="progress-bar-green" />
          <span>{Math.round(progress)}%</span>
        </ProgressBar>
        {message && <Message>{message}</Message>}

        {Array.isArray(treinos) && treinos.map((treino) => (
          <TreinoCard key={treino.id}>
            <Cont>
              <SubTitle>{treino.nome}</SubTitle>
              <RemoveButton onClick={() => handleRemoveTreino(treino.id)}>
                Remover Treino
              </RemoveButton>
            </Cont>
            {treino.exercicios.map((ex) => (
              <div key={ex.id}>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={watchedVideos[ex.id] || false}
                    onChange={() => handleCheckboxChange(ex.id)}
                  />
                  <label>Assisti ao vídeo</label>
                </Checkbox>
                <Title_2>{ex.titulo}</Title_2>
                {ex.mensagem && (
                  <p style={{ marginBottom: '10px', color: '#555', fontStyle: 'italic' }}>
                    {ex.mensagem}
                  </p>
                )}
                <VideoSection>
                  <video controls>
                    <source src={ex.video} type="video/mp4" />
                  </video>
                </VideoSection>

                {/* ✅ MOVER o botão aqui, dentro do map do exercício */}
                <RemoveButton onClick={() => handleRemoveExercicio(treino.id, ex.id)}>
                  Remover Exercício
                </RemoveButton>
              </div>
            ))}

            </TreinoCard> 
        ))}

        <form onSubmit={handleCreateTreino}>
          <input
            type="text"
            placeholder="Nome do novo treino"
            value={novoTreinoNome}
            onChange={(e) => setNovoTreinoNome(e.target.value)}
          />
          <AddButton type="submit">Criar Treino</AddButton>
        </form>

        <form onSubmit={handleAddExercicio}>
          <select value={treinoSelecionado} onChange={e => setTreinoSelecionado(e.target.value)}>
            <option value="">Selecione um treino</option>
            {treinos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <input
            type="text"
            placeholder="Título do exercício"
            value={exercicioTitulo}
            onChange={(e) => setExercicioTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mensagem do exercício"
            value={exercicioMensagem}
            onChange={(e) => setExercicioMensagem(e.target.value)}
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setExercicioVideo(e.target.files[0])}
          />
          <AddButton type="submit">Adicionar Exercício</AddButton>
        </form>
      </Container>
      <Footer />
    </Container_geral>
  );
};

export default MasculinoAvancado;