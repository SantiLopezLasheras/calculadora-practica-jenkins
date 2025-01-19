RESULTADO DE LOS ÚLTIMOS TESTS:
<img src="https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg" />

# Introducción teórica

En esta práctica vamos a trabajar con Jenkins en lugar de GitHub Actions. Al igual que con GitHub Actions, es importante recordar el concepto de CI/CD.

<img src="/public/images/image1.png" width="500" />

## ¿Qué es CI/CD?

Son las siglas de Integración Continua y Distribución y Despliegue Continuos, representando los siguientes tres conceptos:

### Continuous Integration (CI)

En el proceso de desarrollo de software, los desarrolladores se enfrentan a la tarea de integrar de manera frecuente el código que escriben (nuevas características, correcciones de errores, etc.) en un repositorio compartido por todo el equipo. Cada vez que se integra nuevo código, se ejecutan pruebas automáticas para verificar que el código no introduzca errores (como pruebas de linting o pruebas de funcionalidades). Este proceso de integración continua ayuda a detectar errores de manera temprana, permitiendo corregirlos rápidamente. Aunque esencial, esta tarea puede consumir mucho tiempo que los desarrolladores podrían dedicar a otras actividades más importantes.

### Continuous Delivery (CD)

Este es el proceso que asegura que el código integrado en el repositorio esté listo para ser desplegado en producción. Cada vez que el código pasa las pruebas de la fase de CI, el proceso de delivery se encarga de preparar el código para ser desplegado, garantizando que las nuevas versiones del software puedan ser lanzadas con rapidez y facilidad.

### Continuous Deployment (CD)

Mientras que el continuous delivery prepara el código para que esté listo para ser desplegado, el despliegue no se hace necesariamente de manera automática. El continuous deployment se encarga de que el código se despliegue de forma automática una vez superadas todas las fases de pruebas. Así, cada integración de código validada y verificada es puesta en producción, sin intervención manual.

<img src="/public/images/image2.png" width="500" />

## ¿Qué es Jenkins?

Jenkins es una herramienta de automatización de código abierto que facilita la integración continua y la entrega continua de código. Con Jenkins, podemos automatizar todo el proceso de integración y despliegue de nuestro código, desde la compilación hasta las pruebas y el despliegue en producción, permitiéndonos centrarnos en escribir código sin preocuparnos por tareas que puedan automatizarse.

Jenkins se configura a través de los siguientes componentes:

### Jobs

Un job o trabajo en Jenkins es una serie de instrucciones que podemos configurar para que se ejecuten de forma automática. Por ejemplo, instrucciones como compilación del cógido, pruebas de código, linting, etc. Para esta práctica, vamos a utilizar un tipo de job llamado pipeline.

### Pipelines

Las pipelines en Jenkins son una secuencia de instrucciones que se encadenan y ejecutan de manera automatizada. Las pipelines se pueden escribir en un archivo de texto llamado Jenkinsfile.

<img src="/public/images/image3.png" width="500" />

### Jenkinsfile

El Jenkinsfile es un archivo de texto donde se define una pipeline de Jenkins. Este archivo contiene una secuencia de etapas (stages) y pasos (steps) que indican a Jenkins los pasos que debe realizar para compilar, testear y desplegar el código. Debemos almacenar el archivo Jenkinsfile en el repositorio del proyecto.

<img src="/public/images/image4.png" width="500" />

### Stages y Steps

Un Jenkinsfile se compone de una serie de stages a realizar, por ejemplo, pasar unas pruebas de código, comprobar la sintaxis del código mediante un linter, actualizar un archivo Readme.md o desplegar nuestra aplicación. Cada etapa o stage se componen de steps, que son los pasos que ha de realizar Jenkins para implementar correctamente la etapa. Podemos pensar que los steps son las instrucciones más básica que le damos a Jenkins, como ejecución de comando en la terminal o comandos de Git. Cuando el código necesario para la etapa es más complicado, podemos extraer la lógica a un script y desde la stage de nuestra pipeline pedir a Jenkins en uno de los steps que ejecute el script.

# Documentación de la práctica

## Introducción

Para realizar esta práctica, utilizamos un proyecto sencillo de React, en mi caso, una simple calculadora con las opciones de sumar, restar, multiplicar y dividir.

Para la práctica crearemos una nueva rama en nuestro repositorio llamada ci_jenkins en la que crearemos un archivo Jenkinsfile para ejecutar una pipeline con las siguientes fases:

