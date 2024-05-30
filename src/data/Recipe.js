// recipes.js
const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: [
      "Hackfleisch",
      "Spaghetti",
      "Tomatensauce",
      "Zwiebel",
      "Knoblauch",
    ],
    image: require("../../assets/recipes/spaghetti_bolognese.png"),
  },
  {
    id: 2,
    name: "Karotte-Ingwer-Suppe",
    ingredients: ["Karotte", "Ingwer", "Zwiebel", "Gemüsebrühe"],
    image: require("../../assets/recipes/karotte-ingwer-suppe.png"),
  },
  {
    id: 3,
    name: "Sellerie-Eintopf",
    ingredients: [
      "Sellerie",
      "Kartoffeln",
      "Karotte",
      "Zwiebel",
      "Gemüsebrühe",
    ],
    image: require("../../assets/recipes/sellerie-eintopf.png"),
  },
  {
    id: 4,
    name: "Gemischter Salat",
    ingredients: [
      "Salat",
      "Tomaten",
      "Gurken",
      "Paprika",
      "Zwiebel",
      "Olivenöl",
    ],
  },
  {
    name: "Omelette",
    ingredients: ["Eier", "Milch", "Käse", "Paprika", "Zwiebel"],
  },
  {
    name: "Chili con Carne",
    ingredients: [
      "Hackfleisch",
      "Bohnen",
      "Mais",
      "Tomatensauce",
      "Zwiebel",
      "Knoblauch",
    ],
  },
  {
    name: "Kartoffelsuppe",
    ingredients: ["Kartoffeln", "Karotte", "Zwiebel", "Gemüsebrühe", "Sahne"],
  },
  {
    name: "Gebackener Lachs",
    ingredients: ["Lachs", "Zitrone", "Olivenöl", "Knoblauch", "Dill"],
  },
  {
    name: "Gefüllte Paprika",
    ingredients: ["Paprika", "Hackfleisch", "Reis", "Tomatensauce", "Zwiebel"],
  },
  {
    name: "Hähnchen-Curry",
    ingredients: [
      "Hähnchenbrust",
      "Kokosmilch",
      "Currypaste",
      "Paprika",
      "Zwiebel",
    ],
  },
];

export default recipes;
