import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import deviceIcon from "@assets/device.png";
import './index.scss'

export default class AnalysisList extends Component{
  static defaultProps = {
    list: []
  }
  onClick = (item) => {
    let param = JSON.stringify(item)
    Taro.navigateTo({
      url: '/pages/app-manager/app-manager?item=' + encodeURIComponent(param)
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className='analysis-list'>
        {list.map(item => {
          return (
            <View className='analysis-list-item'>
              <View className='analysis-list-item-cycle'>
                <Image className='analysis-list-item-cycle-icon' src={item.icon === '' ? deviceIcon : item.icon} />
                <View className='analysis-list-item-cycle-detail'>
                  <View className='analysis-list-item-cycle-detail-app'>{item.name}</View>
                  <View className='analysis-list-item-cycle-detail-time'>{item.time}</View>
                </View>
                <View className='analysis-list-item-cycle-manager' onClick={this.onClick.bind(this, item)}>管理</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
