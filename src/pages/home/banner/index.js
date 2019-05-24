import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import defaultIcon from '@assets/default.png'
import childrenIcon from '@assets/children.png'
import jump from "@utils/jump";
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import {getGlobalData} from '@utils/global_data'
import './index.scss'

@connect(state => state.home, {...actions})
export default class SwiperBanner extends Component {

  onChangeSwipper = (e) => {
    this.props.onChangeSwipper(e.detail.current)
  }

  onClickAddKid = () => {
    const {kids,userInfo} = this.props
    if (userInfo.isManager == 0) {
      Taro.showToast({title: '对不起！您不是主管理员', icon: 'none'})
      return
    }
    if(userInfo.vipStatus === null || userInfo.vipStatus == 0) {
      Taro.showToast({title: '请先开通VIP', icon: 'none'})
      setTimeout(function() {
        Taro.navigateTo({url: '/pages/vip/vip'})
      }, 1500)
      return
    }
    if(kids.length >= 4) {
      Taro.showToast({title: '孩子已达上限', icon: 'none'})
      return
    }
    jump({url: '/pages/add-kid/add-kid'})
  }

  onClickSwitchKid = () => {
    const {list} = this.props
    if (list.length > 0) {
      jump({url: '/pages/switch-kid/switch-kid'})
    } else {
      Taro.showToast({title: '请先添加孩子', icon: 'none'})
    }
  }

  onClickIcon = () => {
    Taro.navigateTo({url: '/pages/device/device?bannerIndex=' + getGlobalData('bannerIndex')})
  }

  render() {
    const {list} = this.props
    return (
      <View className='home-banner'>
        <Image className='children-img' onClick={this.onClickSwitchKid} src={childrenIcon} />
        {list.length > 0
          ?
          (<Swiper
            className='home-banner__swiper'
            circular
            indicatorDots
            indicatorActiveColor='rgb(255,255,255)'
            current={getGlobalData('bannerIndex')}
            onChange={this.onChangeSwipper.bind(this)}
          >
            {list.map(item => (
              <SwiperItem key={item.id} className='home-banner__swiper-item'>
                <View className='home-banner__swiper-item-swiper-bg'>
                  <View className='home-banner__swiper-item-detail'>
                    {/*用户头像*/}
                    <View className='home-banner__swiper-item-detail-avatar'>
                      <Image className='home-banner__swiper-item-detail-avatar-img' src={defaultIcon} onClick={this.onClickIcon.bind(this)}/>
                    </View>
                    {/*设备详细信息*/}
                    <View className='home-banner__swiper-item-detail-info'>
                      <View className='home-banner__swiper-item-detail-info-os'>{item.nickname}</View>
                      <View className='home-banner__swiper-item-detail-info-online'>电量 {item.batteryPower}%
                        | {item.status === 0 ? '在线' :
                              item.status === 1 ? '离线' :
                                  item.status === 2 ? '托管' : ''
                      }</View>
                      <View className='home-banner__swiper-item-detail-info-app'>{item.appNum}APP
                        {/*| {item.appNum}警告*/}
                      </View>
                    </View>
                  </View>
                </View>
              </SwiperItem>
            ))}
            <SwiperItem>
              <View className='home-banner-add'>
                <View className='home-banner-add-item' onClick={this.onClickAddKid}>+ 添加孩子</View>
              </View>
            </SwiperItem>
          </Swiper>)
          :
          (<View className='home-banner-add'>
            <View className='home-banner-add-item' onClick={this.onClickAddKid}>+ 添加孩子</View>
          </View>)
        }
      </View>
    )
  }

}
