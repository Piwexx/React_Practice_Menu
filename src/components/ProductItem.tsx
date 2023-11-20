import { CartItem, Product } from '../App'

type ProductItemProps = {
    product: Product,
    item?: CartItem | undefined,
    onDecrement: (product: Product) => void,
    onIncrement: (product: Product) => void,
}

export const ProductItem = ({ product, item, onIncrement, onDecrement }: ProductItemProps) => {
    return (
        <div className='card' key={product.id}>
            {product.name} ({product.price})
            <div>
                <button disabled={!item}onClick={() => onDecrement(product)}>-</button>
                {item?.quantity || 0}
                <button onClick={() => onIncrement(product)}>+</button>
            </div>
        </div>
    )
}
