# Proyecto myBlockchain
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

Creamos un fichero .babelrc y agregamos solo el preset que hemos instalado por el momento ```"presets": ["@babel/preset-env"]```

Creamos un fichero .eslintrc y agregamos la extención de airbnb, configuramos jest y node y agregamos una regla para la cantidad de columnas (esto ultimo es cuestion personal, a mi me agrada agregarlo)

Agregamos el archivo index.js y le colocamos un console.log solo para saber que funcina nuestra inicialización.

## Creación del block Genesis de la blockchain

### Creación de la clase block
Crearemos una clase block que sera la base de nuestra blockchain con las siguientes propiedades iniciales:
* timestamp (fecha de creación del bloque)
* prevHash (hash del bloque anterior que se toma como vector de enlace)
* hash (valor unico generado con valores del mismo bloque)
* data (datos guardados en el bloque)

Con esta clase generaremos el primer bloque de la blockchain llamado bloque genesis.

Para poder generar el bloque genesis vamos a crear, como primera iteración, un metodo solo para esta responsabilidad, crear el bloque Genesis de la blockchain.

Para poder generar nuevos bloques luego de inicializar la blockchain con el bloque Genesis, implementaremos un metodo mine para que la clase se encargue de hacer el proceso.

### Testing de la clase Block

Teniendo la clase block, vamos a necesitar que nuestro código sea consistente durante todo nuestro desarrollo.

Vamos a utilizar jest un framework de testing para javascript.

Ademas de ayudarnos a verificar que no tenemos errores en nuestra implementación, esto nos ayudará para poder explicar cómo funcionan las partes de nuestro proyecto.

Instalación de jest

```npm install --save-dev babel-jest jest```


## Creación de la clase Blockchain

Esta clase depende de la clase Block y maneja un array interno de bloques para su proposito.

Cada instacia de esta clase se inicia con un bloque Genesis.

En una primera iteración vamos a crear un metodo que agrega bloques nuevos al final del array y que tenga como relación el bloque previo.

### Testing de la clase blockchain

Como se realizó el test de la clase block procedemos a crear la clase `Blockchain.test.js` en la misma carpeta e implementamos 2 metodos de testing. Testeamos que en toda blockchain exista el bloque Genesis y otro para verificar el metodo addBlock.

## Agregar validador
Para que podamos trabajar en forma distribuida se necesita incorporar soporte para multiples nodos y para esto necesitamos un sistema de validación para cuando se generen nuevos bloques en nuestra blockchain.

* length validator: el objetivo final es siempre quedarse con la cadena mas larga de entre todos los nodos.
* hash validator: el objetivo final es verificar la integridad de la blockchain.