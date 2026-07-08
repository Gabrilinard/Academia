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
      {label: "Exercício 1: Agachamento - Barra - Livre (3x - 15/12/10) OBS: Progredindo Carga", src: "video1.mp4",},
      {label: "Exercício 2: Passada - Sem Carga (3x - 30)", src: "video2.mp4",},
      {label: "Exercício 3: Leg Press Horizontal - Unilateral - Máquina Articulada (3x - 10)", src: "video2.mp4",},
      {label: "Exercício 4: Leg Press 45° - Máquina Articulada - Unilateral (3x - 15/12/10) OBS: Progredindo carga", src: "video2.mp4",},
      {label: "Exercício 5: Agachamento Sumo - Halter (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 6: Cadeira Extensora - Biarticulada - Unilateral (3x - 10 + 10 + 10) OBS: Dropset", src: "video2.mp4",},
      {label: "Exercício 7: Adutor - Cadeira Articulada (3x - 15)", src: "video2.mp4",},
      {label: "Exercício 8: Abdominal Infra - Alternado (4x - 15)", src: "video2.mp4",},
    ],
  },
  {
    id: 2,
    title: "Sessão B",
    items: [
      {label: "Exercício 1: Supino Inclinado - Máquina Articulada (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 2: Crucifixo - Peck Deck (3x - 15)", src: "video2.mp4",},
      {label: "Exercício 3: Supino Reto - Halter - Banco (3x - 15)", src: "video2.mp4",},
      {label: "Exercício 4: Desenvolvimento - Halter - Sentado no Banco (4x - 12 + 15 + 20)", src: "video2.mp4",},
      {label: "Exercício 5: Elevação Lateral - Halter (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 6: Elevação Frontal - Halter (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 7: Tríceps Crossover - Pegada Inversa - Polia Alta (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 8: Tríceps Testa Crossover - Barra- Polia Alta (3x - 12)", src: "video2.mp4",},
      {label: "Exercício 9: Tríceps Pulley Unilateral - Crossover - Corda - Polia Alta (3x - 10)", src: "video2.mp4",},
      {label: "Exercício 10: Flexão Plantar - Smith (4x - 20)", src: "video2.mp4",},
      {label: "Exercício 11: Esteira - Bike - Aeróbico (1x - 20min)", src: "video2.mp4",},
    ],
  },
  {
    id: 3,
    title: "Sessão C",
    items: [
      { label: "Exercício 1: Abdutor - Cadeira Articulada (4x - 12 + 15 + 20) OBS: Drop set", src: "video3.mp4" },
      { label: "Exercício 2: Stiff - Barra (4x - 12)", src: "video4.mp4" },
      { label: "Exercício 3: Agachamento Bulgaro - Duplo Halter - Banco - Pé Anterior (3x - 10)", src: "video4.mp4" },
      { label: "Exercício 4: Extensão de Quadril Crossover - Unilateral - Perna Estendida (3x - 15)", src: "video4.mp4" },
      { label: "Exercício 5: Cadeira Flexora - Máquina Articulada (3x - 6 + 8 + 10 + 12) OBS: Drop set", src: "video4.mp4" },
      { label: "Exercício 6: Flexora - Mesa/Cama Articulada (4x - 15) OBS: 10s de Isometria no final", src: "video4.mp4" },
      { label: "Exercício 7: Hiperextensão Lombar - Aparelho (4x - 10) OBS: Na Mesa Flexora", src: "video4.mp4" },
      { label: "Exercício 8: Flexora Em Pé - Unilateral - Máquina Articulada (4x - 12) OBS: 5s de Isometria no final", src: "video4.mp4" },
      { label: "Exercício 9: Esteira - Bike - Aeróbico (1x - 15min)", src: "video4.mp4" },
    ],
  },
  {
    id: 4,
    title: "Sessão D",
    items: [
      { label: "Exercício 1: Puxada Aberta - Pronada (3x - 12)", src: "video3.mp4" },
      { label: "Exercício 2: Remada Curvada - Barra - Supinada (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 3: Remada Baixa - Máquina Articulada - Pegada Pronada (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 4: Pulldown - Corda - Polia Alta (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 5: Remada Cavalinho - Máquina - Neutra (4x - 12) OBS: Livre", src: "video4.mp4" },
      { label: "Exercício 6: Remada Alta - Barra - Polia Baixa (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 7: Rosca Direta - Crossover - Barra - Polia Baixa - Em Pé (3x - 12) OBS: Drop set", src: "video4.mp4" },
      { label: "Exercício 8: Rosca Alternada - Halteres - Em Pé (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 9: Rosca Martelo - Duplo Halter - Banco Inclinado (3x - 12)", src: "video4.mp4" },
      { label: "Exercício 10: Flexão Plantar - Máquina (4x - 20)", src: "video4.mp4" },
      { label: "Exercício 11: Esteira - Bike - Aeróbico (2x - 15min)", src: "video4.mp4" },
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
      <Title>Curso Avançado Feminino</Title>

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