(function () {
  function inicio() {}
  const style = `<style>
    .guia {
      width: 680px;
      object-fit: cover;
      object-position: left;
    }


    .textarea-container{
      position: absolute;
      right: 15px;
      top: 24px;
      z-index: 10;
    }
    
    .textarea {
      resize: none;
      min-height: 206px;
      height: 272px;
      width: 200px;
      font-size: 24px;
      font-weight: bold;
    }

    .next-button {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -40px;
      padding: 5px 5px !important;
    }


    .container-numPedidos {
      position: absolute;
      top: 0;
      right: 15px;

      & .numPedidos {
        font-weight: bold;
      }
    }

    .button {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 15px;
      gap: 15px;
      background-color: #007ACC;
      outline: 3px #007ACC solid;
      outline-offset: -3px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: 400ms;
    }
    
    .button .text {
      color: white;
      font-weight: 700;
      font-size: 1em;
      transition: 400ms;
      margin: 0;
    }
    
    .button:hover {
      background-color: transparent;
    }
    
    .button:hover .text {
      color: #007ACC;
    }
    

    @media print {
      .next-button {
        display: none;
      }

      .container-numPedidos {
        display: none;
      }

      .textarea {
        border: none
      }

      .conatiner-principal {
        display: none;
      }
    }
  </style>
  `;

  document.querySelector('head').insertAdjacentHTML('beforeend', style);

  const container = document.querySelectorAll('.container.inv-container');

  container.forEach(content => {
    const images = content.querySelectorAll('img');
    const ultimaImagen = images[images.length - 1];
    const penultimaImagen = images[images.length - 2];

    ultimaImagen.classList.add('guia');
    penultimaImagen.classList.add('guia');
  });

  const textarea = `
      <div class="textarea-container">
        <textarea class="textarea" spellcheck="false" data-ms-editor="true"></textarea>
        <button class="next-button button"><span class="text">Sig</span></button>
      </div>`;

  const divFather = document.querySelectorAll(
    'div.container.inv-container > .row .col.text-center.inv_heading'
  );

  divFather.forEach(div => {
    div.classList.add('position-relative');
    div.insertAdjacentHTML('beforeend', textarea);
  });

  // Selecciona todos los botones "Sig"
  const nextButtons = document.querySelectorAll('.next-button');

  // Agrega un controlador de eventos clic a cada boton "Sig"
  nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Encuentra todos los elementos de area de texto
      const textareas = document.querySelectorAll('.textarea');

      // Verifica si hay mas areas de texto despues del actual
      if (index < textareas.length - 1) {
        // Tambien puedes enfocar automaticamente el siguiente area de texto si es necesario
        textareas[index + 1].focus();
      }
    });
  });

  function contarPedidos() {
    const pedidosContainer = `
    <p class="container-numPedidos">Nun. Pedidos: <span class="numPedidos">0</span>
    </p>`;

    // Obten todos los elementos que contienen numeros de pedido
    const numPedidos = document.querySelectorAll(
      '.col.text-center.inv_heading.position-relative > h3:nth-child(5)'
    ).length;

    document.querySelector('body').insertAdjacentHTML('beforeend', pedidosContainer);

    document.querySelector(' p.container-numPedidos > span.numPedidos').innerHTML = numPedidos;
    console.log('Num pedidos:', numPedidos);
  }

  contarPedidos();

  window.addEventListener('load', inicio, { once: true });
})();
