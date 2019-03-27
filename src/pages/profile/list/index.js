import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import rightIcon from '@assets/right.png'
import classNames from 'classnames'
import './index.scss'

export default class List extends Component{
  static defaultProps = {
    list: []
  }
  navToTimeSet = (item) => {
    Taro.navigateTo({
      url: item.url
    })
  }

  render() {
    const { list } = this.props
    return (
      <View className='profile-list'>
        {list.map((item, index) => {
          return (
            <View className={classNames('profile-list-item', {'profile-list-item--last' : index === list.length-1})} onClick={this.navToTimeSet.bind(this, item)}>
              <Image className='profile-list-item-icon' src={item.icon} />
              <View className='profile-list-item-title'>
                  {item.title}
              </View>
              <Image className='profile-list-item-img' src={rightIcon} />
            </View>
          )
        })}
      </View>
    )

  }
}
