const head = document.querySelector('head');
const body = document.querySelector('body');

/** variables glovales */
let contenedores = [];
let indiceContenedor = 0;
let intervaloEnviar = '';

let LPAnterior = '';
let LPActual = '';
let LPSiguiente = '';

let copiando = '';

function inicio() {
  head.insertAdjacentHTML('beforeend', style1);
  head.insertAdjacentHTML('beforeend', style2);
  head.insertAdjacentHTML('beforeend', style3);
  head.insertAdjacentHTML('beforeend', style4);

  const html1 = `
  <div class="container-contenedores">
    <label for="containers">Contenedores</label>
    <hr class="formDivider">
    <textarea id="containers" class="textarea" style="opacity: 1" placeholder="FMA0002459969\nFMA0002459970\nFMA0002459971\n..." rows="7"></textarea>   
    <button class="bnt-tranfer"><span>Button</span></button> 
 </div>
 `;

  const html2 = `
  <div class="container-button">
    <button class="btn-tecla btn-supr" data-tooltip="Presiona 'Supr' para iniciar">
      <div class="text">Supr</div>
      <div class="tecla-guion"></div>
      <div class="tecla-guion"></div>
    </button>

    <button class="btn-tecla btn-ctrl">
      <div class="text">Ctrl</div>
      <div class="tecla-guion"></div>
      <div class="tecla-guion"></div>
    </button>

    <button class="btn-tecla btn-v" data-tooltip="Presiona Ctrl + V para insertar un contenedor">
      <div class="text">V</div>
      <div class="tecla-guion"></div>
      <div class="tecla-guion"></div>
    </button>
 </div>
  `;

  body.insertAdjacentHTML('afterbegin', html1);
  body.insertAdjacentHTML('afterbegin', html2);

  document
    .querySelector('.bnt-tranfer')
    .addEventListener('click', insertarContenedores, { once: true });
}

function insertarContenedores() {
  const textarea = document.querySelector('div.container-contenedores > .textarea');

  if (textarea.value === '') return;

  contenedores = textarea.value.trim().split('\n');
  textarea.value = '';
  console.log('contenedores:', contenedores);

  console.log('insertarDatos completado exitosamente');
  if (chrome.storage) {
    // Tu código que utiliza chrome.storage aquí
    // Guardar los datos en el almacenamiento local
    chrome.storage.local.set({ contenedoresGuardados: contenedores }, function () {
      console.log('Datos guardados en el almacenamiento local.');
    });
  } else {
    console.error('chrome.storage no está disponible.');
  }

  content();
}

