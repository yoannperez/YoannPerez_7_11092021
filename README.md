
# Créez un réseau social d’entreprise.
Vous trouverez dans ce repo les fichiers rendus pour la soutenace du projet 07 \" Groupomania \" réalisé dans le cadre du parcours développeur web proposée sur la plateforme Openclassrooms: [https://openclassrooms.com/fr/paths/185-developpeur-web](https://openclassrooms.com/fr/paths/185-developpeur-web).

***
Groupomania est un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence. Ils ont aujourd’hui environ 600 collaborateurs.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Stéphanie, la directrice de l’agence qui m'emploie,  veut que ce soit moi qui gère la partie développement.

Je choisis de développer un clone de Reddit, dans lequel les employés pourront écrive et / ou partager des articles avec leurs collègues sur des sujets qui les intéressent.

# Technologies utilisées
## Backend
NodeJS, ExpressJS, MySQL, ORM:Sequelize.
    
## Frontend
NodeJS, React, React-router, Axios.
# Comment utiliser ce dépot ?

Vous devrez disposer des dernières versions de NodeJS et de npm installées sur votre machine afin de pouvoir executer ce projet en local.

Télécharger et installer le logiciel NodeJS (comprend npm) à cette adresse :
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

# Installation

Cloner ce repo :
```
git clone https://github.com/yoannperez/YoannPerez_7_11092021.git
```

Puis se placer dans le dossier:
```
cd YoannPerez_7_11092021
```
## Importation du frontend comme sous-module
La partie frontend du projet est versionnée sur un repo à part entière que nous importerons dans ce projet en tant que sous-module :

La commande suivante récupère les liens vers les sous-modules inclus dans le projet.
```
git submodule init 
```
 
La commande suivante importe les fichiers du sous-module dans son répertoires du projet mère.
```
git submodule update 
```

## Installation des dépendances

Un script permet d'installer en une seule fois les dépendances des parties backend et frontend.
```
npm run installation
```
Suivant le système, il est possible que cette commande ne fonctionne pas comme il se doit. Si les dépendances des dossier nodes_modules ne se chargent pas, utiliser à la place:
```
cd /backend
npm install
cd ../frontend
npm install
```

# Lancement de l'application
## Backend

Il sera necessaire de disposer d'une base de donnée MySQL pour faire fonctionner ce projet. 

Si vous ne disposez pas de serveur local, il sera possible de créer une base de donnée en ligne à l'aide du service [https://www.db4free.net/](https://www.db4free.net/). 

Dans le cadre de la formation, les identifiants d'une base de donnée prête emploi sont disponibles dans le dossier contenant les livrables.

Les informations de connection seront à renseigner dans la section {"development"} du fichier :
```
/backend/config/config.json
```
***
## !! IMPORTANT !!
Dans le cadre de la soutenance de formation, IL SERA NECESSAIRE de copier le fichier P7_04_ENV_FILE fourni avec les livrables à la racine du dossier /backend, et de le renommer en .env à l'aide de votre IDE.

Ce fichier livré à part contient la clé de chiffrement nécessaire au décodage des tokens d'authentification.
***

Enfin, il sera possible de démarrer l'API en tapant la commande suivante depuis la racine du dosser /backend:

```
npm start
```
Si la configuration est correcte, le serveur devrait retourner le message:
```
Server started, listening on port 3000
```
NOTE: Si le port 3000 est déjà utilisé sur la machine, il sera peut-être utile de lui indiquer un autre port à utiliser.

Pour cela, il suffira d'ajouter la ligne suivante à la suite du fichier .env placé précédement :
```
PORT=3005
```
NOTE: Si le port par défaut est changé, il sera necessaire de l'indiquer au frontend

## Frontend

Pour démarrer la partie frontend du projet, vous devrez ouvrir un second terminal (afin de laisser tourner le backend dans le premier.)

Pour la suite, assurez-vous d'être placé dans le dossier /frontend

```
cd /frontend
```

Dans le fichier .env, il sera necessaire de vérifier l'adresse de l'API :
```
REACT_APP_API_ADRESS=http://localhost:3000
```
Si le backend n'utilise pas le port par défaut (3000) a changé de port, il faudra modifier ici en conséquences.

Finalement, pour lancer le frontend de l'application, depuis de dossier /frontend, taper la commande :
```
npm start
```



