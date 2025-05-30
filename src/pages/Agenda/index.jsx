import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

// Container principal para envolver toda a página
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

// Estilizando a página e os componentes
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 20px;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-family: 'Merriweather', serif;
  color: #333;
  margin: 0;
`;

const Header = styled.header`
  width: 100%;
  background-color: #4CAF50;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const BackButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const CalendarContainer = styled.div`
  margin-top: 80px;
`;

const ScheduleContainer = styled.div`
  width: 80%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const DaySchedule = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const DayTitle = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
`;

const TimeSlot = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #ddd;
  margin: 5px 0;
  border-radius: 5px;
  background-color: ${props => props.available ? '#f4f4f4' : '#c0c0c0'};
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const AdminScheduler = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({
    Segunda: [
      { time: '08:00', available: true },
      { time: '10:00', available: true },
      { time: '14:00', available: true },
      { time: '16:00', available: false }
    ],
    Terça: [
      { time: '09:00', available: true },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '16:00', available: false }
    ],
    Quarta: [
      { time: '08:00', available: true },
      { time: '13:00', available: true },
      { time: '15:00', available: true },
      { time: '17:00', available: false }
    ],
    Quinta: [
      { time: '10:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false }
    ],
    Sexta: [
      { time: '09:00', available: true },
      { time: '12:00', available: false },
      { time: '16:00', available: true }
    ]
  });

  useEffect(() => {
    const storedSchedule = JSON.parse(localStorage.getItem('teacherSchedule'));
    if (storedSchedule) {
      setSchedule(storedSchedule);
    }
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleToggleAvailability = (day, index) => {
    const newSchedule = { ...schedule };
    newSchedule[day][index].available = !newSchedule[day][index].available;
    setSchedule(newSchedule);
    localStorage.setItem('teacherSchedule', JSON.stringify(newSchedule));
  };
  

  const renderScheduleForDay = (day) => {
    const daySchedule = schedule[day];
    if (!daySchedule) {
      return <p>Nenhum horário agendado para este dia.</p>;
    }
    return daySchedule.map((slot, index) => (
      <TimeSlot 
        key={index} 
        available={slot.available} 
        onClick={() => handleToggleAvailability(day, index)}
      >
        <span>{slot.time}h</span>
        <span>{slot.available ? "Disponível" : "Indisponível"}</span>
      </TimeSlot>
    ));
  };

  const getDayOfWeek = (date) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[date.getDay()];
  };

  const renderWeekSchedule = () => {
    return Object.keys(schedule).map((day) => (
      <DaySchedule key={day}>
        <DayTitle>{day}</DayTitle>
        {renderScheduleForDay(day)}
      </DaySchedule>
    ));
  };

  const handleBackClick = () => {
    navigate('/admindashboard');
  };

  return (
    <Container>
      <Header>
        <Title>Agendamento de Aulas - Administrador</Title>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
      </Header>

      <PageContainer>
        <CalendarContainer>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </CalendarContainer>

        <ScheduleContainer>
          <DaySchedule>
            <DayTitle>{getDayOfWeek(selectedDate)}</DayTitle>
            {renderScheduleForDay(getDayOfWeek(selectedDate))}
          </DaySchedule>

          <Button onClick={() => alert('Horários atualizados!')}>Salvar Alterações</Button>
        </ScheduleContainer>

        <h2>Agenda da Semana</h2>
        <ScheduleContainer>
          {renderWeekSchedule()}
        </ScheduleContainer>
      </PageContainer>
    </Container>
  );
};

export default AdminScheduler;