- Stage Petició de dates: pediremos al usuario los valores de executor, motiu y Chat ID de Telegram

- Stage Linter: ejecutará el linter configurado en el package.json de nuestra aplicación

- Stage Test: realizará tests con Jest para comprobar la correcta funcionalidad de nuestra calculadora

- Stage Build: creará el build de nuestra aplicación

- Stage Update Readme: ejecutará un script para actualizar el fichero Readme.md

- Stage Push Changes: ejecutará un script para hacer un push con los cambios del Readme.md a nuestro repositorio

- Stage Deploy to Vercel: desplegaremos nuestra aplicación en Vercel a mediante un script que contendrá las instrucciones

- Stage Notificació: utilizaremos un script para enviar una notificación con Telegram con el resultado las etapas de linting, testing, actualización del Readme.md y despliegue

## Instalación y configuración d Jenkins y Build Monitor View

Para la práctica, he utilzado una imagen dockerizada de Jenkins.

<img src="/public/images/image5.png" width="500" />

Para arrancar Jenkins, tenemos que montar primero la imagen desde la línea de comandos con comando docker-compose up -d

<img src="/public/images/image6.png" width="500" />

Una vez montada la imagen, podemos acceder a Jenkins en el puerto localhost 8080, tal y como está configurado en la imagen de Docker. Para poder realizar la práctica, nos hace falta instalar una serie de plugins en Jenkins, lo cual se puede hacer desde Panel de Control > Administrar Jenkins > Plugins.

<img src="/public/images/image7.png" width="500" />

En Available plugins podemos buscar los plugins que queremos instalar. Para la práctica instalaremos ciertos plugins que nos serán necesarios como pipeline o node, y también instalaremos el plugin de Build Monitor View para crear una vista con los jobs realizados en Jenkins y su status.

<img src="/public/images/image8.png" width="500" />

Podemos comprobar todos los plugins que tenemos instalados en Installed plugins.

<img src="/public/images/image9.png" width="500" />

Una vez instalados todos los plugins, vamos a configurar una vista de Build Monitor View. Para ello, seleccionamos crear nueva vista en Jenkins y elegimos un nombre (en mi caso, la he llamado CalculadoraPipeline) y como tipo elegimos Build Monitor View.

<img src="/public/images/image10.png" width="500" />

Seleccionamos todos los jobs que queremos que se muestren en una monitor, y una vez creada la vista tendremos nuestro monitor view, que en mi caso se ve así:

<img src="/public/images/image11.png" width="500" />

Finalmente, antes de empezar a crear nuestra pipeline, tenemos que configurar Nodejs en Jenkins. Esto se puede hacer desde Panel de Control > Administrar Jenkins > Tools.

<img src="/public/images/image12.png" width="500" />

## Stage 1 - Petició de dades

Para crear nuestra pipeline, seleccionamos crear nueva tarea desde el Panel de Control.

<img src="/public/images/image13.png" width="500" />

Seleccionamos la opcion Pipeline para nuestra tarea y le damos un nombre, en mi caso calculadora-pipeline.

<img src="/public/images/image14.png" width="500" />

Configuramos nuestra pipelina para que ejecute el Jenkinsfile de nuestro repositorio en GitHub.

<img src="/public/images/image17.png" width="500" />

Especificamos la rama ci_jenkins:

<img src="/public/images/image18.png" width="500" />

Para que Jenkins tenga los permisos necesarios a nuestro GitHub, guardamos nuestro token personal de GitHub con los permisos necesarios en un secreto de Jenkins en Panel de Control > Administrar Jenkins > Credentials

<img src="/public/images/image19.png" width="500" />

En nuestro repositorio creamos un archivo Jenkinsfile para escribir las instrucciones de nuestra pipeline. Utilizaremos Node.js, así que lo indicamos en nuestro Jenkinsfile.

<img src="/public/images/image15.png" width="500" />

La primera stage nuestro pipeline consistirá en la petición de ciertos datos al usuario que necesitaremos más adelante. Pedimos mediante userInput que el usuario introduzca el nombre de la persona que ejecuta la pipeline, el motivo por el cual la ejecuta, y el chatID del bot de telegram para enviar la notificación con los resultados. Guardamos los datos en variables de entorno para que sean accesibles en stages posteriores.

<img src="/public/images/image16.png" width="500" />

Hacemos commit de los cambios y actualizamos nuestro repositorio remoto con un git push.

