const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

let products = [];

const getProducts = () => {
    return Promise.resolve(products);
}

const getProductById = ({ productId }) => {
    return Promise.resolve(products.find(p => p.id === productId));
}

const createProduct = ({ product}) => {
    const newId = products.length === 0 ? 1: products[products.length-1].id + 1;
    products = [ ...products, { ...product, id: newId}];
    return Promise.resolve(product)
}
const PRODUCT_CREATED = 'PRODUCT_CREATED';
module.exports = {
    Query: {
        products: async () => getProducts(),
        product: async (_, { id }) => getProductById({ productId: id })
    },
    Mutation: {
        createProduct: async (_, { product }) => {
            pubsub.publish(PRODUCT_CREATED, { productCreated: product });
            return createProduct({ product })
        }
    },
    Subscription: {
        productCreated: {
          subscribe: () => pubsub.asyncIterator([PRODUCT_CREATED]),
        }
    }
};