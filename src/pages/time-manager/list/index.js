import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import rightIcon from '../assets/right.png'
import './index.scss'

export default class List extends Component{
  static defaultProps = {
    list: []
  }
  navToTimeSet = (item) => {
    Taro.navigateTo({
      url: `/pages/time-set/time-set?item_id=${item.id}&begin_at=${item.begin_at}&end_at=${item.end_at}&date=${item.date}`
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className='list'>
        {list.map(item => {
          return (
            <View className='list-item' onClick={this.navToTimeSet.bind(self, item)}>
              <View className='list-item-cycle'>
                <View className='list-item-time'>
                  {item.begin_at}-{item.end_at}
                </View>
                <View className='list-item-date'>
                  {item.date}
                </View>
              </View>
              <Image className='list-item-img' src={rightIcon} />
            </View>
          )
        })}
      </View>
    )

  }
}
