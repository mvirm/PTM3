# HW 03: Promises | Integraci贸n

## **馃晵 Duraci贸n estimada**

x minutos

<br />

---

## **馃捇 Rick & Morty App**

### **馃摑 INTRO**

En esta homework vamos a seguir trabajando en nuetra App de Rick & Morty del lado del servidor. En esta ocasi贸n crearemos algunas rutas asincr贸nicas que nos permitir谩n darle mejor funcionamiento a nuestra aplicaci贸n.

Crearemos una ruta para manejar las funcionalidades:

-  GET onSearch
-  GET Detail
-  GET favorites
-  POST favorites
-  DELETE favorites

<br />

---

## **馃搵 INSTRUCCIONES**

### **馃懇鈥嶐煉? EJERCICIO 1**

### **GET Search**

1. **Dir铆gete a tu carpeta `controllers` y crea un archivo llamado `getCharById.js`. Dentro de este archivo deber谩s:**

-  Declarar una variable con el nombre "_getCharById_" y exportarla. Esta variable ser谩 una funci贸n que recibe dos par谩metros: **res** y **ID**.

-  Dentro de la funci贸n deber谩s hacer una petici贸n (_c贸digo asincr贸nico_) a la URL `https://rickandmortyapi.com/api/character/:id`. Debes utilizar promesas para realizar esto. Recuerda que debes agregar el ID recibido por par谩metro al final de esta URL.

> **[NOTA]:** puedes utilizar axios o fetch. 隆Como m谩s gustes!

-  Una vez que tienes la respuesta de la petici贸n, crea un objeto en el que guardar谩s las propidades **id**, **image**, **name**, **gender** y **species** que recibiste como respuesta (todos los datos de la petici贸n se encuentran dentro de una propiedad llamada **data**).

-  Una vez creado el objeto, deber谩s devolver una respuesta con status `200`, un Content-Type igual a `application/json`, y finalmente responde el objeto que creaste convertido en JSON:

```javascript
res.end(JSON.stringify(objeto));
```

-  En el caso de que la promesa tenga alg煤n fallo es importante que concatenes un `.catch` al final de la promesa para poder manejar el error. Dentro del catch deber谩s devolver una respuesta con status `500`, un Content-Type igual a `text/plain`, y finalmente responde con la propiedad **message** del error.

2. 隆Listo! Ya tenemos nuestro primer controlador. Ahora lo vamos a utilizar en nuestra ruta. Para esto, dir铆gete al archivo llamado **`server.js`**. **Elimina** todo el contenido de este archivo, y tambi茅n elimina el archivo **`data.js`** de la carpeta **utils**.

3. Dentro de este archvio tendr谩s que:

   -  Importar **http** y el controlador que creaste.

   -  Crear y levantar un servidor en el puerto **3001**.

   -  Dentro del callback del servidor debes:

      -  Crea el callback del servidor que recibe a **`req`** y a **`res`**.

      -  copiar y pegar la siguiente l铆nea dentro del callback de este servidor:

      ```javascript
      res.setHeader('Access-Control-Allow-Origin', '*');
      ```

      > **[NOTA]**: esta l铆nea permitir谩 contectar tu FRONT con el SERVIDOR sin que haya problemas de CORS.

      -  crear un condicional que pregunte si la **url** incluye el string "_**onsearch**_". En el caso de que si lo incluya deber谩s ejecutar el controlador que creamos en el ejercicio anterior pas谩ndole como argumentos:

         -  El par谩metro **`res`**.

         -  El segundo par谩metro debe ser el ID del personaje que recibes mediante la URL.

      > **[PISTA]:** dentro del par谩metro **`req.url`** est谩 el id del personaje. Puedes utilizar el m茅todo split() para obtenerlo...

<br />

---

### **馃懇鈥嶐煉? EJERCICIO 2**

### **GET Detail**

Ahora crearemos la ruta para obtener el detalle de un personaje.

1. Dir铆gete a tu carpeta `controllers` y crea un archivo llamado `getCharDetail.js`. Dentro de este archivo deber谩s:

   -  Declarar una variable con el nombre "_getCharDetail_" y exportarla. Esta variable ser谩 una funci贸n que recibe dos par谩metros: **res** y **ID**.

   -  El resto de la l贸gica de esta funci贸n es exactamente igual al ejercicio anterior, con la diferencia que esta vez debes obtener todas estas propiedades del personaje: **image**, **name**, **gender**, **status**, **origin** y **species**.

2. En tu archivo **`server.js`** tienes que:

   -  Importar el nuevo controlador.

   -  Crear un condicional que verifique si la URL recibida incluye el string "_**detail**_". En el caso de que esto sea verdadero tendr谩s que obtener el ID que recibes al final de la URL, y ejecutar este controlador pas谩ndole como par谩metros: **res** y **ID**.

<br />

---

### **馃憖 COMPROBEMOS...**

Levanta el servidor con el comando:

```bash
    npm start
```

Una vez levantado, verifica lo siguiente:

</br >

### **ON SEARCH**

Ve del lado del Front-End de tu proyecto, y busca la funci贸n **onSearch**. En ella deber谩s eliminar la URL de la API de Rick&Morty y pegar la nueva URL de tu servidor: **`http://localhost:3001/rickandmorty/onsearch/`**. Si levantas tu proyecto deber铆as de poder utilizar tu search-bar normalmente.

</br >

### **DETAIL**

Ahora queda que vayas a tu componente **Detail.jsx** y reemplaces la URL de la API con esta nueva URL de tu servidor: **`http://localhost:3001/rickandmorty/detail/`**. Ahora podr谩s ingresar al detalle de cualquier personaje sin problemas.

---

</br >

## **馃毃 A TENER EN CUENTA**

Si tu servidor no est谩 levantado, o si los links no fueron bien escritos, tu aplicaci贸n no funcionar谩 correctamente.

</br >

---

隆Hemos terminado por ahora!馃コ
