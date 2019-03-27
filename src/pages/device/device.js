import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Image} from "@tarojs/components"
import { AtTabs, AtTabsPane } from "taro-ui";
import {getWindowHeight} from "@utils/style";
import DefaultAvatar from '@assets/default-avatar.png'

import './device.scss'

export default class Device extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTabIndex: 0,
      gender: ['男', '女'],
      relation: ['父子', '母子', '父女', '母女', '爷孙'],
      period: ['幼儿园', '小学', '初中', '高中'],
      birthday: ''
    }
  }

  handleTabsClick (stateName, value) {
    this.setState({
      [stateName]: value,
    })
  }

  onDateChange = (e) => {
    this.setState({
      birthday: e.detail.value
    })
  }

  render() {
    const { currentTabIndex } = this.state
    const devices = [
      {id:1, title:'设备1', avatar: DefaultAvatar, nickname: 'iPhone7', phone: '', birthday: '2018-04-01', gender: '男', relation_name: '父子', region_name: '', period: '小学', token: '545167', status: 1},
      {id:2, title:'设备2', avatar: DefaultAvatar, nickname: '大红', phone: '15637261076', birthday: '', gender: '女', relation_name: '母女', region_name: '', period: '幼儿园', token: '545168', status: 0},
      {id:3, title:'设备3', avatar: DefaultAvatar, nickname: '小名', phone: '', birthday: '', gender: '', relation_name: '', region_name: '', period: '', token: '545169', status: 1},
    ]
    const currentDevice = devices[currentTabIndex]
    return (
      <View className='device' >
        <AtTabs scroll current={currentTabIndex} tabList={devices}  onClick={this.handleTabsClick.bind(this, 'currentTabIndex')} />
          <AtTabsPane current={currentTabIndex} index={currentTabIndex}>
            <View className='device-info' style={{height: getWindowHeight()}}>
              <View className='view-avatar'>
                <View className='view-avatar-title'>设置头像</View>
                <Image className='view-avatar-img' src={DefaultAvatar} />
              </View>
              <View className='view-input'>
                <View className='view-input-title'>孩子昵称</View>
                <Input
                  className='view-input-content'
                  placeholder={currentDevice.nickname ? currentDevice.nickname : '请输入孩子昵称'}
                />
              </View>
              <View className='view-input'>
                <View className='view-input-title'>设备手机号</View>
                <Input
                  className='view-input-content'
                  placeholder={currentDevice.phone ? currentDevice.phone : '请输入手机号'}
                />
              </View>
              <View className='view-input'>
                <View className='view-input-title'>孩子生日</View>
                  <Picker className='view-input-picker' mode='date' onChange={this.onDateChange}>
                    {currentDevice.birthday ? currentDevice.birthday : '请选择'}
                </Picker>
              </View>
              <View className='view-input'>
                <View className='view-input-title'>孩子性别</View>
                  <Picker className='view-input-picker' mode='selector' range={this.state.gender} onChange={this.onDateChange}>
                    {currentDevice.gender ? currentDevice.gender : '请选择'}
                </Picker>
              </View>
              <View className='view-input'>
                <View className='view-input-title'>与孩子关系</View>
                  <Picker className='view-input-picker' mode='selector' range={this.state.relation} onChange={this.onDateChange}>
                    {currentDevice.relation_name ? currentDevice.relation_name : '请选择'}
                </Picker>
              </View>
              <View className='view-input'>
                <View className='view-input-title'>所在地区</View>
                <Input
                  className='view-input-content'
                  placeholder={currentDevice.region_name ? currentDevice.region_name : '请输入孩子所在省市'}
                />
              </View>
              <View className='view-input'>
                <View className='view-input-title'>学段</View>
                <Picker className='view-input-picker' mode='selector' range={this.state.period} onChange={this.onDateChange}>
                  {currentDevice.period ? currentDevice.period : '请选择'}
                </Picker>
              </View>
              <View className='device-token'>
                <View className='view-input'>
                  <View className='view-input-title'>管控密码</View>
                  <Input
                    disabled
                    className='view-input-content'
                    placeholder={currentDevice.token}
                  />
                </View>
                <View className='view-input'>
                  <View className='view-input-title'>状态</View>
                  <Input
                    disabled
                    className='view-input-content'
                    placeholder={currentDevice.status === 1 ? '在线' : '离线'}
                  />
                </View>
              </View>
              <View className='save-button'>保存</View>
            </View>
          </AtTabsPane>
      </View>
    );
  }

}