<img src="/public/images/image20.png" width="500" />

En Jenkins, ejecutamos nuestra pipeline mediante el botón construir ahora.

<img src="/public/images/image21.png" width="500" />

Si vamos a console output, veremos que la ejecución de la pipeline está pausada y nos está pidiendo datos por pantalla.

<img src="/public/images/image22.png" width="500" />

Introducimos los datos y aceptamos (proceed) para que continue la ejecución de la pipeline.

<img src="/public/images/image23.png" width="500" />

## Stage 2 - Linter

La siguiente stage de nuestra pipeline se encargará de ejecutar un linter en nuestro código para comprobar la sintaxis del código. El comando necesario para el linter (al igual que para los tests de jest de la stage siguiente) estarán configurados en el package.json de nuestro proyecto.

<img src="/public/images/image24.png" width="500" />

En el Jenkinsfile creamos la instrucciones para la etapa del linting. Mediante un bloque de código try/catch podremos recuperar el resultado de la etapa y guardarlo en una variable de entorno para poder utilizarlo más tarde en la notificación de Telegram.

<img src="/public/images/image25.png" width="500" />

Tras hacer commit y push, ejecutamos nuestra pipeline en Jenkins y nos da error el linter. Esto nos puede ayudar a detectar errores en el código.

<img src="/public/images/image26.png" width="500" />

Como da fallo, la pipeline no continua ejecutándose y falla.

<img src="/public/images/image27.png" width="500" />

Corregimos los errores detectados por el linter en nuestro código. Es este caso, la solución es añadir ciertas variables globales a nuestro eslint.config.js.

<img src="/public/images/image28.png" width="500" />

Con estos cambios, al ejecutar nuestra pipeline otra vez veremos que ya no falla y termina satisfactoriamente.

<img src="/public/images/image29.png" width="500" />

## Stage 3 - Test

La tercera etapa consiste en realizar tests de Jest para comprobar que la funcionalidad de nuestra calculadora funciona correctamente y devuelve los resultados esperados al realizar los cálculos matemáticos. Guardaremos el resultado de la stage también en una variable de entorno:

<img src="/public/images/image30.png" width="500" />

Para que se ejecuten los tests, tendremos que crear un archivo de JavaScript con los tests de Jest necesarios para nuestra aplicación. Como tenemos la lógica matemática extraída en un archivo operaciones.js, crearemos un archivo operaciones.test.js con los tests:

<img src="/public/images/image31.png" width="500" />

<img src="/public/images/image32.png" width="500" />

Al ejecutar la pipeline, vemos que nuestra aplicación funciona como esperamos al pasar todos los tests de Jest.

<img src="/public/images/image33.png" width="500" />

## Stage 4 - Build

En esta etapa, indicamos a Jenkins en nuestro Jenkinsfile que cree el build de nuestra aplicación.

<img src="/public/images/image34.png" width="500" />

En la consola de Jenkins podemos ver que el comando npm run build se ha ejecutado correctamente y se ha creado el build de nuestra app.

<img src="/public/images/image35.png" width="500" />

## Stage 5 - Update_Readme

A continuación, vamos a crear un script en una carpeta jenkinsScripts para que Jenkins actualice el archivo Readme.md de nuestro repositorio con el siguiente texto: “RESULTADO DE LOS ÚLTIMOS TESTS:”, seguido de una badge dependiendo de si se han pasado los tests de Jest o han fallado. Para que el código del script funcione, creamos un archivo OldReadme.md en el directorio raíz. El script se encargará de copiar el contenido del OldReadme y el resultado de los tests de Jest en el archivo README.md.

<img src="/public/images/image36.png" width="500" />

En el Jenkinsfile ejecutaremos el script updateReadme.js de la carpeta jenkinsScript y guardaremos el resultado en una variable de entorno para poder enviarlo luego en una notificación al bot de Telegram.

<img src="/public/images/image37.png" width="500" />

## Stage 6 - Push_Changes

A continuación, queremos crear un nuevo script dentro de la carpeta jenkinsScripts llamado pushChanges.sh, el cual se encargará de guardar los cambios en nuestro repositorio. Es decir hará un commit y un push para actualizar el Readme.md de nuestro repositorio. El commit utilizará 2 de los inputs que pedimos en la primera stage: executor y motiu y tendrá el formato siguiente: "Pipeline executada per EXECUTOR. Motiu: MOTIU".

