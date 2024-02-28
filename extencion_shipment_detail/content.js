// Variables de estado

let lastSelectedId = null;
let pedirMasDetalles = false;

function inicio() {
  console.log('Shipment Detail');

  const panelDetail =
    document.querySelector('#ScreenGroupColumnDetailPanelHeaderRow1Column1066') ?? null;

  const tbody = document.querySelector('#ListPaneDataGrid > tbody') ?? null;

  if (!tbody && !panelDetail) return;

  tbody.addEventListener('click', e => {
    const tr = e.target.closest('tr[data-id]');
    // console.log('e.target:', tr);

    if (tr) {
      const trDataId = tr.getAttribute('data-id');

      if (lastSelectedId !== trDataId) {
        console.log('Nuevo elemento seleccionado:');
        lastSelectedId = trDataId;
      }
    }
    extraerDatosDeTr(tr, true);
  });

  panelDetail.insertAdjacentHTML('afterbegin', htmlShipmentId);
  panelDetail.insertAdjacentHTML('beforeend', htmlCustomer);
  panelDetail.insertAdjacentHTML('beforeend', htmlInternalShipmentNum);
  panelDetail.insertAdjacentHTML('beforeend', htmlInternalShipmentLineNum);
  panelDetail.insertAdjacentHTML('beforeend', htmlDateCreate);
  panelDetail.insertAdjacentHTML('beforeend', htmlWaveNumber);
  panelDetail.insertAdjacentHTML('beforeend', htmlVerMas);

  observacion(tbody);
}

function pedirDatosdelPedido() {
  console.log('[pedirDatosdelPedido]');
  pedirMasDetalles = true;
  waitFordata();
  let pedido = '';
  const queryParams = `?active=active`;
  const internalNumElement = document.querySelector(
    '#ListPaneDataGrid > tbody > tr[aria-selected="true"] td[aria-describedby="ListPaneDataGrid_INTERNAL_SHIPMENT_NUM"]'
  );
  if (internalNumElement) {
    pedido = internalNumElement.innerHTML + queryParams;

    chrome.runtime.sendMessage(
      {
        action: 'some_action',
        url: `https://wms.fantasiasmiguel.com.mx/scale/details/shipment/${pedido}`,
      },
      response => {
        console.log('Respuesta del fondo:', response);
      }
    );
  }
}

function extraerDatosDeTr(tr, isClick) {
  console.log('[extraerDatosDeTr]');

  // Obtener elementos del DOM
  const shipmentIdElement = tr.querySelector('[aria-describedby="ListPaneDataGrid_SHIPMENT_ID"]');
  const internalShipmentNumElement = tr.querySelector(
    '[aria-describedby="ListPaneDataGrid_INTERNAL_SHIPMENT_NUM"]'
  );
  const internalShipmentLineNum = tr.querySelector(
    '[aria-describedby="ListPaneDataGrid_INTERNAL_SHIPMENT_LINE_NUM"]'
  );

  // Obtener textos internos
  const shipmentIDText = shipmentIdElement ? shipmentIdElement.innerText : '';
  const internalShipmentNumText = internalShipmentNumElement
    ? internalShipmentNumElement.innerText
    : '';
  const internalShipmentLineNumText = internalShipmentLineNum
    ? internalShipmentLineNum.innerText
    : '';

  // Llamar a insertarInfo con los datos extraídos
  insertarInfo({
    isClick,
    shipmentIDText,
    internalShipmentNumText,
    internalShipmentLineNumText,
  });
}

function observacion(tbody) {
  console.log('[Observacion]');
  // Función que se ejecutará cuando ocurra una mutación en el DOM
  function handleMutation(mutationsList, observer) {
    // Realiza acciones en respuesta a la mutación
    console.log('Se ha detectado una mutación en el DOM');

    if (mutationsList[0]) {
      const trSelected = mutationsList[0].target.querySelector('tr[aria-selected="true"]') ?? null;
      extraerDatosDeTr(trSelected, false);
    }
  }

  // Configuración del observer
  const observerConfig = {
    attributes: false, // Observar cambios en atributos
    childList: true, // Observar cambios en la lista de hijos
    subtree: false, // Observar cambios en los descendientes de los nodos objetivo
  };

  // Crea una instancia de MutationObserver con la función de callback
  const observer = new MutationObserver(handleMutation);

  // Inicia la observación del nodo objetivo y su configuración
  observer.observe(tbody, observerConfig);
}

