# Baby Health Tracker

## Description
Baby Health Tracker est une application web permettant aux parents et professionnels de santé de suivre la santé des bébés : croissance, sommeil, vaccins, et commentaires. L’application propose une interface intuitive pour saisir, visualiser et gérer les données de santé.

## Fonctionnalités principales
- Authentification (parent, médecin)
- Gestion des bébés (ajout, modification, suppression)
- Suivi de la croissance (poids, taille)
- Suivi du sommeil
- Suivi des vaccins
- Section commentaires
- Tableaux de bord personnalisés

## Structure du projet
```
baby-health-tracker/
	backend/    # API Node.js/Express + Prisma
	frontend/   # Application React + Vite + Tailwind
```

## Technologies utilisées

### Backend
- **Node.js** : Environnement d’exécution JavaScript côté serveur.
- **Express.js** : Framework minimaliste pour créer des API REST robustes et évolutives.
- **TypeScript** : Sur-ensemble de JavaScript apportant le typage statique pour plus de fiabilité et de maintenabilité.
- **Prisma ORM** : Outil de mapping objet-relationnel pour interagir facilement avec la base de données, générer des migrations et gérer les modèles.
- **PostgreSQL** : Système de gestion de base de données relationnelle open-source, performant et fiable (ou autre SGBD compatible selon la configuration).

### Frontend
- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur réactives et modulaires.
- **TypeScript** : Apporte le typage statique à React pour une meilleure robustesse du code.
- **Vite** : Outil de build et serveur de développement ultra-rapide pour les projets modernes (remplaçant Create React App).
- **Tailwind CSS** : Framework CSS utilitaire pour concevoir rapidement des interfaces modernes et responsives.

## Installation
### Prérequis
- Node.js >= 18
- npm
- PostgreSQL (ou autre base compatible)

### 1. Cloner le dépôt
```bash
git clone <url-du-repo>
cd baby-health-tracker
```

### 2. Backend
```bash
cd backend
npm install
# Configurer la base de données dans .env
npx prisma migrate dev
npx prisma db seed # (optionnel, pour données de test)
npm run dev
```

### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev
```

L’application frontend sera accessible sur [http://localhost:5173](http://localhost:5173) par défaut.

## Utilisation
- Créez un compte (parent ou médecin)
- Ajoutez un bébé
- Saisissez les données de croissance, sommeil, vaccins
- Consultez les tableaux de bord et l’historique

## Organisation des dossiers
- `backend/` : API REST, logique métier, accès BDD
- `frontend/` : Interface utilisateur, appels API, gestion d’état

## Scripts utiles
### Backend
- `npm run dev` : Lancer le serveur en mode développement
- `npx prisma studio` : Interface graphique pour la BDD

### Frontend
- `npm run dev` : Lancer l’interface React

## Contribution
1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commitez vos modifications
4. Poussez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

## Auteurs
- Projet réalisé dans le cadre d’une formation service web

## Licence
Ce projet est open-source, sous licence MIT.

