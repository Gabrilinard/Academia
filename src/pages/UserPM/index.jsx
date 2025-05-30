import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import {
  Checkbox,
  Container,
  ContentContainer,
  Message,
  ProgressBar,
  SubTitle,
  Title,
  VideoSection,
  Container_2,
  Wrapper,
  ChapterContainer,
  ChapterTitle,
  Title_2,
  Chapter
} from './style';

const MasculinoAvancado = () => {
  const [progress, setProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [treinos, setTreinos] = useState([]);
  const [error, setError] = useState('');
  const { userId, cursoId } = useParams();
  const [openChapters, setOpenChapters] = useState({});

  // Carregar dados de progresso
  useEffect(() => {
      const fetchProgressData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/progress/solicitar/${userId}/${cursoId}`);
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setProgress(data.progress);
              const parsedCheckbox = Array.isArray(data.checkbox)
                ? data.checkbox
                : JSON.parse(data.checkbox || '[]'); // segurança caso seja string
              setWatchedVideos(parsedCheckbox);
            }
          } else {
            console.error('Erro ao buscar dados de progresso, status:', response.status);
          }
        } catch (error) {
          console.error('Erro ao buscar dados de progresso', error);
        }
      };
    
      fetchProgressData();
    }, [userId, cursoId]);


  // Atualizar progresso ao marcar vídeo como assistido
  const handleCheckboxChange = async (index) => {
    const updatedVideos = [...watchedVideos];
    updatedVideos[index] = !updatedVideos[index];
  
    setWatchedVideos(updatedVideos);
  
    const watchedCount = updatedVideos.filter(video => video).length;
    const newProgress = treinos.length > 0 ? (watchedCount / treinos.length) * 100 : 0;
    const validProgress = Math.max(0, Math.min(newProgress, 100));
    setProgress(validProgress);
  
    // ✅ Enviar progresso + checkboxes pro backend
    try {
      await fetch(`http://localhost:5000/api/progress/${userId}/${cursoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: validProgress, checkbox: updatedVideos }),
      });
    } catch (error) {
      console.error('Erro ao salvar progresso no banco de dados', error);
    }
  };
  

  // Carregar treinos
  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/treinos/solicitar/aluno/${userId}/${cursoId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar treinos');
        }
        const treinosData = await response.json();
        setTreinos(treinosData);    
      } catch (err) {
        console.error(err);
      }
    };

    fetchTreinos();
  }, [userId, cursoId]);

  useEffect(() => {
    // Recalcula o progresso toda vez que os treinos forem atualizados
    if (treinos.length > 0 && watchedVideos.length > 0) {
      const watchedCount = watchedVideos.filter(v => v).length;
      const newProgress = (watchedCount / treinos.length) * 100;
      setProgress(Math.max(0, Math.min(newProgress, 100)));
    }
  }, [treinos]);
  

  // Colocar todos os vídeos em um único capítulo
  const chapters = [treinos]; // Colocando todos os treinos em um único capítulo

  // Alternar visibilidade do capítulo
  const toggleChapter = () => {
    setOpenChapters(prevState => ({
      ...prevState,
      0: !prevState[0], // Só existe um capítulo, index 0
    }));
  };

  return (
    <Container>
      <Header />
      <Title>Treino Personalizado Feminino: Corpo Total</Title>

      <Wrapper>
        <ContentContainer>
          <ProgressBar progress={progress}>
            <div className="progress-bar-green" />
            <span>{Math.round(progress)}%</span>
          </ProgressBar>

          {message && <Message>{message}</Message>}
          {error && <Message style={{ color: 'red' }}>{error}</Message>}

          {treinos.length > 0 ? (
            <ChapterContainer>
              {/* Botão para abrir/fechar o único capítulo */}
              <ChapterTitle onClick={toggleChapter}>
                Aulas {openChapters[0] ? '🔽' : '▶️'}
              </ChapterTitle>

              {openChapters[0] && (
                <div>
                  {chapters[0].map((treino, index) => (
                    <div key={index}>
                      <Container_2>
                        <SubTitle>{treino.nome}</SubTitle>
                      </Container_2>
                      <Title_2>{treino.titulo}</Title_2>
                      <VideoSection>
                        <video controls>
                          <source src={treino.video_url} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </VideoSection>
                      <Checkbox>
                        <input
                          type="checkbox"
                          checked={watchedVideos[index] || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label>Assistido</label>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              )}
            </ChapterContainer>
          ) : (
            <Message>Nenhum treino encontrado.</Message>
          )}
        </ContentContainer>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default MasculinoAvancado;
