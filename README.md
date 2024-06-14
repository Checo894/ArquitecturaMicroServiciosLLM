# Aplicación LLM y Micro Servicios

## Descripción

El presente repositorio contiene la implementación de una aplicación creada a partir de vanilla JavaScript, HTML y CSS, para la integración y coexiostencia de Micro Servicios, además de el uso de 'Large Lenguage Models' (LLMs) como uno de los objetivos. Los micro servicios que se utilizaron fueron los siguientes:

- Passport: Servicio de autenticación de cuentas de usuario final por 'usuario' y 'contraseña'.
- OpenAi: Servicio de Inteligencia Artificial, utilizado para la creación de un ChatBot experto en videojuegos.

Asimismo, todo el diseño y resultado final de la presente arquitectura se realizó siempre teniendo en cuenta los distintos atribbutos y estándares de calidad, como los son la modificabilidad, comprobabilidad, seguridad y capacidad de despliegue. 

### Diagramas

A continuación, se hace una muestra visual de cómo se encuentra estructurado el sistema:

- Diagrama de representación de la arquitectura implementada

![arquitectura](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/dc8e57dc-3ca1-4c31-82cf-0e38229dace0)

- Diagrama del manejo de relaciones entre las tablas de las dos bases de datos

![appERM](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/3dd4c2e2-1178-4a37-ba8e-1c1ed1df789f)

## Requerimientos

Para poder iniciar y correr lo contenido en este repositorio, será necesario contar ciertos programas y dependencias, los cuales se enlistan a continuación...

### Node JS

Es necesario contar con Node JS instalado en su equipo para iniciar tanto la visualización de la página como el servidor de esta. Para ello accede a la siguiente dirección [Download Node JS](https://nodejs.org/en/download/package-manager), y después de elegir de las distintas opciones la que más te convenga, sigue las instrucciones ahí descritas.

### Servicio local de Base de Datos 

También es necesario contar con algún servicio o sistema de gestión de bases de datos, alojado localmente en tu equipo. En caso de este proyecto, será necesario que puede correr MySQL. Para esto nosotros recomendamos XAMPP que se puede encontrar en el siguiente enlace: [XAMPP Installers and Downloads](https://www.apachefriends.org/es/index.html).

### Docker (Opcional)

Docker es una plataforma de código abierto que facilita la creación, implementación y ejecución de aplicaciones en contenedores, lo que permite a los desarrolladores garantizar que sus aplicaciones funcionen en cualquier lugar, proporcionando portabilidad y escalabilidad. Este requerimiento es necesario para poder 'Dockerizar' el proyecto, pero no representa algo indispensable para poder ejecutarlo. Obtenlo aquí: [Docker Desktop](https://www.docker.com/products/docker-desktop/).

## Ejecutar el Proyecto

### Clonar el repositorio locamente

Como primer paso debemos clonar este repositorio localmente con la ayuda del comando...

- `git clone https://github.com/Checo894/ArquitecturaMicroServiciosLLM.git`

..., ejecutándolo en la terminal de tu preferencia, dentro el directorio donde quieras que se ubiquen alojados los archivos de la aplicación. 

### Configurar la Base de Datos

Después de haber clonado el repositorio, necesitamos importar la base de datos al sistema de gestión. Para ello primero abre XAMPP o la aplicación de tu predferencia y asegúrate de que los servicios de Apache y MySQL se encuentren en correcto funcionamiento, como se muestra en la imagen:

![image](https://github.com/pizzerolaa/Aplicacion-MVC/assets/128638772/a82ba355-6b8a-4f82-a11c-e194d3ff97a9)

Posteriormente, ingresamos al panel de administración de MySQL, mediante el botón 'Admin' resaltado. Dentro, en el panel del lateral izquierdo seleccionamos la opción de "Nueva" y crearemos dos nuevas bases de datos a las que le daremos los nombres de 'llm' y 'chatbot_messages'. Luego daremos click en "Crear".

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/7e641adb-6f01-458c-b4da-bea0714196ba)

Una vez creadas, en la barra superior seleccionamos "Importar" y seleccionamos el archivo 'llm.sql' para 'llm' y 'chatbot_messages.sql' para 'chatbot_messages' ambos archivos ubicados en la carpeta SRC del repositorio recién clonado.

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/d3762390-b9f5-40b7-a987-f93cb18b7228)

Por último, damos en "Importar" al final de la página.

![image](https://github.com/pizzerolaa/Aplicacion-MVC/assets/128638772/a1fc1d23-d6eb-4cd7-8a24-b64d7571ba54)

### Correr localmente la aplicación

Completo lo anterior, en la terminal de tu preferencia ubícate en la carpeta fuente del repositorio clonado y ejecuta los siguientes comandos:

- `npm i`: Instala las dependencias del proyecto.

- `npm start`: Inicia el servidor de Express.

Terminado esto, la página estará lista para su uso y se encontrará alojada en `http://localhost:3000/landing.html`

## HAPPY PATH

A continuación, se muestra una guía rápida donde se exponen las distintas páginas y funcionalidades de la aplicación.

### Landing Page

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/22788d0b-a1f5-46f3-9332-96a075e4e706)

En esta primera vista, la página nos da una bienvenida y nos da un poco de contexto de qué trata esta herramienta.

### Login Page

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/35852a6a-b715-44e7-9910-1d22b5c77501)

Posteriormente, podemos encontrar la plataforma conde podremos iniciar sesión en la aplicación con nuestro usuario y contraseña y, en caso de no contar con uno, registrarnos; paso necesario para poder hacer uso de la misma.

### Chat Bot Page

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/1a298922-f4b2-46f0-bb60-6ad7c8d3b4a4)

