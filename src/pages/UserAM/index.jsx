import { useEffect,  useState } from "react";
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
      { label: "Exercício 1: Crucifixo - Peck Deck (3x - 8 + 10 + 12) OBS: Drop set", src: "video1.mp4" },
      { label: "Exercício 2: Supino - Halter - Banco Inclinado (4x - 12)", src: "video1.mp4" },
      { label: "Exercício 3: Supino Reto - Barra (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 4: Crucifixo - Halter - Banco Reto (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 5: Desenvolvimento - Halter - Sentado no Banco (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 6: Elevação Frontal - Halter (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 7: Elevação Lateral - Halter - Unilateral Tronco Inclinado (3x - 10)", src: "video2.mp4" },
      { label: "Exercício 8: Tríceps Pulley - Crossover - Barra - Polia Alta (4x - 12)", src: "video2.mp4" },
      { label: "Exercício 9: Tríceps Testa Crossover - Barra - Polia Alta (3x - 15)", src: "video2.mp4" },
      { label: "Exercício 10: Tríceps Pulley Unilateral - Crossover - Corda - Polia Alta (4x - 10)", src: "video2.mp4" },
      { label: "Exercício 11: Flexão Plantar - Smith (4x - 20)", src: "video2.mp4" },
      { label: "Exercício 12: Esteira - Bike - Aeróbico (1x - 20min)", src: "video2.mp4" },
    ],
  },
  {
    id: 2,
    title: "Sessão B",
    items: [
      {label: "Exercício 1: Afundo no Smith - Step - Pé Anterior (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 2: Abdutor - Cadeira Articulada (4x - 12 + 15 + 20) OBS: Drop set", src: "video2.mp4",},
      {label: "Exercício 3: Levantamento Terra - Barra - Estilo Sumô (4x - 12)", src: "video2.mp4",},
      {label: "Exercício 4: Elevação Pélvica - Barra - Banco (3x - 10 + 10) OBS: 10 curta", src: "video2.mp4",},
      {label: "Exercício 5: Flexora - Mesa/Cama Articulada (4x - 15) OBS: 10 seg de Isometria no final", src: "video2.mp4",},
      {label: "Exercício 6: Stiff - Duplo Halter (4x - 15)", src: "video2.mp4",},
      {label: "Exercício 7: Cadeira Flexora - Máquina Articulada (3x - 8 + 10 + 20) OBS: Drop set", src: "video2.mp4",},
      {label: "Exercício 8: Flexora Em Pé - Unilateral - Máquina Articulada (4x - 12) OBS: 5s de Isometria no final", src: "video2.mp4",},
      {label: "Exercício 9: Esteira - Bike - Aeróbico (1x - 15min)", src: "video2.mp4",},
    ],
  },
  {
    id: 3,
    title: "Sessão C",
    items: [
      { label: "Exercício 1: Puxada Aberta - Pronada (4x - 12)", src: "video3.mp4" },
      { label: "Exercício 2: Puxada - Triângulo - Neutra (4x - 12)", src: "video4.mp4" },
      { label: "Exercício 3: Remada Baixa - Barra Reta (3x - 8 + 10 + 12) OBS: Drop Set (pegada supinada)", src: "video4.mp4" },
      { label: "Exercício 4: Remada Baixa - Máquina Articulada - Pegada Neutra (3x - 15)", src: "video4.mp4" },
      { label: "Exercício 5: Remada Curvada - Barra - Supinada (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 6: Remada Alta - Barra - Polia Baixa (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 7: Rosca Scott - Pegada Supinada - Máquina Articulada (3x - 10)", src: "video4.mp4" },
      { label: "Exercício 8: Rosca Alternada - Halteres - Em Pé (3x - 10)", src: "video4.mp4" },
      { label: "Exercício 9: Rosca Direta - Barra W - Em Pé (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 10: Rosca Martelo - Duplo Halter - Em pé (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 11: Flexão Plantar - Máquina (4x - 20)", src: "video4.mp4" },
      { label: "Exercício 12: Esteira - Bike - Aeróbico (2x - 15min)", src: "video4.mp4" },
    ],
  },
  {
    id: 4,
    title: "Sessão D",
    items: [
      { label: "Exercício 1: Agachamento - Barra - Livre (4x - 20/15/12/10) OBS: Progredindo carga", src: "video3.mp4" },
      { label: "Exercício 2: Agachamento Sumo - Halter - Step Em V (4x - 15) OBS: Curtinha", src: "video4.mp4" },
      { label: "Exercício 3: Leg Press Horizontal - Máquina Articulada (8x - 10) OBS: Rest pause 10s", src: "video4.mp4" },
      { label: "Exercício 4: Leg Press 45° - Máquina Articulada (4x - 20/15/12/10) OBS: Progredindo carga", src: "video4.mp4" },
      { label: "Exercício 5: Passada - Duplo Halter (4x - 20)", src: "video4.mp4" },
      { label: "Exercício 6: Agachamento - Duplo Halter - Base de Ombros (4x - 12)", src: "video4.mp4" },
      { label: "Exercício 7: Cadeira Extensora - Biarticulada - Unilateral (3x - 10 + 12 + 15) OBS: Drop set", src: "video4.mp4" },
      { label: "Exercício 8: Adutor - Cadeira Articulada (4x - 15)", src: "video4.mp4" },
      { label: "Exercício 9: Abdominal Infra - Alternado (4x - 15)", src: "video4.mp4" },
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
      <Title>Curso Avançado Masculino</Title>

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