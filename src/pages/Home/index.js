import React, {useState, useEffect} from 'react';
import {MdAddShoppingCart} from 'react-icons/md';
import {useSelector, useDispatch} from 'react-redux';
import {ProductList} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import {formatPrice} from '../../util/format';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector((state) => {
    return state.cart.reduce((amt, product) => {
      amt[product.id] = product.amount || 0;
      return amt;
    }, {});
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    fetchProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
