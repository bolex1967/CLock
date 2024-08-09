document.addEventListener("DOMContentLoaded", function () {
  const clockFace = document.getElementById("clockFace");

  // Змінні для секторів часу
  let nightStart = 21;
  let nightEnd = 23;
  let morningStart = 5;
  let morningEnd = 9;
  let dayStart = 12;
  let dayEnd = 15;
  let eveningStart = 18;
  let eveningEnd = 21;

  // Змінні для кольорів секторів
  const nightColor = "#6f9faf"; // Темно-сірий для ночі
  const morningColor = "#d3d3d3"; // Світло-сірий для ранку
  const dayColor = "#ffffe0"; // Світлий для денного часу
  const eveningColor = "#d3d3d3"; // Світло-сірий для вечора

  // Створення секторів дня та ночі
  const nightSector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  nightSector.setAttribute(
    "d",
    describeArc(200, 200, 180, getAngle(nightStart), getAngle(nightEnd))
  );
  nightSector.setAttribute("fill", nightColor);

  const morningSector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  morningSector.setAttribute(
    "d",
    describeArc(200, 200, 180, getAngle(morningStart), getAngle(morningEnd))
  );
  morningSector.setAttribute("fill", morningColor);

  const daySector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  daySector.setAttribute(
    "d",
    describeArc(200, 200, 180, getAngle(dayStart), getAngle(dayEnd))
  );
  daySector.setAttribute("fill", dayColor);

  const eveningSector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  eveningSector.setAttribute(
    "d",
    describeArc(200, 200, 180, getAngle(eveningStart), getAngle(eveningEnd))
  );
  eveningSector.setAttribute("fill", eveningColor);

  clockFace.appendChild(nightSector);
  clockFace.appendChild(morningSector);
  clockFace.appendChild(daySector);
  clockFace.appendChild(eveningSector);

  // Створення стрілок годинника
  const hourHand = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  const minuteHand = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  const secondHand = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );

  // Властивості годинної стрілки
  hourHand.setAttribute("x1", "200");
  hourHand.setAttribute("y1", "200");
  hourHand.setAttribute("x2", "200");
  hourHand.setAttribute("y2", "80");
  hourHand.setAttribute("stroke", "#000");
  hourHand.setAttribute("stroke-width", "4");
  hourHand.setAttribute("id", "hourHand");

  // Властивості хвилинної стрілки
  minuteHand.setAttribute("x1", "200");
  minuteHand.setAttribute("y1", "200");
  minuteHand.setAttribute("x2", "200");
  minuteHand.setAttribute("y2", "50");
  minuteHand.setAttribute("stroke", "#000");
  minuteHand.setAttribute("stroke-width", "2");
  minuteHand.setAttribute("id", "minuteHand");

  // Властивості секундної стрілки
  secondHand.setAttribute("x1", "200");
  secondHand.setAttribute("y1", "200");
  secondHand.setAttribute("x2", "200");
  secondHand.setAttribute("y2", "30");
  secondHand.setAttribute("stroke", "#ff0000");
  secondHand.setAttribute("stroke-width", "1");
  secondHand.setAttribute("id", "secondHand");

  clockFace.appendChild(hourHand);
  clockFace.appendChild(minuteHand);
  clockFace.appendChild(secondHand);

  // Додавання точок і цифр на циферблат
  for (let i = 0; i < 24; i++) {
    // Кут для кожної години
    const angle = ((i + 12) % 24) * 15; // Зсув на 12 годин для переміщення 00:00 вниз
    const x = 200 + 124 * Math.cos(((angle - 90) * Math.PI) / 180);
    const y = 200 + 124 * Math.sin(((angle - 90) * Math.PI) / 180);

    const dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", "3");
    dot.setAttribute("fill", "#000");

    clockFace.appendChild(dot);

    // Додавання цифр на циферблат
    const numX = 200 + 142 * Math.cos(((angle - 90) * Math.PI) / 180);
    const numY = 200 + 142 * Math.sin(((angle - 90) * Math.PI) / 180);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", numX);
    text.setAttribute("y", numY);
    text.setAttribute("fill", "#000");
    text.setAttribute("font-size", "24");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = i;

    clockFace.appendChild(text);
  }

  // Додавання хвилинних та секундних поділок
  for (let i = 0; i < 60; i++) {
    const angle = i * 6; // Кут для кожної хвилини/секунди
    const outerRadius = 184;
    const innerRadius = i % 5 === 0 ? 174 : 180; // Кожна п'ята поділка буде довшою

    const x1 = 200 + outerRadius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y1 = 200 + outerRadius * Math.sin(((angle - 90) * Math.PI) / 180);
    const x2 = 200 + innerRadius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y2 = 200 + innerRadius * Math.sin(((angle - 90) * Math.PI) / 180);

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
    tick.setAttribute("x1", x1);
    tick.setAttribute("y1", y1);
    tick.setAttribute("x2", x2);
    tick.setAttribute("y2", y2);
    tick.setAttribute("stroke", "#000");
    tick.setAttribute("stroke-width", "2");

    clockFace.appendChild(tick);

    // Додавання цифр на циферблат (для хвилин і секунд)
    const numX = 200 + 163 * Math.cos(((angle - 90) * Math.PI) / 180);
    const numY = 200 + 163 * Math.sin(((angle - 90) * Math.PI) / 180);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", numX);
    text.setAttribute("y", numY);
    text.setAttribute("fill", "#000");
    text.setAttribute("font-size", "10");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = i;

    clockFace.appendChild(text);
  }

  // Функція для створення арки (дуги) в SVG
  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      x,
      y,
      "L",
      start.x,
      start.y,
    ].join(" ");

    return d;
  }

  // Функція для перетворення полярних координат в декартові
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  // Оновлення положення стрілок годинника щосекунди
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Обчислення кутів для стрілок
    const hourDegree = ((hours + 12) % 24) * 15 + (minutes / 60) * 15; // Зсув на 12 годин для переміщення 00:00 вниз
    const minuteDegree = minutes * 6 + (seconds / 60) * 6;
    const secondDegree = seconds * 6;

    // Встановлення кутів для стрілок
    hourHand.setAttribute("transform", `rotate(${hourDegree}, 200, 200)`);
    minuteHand.setAttribute("transform", `rotate(${minuteDegree}, 200, 200)`);
    secondHand.setAttribute("transform", `rotate(${secondDegree}, 200, 200)`);
  }

  // Функція для обчислення кута для годинника
  // function getAngle(hour) {
  //   return ((hour + 12) % 24) * 15; // Зсув на 12 годин для переміщення 00:00 вниз
  // }

  // Функція для обчислення кута для годинника
  function getAngle(time) {
    // Враховуємо час в годинах з комами, перетворюючи 24-годинну шкалу в 100 одиниць
    // Зсуваємо на 12 годин для переміщення 00:00 вниз
    return ((time + 12) % 24) * 15; // 24 години -> 360 градусів
  }

  // Функція для отримання даних з API
  function updateSectorsFromAPI() {
    // Тут слід виконати запит до API і оновити змінні
    // Приклад:
    // fetch('your-api-url')
    //     .then(response => response.json())
    //     .then(data => {
    //         nightStart = data.nightStart;
    //         nightEnd = data.nightEnd;
    //         morningStart = data.morningStart;
    //         morningEnd = data.morningEnd;
    //         dayStart = data.dayStart;
    //         dayEnd = data.dayEnd;
    //         eveningStart = data.eveningStart;
    //         eveningEnd = data.eveningEnd;
    //         updateSectors();
    //     });

    // Тимчасово оновимо сектор для демонстрації
    nightStart = 21 + 15 / 60;
    nightEnd = 5 + 27 / 60;
    morningStart = 5 + 27 / 60;
    morningEnd = 6 + 3 / 60;
    dayStart = 6 + 3 / 60;
    dayEnd = 20 + 40 / 60;
    eveningStart = 20 + 40 / 60;
    eveningEnd = 21 + 15 / 60;
    updateSectors();
  }

  // Функція для оновлення секторів часу
  function updateSectors() {
    nightSector.setAttribute(
      "d",
      describeArc(200, 200, 155, getAngle(nightStart), getAngle(nightEnd))
    );
    morningSector.setAttribute(
      "d",
      describeArc(200, 200, 155, getAngle(morningStart), getAngle(morningEnd))
    );
    daySector.setAttribute(
      "d",
      describeArc(200, 200, 155, getAngle(dayStart), getAngle(dayEnd))
    );
    eveningSector.setAttribute(
      "d",
      describeArc(200, 200, 155, getAngle(eveningStart), getAngle(eveningEnd))
    );
  }

  // Оновлення секторів з API при завантаженні сторінки
  updateSectorsFromAPI();

  // Оновлення стрілок щосекунди
  setInterval(updateClock, 1000);
  updateClock();
});