function insertarInfo(info) {
  console.log('[Insertar Info]');
  limpiarPaneldeDetalles();

  const {
    isClick,
    shipmentIDText: shipmentId,
    internalShipmentNumText: internalNum,
    internalShipmentLineNumText: internalLineNum,
  } = info;

  // Obtener elementos del DOM
  const shipmentIdElement = document.querySelector('#DetailPaneHeaderShiptmenID');
  const customerElement = document.querySelector('#DetailPaneHeaderCustomer');
  const internalNumElement = document.querySelector('#DetailPaneHeaderInternalShipmetNum');
  const internalNumLineElement = document.querySelector('#DetailPaneHeaderInternalNum');

  const verMasElement = document.querySelector('#verMasInfomacion');

  // Insertar tienda si el elemento del cliente existe y hay un ID de envío
  customerElement && shipmentId && insertarTienda(customerElement, shipmentId);

  // Asignar valores a los elementos del DOM si existen
  shipmentIdElement && (shipmentIdElement.innerHTML = shipmentId);
  internalNumElement && (internalNumElement.innerHTML = internalNum);
  internalNumLineElement && (internalNumLineElement.innerHTML = internalLineNum);

  if (verMasElement) {
    verMasElement.innerHTML = 'Ver mas info..';

    verMasElement.addEventListener('click', pedirDatosdelPedido, { once: true });
  }

  // Llamar a pedirDatosdelPedido si es por el evento click
  if (isClick) {
    // pedirDatosdelPedido();
  }
}

function insertarTienda(element, shipmentId) {
  const clave = shipmentId.trim().split('-')[0];

  console.log('clave:', clave);

  if (tiendas.hasOwnProperty(clave)) {
    element.innerHTML = tiendas[clave];
  } else {
    console.log('La clave de la tienda no existe.');
  }
}

function limpiarPaneldeDetalles() {
  // Obtener elementos del DOM
  const shipmentIdElement = document.querySelector('#DetailPaneHeaderShiptmenID');
  const customerElement = document.querySelector('#DetailPaneHeaderCustomer');
  const internalNumElement = document.querySelector('#DetailPaneHeaderInternalShipmetNum');
  const internalNumLineElement = document.querySelector('#DetailPaneHeaderInternalNum');
  const dateCreateElement = document.querySelector('#DetailPaneHeaderDateCreate');
  const waveNumberElement = document.querySelector('#DetailPaneHeaderWaveNumber');

  // Limpiar el contenido de los elementos si existen
  shipmentIdElement && (shipmentIdElement.innerHTML = '');
  customerElement && (customerElement.innerHTML = '');
  internalNumElement && (internalNumElement.innerHTML = '');
  internalNumLineElement && (internalNumLineElement.innerHTML = '');
  dateCreateElement && (dateCreateElement.innerHTML = '');
  waveNumberElement && (waveNumberElement.innerHTML = '');
}

const htmlShipmentId = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderShiptmenID"
    id="DetailPaneHeaderShiptmenID" style="color: #4f93e4 !important; font-weight: bold";></label>
</div>
`;

const htmlCustomer = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderCustomer"
    id="DetailPaneHeaderCustomer"></label>
</div>
`;

const htmlInternalShipmentNum = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderInternalShipmetNum"
    id="DetailPaneHeaderInternalShipmetNum"></label>
</div>
`;

const htmlInternalShipmentLineNum = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderInternalNum"
    id="DetailPaneHeaderInternalNum"></label>
</div>
`;

const htmlWaveNumber = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderWaveNumber"
    id="DetailPaneHeaderWaveNumber"></label>
</div>
`;

const htmlDateCreate = `
<div class="ScreenControlLabel summarypaneheadermediumlabel hideemptydiv row">
  <label class="detailpaneheaderlabel" for="DetailPaneHeaderDateCreate"
    id="DetailPaneHeaderDateCreate"></label>
</div>
`;

const htmlVerMas = `
<div id="ScreenControlHyperlink36456" class="ScreenControlHyperlink summarypaneheadermediumlabel hideemptydiv row">
  <a class="detailpaneheaderlabel ScreenControlHyperlink" id="verMasInfomacion" href="#"  role="buttton"style="cursor: auto; pointer-events: auto;"></a>
