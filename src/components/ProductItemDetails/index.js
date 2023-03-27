/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiFillStar,
} from 'react-icons/ai'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    productDetails: {},
    productCount: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  onDecrement = () => {
    const {productCount} = this.state
    if (productCount > 1) {
      this.setState(preState => ({productCount: preState.productCount - 1}))
    }
  }

  onIncrement = () => {
    this.setState(preState => ({productCount: preState.productCount + 1}))
  }

  renderProductDetailsSuccess = () => {
    const {productDetails, productCount} = this.state
    const {
      availability,
      brand,
      description,
      id,
      image_url,
      price,
      rating,
      style,
      title,
      total_reviews,
    } = productDetails

    return (
      <div className="productDetailsContainer">
        <div className="productDetailsWrapper">
          <img src={image_url} alt={title} className="productImg" />
          <div className="productDetailsTextContainer">
            <h1 className="title">{title}</h1>
            <p className="price">Rs {price}/-</p>
            <div className="ratingContainer">
              <p className="rating">
                {rating} <AiFillStar />
              </p>
              <p className="reviews">{total_reviews} Reviews</p>
            </div>
            <div className="desc">{description}</div>
            <p className="available">
              Available: <span className="stock">{availability}</span>
            </p>
            <p className="available">
              Brand: <span className="stock">{brand}</span>
            </p>
            <hr />
            <div className="quantityContainer">
              <AiOutlineMinusSquare
                className="countBtn"
                onClick={this.onDecrement}
              />
              <p className="productCount">{productCount}</p>
              <AiOutlinePlusSquare
                className="countBtn"
                onClick={this.onIncrement}
              />
            </div>
            <button type="button" className="addToCartBtn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similarProductWrapper">
          <h1 className="similarProductHeading">Similar Products</h1>
          <SimilarProductItem
            similarProductsList={productDetails.similar_products}
          />
        </div>
      </div>
    )
  }

  renderProductDetailsFailure = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="failHeading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="failBtn">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/products/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const res = await fetch(url, options)
      const data = await res.json()
      if (res.status === 200) {
        this.setState(
          {apiStatus: apiStatusConstant.success, productDetails: data},
          this.renderProductDetailsSuccess,
        )
      } else {
        this.setState(
          {apiStatus: apiStatusConstant.failure, productDetails: data},
          this.renderProductDetailsFailure,
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loaderContainer">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProductDetailsSuccess()
      case apiStatusConstant.failure:
        return this.renderProductDetailsFailure()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderProductDetails()}
      </>
    )
  }
}
export default ProductItemDetails
