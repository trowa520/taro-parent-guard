import Taro, { Component } from '@tarojs/taro'
import { getWindowHeight } from '@utils/style'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchAddLockDate } from '@actions/time_manager'
import './time-manager.scss'
import Tab from './tab'
import List from './list'
import TimeLengthList from './time-lenght-list'
import Lock from './lock'


@connect(state => state.time_manager, {dispatchAddLockDate})
export default class Index extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    lockDates: [],
    dates: [
      {
        num: 7,
        name: '日',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 1,
        name: '一',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 2,
        name: '二',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 3,
        name: '三',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 4,
        name: '四',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 5,
        name: '五',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      },{
        num: 6,
        name: '六',
        hours:[
          {id: 0,isChecked: false}, {id: 1,isChecked: false},{id: 2,isChecked: false},{id: 3, isChecked: false},{id: 4, isChecked: false},{id: 5, isChecked: false},
          {id: 6, isChecked: false},{id: 7, isChecked: false},{id: 8, isChecked: false},{id: 9, isChecked: false},{id: 10, isChecked: false},{id: 11, isChecked: false},
          {id: 12, isChecked: false},{id: 13, isChecked: false},{id: 14, isChecked: false},{id: 15, isChecked: false},{id: 16, isChecked: false},{id: 17, isChecked: false},
          {id: 18, isChecked: false},{id: 19, isChecked: false},{id: 20, isChecked: false},{id: 21, isChecked: false},{id: 22, isChecked: false},{id: 23, isChecked: false},
        ],
      }
    ],
    currentDay:{},     // 当前日期
    current: 1, // 顶部tab 默认选择的位置
    tabs : [
      {
        id: 0,
        name: '受限制应用时间管理'
      },
      {
        id: 1,
        name: '锁屏时间管理'
      }
    ],
    list: [
      {
        id: 1,
        begin_at: '19:00',
        end_at: '22:00',
        date: '周一，周二，周三，周四，周五'
      },{
        id: 2,
        begin_at: '07:00',
        end_at: '10:00',
        date: '周-，周二，周五'
      },{
        id: 3,
        begin_at: '13:00',
        end_at: '15:00',
        date: '周二，周三，周四，周五'
      },
    ],
    lengthList: [
      {
        length: 10
      },
      {
        length: 30
      }
    ]
  }

  config = {
    navigationBarTitleText: '时间管理'
  }

  componentWillMount() {
    let day = new Date().getDay()
    let currentDay = this.state.dates[day]
    this.setState({
      currentDay: currentDay
    })
  }

  // 改变当前选择的日期
  onChangeCurrentDay = (currentDay, dates) => {
    this.setState({
      dates: dates,
      currentDay: currentDay
    })
  }

  // 改变当前选择的时间
  onCheckedHour = (selectedHour, dates) => {
    this.updateHourStatus(selectedHour, dates)
  }

  // 更新选中状态
  updateHourStatus = (selectedHour, dates) => {
    var that = this
    let { hour, isChecked } = selectedHour
    let { currentDay } = this.state
    dates.forEach(item => {
      if (item.num === currentDay.num) {
        item.hours.forEach((it, i) => {
          if(hour === i) {
            it.isChecked = isChecked
          }
        })
        currentDay.hours.forEach((it, i) => {
          if(hour === i) {
            it.isChecked = isChecked
          }
        })
      }
    })
    console.log(currentDay.num)

    if (isChecked) {
      that.setState({
        dates: dates,
        lockDates: that.state.lockDates.concat(currentDay)
      })
    } else {
      that.setState({
        dates: dates,
        lockDates: that.state.lockDates.filter(item => item.id !== currentDay.id)
      })
    }
  }

  handleMenu = (index) => {
    // const tab = this.state.tabs[index]
    this.setState({current: index})
  }

  handleChange = (e) => {
    const { current } = e.detail
    this.setState({current: current})
  }

  render () {
    const { tabs, current, currentDay, dates } = this.state
    const height = getWindowHeight(false)
    return (
      <View className='time-manager'>
        <View className='time-manager-line-view'>
        </View>
        <View className='time-manager__menu'>
          <Tab
            list={tabs}
            current={current}
            onChange={this.handleMenu}
          />
              <Swiper
                className='time-manager__swiper'
                current={current}
                onChange={this.handleChange}
                style={{ height }}
              >
            {tabs.map((item) => {
              return (
                <SwiperItem
                  className='time-manager__swiper-item'
                  key={item.id}
                >
                  <View className='time-manager__swiper-item-view1' hidden={current !== 0}>
                    <View className='time-manager__swiper-item-view1-set'>
                      <View className='time-manager__swiper-item-view1-tips'> </View>
                      <View className='time-manager__swiper-item-view1-top'>
                        时间段限制
                      </View>
                      <List list={this.state.list} />
                      <View className='time-manager__swiper-item-view1-set-bottom'>
                        + 添加时间段
                      </View>
                    </View>
                    <View className='time-manager__swiper-item-view1-time-length'>
                      <View className='time-manager__swiper-item-view1-top'>
                        每日时长限制
                      </View>
                      <TimeLengthList list={this.state.lengthList} />
                    </View>
                  </View>
                  <View className='time-manager__swiper-item-view2' hidden={current !== 1}>
                    <Lock
                      onSelectHour={this.onCheckedHour.bind(this)}
                      onChangeCurrentDay={this.onChangeCurrentDay.bind(this)}
                      dates={dates}
                      currentDay={currentDay}
                    />
                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
      </View>
    )
  }
}

