// Write your code here
import ProductCard from '../ProductCard'

import './index.css'

const SimilarProductItem = props => {
  const {similarProductsList} = props
  const updatedList = similarProductsList.map(each => ({
    id: each.id,
    title: each.title,
    brand: each.brand,
    imageUrl: each.image_url,
    rating: each.rating,
    price: each.price,
  }))
  return (
    <ul className="similarProductsContainer">
      {updatedList.map(each => (
        <ProductCard key={each.id} productData={each} />
      ))}
    </ul>
  )
}
export default SimilarProductItem
