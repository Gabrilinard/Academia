import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {
  ProgressBar,
  Checkbox,
  Container,
  Title,
  SubTitle,
  VideoSection,
  Wrapper,
  ContentContainer,
  Message,
  Chapter,
} from "./style";
import { useParams } from "react-router-dom";

const chapters = [
  {
    id: 1,
    title: "Sessão A",
    items: [
      { label: "Exercício 1: Puxada Aberta - Supinada  (3x - 12)", src: "video1.mp4" },
      { label: "Exercício 2: Puxada Aberta - Pegada Neutra - Barra Romana  (3x - 12)", src: "video1.mp4" },
      { label: "Exercício 3: Remada Baixa - Máquina Articulada - Pegada Supinada (3x - 12)", src: "video2.mp4" },
      { label: "Exercício 4: Rosca 21 - Barra - Em pé (3x - 7 + 7 + 7)", src: "video2.mp4" },
      { label: "Exercício 5: Rosca Scott - Barra Reta - Banco Scott (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 6: Rosca Alternada - Halteres - Em pé (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 7: Encolhimento - Dupla Anilha - Em pé (4x - 20)", src: "video2.mp4" },
    ],
  },
  {
    id: 2,
    title: "Sessão B",
    items: [
      { label: "Exercício 1: Agachamento - Barra - Livre (4x - 12)", src: "video3.mp4" },
      { label: "Exercício 2: Extensora - Cadeira Articulada (3x - 10 + 12 + 15) Obs: Drop set", src: "video4.mp4" },
      { label: "Exercício 3: Leg Press 45° - Máquina Articulada (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 4: Agachamento - Duplo Halter - Base de Ombro (3x - 15)", src: "video4.mp4" },
      { label: "Exercício 5: Leg Press Horizontal - Unilateral - Máquina Articulada (4x - 12)", src: "video4.mp4" },
      { label: "Exercício 6: Adutor - Cadeira Articulada (4x - 15)", src: "video4.mp4" },
      { label: "Exercício 7: Flexão Plantar - Esteira ou Bike: 10min (4x - 12)", src: "video4.mp4" },
    ],
  },
  {
    id: 3,
    title: "Sessão C",
    items: [
      { label: "Exercício 1: Supino Reto - Barra (3x - 12)", src: "video3.mp4" },
      { label: "Exercício 2: Crucifixo - Halter - Banco Reto (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 3: Supino - Halter - Banco Inclinado (3x - 15)", src: "video4.mp4" },
      { label: "Exercício 4: Crucifixo - Peck Deck (3x - 8 + 12) OBS: Drop", src: "video4.mp4" },
      { label: "Exercício 5: Elevação Frontal - Máquina Articulada - Pegada Neutra (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 6: Elevação Lateral - Halter (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 7: Tríceps Pulley Unilateral - Crossover - Corda - Polia Alta (4x - 15) Obs: + 12 inversa", src: "video4.mp4" },
      { label: "Exercício 8: Tríceps Francês - Crossover - Corda - Polia Baixa (3x - 15)", src: "video4.mp4" },
      { label: "Exercício 9: Rosca Scott - Barra Reta - Banco Scott (3x - 12)", src: "video4.mp4" },
    ],
  },
  {
    id: 4,
    title: "Sessão D",
    items: [
      { label: "Exercício 1: Afundo - Barra - Livre (3x - 12)", src: "video3.mp4" },
      { label: "Exercício 2: Abdutor - Cadeira Articulada (3x - 10 + 12 + 15) Obs: Drop set", src: "video4.mp4" },
      { label: "Exercício 3: Agachamento Sumo - Halter - Step em V (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 4: Flexora em Pé - Unilateral - Máquina Articulada (3x - 12) Obs: + 15 Polichinelo", src: "video4.mp4" },
      { label: "Exercício 5: Flexora - Mesa/Cama/Articulada (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 6: Cadeira Flexora - Máquina Articulada (3x - 10 + 12 + 15) Obs: Drop set", src: "video4.mp4" },
      { label: "Exercício 7: Flexão Plantar - Leg Press - Horizontal (3x - 12) Obs: + 15 livre. Esteira ou Bike: 10 min", src: "video4.mp4" },
    ],
  },
];

const totalVideos = chapters.reduce((sum, c) => sum + c.items.length, 0);
const initialOpen = Object.fromEntries(chapters.map((c, i) => [c.id, i === 0]));

const MasculinoAvancado = () => {
  const { userId, cursoId } = useParams();

  const [progress, setProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState(Array(totalVideos).fill(false));
  const [message, setMessage] = useState("");
  const [openChapters, setOpenChapters] = useState(initialOpen);

  // busca do backend
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/progress/solicitar/${userId}/${cursoId}`
        );
        if (!response.ok) {
          console.error("Erro ao buscar dados de progresso, status:", response.status);
          return;
        }
        const data = await response.json();
        if (!data) return;

        // normaliza tamanho do checkbox para totalVideos
        const parsedCheckbox = Array.isArray(data.checkbox)
          ? data.checkbox
          : JSON.parse(data.checkbox || "[]");

        const normalized = Array(totalVideos)
          .fill(false)
          .map((_, i) => Boolean(parsedCheckbox[i]));

        setWatchedVideos(normalized);

        // Se o backend já guarda progress, usa; senão recalcula abaixo
        if (typeof data.progress === "number") {
          setProgress(data.progress);
        } else {
          const watchedCount = normalized.filter(Boolean).length;
          setProgress((watchedCount / totalVideos) * 100);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de progresso", error);
      }
    };

    fetchProgressData();
  }, [userId, cursoId]);

  // recalcula progresso quando assistir/retirar
  useEffect(() => {
    const watchedCount = watchedVideos.filter(Boolean).length;
    setProgress((watchedCount / totalVideos) * 100);
  }, [watchedVideos]);

  const handleCheckboxChange = async (index) => {
    const updatedVideos = [...watchedVideos];
    updatedVideos[index] = !updatedVideos[index];

    const watchedCount = updatedVideos.filter(Boolean).length;
    const newProgress = (watchedCount / totalVideos) * 100;

    setWatchedVideos(updatedVideos);
    setProgress(newProgress);

    try {
      await fetch(`http://localhost:5000/api/progress/${userId}/${cursoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: newProgress, checkbox: updatedVideos }),
      });
    } catch (error) {
      console.error("Erro ao salvar progresso no banco de dados", error);
    }
  };

  const toggleChapter = (chapterNumber) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterNumber]: !prev[chapterNumber],
    }));
  };

  // render com index global linear
  let globalIndex = 0;

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

          {chapters.map((chapter) => (
            <Chapter key={chapter.id}>
              <h2
                onClick={() => toggleChapter(chapter.id)}
                style={{ cursor: "pointer" }}
              >
                {chapter.title} {openChapters[chapter.id] ? "▼" : "▶"}
              </h2>

              {openChapters[chapter.id] &&
                chapter.items.map(({ label, src }) => {
                  const idx = globalIndex++;
                  const checked = watchedVideos[idx] || false;
                  return (
                    <div key={idx}>
                      <SubTitle>{label}</SubTitle>
                      <VideoSection>
                        <video controls>
                          <source src={src} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <Checkbox>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(idx)}
                          />
                          <label>Assistido</label>
                        </Checkbox>
                      </VideoSection>
                    </div>
                  );
                })}
            </Chapter>
          ))}
        </ContentContainer>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default MasculinoAvancado;