Finalmente, llegamos a la funcionalidad principal de la página, la interface de chat con la inteligencia artificial. Con esta podrás interactuar y mantener conversaciones con ella y, cuando hayas terminado, cerrar sesión, guardando así tus mensajes para otra ocación. 

De esta forma, si otro usuario inicia sesión con otra cuenta, podrá tener su propia conversación que se conservará por separado y volver a ella reingresando a la app.

## Pruebas Unitarias

Las pruebas unitarias son un tipo de pruebas de software que se centran en verificar el correcto funcionamiento de las unidades más pequeñas e independientes de código, como funciones o métodos. El objetivo es asegurarse de que cada componente individual de la aplicación funcione correctamente y de manera aislada. Estas pruebas se ejecutan generalmente de manera automática y proporcionan una manera rápida de validar que el código funciona como se espera, lo cual es esencial para el mantenimiento y evolución del software.

### Archivos

En este proyecto, cada archivo de prueba se corresponde con un archivo de código fuente, lo que facilita la localización y mantenimiento de las pruebas; estos inluyen:

- `db.test.js`: Pruebas para verificar la correcta conexión y operación de la base de datos de usuarios.
- `db_chatbot.test.js`: Pruebas para verificar la correcta conexión y operación de la base de datos del chatbot.
- `index.test.js`: Pruebas para verificar la funcionalidad del archivo principal de la aplicación.
- `login.test.js`: Pruebas para la funcionalidad de inicio de sesión.
- `script.test.js`: Pruebas para la funcionalidad de los scripts utilizados en la aplicación.

Todos los cuales se encuentran dentro de la carpeta `tests` en la fuente del repositorio.

### Framework de Pruebas Unitarias

Utilizamos Jest como framework de pruebas unitarias, conocido por su simplicidad y capacidad de realizar pruebas de manera rápida y eficaz; configurado en el archivo `jest-config.js`. Para correr toda la suite de  pruebas unitarias del proyecto se utiliza el comando `npm test`, siendo un ejemplo de éxito el siguiente:

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/5e99685d-09f5-4deb-9b59-06269829fabd)

## Pruebas Estáticas

Las pruebas estáticas son un conjunto de técnicas que se utilizan para analizar el código fuente de un programa sin ejecutarlo. Su objetivo es identificar posibles errores, malas prácticas y problemas de estilo en el código. Estas pruebas ayudan a mantener la calidad del código y a detectar problemas potenciales de manera temprana.

### Framework de Pruebas Estáticas

La implementación de las pruebas estáticas en este proyecto se hizo utilizando ESLint, que es una herramienta popular para el análisis estático de código en JavaScript; nos permite definir reglas para el estilo y las mejores prácticas del código, y verifica que el código cumpla con estas reglas. En este caso, las pruebas se tienen que correr por comandos individuales para cada uno de las arcivos de código fuente, con el prefijo `npx eslint + [nombre_del_archivo]`, como se muestra a continuación:

- `npx eslint db.js`
- `npx eslint db_chatbot.js`
- `npx eslint index.js`
- `npx eslint .\public\js\login.js`
- `npx eslint .\public\js\script.js`

Siendo un resultado exitoso de estas el hecho de que la terminal no regrese ningún output.

### Ejemplo real de corrección

Durante la ejecución de estas pruebas en el desarrollo del proyecto, estas nos ayudaron a detectar variables inutilizadas en `index.js` y `login.js` mostrando el siguiente output en aquel momento...

- `npx eslint index.js`:

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/6a2f9bc9-2d02-4540-9d71-95ade7fea192)

- `npx eslint .\public\js\login.js`:

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/c6413ab6-0248-46d7-805a-f483d142e67e)

## Docker

Como ya se había comentado al inicio de este README, Docker es una plataforma que permite crear, desplegar y ejecutar aplicaciones en contenedores. Los contenedores son ligeros, portátiles y aseguran que la aplicación funcione de manera consistente en diferentes entornos. Asimismo, esta plataforma ayuda a mantener la consistencia, el aislamiento, la escalabilidad y la portabilidad del programa.

### Implementación

En este proyecto se crearon distintos `Dockerfile`´s para contenerizar diferentes partes de la aplicación, siendo los servicios de autenticación y chatbot, así como sus respectivas bases de datos de MySQL. Un Dockerfile es un script que contiene una serie de instrucciones para crear una imagen de Docker. Posteriormente, estos Dockers se unen con un archivo `docker-compose.yml` que ayuda a definir y ejecutar múltiples contenedores Docker, es decir, facilita la orquestación de los contenedores para que trabajen juntos.

### Ejecutar el Proyecto con Docker

Antes, asegurate de haber instalado y que se encuentre en ejecución la aplicación de Docker Desktop en tu dispositivo localmente.

- Construir las Imágenes:

`docker-compose build`

- Levantar los Contenedores:

`docker-compose up`

- Acceder a los Servicios:

Servicio de Autenticación: `http://localhost:3000`

Servicio de Chat: `http://localhost:3001`
