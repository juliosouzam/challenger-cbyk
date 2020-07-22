"use strict";

module.exports = function (router) {
  const model = {
    airports: 0,
    clouds: 0,
    rows: 0,
    columns: 0,
    grid: [],
    clouds_position: [],
    airports_position: [],
    clouds_airports_position: [],
    day: 0,
    first_day_airport_cloud: 0,
    last_day_airport_cloud: 0,
  };

  router.get("/", function (req, res) {
    const { airports, clouds, rows, columns } = req.query;
    model.airports = airports;
    model.clouds = clouds;
    model.rows = rows;
    model.columns = columns;
    model.grid = [];
    model.clouds_position = [];
    model.airports_position = [];
    model.clouds_airports_position = [];
    model.day = 0;
    model.first_day_airport_cloud = 0;
    model.last_day_airport_cloud = 0;

    Array(Number(rows))
      .fill()
      .forEach((r, i) => {
        Array(Number(columns))
          .fill()
          .forEach((j, k) => {
            model.grid.push({ x: i, y: k });
          });
      });

    Array(Number(airports))
      .fill()
      .forEach((a, i) => {
        const xa = Math.floor(Math.random() * rows) + 0;
        const ya = Math.floor(Math.random() * columns) + 0;

        model.airports_position[i] = { x: xa, y: ya };
      });

    Array(Number(clouds))
      .fill()
      .forEach((c, i) => {
        let equals = true;

        while (equals) {
          const xc = Math.floor(Math.random() * rows) + 0;
          const yc = Math.floor(Math.random() * columns) + 0;

          equals = !!model.airports_position.filter(
            (a) => a.x === xc && a.y === yc
          ).length;

          if (!equals) {
            model.clouds_position[i] = { x: xc, y: yc };
          }
        }
      });

    model.day = 1;

    return res.json({
      grid: model.grid,
      airports: model.airports_position,
      clouds: model.clouds_position,
      day: model.day,
    });
  });

  router.get("/next", function (req, res) {
    const day = model.day + 1;
    model.day = day;

    model.clouds_position.map((cp) => {
      const findedAddX = model.grid.find(
        (g) => g.x === cp.x + 1 && g.y === cp.y
      );

      if (findedAddX) {
        const capFinded = model.clouds_position.find(
          (cap) => cap.x === cp.x + 1 && cap.y === cp.y
        );

        if (!capFinded) {
          model.clouds_position.push({ x: cp.x + 1, y: cp.y });
        }

        const clouds_airport = model.airports_position.find(
          (ap) => ap.x === findedAddX.x && ap.y === findedAddX.y
        );

        if (clouds_airport) {
          const capFinded = model.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFinded) {
            model.clouds_airports_position.push(clouds_airport);
          }

          model.first_day_airport_cloud = model.first_day_airport_cloud || day;
        }
      }

      const findedAddY = model.grid.find(
        (g) => g.x === cp.x && g.y === cp.y + 1
      );

      if (findedAddY) {
        const capFinded = model.clouds_position.find(
          (cap) => cap.x === cp.x && cap.y === cp.y + 1
        );

        if (!capFinded) {
          model.clouds_position.push({ x: cp.x, y: cp.y + 1 });
        }

        const clouds_airport = model.airports_position.find(
          (ap) => ap.x === findedAddY.x && ap.y === findedAddY.y
        );

        if (clouds_airport) {
          const capFinded = model.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFinded) {
            model.clouds_airports_position.push(clouds_airport);
          }

          model.first_day_airport_cloud = model.first_day_airport_cloud || day;
        }
      }

      const findedSubX = model.grid.find(
        (g) => g.x === cp.x - 1 && g.y === cp.y
      );

      if (findedSubX) {
        const capFinded = model.clouds_position.find(
          (cap) => cap.x === cp.x - 1 && cap.y === cp.y
        );

        if (!capFinded) {
          model.clouds_position.push({ x: cp.x - 1, y: cp.y });
        }

        const clouds_airport = model.airports_position.find(
          (ap) => ap.x === findedSubX.x && ap.y === findedSubX.y
        );

        if (clouds_airport) {
          const capFinded = model.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFinded) {
            model.clouds_airports_position.push(clouds_airport);
          }

          model.first_day_airport_cloud = model.first_day_airport_cloud || day;
        }
      }

      const findedSubY = model.grid.find(
        (g) => g.x === cp.x && g.y === cp.y - 1
      );

      if (findedSubY) {
        const capFinded = model.clouds_position.find(
          (cap) => cap.x === cp.x && cap.y === cp.y - 1
        );

        if (!capFinded) {
          model.clouds_position.push({ x: cp.x, y: cp.y - 1 });
        }

        const clouds_airport = model.airports_position.find(
          (ap) => ap.x === findedSubY.x && ap.y === findedSubY.y
        );

        if (clouds_airport) {
          const capFinded = model.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFinded) {
            model.clouds_airports_position.push(clouds_airport);
          }

          model.first_day_airport_cloud = model.first_day_airport_cloud || day;
        }
      }

      if (
        model.clouds_airports_position.length === model.airports_position.length
      ) {
        model.last_day_airport_cloud = model.last_day_airport_cloud || day;
      }
    });

    return res.json({
      grid: model.grid,
      day: model.day,
      first_day_airport_cloud: model.first_day_airport_cloud,
      last_day_airport_cloud: model.last_day_airport_cloud,
      airports: model.airports_position,
      clouds: model.clouds_position,
      clouds_airports: model.clouds_airports_position,
    });
  });
};
