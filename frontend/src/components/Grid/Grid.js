import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAirplanemodeActive,
  MdAirplanemodeInactive,
  MdCloud,
  MdWbSunny,
} from 'react-icons/md';

import { Container, Content, Header, InfoDays, Buttons } from './styles';

import api from '../../services/api';

function Grid({ rows, columns, airports: numAirports, clouds: numClouds }) {
  const [grid, setGrid] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [airports, setAirports] = useState([]);
  const [cloudsAirports, setCloudsAirports] = useState([]);
  const [day, setDay] = useState(0);
  const [firstDayFound, setFirstDayFound] = useState(0);
  const [lastDayFound, setLastDayFound] = useState(0);

  const handleNextDay = useCallback(() => {
    api.get('/next').then((response) => {
      const {
        clouds: cloudsResponse,
        airports: airportsResponse,
        day: dayResponse,
        first_day_airport_cloud,
        last_day_airport_cloud,
        clouds_airports,
      } = response.data;

      setClouds(cloudsResponse);
      setAirports(airportsResponse);
      setDay(dayResponse);
      setFirstDayFound(first_day_airport_cloud);
      setLastDayFound(last_day_airport_cloud);
      setCloudsAirports(clouds_airports);
    });
  }, []);

  const handleClearWeather = useCallback(() => {
    setGrid([]);
    setClouds([]);
    setAirports([]);
    setCloudsAirports([]);
    setDay(0);
    setFirstDayFound(0);
    setLastDayFound(0);

    api
      .get('/', {
        params: {
          airports: numAirports,
          clouds: numClouds,
          rows,
          columns,
        },
      })
      .then((response) => {
        const {
          grid: gridResponse,
          clouds: cloudsResponse,
          airports: airportsResponse,
          day: dayResponse,
        } = response.data;

        setGrid(gridResponse);
        setClouds(cloudsResponse);
        setAirports(airportsResponse);
        setDay(dayResponse);
      });
  }, [columns, numAirports, numClouds, rows]);

  useEffect(() => {
    handleClearWeather();
  }, [handleClearWeather]);

  useEffect(() => {
    const intVal = setInterval(() => {
      if (!lastDayFound) {
        api.get('/next').then((response) => {
          const {
            clouds: cloudsResponse,
            airports: airportsResponse,
            day: dayResponse,
            first_day_airport_cloud,
            last_day_airport_cloud,
            clouds_airports,
          } = response.data;

          setClouds(cloudsResponse);
          setAirports(airportsResponse);
          setDay(dayResponse);
          setFirstDayFound(first_day_airport_cloud);
          setLastDayFound(last_day_airport_cloud);
          setCloudsAirports(clouds_airports);
        });
      }
    }, 1000);

    return () => clearInterval(intVal);
  }, [lastDayFound]);

  return (
    <Container>
      <Header>
        <InfoDays>
          <span>Primeiro aeroporto atingindo em {firstDayFound} dia</span>
          <span>Todos os aeroportos atingindo em {lastDayFound} dia</span>
        </InfoDays>

        <span>{day} dia</span>

        <Buttons>
          <button type="button" onClick={handleNextDay}>
            Próximo dia
          </button>

          <button type="button" onClick={handleClearWeather}>
            Limpar tempo
          </button>
        </Buttons>
      </Header>

      <Content {...{ rows, columns }}>
        {grid.map((g) => (
          <li key={Math.random().toString(16).substring(2, 15)}>
            <button type="button">
              {!!cloudsAirports.find(
                (cap) => cap.x === g.x && cap.y === g.y
              ) ? (
                <MdAirplanemodeInactive size={24} color="#DF4723" />
              ) : !!clouds.find((c) => c.x === g.x && c.y === g.y) ? (
                <MdCloud size={24} color="#0c0d34" />
              ) : !!airports.find((a) => a.x === g.x && a.y === g.y) ? (
                <MdAirplanemodeActive size={24} color="#00FF00" />
              ) : (
                <MdWbSunny size={24} color="#FDB813" />
              )}
            </button>
          </li>
        ))}
      </Content>
    </Container>
  );
}

export default Grid;
