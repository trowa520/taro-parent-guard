import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import rightIcon from '@assets/right.png'
import './index.scss'

export default class TimeLengthList extends Component{
  static defaultProps = {
    list: []
  }


  render() {
    const { list } = this.props
    return (
      <View className='time-length-list'>
        {list.map(item => {
          return (
            <View className='time-length-list-item'>
              <View className='time-length-list-item-cycle'>
                <View className='time-length-list-item-date'>
                  不超过{item.length}分钟
                </View>
              </View>
              <Image className='time-length-list-item-img' src={rightIcon} />
            </View>
          )
        })}
      </View>
    )
  }
}
