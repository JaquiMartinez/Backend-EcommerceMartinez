## Programación Backend I: Desarrollo Avanzado de Backend

```plaintext
console.log (`Server is running on port ${PORT}`);
```

\-Se realiza un backend simulado para un comercio de zapatillas que permite gestionar productos en tiempo real utilizando Express.js y Socket.IO. Permite agregar, eliminar y mostrar productos a través de websockets.

### Tecnologías implementadas en esta instancia:

*   framework Express.js
*   motor de plantilla Handlebars
*   biblioteca Socket.IO

### Podrás encontrar:

`http://localhost:8080/realtimeproducts` Se pueden agregar nuevos productos mediante un formulario en la página web. La lista de productos se actualiza automáticamente en tiempo real en todas las instancias abiertas de la página. Cada producto en la lista tiene un botón para eliminarlo. Al hacer clic en este botón, el producto se elimina de la lista.

`http://localhost:8080/products` Se pueden ver todos los productos disponibles en la página.

### Cómo ver:

1.  Clona este repositorio.
2.  Instala las dependencias con `npm install`.
3.  Inicia el servidor con `node index.js`.
4.  Accede a `http://localhost:8080/products` para ver la lista de productos o `http://localhost:8080/realtimeproducts` para ver la lista de productos en tiempo real.