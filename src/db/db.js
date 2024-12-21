const banner = [
  {
    prod_id: 1,
    prod_img: 'jj',
    title1: 'Nike New',
    title2: 'Collection',
    title_details:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
]

console.log(banner)

const category_image = [
  {
    cat_id: 1,
    cat_img: 'dd',
    cat_name: 'Cat name',
  },
]

console.log(category_image)

const products = [
  {
    parent_cat_id: 1,
    sub_cat_id: 10,
    sub_sub_cat_id: 100,
    sub_sub_sub_cat_id: 1000,
    prod_id: 10000,
    prod_image: 'https://fabrilife.com/products/642045d214885-square.jpg?v=20',
    prod_name: 'Cotton Panjabi',
    price: 20,
    prod_type: 'R',
    rating: 5,
    stock: 100,
    prod_brand: 'Easy',
    description: ` am magni architecto ipsa earum dignissimos aspernatur expedita quidem, itaque modi.`,
    currency_id: 302,
    currency_name: 'USD',
    status: 1,
  },
]

console.log(products)

const parentCategory = [
  {
    par_cat_id: 1,
    par_cat_name: 'Fruits and Vegetables',
  },
  {
    par_cat_id: 2,
    par_cat_name: 'Meat and Fish',
  },
  {
    par_cat_id: 3,
    par_cat_name: 'Cooking',
  },
  {
    par_cat_id: 4,
    par_cat_name: 'Brevarages',
  },
  {
    par_cat_id: 5,
    par_cat_name: 'Home and Cleaning',
  },
]

console.log(parentCategory)

const subCategory = [
  {
    par_cat_id: 1,
    sub_cat_id: 104,
    sub_cat_name: 'Potato',
  },
  {
    par_cat_id: 1,
    sub_cat_id: 105,
    sub_cat_name: 'Tomato',
  },
  {
    par_cat_id: 2,
    sub_cat_id: 100,
    sub_cat_name: 'Frozen Fish',
  },
  {
    par_cat_id: 2,
    sub_cat_id: 101,
    sub_cat_name: 'Dish Fish',
  },
  {
    par_cat_id: 2,
    sub_cat_id: 102,
    sub_cat_name: 'Fresh Fish',
  },
  {
    par_cat_id: 2,
    sub_cat_id: 103,
    sub_cat_name: 'Beef',
  },
  {
    par_cat_id: 2,
    sub_cat_id: 103,
    sub_cat_name: 'Chicken',
  },
]

console.log(subCategory)
