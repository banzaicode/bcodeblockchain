# Proyecto BcodeBlockchain

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=bugs)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=banzaicode_myblockchain&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=banzaicode_myblockchain)

## Iniciando en la blockchain
La idea de este proyecto es construir una Blockchain e ir aprendiendo mediante vamos implementando funcionalidad.
Intentaremos entender los pilares conceptuales de esta tecnología mientras, en el camino, vamos construyendo una blockchain similar a la de bitcoin u otras redes.
Entender lo que es la descentralización y los beneficios que podemos obtener aplicando estos conceptos.

## Utilización de javascript para el proyecto

## Setup del ambiente de desarrollo

Inicializamos un proyecto con npm [https://www.npmjs.com/]

```npm init```

Instalamos dependencias de babel [https://babeljs.io/]

```npm install @babel/core @babel/node @babel/preset-env --include=dev```

Instalamos eslint para poder ser mas ordenados y tener algunos lineamientos cuando codificamos, agregamos la configuración de airbnb que es bastante buena y agregamos el plugin de import que nos va a ayudar bastante. [https://eslint.org/]

```npm install eslint eslint-config-airbnb-base eslint-plugin-import --include=dev```

Agregamos nodemon para tener la caracteristica de poner hacer cambios en el código sin tener que cortar la ejecución, con solo guardar los cambios nodemon actualiza la instancia en ejecución. [https://nodemon.io/]

```npm install nodemon --include=dev```

Instalación de jest para realizar nuestros test

```npm install --save-dev babel-jest jest```

Paquetes necesarios para poder agregar nuestros endpoints a la app.

```npm install express body-parser ```

Instalamos las dependencias para trabajar con websockets

```npm install ws ```

Instalamos modulos de node para trabajar con curvas elipticas de criptografía, es mas eficiente que RCA y las llaves que podremos generar serán mas cortas, seguras y mas rapidas.

```npm install elliptic ```

Instalamos dependencias para agregar la funcionalidad de crear y utilizar uuid

```npm install uuid ```

Creamos un fichero .babelrc y agregamos solo el preset que hemos instalado por el momento ```"presets": ["@babel/preset-env"]```

Creamos un fichero .eslintrc y agregamos la extención de airbnb, configuramos jest y node y agregamos una regla para la cantidad de columnas (esto ultimo es cuestion personal, a mi me agrada agregarlo)

Agregamos el archivo index.js y le colocamos un console.log solo para saber que funcina nuestra inicialización.

## Cómo ejecutar nodos de la blockchain

Para comenzar con una nueva instancia de un nodo podemos ejecutar el siguiente script que tenemos configurado en el package.json

```npm run start ```

Esto lo que realizaría es inicializar un nodo escuchando en los puertos por default que tiene que son 3000 y 5000

luego si queremos levantar una nueva instancia y que esta se sincronice con la anterior, es decir, cada noto tendra el 50% de la red de validadores de nuestra blockchain, ejecutamos el siguiente script que tambien tenemos ya configurado en el package.json

```npm run start:2 ```

Esto lo que realizaría es inicializar un nodo escuchando en los puertos por default que tiene que son 3001 y 5001, con el argumento tambien para indicarle con que otro nodo tiene que sincronizarse.

```console
HTTP_PORT=3001 NETWORK_PORT=5001 NODES=ws:localhost:5000
```

teniendo los dos nodos corriendo podemos hacer pruebas a los endpoints de cada uno.

verificamos los blockes minados

```console
GET http://localhost:3000/blocks
```

para poder minar un block

```console
POST http://localhost:3000/mine HTTP/1.1
content-type: application/json

{
    "data": "new block origin 3000"
}
```

verificamos las transacciones que tenemos en la memoryPool

```console
GET http://localhost:3000/transactions
```

creamos una nueva transaccion y queda en la memoryPool hasta ser confirmada

```console
POST http://localhost:3000/transaction HTTP/1.1
content-type: application/json

{
    "recipient": "random-address",
    "amount": 51
}
```

Cambiando el numero del puerto podemos realizar las operaciones entre los diferentes nodos que tengamos corriendo localmente.

