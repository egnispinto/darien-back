#######################################################################################<br>
				# PROYECTO VACIO NODE JS CON IMPLEMENTACION DE JWT #		<br/>		
#######################################################################################<br>

El proyecto tiene todo lo necesario para arrancar con un proyecto nodeJS con Express <br>
y restApi

Para instalarlo es necesario clonar el proyecto:
git clone https://gitlab.com/egnispinto/empty-project-node.git

Luego de clonado se debe ejecutar
<p>npm install</p>

Esto con la finalidad de que se instalen todas las dependencias

Por último para subir el servidor se ejecuta
<p>npm run start</p>

Instalaciones extras:
Es recomendado, pero no necesario, tener instalado nodemon
<p>npm i nodemon</p>

Luego de instalado nodemon subir el proyecto con 

<p>npm run dev</p>
Esto con la finalidad de que mientras desarrolles los features que requieras, <br>
nodemon los actualice en caliente sin necesidad de hacer down-up manualmente <br>
a la aplicación

CONFIGURACION DE VARIABLES DE ENTORNO
Es necesario crear en la raiz del proyecto un archivo .env con los siguientes valores:
PORT=4200
MONGODB=*aquiColocarasTuURLMongoDB*
CLAVE=*aquiColocarasLaClaveQueQuierasComoSemillaParaGenerarTusJWT*
Enjoy :)








