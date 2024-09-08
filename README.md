## Programación Backend I: Desarrollo Avanzado de Backend

```plaintext
console.log (`Server is running on port ${PORT}`);
```

\-Se realiza un backend simulado para un comercio de zapatillas que permite gestionar productos en tiempo real utilizando Express.js y Socket.IO. Permite agregar, eliminar y mostrar productos a través de websockets.

### Tecnologías implementadas en esta instancia:

*   Node.js: Entorno de ejecución para JavaScript en el servidor.
*   Framework Express.js
*   Express-handlebars: Motor de plantillas para Express.
*   biblioteca Socket.IO
*   Express: Framework para Node.js que facilita la creación de aplicaciones web.
*   MongoDB: Base de datos NoSQL para almacenar los datos.
*   Mongoose: ODM (Object Data Modeling) para MongoDB y Node.js.

### Podrás encontrar:

`http://localhost:8080/realtimeproducts` Se pueden agregar nuevos productos mediante un formulario en la página web. La lista de productos se actualiza automáticamente en tiempo real en todas las instancias abiertas de la página. Cada producto en la lista tiene un botón para eliminarlo. Al hacer clic en este botón, el producto se elimina de la lista.

`http://localhost:8080/products` Se pueden ver todos los productos disponibles en la página.

### Cómo ver:

1.  Clona este repositorio.
2.  Instala las dependencias con `npm install`.
3.  Inicia el servidor con `node index.js`.
4.  Accede a `http://localhost:8080/products` para ver la lista de productos o `http://localhost:8080/realtimeproducts` para ver la lista de productos en tiempo real.

## Programación Backend II: Diseño y Arquitectura Backend

\-Siguiendo el proyecto de backend simulado para un comercio de zapatillas se utiliza tecnologías modernas y prácticas de desarrollo seguras. A continuación se describen las características, tecnologías utilizadas y las instrucciones para configurar y ejecutar el proyecto.

### Tecnologías Utilizadas en esta ocasión

*   Passport: Middleware de autenticación para Node.js.
*   JWT (JSON Web Tokens): Estándar para el manejo de tokens de autenticación.
*   bcrypt: Biblioteca para el hash de contraseñas.
*   dotenv: Gestión de variables de entorno.
*   Mongoose: ODM para MongoDB..
*   Express-validator: Middleware para validar los datos de entrada.
*   Cookie-parser: Middleware para manejar cookies.
*   Socket.IO: Biblioteca para comunicación en tiempo real.

### Características

*   Autenticación de Usuarios: Implementa autenticación utilizando JWT y Passport. Los usuarios pueden iniciar sesión, y se aplican roles para controlar el acceso a diferentes rutas.
*   Gestión de Productos y Carritos: Rutas para manejar productos y carritos, con almacenamiento en MongoDB. Los carritos pueden ser comprados y se genera un ticket para cada compra.
*   Comunicación en Tiempo Real: Uso de Socket.io para actualizaciones en tiempo real.
*   Rutas de Sesiones: Rutas protegidas para obtener datos del usuario actual.
*   Gestión de Tickets: Implementación de un sistema para crear y gestionar tickets para las compras realizadas.