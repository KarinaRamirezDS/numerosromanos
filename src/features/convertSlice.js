import { createSlice, current } from '@reduxjs/toolkit';

export const convertSlice = createSlice({
  name: 'convert',

  initialState: {
    value: ''
  },

  reducers: {
    romanToDecimal: (state, action) => {
      // Declarar mi objeto
      let changeRoman = new Map();
      //Colocar valores

      changeRoman.set('I', 1);
      changeRoman.set('V', 5);
      changeRoman.set('X', 10);
      changeRoman.set('L', 50);
      changeRoman.set('C', 100);
      changeRoman.set('D', 500);
      changeRoman.set('M', 1000);
      //Convertir valor a Mayusculas
      let romanoNumber = action.payload.toUpperCase();

      //variables
      let lastNumber, current;
      let result = 0;
      let n = romanoNumber.length;

      //Posiciones

      try {
        if (typeof romanoNumber != 'string') {
          throw new Error('El valor introducido no es un numero romano');
        }
        for (let i = 0; i < n; i++) {
          current = changeRoman.get(romanoNumber[i]);
          lastNumber = changeRoman.get(romanoNumber[i + 1]);

          if (current < lastNumber) {
            result += lastNumber - current;
            i++;
          } else {
            result += changeRoman.get(romanoNumber[i]);
          }
        }

        state.value = result;
      } catch (error) {
        console.log(`Se produjo el siguiente error: ${error}`);
      }
    },

    decimalToRoman: (state, action) => {
      let numero = action.payload;
      if (typeof numero == 'number') {
        throw new Error('El valor introducido no es un numero entero');
      }

      let myHashTable = new Map();
      myHashTable = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
      };
      var resultado = '';

      for (var i of Object.keys(myHashTable)) {
        var q = Math.floor(numero / myHashTable[i]);
        numero -= q * myHashTable[i];
        resultado += i.repeat(q);
      }

      state.value = resultado;
    }
  }
});

export const { romanToDecimal, decimalToRoman } = convertSlice.actions;

export default convertSlice.reducer;
