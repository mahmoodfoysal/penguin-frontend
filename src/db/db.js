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

const dashboardMenu = [
  {
    menu_id: 101,
    name: 'Controllers',
    logo: 'gamepad',
    sub_menu: [
      {
        sub_menu_id: 1001,
        name: 'Make Admin',
        logo: 'admin_panel_settings',
        route_name: 'Admin'
      },
      {
        sub_menu_id: 1002,
        name: 'Category Mapping',
        logo: 'polyline',
        route_name: 'CategoryMap'
      },
      {
        sub_menu_id: 1003,
        name: 'Products',
        logo: 'photo_library',
        route_name: 'Products'
      },
      {
        sub_menu_id: 1004,
        name: 'Footer',
        logo: 'remove',
        route_name: 'Footer'
      }
    ]
  },
  {
    menu_id: 102,
    name: 'Category',
    logo: 'category',
    sub_menu: [
      {
        sub_menu_id: 2001,
        name: 'Parent Category',
        logo: 'account_tree',
        route_name: 'ParentCat'
      },
      {
        sub_menu_id: 2002,
        name: 'Sub Category',
        logo: 'account_tree',
        route_name: 'SubCat'
      },
      {
        sub_menu_id: 2003,
        name: 'Sub Sub Category',
        logo: 'account_tree',
        route_name: 'SubSubCat'
      },
      {
        sub_menu_id: 2004,
        name: 'Sub Sub Sub Category',
        logo: 'account_tree',
        route_name: 'SubSUbSubCat'
      }
    ]
  },

  {
    menu_id: 103,
    name: 'Home Control',
    logo: 'tune',
    sub_menu: [
      {
        sub_menu_id: 3001,
        name: 'Banner',
        logo: 'image',
        route_name: 'Banner'
      },
      {
        sub_menu_id: 3002,
        name: 'Image Category',
        logo: 'photo_library',
        route_name: 'ImageCat'
      },
      {
        sub_menu_id: 3003,
        name: 'Hot Deals',
        logo: 'calendar_view_week',
        route_name: 'HotDeals'
      }
    ]
  },
  {
    menu_id: 104,
    name: 'Orders',
    logo: 'list_alt',
    sub_menu: [
      {
        sub_menu_id: 4001,
        name: 'Pending',
        logo: 'pending_actions',
        route_name: 'Pending'
      },
      {
        sub_menu_id: 4002,
        name: 'Warehouse',
        logo: 'warehouse',
        route_name: 'Warehouse'
      },
      {
        sub_menu_id: 4003,
        name: 'Shipping',
        logo: 'local_shipping',
        route_name: 'Shipping'
      },
      {
        sub_menu_id: 4004,
        name: 'Delivery',
        logo: 'moped',
        route_name: 'Delivery'
      },
      {
        sub_menu_id: 4005,
        name: 'Tracking',
        logo: 'location_searching',
        route_name: 'Tracking'
      }
    ]
  }
];

console.log(dashboardMenu);
