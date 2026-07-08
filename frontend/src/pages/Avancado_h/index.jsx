import { useEffect, useMemo, useState } from "react";
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

const STORAGE_VIDEOS = "watchedVideosIniciante";
const STORAGE_PROGRESS = "progressIniciante";
const LOCK_LAST = 3; // bloquear as 3 últimas sessões

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
      { label: "Exercício 10: Tríceps Pulley Unilateral - Crossover - Corda - Polia Alta (4x - 10)", src: "/videos/Tríceps_Unilateral_Pulley_Crossover.mp4" },
      { label: "Exercício 11: Flexão Plantar - Smith (4x - 20)", src: "video2.mp4" },
      { label: "Exercício 12: Esteira - Bike - Aeróbico (1x - 20min)", src: "video2.mp4" },
    ],
  },
  {
    id: 2,
    title: "Sessão B",
    items: [
      { label: "BLOQUEADO!", src: "video4.mp4" },
    ],
  },
  {
    id: 3,
    title: "Sessão C",
    items: [
      { label: "BLOQUEADO!", src: "video4.mp4" },
    ],
  },
  {
    id: 4,
    title: "Sessão D",
    items: [
      { label: "BLOQUEADO!", src: "video4.mp4" },
    ],
  },
];

const totalVideos = chapters.reduce((sum, c) => sum + c.items.length, 0);
const initialOpen = Object.fromEntries(chapters.map((c, i) => [c.id, i === 0]));

const Iniciante = () => {
  const [watchedVideos, setWatchedVideos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_VIDEOS));
    const base = Array(totalVideos).fill(false);
    if (Array.isArray(saved)) {
      return base.map((_, i) => Boolean(saved[i]));
    }
    return base;
  });

  const [openChapters, setOpenChapters] = useState(initialOpen);
  const [message, setMessage] = useState("");

  // Progresso só sobre sessões desbloqueadas
  const progress = useMemo(() => {
    let idx = 0, unlockedCount = 0, unlockedWatched = 0;
    chapters.forEach((ch, ci) => {
      const locked = ci >= chapters.length - LOCK_LAST;
      ch.items.forEach(() => {
        if (!locked) {
          unlockedCount++;
          if (watchedVideos[idx]) unlockedWatched++;
        }
        idx++;
      });
    });
    return unlockedCount ? (unlockedWatched / unlockedCount) * 100 : 0;
  }, [watchedVideos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_VIDEOS, JSON.stringify(watchedVideos));
    localStorage.setItem(STORAGE_PROGRESS, String(progress));
  }, [watchedVideos, progress]);

  // Exibir aviso após 4s e ocultar 4s depois
useEffect(() => {
  const SHOW_DELAY_MS = 4000;   // quando começar a mostrar
  const VISIBLE_MS    = 4000;   // quanto tempo fica visível

  const showTimer = setTimeout(() => {
    setMessage("As três últimas sessões estão bloqueadas. Faça a assinatura para desbloquear.");
  }, SHOW_DELAY_MS);

  const hideTimer = setTimeout(() => {
    setMessage("");
  }, SHOW_DELAY_MS + VISIBLE_MS);

  return () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  };
}, []);

  const toggleChapter = (id) =>
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleVideo = (index, disabled) => {
    if (disabled) return;
    setWatchedVideos((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

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

          {message && (
            <Message>
              <div>{message}</div>
            </Message>
          )}


          {chapters.map((chapter, ci) => {
            const locked = ci >= chapters.length - LOCK_LAST;
            return (
              <Chapter key={chapter.id} data-locked={locked}>
                <h2
                  onClick={() => toggleChapter(chapter.id)}
                  style={{ cursor: "pointer" }}
                  title={locked ? "Sessão bloqueada" : undefined}
                >
                  {chapter.title} {locked ? "🔒" : ""}{" "}
                  {openChapters[chapter.id] ? "▼" : "▶"}
                </h2>

                {openChapters[chapter.id] &&
                  chapter.items.map(({ label, src }) => {
                    const idx = globalIndex++;
                    const checked = watchedVideos[idx] || false;
                    return (
                      <div key={idx}>
                        <SubTitle>{label}</SubTitle>
                        <VideoSection style={locked ? { opacity: 0.5 } : undefined}>
                          <video controls={!locked}>
                            {!locked && <source src={src} type="video/mp4" />}
                            Seu navegador não suporta o elemento de vídeo.
                          </video>
                          <Checkbox>
                            <input
                              type="checkbox"
                              disabled={locked}
                              checked={checked}
                              onChange={() => toggleVideo(idx, locked)}
                            />
                            <label>{locked ? "Bloqueado" : "Assistido"}</label>
                          </Checkbox>
                        </VideoSection>
                      </div>
                    );
                  })}
              </Chapter>
            );
          })}
        </ContentContainer>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Iniciante;
