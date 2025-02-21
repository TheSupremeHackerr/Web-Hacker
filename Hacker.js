// ==UserScript==
// @name         TheWebChanger
// @namespace    https://violentmonkey.github.io/
// @version      3.0
// @description  Cambia la apariencia de las páginas web con muchas opciones divertidas
// @author       TheSupremeHackerr
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function () {
  const menuId = "webChangerMenu";

  if (document.getElementById(menuId)) {
    alert("El menú ya está activo.");
    return;
  }

  // Crear el contenedor del menú
  const menu = document.createElement("div");
  menu.id = menuId;
  menu.style.position = "fixed";
  menu.style.top = "0";
  menu.style.right = "0";
  menu.style.width = "300px";
  menu.style.height = "100vh";
  menu.style.background = "linear-gradient(135deg, orange, red)";
  menu.style.color = "white";
  menu.style.borderRadius = "0 0 0 15px";
  menu.style.boxShadow = "-2px 0 10px rgba(0, 0, 0, 0.2)";
  menu.style.zIndex = "9999";
  menu.style.fontFamily = "Arial, sans-serif";
  menu.style.overflow = "hidden";
  menu.style.transition = "all 0.3s ease";

  // Estado del idioma
  let idioma = "es";

  // Encabezado del menú
  const header = document.createElement("div");
  header.style.padding = "15px";
  header.style.textAlign = "center";
  header.style.fontSize = "18px";
  header.style.fontWeight = "bold";
  header.style.borderBottom = "2px solid rgba(255, 255, 255, 0.2)";
  header.innerHTML = `<span id='menuTitle'>TheWebChanger 3.0</span> <br><a href='https://github.com/TheSupremeHackerr/Web-Hacker.git' target='_blank' style='color: #ffdd00; text-decoration: none;'>GitHub Repository</a>`;

  menu.appendChild(header);

  // Botón de cambio de idioma
  const languageSwitcher = document.createElement("div");
  languageSwitcher.style.textAlign = "center";
  languageSwitcher.style.margin = "10px 0";
  const esFlag = document.createElement("span");
  esFlag.textContent = "🇪🇸";
  esFlag.style.cursor = "pointer";
  esFlag.onclick = () => changeLanguage("es");
  const enFlag = document.createElement("span");
  enFlag.textContent = "🇬🇧";
  enFlag.style.cursor = "pointer";
  enFlag.onclick = () => changeLanguage("en");
  languageSwitcher.appendChild(esFlag);
  languageSwitcher.appendChild(document.createTextNode(" | "));
  languageSwitcher.appendChild(enFlag);
  menu.appendChild(languageSwitcher);

  // Contenedor de botones
  const buttonContainer = document.createElement("div");
  buttonContainer.style.maxHeight = "calc(100vh - 120px)";
  buttonContainer.style.overflowY = "auto";

  // Definir funciones (antiguas y nuevas)
  const funciones = [
    {
      es: "Cambiar color de fondo",
      en: "Change background color",
      accion: () => {
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      },
    },
    {
      es: "Mostrar confeti",
      en: "Show confetti",
      accion: () => {
        const confettiScript = document.createElement("script");
        confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti";
        confettiScript.onload = () => {
          confetti({ spread: 70, origin: { y: 0.6 } });
        };
        confettiScript.onerror = () => alert("Error al cargar el script de confeti");
        document.body.appendChild(confettiScript);
      },
    },
    {
      es: "Juego: Atrapa el círculo",
      en: "Game: Catch the circle",
      accion: () => {
        const circle = document.createElement("div");
        circle.style.position = "fixed";
        circle.style.top = `${Math.random() * 80 + 10}%`;
        circle.style.left = `${Math.random() * 80 + 10}%`;
        circle.style.width = "50px";
        circle.style.height = "50px";
        circle.style.borderRadius = "50%";
        circle.style.background = "blue";
        circle.style.cursor = "pointer";
        circle.onclick = () => {
          alert(idioma === "es" ? "¡Lo atrapaste!" : "You caught it!");
          circle.remove();
        };
        document.body.appendChild(circle);
      },
    },
    {
      es: "Fuegos artificiales",
      en: "Fireworks",
      accion: () => {
        const fireworkScript = document.createElement("script");
        fireworkScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti";
        fireworkScript.onload = () => {
          confetti({ particleCount: 200, spread: 160 });
        };
        fireworkScript.onerror = () => alert("Error al cargar el script de fuegos artificiales");
        document.body.appendChild(fireworkScript);
      },
    },
    {
      es: "Click aquí",
      en: "Click here",
      accion: () => {
        const rickrollIframe = document.createElement("iframe");
        rickrollIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
        rickrollIframe.style.position = "fixed";
        rickrollIframe.style.top = "50%";
        rickrollIframe.style.left = "50%";
        rickrollIframe.style.transform = "translate(-50%, -50%)";
        rickrollIframe.style.width = "80vw";
        rickrollIframe.style.height = "80vh";
        rickrollIframe.style.border = "none";
        rickrollIframe.style.zIndex = "10000";

        const closeButton = document.createElement("button");
        closeButton.textContent = "Cerrar Rickroll";
        closeButton.style.position = "fixed";
        closeButton.style.top = "10px";
        closeButton.style.right = "10px";
        closeButton.style.zIndex = "10001";
        closeButton.style.padding = "10px";
        closeButton.style.backgroundColor = "red";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = () => {
          rickrollIframe.remove();
          closeButton.remove();
        };

        document.body.appendChild(rickrollIframe);
        document.body.appendChild(closeButton);
      },
    },
    {
      es: "Cambiar tipo de fuente",
      en: "Change font type",
      accion: () => {
        const fonts = ["Arial", "Courier New", "Georgia", "Tahoma", "Verdana", "Comic Sans MS"];
        document.body.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      },
    },
    {
      es: "Modo discoteca",
      en: "Disco mode",
      accion: () => {
        let interval = setInterval(() => {
          document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }, 500);
        setTimeout(() => clearInterval(interval), 10000);
      },
    },
    {
      es: "Juego: Dinosaurio de Google",
      en: "Game: Google Dinosaur",
      accion: () => {
        let dinoGame = document.createElement("iframe");
        dinoGame.src = "https://chromedino.com/";
        dinoGame.style.position = "fixed";
        dinoGame.style.top = "50%";
        dinoGame.style.left = "50%";
        dinoGame.style.transform = "translate(-50%, -50%)";
        dinoGame.style.width = "800px";
        dinoGame.style.height = "400px";
        dinoGame.style.zIndex = "10000";
        dinoGame.style.border = "2px solid #000";
        dinoGame.style.borderRadius = "8px";
        dinoGame.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        document.body.appendChild(dinoGame);

        let closeButton = document.createElement("button");
        closeButton.innerText = "Cerrar Juego";
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "5px";
        closeButton.style.backgroundColor = "#ff4d4d";
        closeButton.style.color = "#fff";
        closeButton.style.border = "none";
        closeButton.style.padding = "5px 10px";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = () => {
          dinoGame.remove();
          closeButton.remove();
        };
        document.body.appendChild(closeButton);
      },
    },

    // Nuevas funciones
    {
      es: "Juego: Adivina el número",
      en: "Game: Guess the number",
      accion: () => {
        const number = Math.floor(Math.random() * 100) + 1;
        const guess = prompt(idioma === "es" ? "Adivina el número entre 1 y 100" : "Guess the number between 1 and 100");
        alert(guess == number ? (idioma === "es" ? "¡Correcto!" : "Correct!") : (idioma === "es" ? `Incorrecto, era ${number}` : `Incorrect, it was ${number}`));
      },
    },
    {
      es: "Mostrar reloj",
      en: "Show clock",
      accion: () => {
        const clock = document.createElement("div");
        clock.style.position = "fixed";
        clock.style.bottom = "20px";
        clock.style.right = "20px";
        clock.style.fontSize = "24px";
        clock.style.fontWeight = "bold";
        clock.style.color = "white";
        clock.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        clock.style.padding = "10px";
        clock.style.borderRadius = "5px";
        clock.style.zIndex = "10000";

        setInterval(() => {
          const date = new Date();
          clock.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }, 1000);

        document.body.appendChild(clock);
      },
    },
    {
      es: "Efecto de lluvia",
      en: "Rain effect",
      accion: () => {
        const rainScript = document.createElement("script");
        rainScript.src = "https://cdn.jsdelivr.net/npm/rainyday.js";
        rainScript.onload = () => {
          const rainyday = new RainyDay();
          rainyday.size(5).effect("rain", document.body);
        };
        rainScript.onerror = () => alert("Error al cargar el efecto de lluvia");
        document.body.appendChild(rainScript);
      },
    },
    {
      es: "Generar código QR",
      en: "Generate QR code",
      accion: () => {
        const url = prompt(idioma === "es" ? "Introduce la URL para generar un código QR" : "Enter the URL to generate a QR code");
        const qrScript = document.createElement("script");
        qrScript.src = "https://cdn.jsdelivr.net/npm/qrcode";
        qrScript.onload = () => {
          const qrContainer = document.createElement("div");
          new QRCode(qrContainer, url);
          qrContainer.style.position = "fixed";
          qrContainer.style.top = "50%";
          qrContainer.style.left = "50%";
          qrContainer.style.transform = "translate(-50%, -50%)";
          qrContainer.style.zIndex = "10000";
          document.body.appendChild(qrContainer);
        };
        qrScript.onerror = () => alert("Error al generar el código QR");
        document.body.appendChild(qrScript);
      },
    },

    // Más funciones...
  ];

  funciones.forEach((funcion) => {
    const button = document.createElement("button");
    button.textContent = idioma === "es" ? funcion.es : funcion.en;
    button.style.display = "block";
    button.style.width = "calc(100% - 20px)";
    button.style.margin = "10px auto";
    button.style.padding = "10px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.background = "#ffffff";
    button.style.color = "#333";
    button.style.cursor = "pointer";
    button.onclick = funcion.accion;
    buttonContainer.appendChild(button);
  });

  menu.appendChild(buttonContainer);
  document.body.appendChild(menu);

  // Cambiar el idioma
  function changeLanguage(newLanguage) {
    idioma = newLanguage;
    document.getElementById("menuTitle").textContent = idioma === "es" ? "TheWebChanger 3.0" : "TheWebChanger 3.0";
    const buttons = document.querySelectorAll(`#${menuId} button`);
    buttons.forEach((button, index) => {
      button.textContent = idioma === "es" ? funciones[index].es : funciones[index].en;
    });
  }
})();