</div>
`;

const tiendas = {
  3407: 'Tol-Centro',
  3409: 'Tol-Metepec',
  417: 'Mex-Grande',
  418: 'Mex-Chica',
  444: 'Mex-Adornos',
  1171: 'Mex-Mylin',
  357: 'Mex-Mayoreo',
  350: 'Mex-Lomas',
  351: 'Mex-Satelite',
  352: 'Mex-Coapa',
  353: 'Mex-Tlalne',
  356: 'Mex-Polanco',
  360: 'Mex-Valle',
  361: 'Mex-Coacalco',
  363: 'Mex-Santa Fe',
  414: 'Mex-Xochimilco',
  415: 'Mex-Interlomas',
  3401: 'Mex-Coyoacan',
  3404: 'Mex-Pedregal',
  4342: 'Ags-Aguascalientes',
  4559: 'BCN-Carrousel',
  4797: 'BCN-Mexicali',
  4757: 'BCN-Tijuana',
  4799: 'Coa-Saltillo',
  4753: 'Coa-Torreon',
  4756: 'Dur-Durango',
  3400: 'Gto-Leon',
  359: 'Jal-Centro',
  4348: 'Jal-Gdl Palomar',
  4345: 'Jal-Gdl Patria',
  354: 'Jal-Zapopan',
  355: 'Mty-Centro',
  3405: 'Mty-Citadel',
  3406: 'Mty-GarzaSada',
  362: 'Mty-SanJeronimo',
  3403: 'Pue-Puebla',
  4798: 'QRO-Arboledas',
  3402: 'Que-Queretaro',
  4570: 'Roo-Cancun',
  4755: 'Sin-Culiacan',
  3408: 'SLP-SanLuis',
  4574: 'Son-Hermosillo',
  4573: 'Ver-Veracruz',
  4346: 'Yuc-Campestre',
  364: 'Yuc-Merida',
};

function waitFordata() {
  const text = '1346-863-28886...';

  // Obtener elementos del DOM
  const dateCreateElement = document.querySelector('#DetailPaneHeaderDateCreate');
  const waveNumberElement = document.querySelector('#DetailPaneHeaderWaveNumber');

  if (dateCreateElement) {
    dateCreateElement.innerHTML = text;
    dateCreateElement.classList.add('wait');
  }

  if (waveNumberElement) {
    waveNumberElement.innerHTML = text;
    waveNumberElement.classList.add('wait');
  }
}

function actualizarInterfaz(datos) {
  const { date, internalShipmentNumber, waveNumber } = datos;

  console.log('Date:', date);
  console.log('Internal num:', typeof internalShipmentNumber, internalShipmentNumber);
  console.log('Wave Number:', waveNumber);

  // Obtener elementos del DOM
  const dateCreateElement = document.querySelector('#DetailPaneHeaderDateCreate');
  const waveNumberElement = document.querySelector('#DetailPaneHeaderWaveNumber');
  const internalNumElement = document.querySelector('#DetailPaneHeaderInternalShipmetNum');

  console.log(internalShipmentNumber == internalNumElement?.innerHTML);
  console.log(
    'Internal Element1:',
    typeof internalNumElement.innerHTML,
    internalNumElement.innerHTML
  );

  // Verificar si el elemento interno existe y su valor coincide
  if (internalNumElement?.innerHTML == internalShipmentNumber) {
    console.log('Internal Element2:', internalNumElement.innerHTML);
    // Actualizar elementos de la interfaz si los elementos existen

    if (dateCreateElement) {
      dateCreateElement.innerHTML = date;
      dateCreateElement.classList.remove('wait');
    }

    if (waveNumberElement) {
      waveNumberElement.innerHTML = `Wave: ${waveNumber}`;
      waveNumberElement.classList.remove('wait');
    }
  }

  pedirMasDetalles = false;
}

// Escuchar los mensajes enviados desde el script de fondo
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'actualizar_datos') {
    // Actualizar la interfaz de usuario con los datos recibidos
    var datos = message.datos;
    // console.log('Datos:', datos);
    actualizarInterfaz(datos);
  }
});

// Escuchar el evento beforeunload para evitar que el usuario cierre la pestaña o cambie de página
window.addEventListener('beforeunload', function (event) {
  if (pedirMasDetalles) {
    const confirmationMessage =
      'Hay cambios sin grabar. ¿Estás seguro de que quieres cerrar esta página?';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

// Manejador del evento visibilitychange
function handleVisibilityChange() {
  if (document.visibilityState === 'hidden' && pedirMasDetalles) {
    alert('Hay cambios sin grabar. Por favor, mantén esta pestaña activa.');
  }
}

// Escuchar el evento visibilitychange
document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('load', inicio, { once: true });