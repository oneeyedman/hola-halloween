const hola = (function() {

  const LITERALS = {
    COUNTDOWN_PLURAL_TEXT: 'Faltan [XX] días.',
    COUNTDOWN_SINGLE_TEXT: 'Solo falta [XX] día!!',
    HALLOWEEN_TEXT: 'BUAHAHAHAHA!',
    INIT_MESSAGE: '🎃 Hola!',
    HALLOWEEN_HAS_PASSED: 'Nos vemos el año que viene.',
  };

  const SELECTORS = {
    OUTPUT: '.js__hola-output',
    YEAR: '.js__hola-year',
  }

  const TEMPLATES = {
    CLASSES: ['hola__output-days','js__hola-output-days'],
    COUNTDOWN_DAYS: '[XX]',
  };

  const today = getDateOnly(new Date());
  const halloween_date = getCurrentHalloweenDate();
  const isHalloween = !(today - halloween_date);
  const hasHalloweenPassed = !(today - halloween_date < 0);

  /**
   * Devuelve la fecha del siguiente Halloween ;)
   *
   * @return  {Date}  Pues eso, la fecha del Halloween en curso o del del año que viene.
   */
  function getCurrentHalloweenDate() {
    const year = new Date().getMonth() > 9 ? new Date().getFullYear() + 1 : new Date().getFullYear();
    return new Date(`${year}/10/31`);
  }


  /**
   * Devuelve una fecha a las 0:00:00.00
   *
   * @param   {Date}  date  fecha completa, posiblemente con horas, minutos y segundos
   *
   * @return  {Date}        Misma fecha de entrada, pero a las 0:00:00.00
   */
  function getDateOnly(date) {
    const day = date.getDate().toString().padStart(2,'0');
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const year = date.getFullYear();

    return new Date(`${year}/${month}/${day}`);
  }


  /**
   * Convierte en días una cifra en milisegundos
   *
   * @param   {number}  ms  Tiempo en milisegundos
   *
   * @return  {number}      Días correspondientes a esos milisegundos
   */
  function milisecondsToDays(ms) {
    return Math.floor(Math.abs(ms) / (24 * 60 * 60 * 1000)); 
  }


  /**
   * [hideMessageParts description]
   *
   * @param   {[type]}  part  [part description]
   *
   * @return  {[type]}        [return description]
   */
  function hideMessageParts(part) {
      return `<span class="sr-only">${part}</span>`;
  }


  /**
   * [formatMessage description]
   *
   * @param   {[type]}  messageObj  [messageObj description]
   *
   * @return  {[type]}              [return description]
   */
  function formatMessage(message) {
      return message
        .split(TEMPLATES.COUNTDOWN_DAYS)
        .map(hideMessageParts)
        .join(TEMPLATES.COUNTDOWN_DAYS);  
  }


  /**
   * Devuelve la cadena con los días pendientes
   *
   * @return  {string}  Cadena con los días pendientes incluídos
   */
  function getDaysPendingString() {
    const daysUntilHalloween = milisecondsToDays(today - halloween_date);
    const str = daysUntilHalloween === 1 ? LITERALS.COUNTDOWN_SINGLE_TEXT : LITERALS.COUNTDOWN_PLURAL_TEXT;
    
    return formatMessage(str).replace(TEMPLATES.COUNTDOWN_DAYS, daysUntilHalloween);
  }


  /**
   * [getHalloweenMessage description]
   *
   * @return  {[type]}  [return description]
   */
  function getHalloweenMessage() {
    let result = isHalloween ? LITERALS.HALLOWEEN_TEXT : LITERALS.HALLOWEEN_HAS_PASSED;
    
    if (!isHalloween && !hasHalloweenPassed) {
      result = getDaysPendingString();
    }

    return result;
  }


  /**
   * [updateCountDown description]
   *
   * @param   {[type]}  wrapper  [wrapper description]
   *
   * @return  {[type]}           [return description]
   */
  function updateCountDown(wrapper) {
    wrapper.querySelector(SELECTORS.OUTPUT).innerHTML = getHalloweenMessage();
  }


  /**
   * [updateFooterYear description]
   *
   * @param   {[type]}  wrapper  [wrapper description]
   *
   * @return  {[type]}           [return description]
   */
  function updateFooterYear(wrapper) {
    wrapper.querySelector(SELECTORS.YEAR).textContent = new Date().getFullYear();
  }


  /**
   * Inicializa la cuenta atrás
   *
   * @param   {HTMLElement}  mainElement  Referencia al elemento principal del proyecto.
   *
   * @return  {Object}               Funciones públicas del módulo.
   */
  function init(mainElement) {
    console.log(LITERALS.INIT_MESSAGE);
    updateFooterYear(mainElement);
    updateCountDown(mainElement);
  }

  return {
    init,
  }
})();

window.addEventListener('load', () => {
  const holaElement = document.querySelector('.js-hola');
  holaElement && hola.init(holaElement);
});