El script pushChanges consistirá en una serie de comandos de Git:

<img src="/public/images/image38.png" width="500" />

En el jenkinsFile ejecutaremos es script teniendo primero asegurándonos que el archivo tiene los permisos de ejecución, para lo que usamos el "comando chmod +x" y después ejecutando el script pushChanges.sh con bash y pasándole los valores de las variables de entorno executor y motiu (mediando un export). El valor de los exports lo hacemos con comillas para evitar errores, por ejemplo si el valor de motiu es una cadena de texto y no usamos las comillas, nos dará un error al ejecutar el script con Bash.

<img src="/public/images/image39.png" width="500" />

Para que todo funcione y Jenkins tenga los permisos necesarios para actualizar nuestro repositorio de GitHub le pasamos los tokens necesarios que tenemos guardados en variables de entorno en nuestra pipeline.

<img src="/public/images/image40.png" width="500" />

Estos valores proceden de las credenciales que tenemos guardadas en Jenkins de forma segura. Se pueden añadir, modificar y consultar en Panel de Control > Administrar Jenkins > Credentials:

<img src="/public/images/image41.png" width="500" />

## Stage 7 - Deploy to Vercel

El siguiente paso, una vez nuestra app ha pasado por el linter y los tests de Jest, y ya está lista para producción, es desplegarla en Vercel. Para ello creamos una nueva stage en nuestro Jenkinsfile, la cual también guardará el resultado de la etapa en una variable de entorno, para enviar el resultado más adelante al bot de Telegram. En este caso, también vamos a necesitar un script con permisos de ejecución ("chmod +x") llamado deployVercel.sh, que contendrá los comandos necesarios para el despliegue. Le pasamos el token de Vercel que necesita el script mediante un export.

<img src="/public/images/image42.png" width="500" />

El script en este caso es muy sencillo gracias a que utilizamos el CLI de Vercel que automatiza bastante el proceso. Así pues, necesitamos instalar primero el CLI de vercel con npm, después nos autenticamos en nuestra cuenta de vercel con el comando login y con la ayuda del token que hayamos creado en nuestra cuenta de Vercel para proporcionar permisos y, finalmente, desplegamos la aplicación.

<img src="/public/images/image43.png" width="500" />

En la consola de Jenkins veremos cómo se monta nuestra app y se despliega.

<img src="/public/images/image44.png" width="500" />

Si todo ha salido como esperamos, nuestra app estará desplegada en Vercel y en nuestra cuenta de Vercel podremos consultar las veces que se ha desplegado, los distintos builds, otras estadísticas, y la URL a nuestra aplicación desplegada en Internet.

En este caso, al navegar al siguiente enlace veremos que nuestra calculadora ya está desplegada y es funcional: https://calculadora-pipeline.vercel.app/

<img src="/public/images/image45.png" width="500" />

## Stage 8 - Notificació

El último paso es enviar una notificación al bot de Telegram con el resultado de los stages Linter, Test, Update_Readme y Deploy to Vercel. En la stage notificación imprimimos por consola los valores que hemos recibido como resultado de los stages que hemos guardado en variables de entorno.

<img src="/public/images/image47.png" width="500" />

Para enviar la notificación, una vez especificados todos los stages en nuestra pipeline, creamos un paso "post" que se ejecute siempre ("always) para que el mensaje al bot de telegram se envíe siempre sin importar de si falla alguna etapa o no. Si creamos la notificación desde una stage final, el mensaje podría no enviarse ya que si falla alguna etapa anterior, Jenkins interrumpe la pipeline y la finaliza con un estado de 'failure'.

<img src="/public/images/image48.png" width="500" />

El paso de "post" instalará el paquete node-telegram-bot-api y después ejecutará un script que se encargue de enviar un mensaje a Telegram con los resultados. Las variables necesarias para el script se las pasamos también: resultados de los stages, el token de Telegram (que tenemos guardado en una credential de Jenkins), y el chat ID que habíamos pedido al usuario por pantalla en la primera stage.

<img src="/public/images/image46.png" width="500" />

Con este último paso, ya tenemos todos los pasos de nuestra pipeline terminada. Una vez ejecutamos la pipeline en Jenkins, recibimos un mensaje en Telegram con los resultados:

<img src="/public/images/image49.png" width="500" />

En la consola vemos que el commit de Jenkins tiene el formato que habíamos especificado:

<img src="/public/images/image50.png" width="500" />
