// style.js
import styled from "styled-components";

/* AVISO CENTRAL */
export const Message = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.4);
  }

  > div {
    position: relative;
    background: rgba(0,0,0,.85);
    color: #fff;
    padding: 16px 20px;
    border-radius: 12px;
    width: min(90vw, 420px);
    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,.35);
  }
`;

/* CONTAINER PÁGINA */
export const Container = styled.div`
  background-color: rgb(227, 228, 222);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Helvetica Neue", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* TÍTULOS */
export const Title_2 = styled.h3`
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  font-weight: 700;
  color: #444;
  margin: 10px 0 0;
  text-align: left;
  letter-spacing: .5px;
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: clamp(1.4rem, 4.5vw, 2.2rem);
  margin: 20px auto 10px;
  color: #333;
  text-align: center;
  padding: 0 12px;
`;

export const SubTitle = styled.h2`
  font-weight: 700;
  font-size: clamp(1rem, 3.6vw, 1.4rem);
  color: #222;
  margin: 14px 0 10px;
`;

/* LAYOUT PRINCIPAL */
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;

/* PROGRESSO */
export const ProgressBar = styled.div`
  width: 100%;
  max-width: 720px;
  height: 28px;
  background-color: #6a6868;
  border-radius: 999px;
  margin: 16px auto 24px;
  position: relative;
  overflow: hidden;

  .progress-bar-green {
    width: ${(p) => p.progress}%;
    height: 100%;
    background-color: #28a745;
    transition: width 0.4s ease;
  }

  span {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 800;
    font-size: clamp(0.9rem, 2.8vw, 1rem);
    text-shadow: 0 1px 2px rgba(0,0,0,.35);
  }
`;

/* CAPÍTULOS */
export const Chapter = styled.div`
  background: #fff;
  padding: clamp(14px, 3vw, 20px);
  margin: 16px auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,.08);
  width: 100%;
  max-width: 900px;

  h2 {
    font-weight: 800;
    font-size: clamp(1.05rem, 3.8vw, 1.4rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    padding: 6px 0;
  }
`;

/* SEÇÃO DE VÍDEO + CHECK */
export const VideoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 12px 16px;
  margin-bottom: 18px;

  /* Empilha em telas pequenas */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  /* vídeo responsivo 16:9 */
  video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    background: #000;
  }
`;

/* CHECKBOX ACESSÍVEL (TOUCH-FRIENDLY) */
export const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #f8f8f8;

  input[type="checkbox"] {
    appearance: none;
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    border-radius: 6px;
    border: 2px solid #007bff;
    background: #fff;
    display: grid;
    place-items: center;
    transition: all .15s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background: #007bff;
    border-color: #007bff;
  }

  input[type="checkbox"]:checked::before {
    content: "✓";
    color: #fff;
    font-weight: 900;
    font-size: 14px;
    line-height: 1;
  }

  span, label {
    font-size: clamp(0.95rem, 2.8vw, 1rem);
    color: #222;
  }
`;

/* OPCIONAIS QUE VOCÊ TINHA (AJUSTADOS) */
export const Container_2 = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 20px);
  text-align: left;
  flex-wrap: wrap;
`;

/* (Se usar esses botões em outra tela, já ficam responsivos) */
export const ChangeVideoButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(0.9rem, 3vw, 1rem);
  transition: filter .2s;
  &:hover { filter: brightness(.95); }
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(0.9rem, 3vw, 1rem);
  transition: filter .2s;
  &:hover { filter: brightness(.95); }
`;