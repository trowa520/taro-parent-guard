import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Product extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  onClickItem = (item, index) => {
    this.setState({current: index})
    this.props.onChooseProduct(item, index)
  }

  render() {
    const {current} = this.state
    const {products, isFirstPay} = this.props
    var percent = 1
    if(isFirstPay) {
      percent = 0.6
    }
    return (
      <View className='products'>
        {products.map((item, index) => {
          return (
            <View className={classNames('products-item', {'products-item--active': index === current})} onClick={this.onClickItem.bind(this, item, index)}>
              <View className='products-item-title'>
                {item.name}
              </View>
              {percent !== 1 ?
                <View className='products-item-original-price'>
                  <View className='products-item-original-price-coin'>￥</View>{(item.originalPrice).toFixed(2)}
                </View>
                : ''
              }
              <View className='products-item-price'>
                <View className='products-item-price-coin'>￥</View>{(item.price * percent).toFixed(2)}
              </View>
              <View className='products-item-description'>
                {item.description}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
