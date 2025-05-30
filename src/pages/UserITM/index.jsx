import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { ProgressBar, Checkbox, Container, Title, SubTitle, VideoSection, Wrapper, ContentContainer, Message, Chapter } from './style';
import { useParams } from 'react-router-dom';

const MasculinoAvancado = () => {
  const totalVideos = 4;
  const [progress, setProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState([false, false, false, false]);
  const [message, setMessage] = useState('');
  const [openChapters, setOpenChapters] = useState({ 1: true, 2: false }); // Capítulo 1 aberto e Capítulo 2 fechado
  const { userId, cursoId } = useParams();


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
  
  

  const handleCheckboxChange = async (index) => {
    const updatedVideos = [...watchedVideos];
    updatedVideos[index] = !updatedVideos[index];
  
    // Atualiza progresso
    const watchedCount = updatedVideos.filter(video => video).length;
    const newProgress = (watchedCount / totalVideos) * 100;
    setWatchedVideos(updatedVideos);
    setProgress(newProgress);
  
    // Enviar atualização para o backend
    try {
      await fetch(`http://localhost:5000/api/progress/${userId}/${cursoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress, checkbox: updatedVideos }), // <-- envia o array
      });
    } catch (error) {
      console.error('Erro ao salvar progresso no banco de dados', error);
    }
  };  

  const calculateProgress = () => {
    const watchedCount = watchedVideos.filter(video => video).length;
    const newProgress = (watchedCount / totalVideos) * 100;
    setProgress(newProgress);
  };

  useEffect(() => {
    calculateProgress();
  }, [watchedVideos]);

  const toggleChapter = (chapterNumber) => {
    setOpenChapters(prevState => ({
      ...prevState,
      [chapterNumber]: !prevState[chapterNumber]
    }));
  };

  return (
    <Container>
      <Header />
      <Title>Curso Intermediário Masculino</Title>

      <Wrapper>
        <ContentContainer>
          <ProgressBar progress={progress}>
            <div className="progress-bar-green" />
            <span>{Math.round(progress)}%</span>
          </ProgressBar>

          {message && <Message>{message}</Message>}

          {/* Capítulo 1 */}
          <Chapter>
            <h2 onClick={() => toggleChapter(1)} style={{ cursor: 'pointer' }}>
              Capítulo 1 {openChapters[1] ? '▼' : '▶'}
            </h2>
            {openChapters[1] && (
              <>
                <SubTitle>Exercício 1: Supino Reto</SubTitle>
                <VideoSection>
                  <video controls>
                    <source src="video1.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <Checkbox>
                    <input type="checkbox" checked={watchedVideos[0]} onChange={() => handleCheckboxChange(0)} />
                    <label>Assistido</label>
                  </Checkbox>
                </VideoSection>

                <SubTitle>Exercício 2: Desenvolvimento com Halteres</SubTitle>
                <VideoSection>
                  <video controls>
                    <source src="video2.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <Checkbox>
                    <input type="checkbox" checked={watchedVideos[1]} onChange={() => handleCheckboxChange(1)} />
                    <label>Assistido</label>
                  </Checkbox>
                </VideoSection>
              </>
            )}
          </Chapter>

          {/* Capítulo 2 */}
          <Chapter>
            <h2 onClick={() => toggleChapter(2)} style={{ cursor: 'pointer' }}>
              Capítulo 2 {openChapters[2] ? '▼' : '▶'}
            </h2>
            {openChapters[2] && (
              <>
                <SubTitle>Exercício 3: Barra Fixa</SubTitle>
                <VideoSection>
                  <video controls>
                    <source src="video3.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <Checkbox>
                    <input type="checkbox" checked={watchedVideos[2]} onChange={() => handleCheckboxChange(2)} />
                    <label>Assistido</label>
                  </Checkbox>
                </VideoSection>

                <SubTitle>Exercício 4: Agachamento Livre</SubTitle>
                <VideoSection>
                  <video controls>
                    <source src="video4.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                  <Checkbox>
                    <input type="checkbox" checked={watchedVideos[3]} onChange={() => handleCheckboxChange(3)} />
                    <label>Assistido</label>
                  </Checkbox>
                </VideoSection>
              </>
            )}
          </Chapter>
        </ContentContainer>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default MasculinoAvancado;
