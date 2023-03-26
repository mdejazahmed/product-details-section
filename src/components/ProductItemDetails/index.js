// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

class ProductItemDetails extends Component {
  state = {isFetching: true, productDetails: {}, similarProductList: []}

  componentDidMount() {
    this.getProductDetails()
  }

  renderProductDetails = () => <h1>hii</h1>

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `http://localhost:3000/products/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  renderLoader = () => (
    <div data-testid="loader" className="loaderContainer">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    const {isFetching} = this.state
    return isFetching ? this.renderLoader() : this.renderProductDetails()
  }
}
export default ProductItemDetails
