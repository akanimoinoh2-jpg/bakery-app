import brownie from '../assets/products/brownie.png'
import tiramisu from '../assets/products/tiramisu.png'
import waffle from '../assets/products/waffle.png'
import baklava from '../assets/products/baklava.png'
import cake from '../assets/products/cake.png'
import cremeBrulee from '../assets/products/creme-brulee.png'
import pannaCotta from '../assets/products/panna-cotta.png'

const products = [
  {
    id: 'brownie',
    name: 'Chocolate Brownie',
    category: 'brownie',
    price: 4.5,
    rating: 4.8,
    reviews: 124,
    description:
      'A rich, fudgy chocolate brownie baked with premium dark chocolate and finished with a crackly top. Warm it up for an extra gooey treat.',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Flour', 'Cocoa', 'Vanilla'],
    image: brownie,
  },
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    category: 'dessert',
    price: 6.75,
    rating: 4.9,
    reviews: 98,
    description:
      'Layers of espresso-soaked ladyfingers and silky mascarpone cream, dusted with cocoa powder. An Italian classic made fresh daily.',
    ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Eggs', 'Cocoa', 'Sugar'],
    image: tiramisu,
  },
  {
    id: 'waffle',
    name: 'Belgian Waffle',
    category: 'dessert',
    price: 5.25,
    rating: 4.7,
    reviews: 87,
    description:
      'A golden, crispy Belgian waffle with a soft fluffy centre. Served with maple syrup and a dusting of powdered sugar.',
    ingredients: ['Flour', 'Butter', 'Eggs', 'Milk', 'Maple syrup', 'Sugar'],
    image: waffle,
  },
  {
    id: 'baklava',
    name: 'Honey Baklava',
    category: 'pastry',
    price: 5.95,
    rating: 4.9,
    reviews: 76,
    description:
      'Flaky layers of filo pastry filled with crushed pistachios and walnuts, soaked in fragrant honey syrup. Sweet, sticky and irresistible.',
    ingredients: ['Filo pastry', 'Pistachios', 'Walnuts', 'Honey', 'Butter', 'Cinnamon'],
    image: baklava,
  },
  {
    id: 'cake',
    name: 'Strawberry Cream Cake',
    category: 'cake',
    price: 7.5,
    rating: 4.8,
    reviews: 152,
    description:
      'Light vanilla sponge layered with fresh whipped cream and strawberries, finished with a strawberry glaze and mint.',
    ingredients: ['Strawberries', 'Cream', 'Vanilla sponge', 'Sugar', 'Mint'],
    image: cake,
  },
  {
    id: 'creme-brulee',
    name: 'Crème Brûlée',
    category: 'dessert',
    price: 6.25,
    rating: 4.9,
    reviews: 110,
    description:
      'Silky vanilla custard under a thin sheet of caramelised sugar, cracked fresh to order. Simple perfection.',
    ingredients: ['Cream', 'Egg yolks', 'Vanilla bean', 'Sugar'],
    image: cremeBrulee,
  },
  {
    id: 'panna-cotta',
    name: 'Panna Cotta',
    category: 'dessert',
    price: 5.75,
    rating: 4.6,
    reviews: 64,
    description:
      'A delicate, creamy Italian dessert set with vanilla and topped with a berry compote. Light and refreshing.',
    ingredients: ['Cream', 'Vanilla', 'Gelatine', 'Berries', 'Sugar'],
    image: pannaCotta,
  },
]

export const categories = ['all', 'brownie', 'dessert', 'pastry', 'cake']

export default products
