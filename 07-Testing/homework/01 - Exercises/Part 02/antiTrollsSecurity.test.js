const antiTrollsSecurity = require('./antiTrollsSecurity');

describe('PARTE 02', () => {
   describe('Seguridad Anti Trolls', () => {
      it('Debe devolver el mismo string pero habiendo eliminado todas las vocales', () => {
         expect(antiTrollsSecurity('This website is for losers LOL!')).toBe(
            'Ths wbst s fr lsrs LL!'
         );
         expect(antiTrollsSecurity('What are you, a communist?')).toBe(
            'Wht r y,  cmmnst?'
         );
         expect(antiTrollsSecurity('Hello World!')).toBe(
            'Hll Wrld!'
         );
         expect(antiTrollsSecurity('My name is...')).toBe(
            'My nm s...'
         );
      });
   });
});
