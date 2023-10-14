const hola = (function() {

  const LITERALS = {
    COUNTDOWN_PLURAL_TEXT: 'Quedan [XX] días.',
    COUNTDOWN_SINGLE_TEXT: 'Solo queda [XX] día!!',
    HALLOWEEN_TEXT: 'BUAHAHAHAHA!',
    INIT_MESSAGE: '🎃 Hola!',
    PENDING_PLURAL: 'Nos vemos el año que viene.',
  };

  const TEMPLATE_CLASSES = ['hola__output-days','js__hola-output-days'];

  function init() {
    console.log(LITERALS.INIT_MESSAGE);
  }

  return {
    init,
  }
})();

window.addEventListener('load', () => {
  const holaElement = document.querySelector('.js-hola');
  holaElement && hola.init();
});