function content() {
  insertarContadores();
  const btnSupr = document.querySelector('.btn-tecla.btn-supr');
  const btnCtrl = document.querySelector('.btn-tecla.btn-ctrl');
  const btnV = document.querySelector('.btn-tecla.btn-v');

  btnSupr.style.opacity = '1';
  btnSupr.addEventListener(
    'click',
    () => {
      copiando();
      btnSupr.style.opacity = '0';
      btnCtrl.style.opacity = '1';
      btnV.style.opacity = '1';
    },
    { once: true }
  );

  /**
   * Variables de los contadores
   */
  const countRestante = document.querySelector('#countRestante');
  const countActual = document.querySelector('#countActual');
  const countTotal = document.querySelector('#countTotal');

  /**
   * Varibles del formulario
   */
  const btnTranfer = document.querySelector('#buttonSubmit');
  const puerta = document.querySelector('#txtBoxDestLoc');
  const lp = document.querySelector('#txtBoxContainerId');

  function enviar() {
    if (btnTranfer.disabled === false && puerta.value !== '') {
      clearInterval(intervaloEnviar);
      if (puerta.value == 'LIMPIEZA') btnTranfer.click();
      btnTranfer.setAttribute('disabled', true);
    }
    console.log('Enviar');
  }

  async function copiar(textoCopy) {
    try {
      await navigator.clipboard.writeText(textoCopy);
      lp.focus();
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }

  /** Inicializar contadores */
  let countRestanteValue = contenedores.length;
  let countActualValue = 0;
  let countTotalValue = contenedores.length;

  countRestante.innerHTML = countRestanteValue;
  countActual.innerHTML = countActualValue;
  countTotal.innerHTML = countTotalValue;

  copiando = () => {
    if (indiceContenedor <= contenedores.length) {
      const contenidoActual = contenedores[indiceContenedor] ?? '';
      console.log('contenidoActual:', contenidoActual);
      setTimeout(() => {
        copiar(contenidoActual);
      }, 1000);

      if (contenidoActual === '') {
        LPActual.innerHTML = 'Fin';
        LPActual.style.color = 'transparent';
      } else {
        LPActual.style.color = '#000';
        LPActual.innerHTML = contenidoActual;
      }

      if (contenedores[indiceContenedor - 1])
        LPAnterior.innerHTML = contenedores[indiceContenedor - 1];

      // console.log('IndiceAntes:', indiceContenedor);
      indiceContenedor++;

      const siguienteLP = contenedores[indiceContenedor] ?? 'Fin';
      LPSiguiente.innerHTML = siguienteLP;

      if (siguienteLP === 'Fin') {
        clearInterval(intervaloEnviar);
        console.log('Interval desactivado');
      }
      /** Actualizar Contadores */
      countRestante.innerHTML = countRestanteValue - (indiceContenedor - 1);
      countActual.innerHTML = indiceContenedor - 1;
      // countRestante.classList.remove('animarTexto');
      countActual.classList.remove('animarTexto');

      // Elimina la clase de animación si ya estaba presente
      LPAnterior.classList.remove('animarTexto');
      LPActual.classList.remove('animarTexto');
      LPActual.closest('.containerEstadoActual > div:nth-child(2)').classList.remove(
        'cambiarBorde'
      );
      LPSiguiente.classList.remove('animarTexto');

      // Espera un breve momento para que el cambio de texto se refleje en el DOM
      setTimeout(() => {
        // Agrega la clase de animación después de un breve retraso para que se aplique a la nueva versión del elemento
        LPAnterior.classList.add('animarTexto');
        LPActual.classList.add('animarTexto');
        LPActual.closest('.containerEstadoActual > div:nth-child(2)').classList.add('cambiarBorde');
        LPSiguiente.classList.add('animarTexto');

        // countRestante.classList.add('animarTexto');
        countActual.classList.add('animarTexto');
      }, 50);
    }
  };

  document.addEventListener('keydown', function (event) {
    // console.log('key:', event.key);
    if (event.key === 'Delete') {
      // console.log('EVENTO1');
      btnSupr.style.opacity = '0';
      btnCtrl.style.opacity = '1';
      btnV.style.opacity = '1';
      copiando();
    }

    if (event.key === 'Escape') {
      puerta.value = '';
      btnTranfer.setAttribute('disabled', true);
      clearInterval(intervaloEnviar);
    }
  });

  document.addEventListener('paste', () => {
    // btnCtrl.style.opacity = '0';
    // btnV.style.opacity = '0';
    copiando();

    if (LPActual.innerHTML === 'Fin') {
      clearInterval(intervaloEnviar);
      console.log('Interval desactivado');
      return;
    }

    setTimeout(() => {
      puerta.focus();
      intervaloEnviar = setInterval(enviar, 500);
    }, 250);
  });
}

function insertarContadores() {
  const html1 = `
  <div class="containerContadores">
    <p id='countRestante'>0</p>
    <p>LP: <span id="countActual">1</span> DE <span id="countTotal">1</span></p>
  </div>
  `;

  const html2 = `
  <div class="containerEstadoActual">

    <div>
      <span id="anterior">Anterior</span>
    </div>

    <div>
      <span id="actual">Actual</span>
      <div class="flecha">
        <div></div>
      </div>
    </div>

    <div>
    <span id="siguiente">Siguiente</span>
    </div>

    <div>
      <span id="irAIndice">Ir a</span>
    </div>

  </div>
  `;
  body.insertAdjacentHTML('afterbegin', html1);
  body.insertAdjacentHTML('beforeend', html2);

  estadoActual();
}

function estadoActual() {
  LPAnterior = document.querySelector('#anterior');
  LPActual = document.querySelector('#actual');
  LPSiguiente = document.querySelector('#siguiente');

  LPSiguiente.innerHTML = contenedores[indiceContenedor];

  document.querySelector('#irAIndice').addEventListener('click', irAContenedor);
}

function irAContenedor() {
  nuevoIndice = Number(window.prompt()) ?? '';

  if (nuevoIndice === '') return;
  indiceContenedor = nuevoIndice;
  copiando();
}

// Verificar si hay datos almacenados al cargar la página
if (chrome.storage) {
  // Tu código que utiliza chrome.storage aquí
  chrome.storage.local.get('contenedoresGuardados', result => {
    const datosGuardados = result.contenedoresGuardados ?? '';
    const datosGuardadosNum = Object.keys(datosGuardados).length ?? 0;

    if (datosGuardados) {
      console.log('Se encontraron datos guardados:', datosGuardadosNum, datosGuardados);
    } else {
      console.log('No se encontraron datos guardados.');
    }
  });
} else {
  console.error('chrome.storage no está disponible.');
}

window.addEventListener('load', inicio, { once: true });
