# Tomorrow-Land repo

Ejercicio práctico basado en login y dashboard mostrando datos asincronos.

Testing credentials:

- username: ufounders
- password: react

## Directivas de desarrollo 

- SE UTILIZA COMO DIRECTIVA PRINCIPAL EN LA ARQUITECTURA DE COMPONENTES --> https://www.componentdriven.org/
- COMO DIRECTIVA DE GIT SE USÓ GITFLOW.
- SE DESARROLLO USANDO TYPESCRIPT Y PARA LAS PETICIONES ASINCRONAS SE USO THUNK/RX DADO QUE LA CANTIDAD NO COMPENSA INTEGRAR SAGAS.


## Informacion complementaria

Se crearon diagramas para el flujo de datos entre los componentes y el store de reux y la arquitectura de componentes.
Podran encontrarse en la carpeta del root "_docs";

### Toma de decisiones

- Renderizado de lista de componentes con datos provenientes de api:
Se integro la libreria de infinite scroll para gestionar la logica de como mostrar los datos.
Para ello hubo que crear un algoritmo que fuera haciendo partes del array original, seteandolas en el state de "ticketState", con metodo de slice y controlando y aumentando conforme el scroll el indexInferior e indexSuperior.

- GoToTop component:
Debido a la causa anterior, que el servicio trae muchos datos (800), se decidio integrar un boton en el dashboard con la funcionalidad de viajar hasta el principio de la lista.

- Renderizado de svg:
Se creo un componente destinado exclusivamente a manejar estos svg, pasandole parametros para modificar tanto el color como el tamaño, mendiante el prop "type" se puede seleccionar cada uno de los iconos/graficos (tipado).

- Mock para api de login:
Se creo un server simple (server/server.js) para mockear esta peticion y simular un servicio real, tiene dos posibles respuestas, satus server de 200 con informacion basica de usuario y status 401 (Unauthorized) e informacion del error (tratamiento de este status como error en consola, simulando una peticion real).

- Variables de entorno:
Se creo una carpeta provisional para las variables de entorno (urls de servicios), cambiando estas se actualizaran las url's de los servicios

- Store de redux:
Se decidio integrar el store en el index.tsx y no en app.tsx para gestionar el auth de la redireccion al dashboard.

- Diseños:
Tanto en el componente que renderiza cada ticket como en el modal, se tuvieron que variar las medidas originales del diseño (margin, padding, etc etc) dado que el ID, nombres, emails ... al fetchear el servicio rompia el diseño original, se adapto con un grid y tanteando las columnas para los datos mas largos, con el fin de mantener lo mas fiel posible el diseño original.

- Fetch de datos de api:
Se decidio realizar este servicio en el backend dado que desde el frontal daba problemas de cors
## Available Scripts

In the project directory, you can run:

### `yarn dev`

Con concurrently se creo un script para arrancar el frontal y el back al mismo tiempo.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn server`

Runs the server for a mock REST API

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
