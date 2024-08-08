# Composant react-ts-dropdown

## Description

Ce package NPM fournit un composant dropdown personnalisable et accessible pour les applications React. Le composant supporte à la fois les tableaux de chaînes de caractères simples et les tableaux d'objets, permettant aux utilisateurs de sélectionner des options à partir d'une liste déroulante triée. Il est conçu pour gérer la navigation au clavier, facilitant son utilisation pour tous les utilisateurs.

## Installation

Pour installer le package, utilisez la commande suivante :

```bash
npm install react-ts-dropdown2
```

## Utilisation

Exemple Basique
Voici un exemple d'utilisation du composant Dropdown avec un tableau simple de chaînes de caractères :

```javascript

import React from 'react';
import { Dropdown } from "react-ts-dropdown2";

const items = ["Option 1", "Option 2", "Option 3"];

function App() {
  return (
    <div>
      <h1>Sélectionnez une option</h1>
      <Dropdown items={items} />
    </div>
  );
}

export default App;
```

Exemple avec un Tableau d'Objets
Le composant Dropdown peut également gérer un tableau d'objets. Chaque objet doit contenir une propriété name et abbreviation :

```javascript

import React from 'react';
import { Dropdown } from "react-ts-dropdown2";

const items = [
  { name: "États-Unis", abbreviation: "US" },
  { name: "Canada", abbreviation: "CA" },
  { name: "Mexique", abbreviation: "MX" }
];

function App() {
  return (
    <div>
      <h1>Sélectionnez un pays</h1>
      <Dropdown items={items} />
    </div>
  );
}

export default App;
```

### Props
```javascript
items (string[] | { name: string; abbreviation: string }[])
```
Un tableau de chaînes de caractères ou un tableau d'objets contenant name et abbreviation. Le name sera affiché dans le dropdown, et abbreviation peut être utilisé pour une sélection rapide via le clavier.


## Fonctionnalités

### Navigation au Clavier :

**Flèche Haut/Bas :** Naviguer entre les options.  
**Entrée :** Sélectionner l'option surlignée.  
**Échap :** Fermer le dropdown.  
**Saisie de Caractères :** Lors de l'utilisation d'un tableau d'objets, taper un caractère sélectionnera la première option dont l'abréviation commence par ce caractère.

### Interaction à la Souris :

**Clic :** Ouvrir/Fermer le dropdown et sélectionner des options.  
**Survol :** Surligner les options avec la souris.  
**Auto Focus :** Le dropdown se focalise automatiquement lorsqu'il est ouvert, permettant une interaction immédiate au clavier.

### Personnalisation du CSS

Vous pouvez personnaliser l'apparence du dropdown en modifiant le fichier Dropdown.css. Les classes CSS par défaut utilisées sont :

**dropdown-container :** Le conteneur principal du dropdown.  
**value-container :** La zone cliquable qui affiche la valeur sélectionnée.  
**options-container :** Le conteneur pour les options du dropdown.  
**selected :** La classe appliquée à l'option actuellement surlignée.  
**icon :** L'icône de la flèche du dropdown.

Exemple de personnalisation du style :

```css

.dropdown-container {
    position: relative;
    width: 200px;
}

.value-container {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
}

.options-container {
    position: absolute;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
}

.options-container li {
    padding: 10px;
    cursor: pointer;
}

.options-container li.selected {
    background-color: #007bff;
    color: #fff;
}

.icon {
    float: right;
}
```