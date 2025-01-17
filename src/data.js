import sampleImage from './assets/products/sample.jpeg';

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    return data.map(product => ({
      id: product.id,
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

const products = await fetchProducts();

export default products;
