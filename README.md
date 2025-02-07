## Web desplegada

Puedes ver la web desplegada en el siguiente enlace:  
[Web Sorteo](https://sorteoxpress.onrender.com/)

## Funcionalidades

- Registro de usuarios: los usuarios pueden ingresar sus datos para participar en un sorteo.
- Almacenamiento de datos en una base de datos, que es gestionado por la empresa organizadora del sorteo.
- Sortear un producto adaptable según las especificaciones de la empresa.
  
## Tecnologías utilizadas

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js con Express.js
- **Base de datos:** MongoDB
  
## Requisitos previos

1. Node.js y npm deben estar instalados en tu sistema.
2. Asegúrate de tener acceso a la terminal o línea de comandos para ejecutar los scripts.

## Instalación

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos:

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu_usuario/nombre-del-repositorio.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd nombre-del-repositorio
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Inicia el servidor:

    Para arrancar el servidor, abre el archivo `ARRANCAR SERVIDOR.txt` y sigue las instrucciones en la línea 2 para iniciar el servidor en el puerto 3000.

    ```bash
    http-server -p 3000
    node scripts/server.js
    ```

5. Accede a la web en tu navegador:

    Ve a [http://localhost:3000](http://localhost:3000) para ver el proyecto en ejecución.

## Consideraciones

- **Diseño no responsive:** Esta web no ha sido pensada ni desarrollada como responsive. Ha sido diseñada para pantallas de **1920x1080**. Si es necesario adaptarla, se podría hacer según los requerimientos.
  
- **Servidor de desarrollo:** El proyecto está ejecutándose en un servidor de **Node Express**. Si encuentras algún problema con la visualización o la ejecución, no dudes en contactar para más ayuda.

- **Base de datos:** La implementación de la base de datos es con MONGO DB, y debe ser adaptada según las necesidades de la empresa que contrate el servicio.

## Contribuciones

Si deseas contribuir a este proyecto, puedes hacer un **fork** del repositorio y enviar un **pull request** con tus cambios.

---

*Si tienes preguntas o necesitas soporte, no dudes en contactarme. diegoarroyogonzalez04@gmail.com*
