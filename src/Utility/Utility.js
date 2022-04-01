const getDB = () => {
    return JSON.parse(localStorage.getItem('shopping_Cart'))
}

const addToDB = (id) => {
  let shopping_Cart = {}; // Empty Object
  const exist = getDB()
  if (exist) {
    shopping_Cart = exist;
    /*  Here we have two Conditions - 
            1. The parameter we receive is an enique Product
            2. The parameter we recieve in not an enique product
         */
      console.log(shopping_Cart);
    shopping_Cart[id]
      ? (shopping_Cart[id] = shopping_Cart[id] + 1)
      : (shopping_Cart[id] = 1);
  } else {
    shopping_Cart[id] = 1;
  }
  localStorage.setItem("shopping_Cart", JSON.stringify(shopping_Cart));
};

const removeDB = () => {
    localStorage.removeItem('shopping_Cart')
}

export { addToDB, getDB, removeDB };
