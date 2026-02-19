const info = document.querySelector("#info");
const panelInfo = document.querySelector("#panelInfo");
const marker = document.querySelector("a-marker a-entity");

function efectoClick(boton) {
  boton.setAttribute(
    "animation",
    "property: scale; to: 1.15 1.15 1; dur: 150; dir: alternate; loop: 2",
  );
}

// ==========================
// AJUSTE DINÁMICO PANEL
// ==========================

function ajustarPanel(texto) {
  info.setAttribute("value", texto);

  const caracteres = texto.length;
  let altura = 1.2 + caracteres * 0.01;
  altura = Math.min(Math.max(1.2, altura), 4);

  panelInfo.setAttribute("height", altura);

  const panelY = -5;
  panelInfo.setAttribute("position", `0 ${panelY} 0`);
  info.setAttribute("position", `0 ${panelY} 0.05`);
}

// ==========================
// DEFINICIONES
// ==========================

const definiciones = {
  Ciencia:
    "CIENCIA\n\nConjunto sistemático de conocimientos obtenidos mediante método científico.",
  "Ciencia Fáctica":
    "CIENCIA FÁCTICA\n\nEstudia hechos observables y verificables.",
  "Ciencia Natural":
    "CIENCIA NATURAL\n\nAnaliza fenómenos físicos y biológicos.",
  "Ciencia Social":
    "CIENCIA SOCIAL\n\nEstudia el comportamiento humano en sociedad.",
};

const conceptosII = [
  "Ciencia",
  "Ciencia Fáctica",
  "Ciencia Natural",
  "Ciencia Social",
];

// ==========================
// MOSTRAR MENÚ
// ==========================

function limpiarConceptos() {
  document.querySelectorAll(".concept-item").forEach((e) => e.remove());
}

function mostrarMenuConceptos(lista, colorBase) {
  limpiarConceptos();
  ajustarPanel("Selecciona un concepto");

  const radio = 2.5;

  lista.forEach((concepto, index) => {
    const angulo = (index / lista.length) * Math.PI * 2;
    const x = Math.cos(angulo) * radio;
    const y = Math.sin(angulo) * radio;

    const plano = document.createElement("a-plane");
    plano.setAttribute("position", `${x} ${y} 0`);
    plano.setAttribute("width", "2");
    plano.setAttribute("height", "0.7");
    plano.setAttribute("color", colorBase);
    plano.setAttribute("class", "clickable concept-item");

    plano.addEventListener("click", () => {
      efectoClick(plano);
      ajustarPanel(definiciones[concepto]);
    });

    const texto = document.createElement("a-text");
    texto.setAttribute("value", concepto);
    texto.setAttribute("align", "center");
    texto.setAttribute("width", "6");
    texto.setAttribute("color", "#FFFFFF");
    texto.setAttribute("position", "0 0 0.05");
    texto.setAttribute("font", "https://cdn.aframe.io/fonts/roboto-msdf.json");
    texto.setAttribute("material", "shader: msdf");
    texto.setAttribute("class", "concept-item");

    plano.appendChild(texto);
    marker.appendChild(plano);
  });
}

// ==========================
// EVENTOS
// ==========================

document.querySelector("#conceptos2Btn").addEventListener("click", function () {
  efectoClick(this);
  mostrarMenuConceptos(conceptosII, "#27AE60");
});
