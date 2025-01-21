const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.images[0],
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default fetchProducts;
