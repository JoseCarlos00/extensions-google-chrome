const style1 = `
<style>
  .containerContadores {
    position: absolute;
    width: 300px;
    left: 162px;

    animation: entradaElemento 0.5s ease-in-out;
  }

  #countActual {
      transition: all 1s ease-out;
  }

  #countRestante, #countActual, #countTotal {
    font-weight: bold;
  }

  .container-contenedores {
    position: absolute;
    width: 300px;
    right: 87px;
    
    display: flex;
    flex-direction: column;

    label {
      font-size: 13pt;
      color: #000;
      font-weight: bold;
      text-align: center;
    }

    .formDivider {
      width: 100%;
    }
  }

  .container-contenedores, .textarea {
    animation: entradaElemento 0.5s ease-in-out;
  }

  #wrapper {
    width: 294px;
  }

  .animarTexto {
    animation: entradaElemento 0.5s ease-in-out;
  }

  @keyframes entradaElemento {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Otros estilos*/
  .buttons {
    input:nth-child(2) {
      margin: 0 10px;    }
  }
</style> 
`;

const style2 = `
<style>
  .bnt-tranfer {
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.7rem 1.2rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    display: inline-block;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 17px;
    border-radius: 500px;
    overflow: hidden;
    background: #fff;
    color: ghostwhite;

    border: 1px solid #000;
    width: 122px;
    align-self: center;
    margin-top: 16px;

    animation: entradaElemento 0.5s ease-in-out;
  }
  
  .bnt-tranfer span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
  }
  
  .bnt-tranfer:hover span {
    color: black;
  }
  
  .bnt-tranfer::before,
  .bnt-tranfer::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .bnt-tranfer::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }
  
  .bnt-tranfer:hover::before {
    transform: translate3d(100%, 0, 0);
  }

  .bnt-tranfer:active {
    opacity: .5;
  }

  .bnt-tranfer:focus {
    border: 2px solid #6800ff;
  }

  @keyframes entradaElemento {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
 `;

const style3 = `
<style>
  .container-button {
    position: absolute;
    right: 463px;

    .btn-tecla {
      width: 48px;
      height: 48px;
      font-size: 18px;
      cursor: pointer;
      
      border: transparent;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
      background: #3b3b3b;
      color: white;
      border-radius: 4px;
      position: relative;

      opacity: 0;
      transition: opacity 0.8s ease;
    }
     
    .btn-tecla:hover {
      background: #3b3b3b;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    }
    
    .btn-tecla:active, .btn-tecla:active + .btn-tecla{
      transform: translate(0em, 0.2em);
      transform: scale(0.9);
    }

    .btn-tecla::before {
      content: '';
      width: 36px;
      height: 36px;
      position: absolute;
      border: 1px solid #fff;
      border-radius: 2px;
      background: #3b3b3b;
      
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
    }

    .btn-supr {
      right: -69px;
    }

    .btn-supr::after {
      content: attr(data-tooltip);
      position: absolute;
      width: 120px;
      color: #000;
      font-size: 1.00rem;
      bottom: -50px;
      left: -31px;
      opacity: .7;
    }

    .btn-ctrl {
      left: -78px;
    }

    .btn-ctrl::after {
      position: absolute;
      content: "+";
      color: #000;
      font-size: 46px;
      font-family: emoji;
      right: -55px;
      top: 10px;
    }

    .btn-v::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -50px;
      width: 213px;
      color: #000;
      font-size: 1.0rem;
      left: -143px;
      opacity: .7;
    }

    .tecla-guion {
      position: absolute;
      width: 4.0rem;
      height: 1px;
      background-color: #fff;
      z-index: 1;
    }

    .tecla-guion:nth-child(2) {
      transform: rotate(45deg);
      top: 1.5rem;
      left: -8px;
    }


    .tecla-guion:nth-child(3) {
      transform: rotate(-45deg);
      top: 1.5rem;
      right: -8px;
    }

    .btn-tecla .text {
      font-size: 15px;
      z-index: 10;
      position: relative;
    }

    .ondas {
      position: absolute;
      width: 65px;
      height: 65px;
      left: 50%;

      border-radius: 50%;
      transform: translate(-50%, -65%);

      animation: ondas 2.5s infinite;
    }
  }

  @keyframes entradaElemento {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ondas {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 255, 0.7);
    }
    50% {
      box-shadow: 0 0 0 50px rgba(0, 0, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 100px rgba(0, 0, 255, 0);
    }
  }
</style>  
`;

const style4 = `
<style>
  .containerEstadoActual {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 16px;

    margin-bottom: 44px;
    position: fixed;
    bottom: 0;
    width: 100%;

   &>:is(div:nth-child(1), div:nth-child(2), div:nth-child(3)) {
      border: 1px solid #000;
      padding: 0.3rem;
      cursor: pointer;

      animation: entradaElemento 0.5s ease-in-out;
    }

    &> div:nth-child(1) > span::before {
      content: 'Anterior';
      position: absolute;
      bottom: -17px;
      font-size: 12px;
      left: 50%;
      transform: translate(-50%);
    }    

    &> div:nth-child(2) > span::before {
      content: 'Actual';
      position: absolute;
      bottom: -17px;
      font-size: 12px;
      left: 50%;
      transform: translate(-50%);
    }

    &> div:nth-child(3) > span::before {
      content: 'Siguiente';
      position: absolute;
      bottom: -17px;
      font-size: 12px;
      left: 50%;
      transform: translate(-50%);
    }


    &> div {
      position: relative;
    }

    &> div:nth-child(4) {
      position: relative;
      bottom: -8px; 

      span {
        font-size: 14px;
        color: red;
        font-weight: bold;
        text-decoration-line: underline;
        cursor: pointer;
      }
    }

    .animarTexto {
      animation: entradaElemento 0.5s ease-in-out;
    }

    .cambiarBorde {
      animation: borderColor .2s ease-in-out !important
    }
  }

  .flecha {
    width: 30px;
    position: absolute;
    height: 40px;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    
    /** border: 1px solid #000; */

    div {
      animation: animacionFlecha .8s infinite ease-in-out;
    }

    div:nth-child(1) {
      position: relative;
      width: 60%;
      height: 80%;
      background-color: #747474;
      left: calc(0.368rem);
    }

    div:nth-child(1)::before {
      content: "";
      position: absolute;
      border: 10px solid transparent;
      border-top-color: #747474;
      bottom: -22px;
      transform: scale(1.75);
    }
  }


  @keyframes animacionFlecha {
    from { transform: translateY(-5px); }
    to { transform: translateY(0); }
  }

  @keyframes borderColor {
    from { border-color: #2c2cda; }
    to { border-color: #2c2cda; }
  }

  @keyframes entradaElemento {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

</style>
`;
