import Taro, {Component} from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image} from '@tarojs/components'
import defaultIcon from '../assets/default.png'
import childrenIcon from '../assets/children.png'
import './index.scss'

export default class SwiperBanner extends Component{
  static defaultProps = {
    list: []
  }

  render() {
    const { list } = this.props
    return (
      <View className='home-banner'>
        <Image className='children-img' src={childrenIcon} />
        <Swiper className='home-banner__swiper'
          circular indicatorDots indicatorActiveColor='rgb(255,255,255)'
        >
          {list.map(item => (
            <SwiperItem key={item.id} className='home-banner__swiper-item'>
              <View className='home-banner__swiper-item-swiper-bg'>
                <View className='home-banner__swiper-item-detail'>
                  {/*用户头像*/}
                  <View className='home-banner__swiper-item-detail-avatar'>
                    <Image className='home-banner__swiper-item-detail-avatar-img' src={item.avatar ? item.avatar : defaultIcon}/>
                  </View>
                  {/*设备详细信息*/}
                  <View className='home-banner__swiper-item-detail-info'>
                    <View className='home-banner__swiper-item-detail-info-os'>{item.os}</View>
                    <View className='home-banner__swiper-item-detail-info-online'>电量 {item.battery}%  | { item.isOnline ? '在线' : '离线'  }</View>
                    <View className='home-banner__swiper-item-detail-info-app'>{item.appCount}APP | {item.waring}警告</View>
                  </View>
                </View>
              </View>

            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }

}
