import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Tab extends Component {
  static defaultProps = {
    list: [],
  }

  handleClick = (index) => {
    this.props.onChange(index)
  }

  render () {
    const { list, current } = this.props
    return (
        <View className='cate-sub-tab'>
        {list.map((item, index) => (
          <View
            key={item.id}
            className='cate-sub-tab__item'
            onClick={this.handleClick.bind(this, index)}
          >
            <Text className={classNames('cate-sub-tab__item-txt', current===index && 'cate-sub-tab__item-txt--active')}>{item.name}</Text>
            {index === current &&
              <View className='cate-sub-tab__item-line' />
            }
          </View>
        ))}
      </View>
    )
  }
}
