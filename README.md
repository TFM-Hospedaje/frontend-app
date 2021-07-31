
# Hospedaje Menéndez Pelayo
_https://app-hospedaje.herokuapp.com/_

![Mozilla Add-on](https://img.shields.io/amo/dw/dustman) ![Conda (channel only)](https://img.shields.io/conda/vn/conda-forge/python) ![Hackage-Deps](https://img.shields.io/hackage-deps/v/lens)

## _Trabajo de fin de Máster_

Este desarrollo web surge para digitalizar el proceso de reserva de habitaciones para un hospedaje, cuyo control de clientes y bookings se realizaba en papel.

La hoja de ruta del usuario en la aplicación es la siguiente:

- El usuario puede entrar como invitado, o crear una cuenta personal
- El acceso como invitado permite acceder a las secciones de información del Hospedaje, así como envío de mails al propietario, con el fin de aclarar dudas.
- Para crear una cuenta, el usuario deberá darle al botón de registro, e introducir sus credenciales debidamente.
- Una vez creado el usuario, el sistema enviará un mensaje con un link al email que ha introducido, para que de de alta su nueva cuenta.
- (_El sistema de mailing de Google a veces da problemas de seguridad al tratar de acceder desde una cuenta externa. En este caso, es necesario contactarme para habilitar una configuración que no me deja establecer por defecto)_
- Al acceder al correo y pulsar el link, el usuario será redireccionado a la página principal, ya con su cuenta.
- Una vez dentro, el usuario podrá navegar por los diferentes menús de la aplicación, realizar búsquedas, reservas, editar su información personal,enviar mensajes a los propietarios...

Para el desarrollo de la parte del cliente, se ha utilizado React, combinada con Typescript como librería principal.

React es una biblioteca escrita en JavaScript, desarrollada en Facebook para facilitar la creación de componentes interactivos, reutilizables, para interfaces de usuario

Por su parte, Typescript ofrece la misma potencia que el propio Javascript, pero tipando objetos; lo cual facilita sumamente el desarrollo del frontend.


## Características

- Sistema de autenticación de usuarios
- Mailing
- Procesos de reservas, cambios y anulaciones
- Área personal editable
- Entrada como invitado

## Tecnologías

La parte del cliente ha utilizado las siguientes tecnologías:

- [ReactJS] - Framework de Javascript!
- [Visual Code] - IDE 
- [Typescript]
- [TSX / HTML5 / CSS]
- [GIT] - Controlador de versiones.
- [node.js] - Manejador de paquetes
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML


## Instalación

Este proyecto requiere [Node.js](https://nodejs.org/) v10+ para levantarse.

Para correr la parte de cliente, es necesario realizar los siguientes comandos.

```
cd <directory>
npm i
npm start
```
