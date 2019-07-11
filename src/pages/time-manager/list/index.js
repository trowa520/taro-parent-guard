import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import rightIcon from '@assets/right.png'
import {connect} from "@tarojs/redux";
import * as actions from "@actions/time_manager"
import './index.scss'

@connect(state => state.time_manager, {...actions})
export default class List extends Component {
  static defaultProps = {
    list: []
  }
  navToTimeSet = (item, index) => {
    const {appId} = this.props
    let param = JSON.stringify(item)
    Taro.navigateTo({url: '/pages/time-set/time-set?edit_index='+ index+'&item=' + encodeURIComponent(param) + '&appId=' + appId })
  //  url: `/pages/time-set/time-set?item_id=${item.id}&begin_at=${item.interval.begin_at}&end_at=${item.interval.end_at}&date=${item.weekdays}`
  }

  render() {
    const {list} = this.props
    let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return (
      <View className='list'>
        {!!list && list.map((item, index) => {
          return (
            <View className='list-item' onClick={this.navToTimeSet.bind(this, item, index)}>
              <View className='list-item-cycle'>
                <View className='list-item-time'>{item.begin_at}-{item.end_at}</View>
                <View className='list-item-date'>
                  {!!item.weekdays && item.weekdays.map((it) => {
                    return (<Text>{days[it]}</Text>)
                  })}
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
