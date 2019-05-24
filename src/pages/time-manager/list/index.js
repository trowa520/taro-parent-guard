import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
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
    return (
      <View className='list'>
        {list.map((item, index) => {
          return (
            <View className='list-item' onClick={this.navToTimeSet.bind(this, item, index)}>
              <View className='list-item-cycle'>
                <View className='list-item-time'>
                  {item.begin_at}-{item.end_at}
                </View>
                <View className='list-item-date'>
                  {item.weekdays.map((item) => {
                    return (
                      item == 1 ? '周一 ' :
                        item == 2 ? '周二 ' :
                          item == 3 ? '周三 ':
                            item == 4 ? '周四 ' :
                              item == 5 ? '周五 ' :
                                item == 6 ? '周六 ' :
                                  item == 0 ? '周日 ' : ''
                    )
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
