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

