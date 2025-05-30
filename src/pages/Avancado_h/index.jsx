import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { ProgressBar, Checkbox, Video, Container, Title, SubTitle, VideoSection, Wrapper, ContentContainer, Message, Chapter } from './style';

const Iniciante = () => {
  const totalVideos = 4;
  const [progress, setProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState([false, false, false, false]);
  const [message, setMessage] = useState('');
  const [openChapters, setOpenChapters] = useState({ 1: true, 2: false }); // Capítulo 1 aberto e Capítulo 2 fechado
 // Estado para controlar capítulos abertos

  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem('watchedVideosIniciante'));
    const savedProgress = parseFloat(localStorage.getItem('progressIniciante'));

    if (savedVideos) setWatchedVideos(savedVideos);
    if (savedProgress || savedProgress === 0) setProgress(savedProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('watchedVideosIniciante', JSON.stringify(watchedVideos));
    localStorage.setItem('progressIniciante', progress);
  }, [watchedVideos, progress]);

  const handleCheckboxChange = (index) => {
    setWatchedVideos(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const calculateProgress = () => {
    const watchedCount = watchedVideos.filter(video => video).length;
    const newProgress = (watchedCount / totalVideos) * 100;
    setProgress(newProgress);

    if (newProgress >= 50) {
      setMessage('Você já assistiu 50% dos vídeos! Você será redirecionado para a página de assinatura.');
      setTimeout(() => {
        window.location.href = '/Selecionar?modalidade=Intermediário&genero=masculino';
      }, 2000);
    }
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
      <Title>Curso Avançado Masculino</Title>

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
                <SubTitle>Exercício 1: Agachamento</SubTitle>
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

                <SubTitle>Exercício 2: Levantamento de Quadril</SubTitle>
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
                <SubTitle>Exercício 3: Cadeira Extensora</SubTitle>
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

                <SubTitle>Exercício 4: Afundo</SubTitle>
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

export default Iniciante;
