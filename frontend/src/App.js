import React, { useState } from 'react';

import { Grid } from './components/Grid';

import { Container } from './styles';

function App() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [airports, setAirports] = useState(3);
  const [clouds, setClouds] = useState(4);

  return (
    <Container>
      <form>
        <div>
          <label htmlFor="airports">Airports</label>
          <input
            id="airports"
            type="number"
            min={3}
            value={airports}
            onChange={(e) =>
              setAirports(e.target.value < 3 ? 3 : e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="clouds">Clouds</label>
          <input
            id="clouds"
            type="number"
            min={4}
            value={clouds}
            onChange={(e) => setClouds(e.target.value < 4 ? 4 : e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="rows">Rows</label>
          <input
            id="rows"
            type="number"
            min={10}
            value={rows}
            onChange={(e) => setRows(e.target.value < 10 ? 10 : e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="columns">Columns</label>
          <input
            id="columns"
            type="number"
            min={10}
            value={columns}
            onChange={(e) =>
              setColumns(e.target.value < 10 ? 10 : e.target.value)
            }
          />
        </div>
      </form>

      <Grid {...{ rows, columns, airports, clouds }} />
    </Container>
  );
}

export default App;
