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
    const {products} = this.props
    return (
      <View className='products'>
        {products.map((item, index) => {
          return (
            <View className={classNames('products-item', {'products-item--active': index === current})} onClick={this.onClickItem.bind(this, item, index)}>
              <View className='products-item-title'>
                {item.name}
              </View>
              <View className='products-item-price'>
                <View className='products-item-price-coin'>￥</View>{item.price}
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
