import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import deviceIcon from "@assets/device.png"

import './index.scss'

export default class List extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    list: []
  }
  onClickFree = (item) => {
    this.props.onUpdateApp({status: 0, appId: item.id, item: item})
  }

  onClickLimit = (item) => {
    this.props.onUpdateApp({status: 1, appId: item.id, item: item})
  }

  onClickStop = (item) => {
    this.props.onUpdateApp({status: 2, appId: item.id, item: item})
  }

  onClickSet = (item) => {
    this.props.onUpdateApp({status: 4, appId: item.id, item: item})
  }

  render() {
    const {list, type} = this.props

    return (
      <View className='free-list'>
        {list.map(item => {
          return (
            <View className='free-list-item'>
              <View className='free-list-item-cycle'>
                <Image className='free-list-item-cycle-icon' src={item.icon === '' ? deviceIcon : item.icon} />
                <View className='free-list-item-cycle-detail'>
                  <View className='free-list-item-cycle-detail-app'>{item.name}</View>
                  <View className='free-list-item-cycle-detail-time'>{item.dayCostSeconds}</View>
                </View>
                {type === 'free' ?
                  <View className='free-list-item-menu'>
                    <View className='free-list-item-cycle-limit' onClick={this.onClickLimit.bind(this, item)}>限制</View>
                    <View className='free-list-item-cycle-stop' onClick={this.onClickStop.bind(this, item)}>禁用</View>
                    <View className='free-list-item-cycle-set' onClick={this.onClickSet.bind(this, item)}>设置</View>
                  </View>
                  :
                  type === 'limit' ?
                    <View className='free-list-item-menu'>
                      <View className='free-list-item-cycle-free' onClick={this.onClickFree.bind(this, item)}>自由</View>
                      <View className='free-list-item-cycle-stop' onClick={this.onClickStop.bind(this, item)}>禁用</View>
                      <View className='free-list-item-cycle-set' onClick={this.onClickSet.bind(this, item)}>设置</View>
                    </View>
                    :
                    type === 'stop' ?
                      <View className='free-list-item-menu'>
                        <View className='free-list-item-cycle-free' onClick={this.onClickFree.bind(this, item)}>自由</View>
                        <View className='free-list-item-cycle-limit' onClick={this.onClickLimit.bind(this, item)}>限制</View>
                        <View className='free-list-item-cycle-set' onClick={this.onClickSet.bind(this, item)}>设置</View>
                      </View>
                      :
                      <View className='free-list-item-menu'>
                        <View className='free-list-item-cycle-free' onClick={this.onClickFree.bind(this, item)}>自由</View>
                        <View className='free-list-item-cycle-limit' onClick={this.onClickLimit.bind(this, item)}>限制</View>
                        <View className='free-list-item-cycle-stop' onClick={this.onClickStop.bind(this, item)}>禁用</View>
                      </View>
                }
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
