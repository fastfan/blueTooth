<template>
	<view class="container">
		<view class="container-empty" :style="{ height: menuInfo.top + 'px' }"></view>
		<view class="container-box" :style="{ height: menuInfo.height + 'px' }">
			<uni-easyinput trim="all" v-model="inputValue" placeholder="请输入内容" @input="input"></uni-easyinput>
			<button
				class="btn2"
				size="mini"
				@click="sendOrder(inputValue)"
				:style="{ height: menuInfo.height + 'px', lineHeight: menuInfo.height + 'px' }"
			>
				发送
			</button>
			<view :style="{ width: menuInfo.width + 'px', height: menuInfo.height + 'px' }"></view>
		</view>
		<view class="title-content">当前链接：{{ connectedDevice.name ? connectedDevice.name : '' }}</view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control
				:current="current"
				:values="items"
				:style-type="styleType"
				:active-color="activeColor"
				@clickItem="onClickItem"
			/>
		</view>
		<view class="content">
			<view v-show="current === 0" class="tab-one">
				<button type="primary" class="btn" @click="startScan">扫描设备</button>
				<view class="tab-one-list">
					<view class="list-item" v-for="(item, index) in devices" :key="index">
						<view class="name">设备&nbsp;名称：{{ item.name }}</view>
						<view class="name">MAC地址：{{ item.deviceId }}</view>
						<view class="name">信号&nbsp;强度：{{ item.RSSI }}</view>
						<view class="color">
							状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
							<text :style="{ color: item.status == 0 ? '#666' : 'rgb(34 197 93)' }">
								{{ item.status == 0 ? '未连接' : '已连接' }}
							</text>
						</view>
						<view class="button">
							<button
								:style="{ background: item.status == 0 ? '#007aff' : '' }"
								:type="item.status == 0 ? 'primary' : 'warn'"
								size="mini"
								@click="connectDevice(item)"
							>
								{{ item.status == 0 ? '连接' : '断开连接' }}
							</button>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 1" class="tab-two">
				<view class="order-title">AT 指令调试</view>
				<!-- <view class="order-content">
					<uni-easyinput trim="all" v-model="inputValue" placeholder="请输入内容" @input="input"></uni-easyinput>
					<button class="btn2" size="mini" @click="sendOrder(inputValue)">发送</button>
				</view> -->
				<view class="order-list">
					<view class="title">常用查询</view>
					<uni-tag
						class="tag"
						v-for="(item, index) in commonTag"
						:key="item.text"
						:text="item.text"
						:inverted="true"
						type="primary"
						:circle="false"
						@click="clickTag(item)"
					></uni-tag>
				</view>
				<view class="order-list">
					<view class="title">快速设置</view>
					<uni-tag
						class="tag"
						v-for="(item, index) in easyTag"
						:key="item.text"
						:text="item.text"
						:inverted="true"
						type="primary"
						:circle="false"
						@click="clickTag(item)"
					></uni-tag>
				</view>
				<view class="order-list">
					<view class="title">历史指令</view>
					<view style="display: flex; flex-wrap: wrap">
						<view
							v-for="(item, index) in historyTag"
							:key="item.text"
							style="position: relative; margin-right: 0; margin-bottom: 0"
						>
							<uni-tag
								class="tag"
								:text="item.text"
								:inverted="true"
								type="default"
								:circle="false"
								@click="clickTag(item)"
							></uni-tag>
							<uni-icons
								@click="deleteTag(index)"
								type="clear"
								size="20"
								style="position: absolute; right: 2rpx; top: -20rpx"
							></uni-icons>
						</view>
					</view>
				</view>
				<view class="order-list-current">
					<view class="item" v-for="(item, index) in orderList" :key="index">
						<view class="time">{{ item.time }}</view>
						<view class="contents">
							<view class="type" :style="{ background: item.type == 'send' ? '#007aff' : 'rgb(34,197,94)' }">
								{{ item.type == 'send' ? '发送' : '接收' }}
							</view>
							<view class="anser">{{ item.anser }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 2">
				<view class="order-list">
					<view class="title">OTA升级</view>
					<view class="ota">
						<view class="ota-item">
							<view>当前版本</view>
							<view>v1.2.3</view>
						</view>
						<view class="ota-item">
							<view>最新版本</view>
							<view>v1.2.4</view>
						</view>
						<button class="btn2" size="mini" @click="startLevel">开始升级</button>
					</view>
					<view class="progress">
						<view class="process-line">
							<view class="blue-progress" :style="{ width: progress }"></view>
							<view class="gray-progress"></view>
						</view>
						<view class="process-text">{{ progress }}</view>
					</view>
				</view>
			</view>
			<view v-show="current === 3">
				<view class="order-list" style="background: #fff; padding-bottom: 24rpx; max-height: 600rpx">
					<view class="title">日志记录</view>
					<view class="search-bar">
						<uni-datetime-picker class="search-item" v-model="rangeTime" type="daterange" @maskClick="maskClick" />
					</view>
					<view class="search-bar">
						<uni-data-select
							class="search-item"
							v-model="recordValue"
							:localdata="range"
							@change="recordChange"
						></uni-data-select>
						<uni-search-bar
							class="search-item"
							radius="5"
							placeholder="自动显示隐藏"
							clearButton="auto"
							cancelButton="none"
							@confirm="search"
							v-model="searchValue"
						/>
					</view>
					<uni-table ref="table" border stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th align="center">时间</uni-th>
							<uni-th align="center">类型</uni-th>
							<uni-th align="center">内容</uni-th>
							<uni-th align="center">状态</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in tableData" :key="index">
							<uni-td>{{ item.date }}</uni-td>
							<uni-td>
								{{ item.type }}
							</uni-td>
							<uni-td>
								{{ item.content }}
							</uni-td>
							<uni-td>{{ item.status }}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { bluetoothInitCode, ab2hex, hexCharCodeToStr } from '@/utils/util.js'
export default {
	data() {
		return {
			menuInfo: uni.getMenuButtonBoundingClientRect(),
			current: 0,
			items: ['设备连接', 'AT指令', 'OTA升级', '日志记录'],
			activeColor: '#007aff',
			styleType: 'button',
			devices: [], // 设备列表
			connectedDevice: {},
			services: [], // 设备服务列表
			inputValue: '',
			orderList: [
				{
					time: '2025.05.17 14:00:00',
					type: 'send',
					anser: 'AT+STATUS?'
				},
				{
					time: '2025.05.17 14:05:00',
					type: 'RECEIVE',
					anser: 'STATUS: ONLINE, BATTERY: 85%, GPS: FIXED'
				}
			],
			commonTag: [
				{ text: '查询IMEI', value: 'AT+IMEI?' },
				{ text: '查询ICCID', value: 'AT+IMEI?' },
				{ text: '固件版本', value: 'AT+WIFISCAN' },
				{ text: '网络状态', value: 'AT+WIFISCAN' },
				{ text: 'APN查询', value: 'AT+WIFISCAN' },
				{ text: '服务器', value: 'AT+WIFISCAN' }
			],
			easyTag: [
				{ text: 'WIFI定位', value: 'AT+IMEI?' },
				{ text: 'GPS定位', value: 'AT+IMEI?' },
				{ text: '启动定位', value: 'AT+IMEI?' },
				{ text: '设备重启', value: 'AT+IMEI?' },
				{ text: '恢复出厂', value: 'AT+IMEI?' }
			],
			historyTag: [
				{ text: 'AT+IMEI?', value: 'AT+IMEI?' },
				{ text: 'AT+CSQ?', value: 'AT+CSQ?' },
				{ text: 'AT+RESET', value: 'AT+RESET' },
				{ text: 'AT+APN?', value: 'AT+APN?' },
				{ text: 'AT+WIFISCAN', value: 'AT+WIFISCAN' }
			],
			progress: '70%',
			searchValue: '',
			recordValue: 0,
			range: [
				{ value: 0, text: '全部类型' },
				{ value: 1, text: '连接日志' },
				{ value: 2, text: '指令日志' },
				{ value: 3, text: '升级日志' }
			],
			rangeTime: [],
			tableData: [
				{
					date: '2025.03.12 14:00:00',
					type: '升级日志',
					content: '设备 00:11:22:33:44:55 连接成功',
					status: '成功'
				},
				{
					date: '2025.03.12 14:00:00',
					type: '升级日志',
					content: '设备 00:11:22:33:44:55 连接成功',
					status: '成功'
				},
				{
					date: '2025.03.12 14:00:00',
					type: '升级日志',
					content: '设备 00:11:22:33:44:55 连接成功',
					status: '成功'
				}
			]
		}
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex
			}
		},
		// 【1】开始扫描
		startScan() {
			let that = this
			that.devices = [] // 清空设备列表
			that.connectedDevice = {}
			uni.openBluetoothAdapter({
				success(res) {
					console.log('蓝牙适配器初始化成功', res)
					uni.stopBluetoothDevicesDiscovery() //停止扫描附近蓝牙
					uni.startBluetoothDevicesDiscovery({
						success: (res) => {
							console.log('开始扫描', res)
							uni.showLoading({
								mask: true,
								title: '正在搜索设备'
							})
							that.listenDevices()
						},
						fail: (err) => {
							console.error('扫描失败', err)
							uni.showToast({
								title: bluetoothInitCode.get(err.errCode),
								icon: 'none'
							})
						}
					})
				},
				fail(err) {
					console.error('蓝牙初始化失败', err)
					uni.showToast({
						title: bluetoothInitCode.get(err.errCode),
						icon: 'none'
					})
				}
			})
		},
		// 【2】监听扫描找到新设备就触发该方法
		listenDevices() {
			uni.onBluetoothDeviceFound((res) => {
				console.log('res::::', res)
				const device = res.devices[0]
				if (device && !this.devices.some((d) => d.deviceId === device.deviceId)) {
					this.devices.push({ ...device, name: device.name ? device.name : '未知设备', status: 0 }) // 添加到设备列表
					uni.hideLoading()
				}
			})
		},
		// 【3】设备连接
		connectDevice(device) {
			console.log('this.connectedDevice::::::', this.connectedDevice)
			console.log('device::::::', device)
			const _this = this
			if (device.status == 0) {
				// 连接
				if (_this.connectedDevice.deviceId && _this.connectedDevice.deviceId != device.deviceId) {
					uni.showToast({ title: '请先断开其它设备连接！', icon: 'none' })
					return
				}
				uni.showLoading({
					mask: true,
					title: '连接中...'
				})
				uni.createBLEConnection({
					deviceId: device.deviceId,
					success: (res) => {
						console.log('连接成功', res)
						_this.connectedDevice = device
						device.status = 1
						uni.setStorageSync('deviceId', device.deviceId) //将蓝牙id存入缓存
						console.log('deviceId:' + uni.getStorageSync('deviceId')) //打印
						uni.stopBluetoothDevicesDiscovery() //停止扫描附近蓝牙
						setTimeout(() => {
							uni.showToast({ title: '连接成功', icon: 'success' })
						}, 1000)
					},
					fail: (err) => {
						console.error('连接失败', err)
						uni.hideLoading()
						setTimeout(() => {
							uni.showToast({ title: bluetoothInitCode.get(err.errCode), icon: 'none' })
						}, 1000)
					}
				})
			} else {
				// 断开连接
				this.closeBlueTooth(device)
			}
		},
		// 【4】获取蓝牙服务（获取设备提供的服务才能通过蓝牙进行数据读写）
		getServices() {
			uni.getBLEDeviceServices({
				deviceId: this.connectedDevice.deviceId, // 设备ID
				success(res) {
					console.log(res)
					// {
					//     "services": [{
					//         "uuid": "00001800-0000-1000-8000-00805F9B34FB",
					//         "isPrimary": true
					//     }, {
					//         "uuid": "00001801-0000-1000-8000-00805F9B34FB",
					//         "isPrimary": true
					//     }, {
					//         "uuid": "0000180A-0000-1000-8000-00805F9B34FB",
					//         "isPrimary": true
					//     }, {
					//         "uuid": "0000FFF0-0000-1000-8000-00805F9B34FB",
					//         "isPrimary": true
					//     }, {
					//         "uuid": "0000FFE0-0000-1000-8000-00805F9B34FB",
					//         "isPrimary": true
					//     }],
					//     "errMsg": "getBLEDeviceServices:ok"
					// }
					// characteristics 字段里保存了该服务的所有特征值，上面的设备这个服务只有1个特征值，并且读、写、消息推送都为 true。
					// 设备可能不止一条特征值，需要监听那条特征值这需要和硬件佬协商的（通常也是硬件佬直接和你说要监听哪条）。
				},
				fail(err) {
					console.error(err)
				}
			})
		},
		// 【5】获取设备特征值
		getCharacteristics() {
			uni.getBLEDeviceCharacteristics({
				deviceId: this.connectedDevice.deviceId, // 设备ID
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID
				success(res) {
					console.log(res)
					// {
					//     "characteristics": [{
					//         "uuid": "0000FFE1-0000-1000-8000-00805F9B34FB",
					//         "properties": {
					//             "read": true,
					//             "write": true,
					//             "notify": true,
					//             "indicate": false
					//         }
					//     }],
					//     "errMsg": "getBLEDeviceCharacteristics:ok"
					// }
				},
				fail(err) {
					console.error(err)
				}
			})
		},
		// 【6】开启消息监听
		notify() {
			uni.notifyBLECharacteristicValueChange({
				deviceId: this.connectedDevice.deviceId, // 设备ID
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID
				characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值
				success(res) {
					console.log(res)
					// 接受消息的方法
					listenValueChange()
				},
				fail(err) {
					console.error(err)
				}
			})
		},
		// 【7】监听消息变化
		listenValueChange() {
			uni.onBLECharacteristicValueChange((res) => {
				// 结果
				console.log(res)
				// {
				//     "deviceId": "B4:10:7B:C4:83:14",
				//     "serviceId": "0000FFE0-0000-1000-8000-00805F9B34FB",
				//     "characteristicId": "0000FFE1-0000-1000-8000-00805F9B34FB",
				//     "value": {}
				// }
				// 结果里有个value值，该值为 ArrayBuffer 类型，所以在控制台无法用肉眼观察到，必须将该值转换为16进制
				let resHex = ab2hex(res.value)
				console.log(resHex)
				// 最后将16进制转换为ascii码，就能看到对应的结果
				let result = hexCharCodeToStr(resHex)
				console.log(result)
			})
		},
		// 【8】发送数据
		send() {
			// 从微信小程序 提供的蓝牙api 来看
			// uni.writeBLECharacteristicValue：向低功耗蓝牙设备特征值中写入二进制数据，这个 api 是可以发送一些数据给蓝牙设备，但发送的值要转成 ArrayBuffer 。
			// 向蓝牙设备发送一个0x00的16进制数据
			let msg = 'hello'
			const buffer = new ArrayBuffer(msg.length)
			const dataView = new DataView(buffer)
			// dataView.setUint8(0, 0)
			for (var i = 0; i < msg.length; i++) {
				dataView.setUint8(i, msg.charAt(i).charCodeAt())
			}
			uni.writeBLECharacteristicValue({
				deviceId: this.connectedDevice.deviceId, // 设备ID
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID
				characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值
				value: buffer,
				success(res) {
					console.log('writeBLECharacteristicValue success', res.errMsg)
					//数据向外成功发送了，但不代表设备一定就收到了。通常设备收到你发送过去的信息，会返回一条消息给你，而这个回调消息会在 uni.onBLECharacteristicValueChange 触发，但这是蓝牙设备那边控制的，需要设备那边给回馈
					uni.showToast({
						title: 'write指令发送成功'
					})
				},
				fail(err) {
					console.error(err)
					uni.showToast({
						title: 'write指令发送失败',
						icon: 'error'
					})
				}
			})
		},
		// 【9】读取数据
		read() {
			uni.readBLECharacteristicValue({
				deviceId: this.connectedDevice.deviceId,
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID
				characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值
				success(res) {
					console.log(res)
					uni.showToast({
						title: 'read指令发送成功'
					})
				},
				fail(err) {
					console.error(err)
					uni.showToast({
						title: 'read指令发送失败',
						icon: 'error'
					})
				}
			})
		},
		// 断开蓝牙
		closeBlueTooth(device) {
			const _this = this
			uni.closeBLEConnection({
				deviceId: _this.connectedDevice.deviceId,
				success(res) {
					console.log(res)
					_this.connectedDevice = {}
					device.status = 0
					uni.showToast({
						title: '断开蓝牙连接成功'
					})
					uni.removeStorageSync('deviceId')
				},
				fail(err) {
					console.error(err)
					uni.showToast({
						title: bluetoothInitCode.get(err.errCode),
						icon: 'error'
					})
				}
			})
		},
		// 发送指令
		sendOrder(value) {
			if (!value) {
				uni.showToast({
					title: '请输入指令！',
					icon: 'none'
				})
				return
			} else if (!this.connectedDevice.deviceId) {
				uni.showToast({
					title: '请连接设备！',
					icon: 'none'
				})
				return
			}
			uni.showToast({
				title: '发送成功',
				icon: 'success'
			})
		},
		clickTag(item) {
			this.sendOrder(item.value)
		},
		startLevel() {
			uni.showToast({
				title: '开始升级',
				icon: 'none'
			})
		},
		search() {},
		recordChange() {},
		maskClick(e) {
			console.log('maskClick事件:', e)
		},
		deleteTag(index) {
			this.historyTag.splice(index, 1)
		}
	}
}
</script>

<style lang="scss">
.container {
	padding: 0 10px 20px 10px;
	font-size: 14px;
	line-height: 24px;
	overflow: hidden;
	.uni-easyinput__content-input {
		height: 32px;
	}
	.container-box {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	.btn2 {
		background: #007aff;
		color: #fff;
		margin-left: 24rpx;
		height: 32px;
		line-height: 32px;
	}
	.title-content {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		height: 80rpx;
		margin-bottom: 24rpx;
	}
	.content {
		margin-top: 20rpx;
		.tab-one-list {
			overflow-y: scroll;
			height: 1050rpx;
			.list-item {
				background: #fff;
				margin-bottom: 24rpx;
				padding: 24rpx;
				border-radius: 24rpx;
				.button {
					text-align: right;
				}
			}
		}
		.btn {
			background: #007aff;
			margin-bottom: 24rpx;
		}
		.tab-two {
			overflow-y: scroll;
			height: 1170rpx;
		}
		.order-title {
			font-size: 42rpx;
			font-weight: 500;
			margin-bottom: 24rpx;
		}
		.order-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.order-list {
			background: rgb(249, 250, 251);
			padding: 24rpx 24rpx 0;
			margin-bottom: 24rpx;
			max-height: 244rpx;
			overflow-y: scroll;
			.title {
				margin-bottom: 24rpx;
			}
			.tag {
				.uni-tag {
					margin-bottom: 24rpx;
					margin-right: 24rpx;
					display: inline-block;
					:nth-child(4n) {
						margin-right: 0;
					}
				}
			}
		}
		.order-list-current {
			background: #fff;
			padding: 24rpx;
			.item {
				margin-bottom: 12rpx;
				.time {
				}
				.contents {
					display: flex;
					.type {
						width: 72rpx;
						height: 50rpx;
						margin-right: 10rpx;
						color: #fff;
						text-align: center;
					}
					.anser {
						flex: 1;
					}
				}
			}
		}
		.ota {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.ota-item {
				flex: 1;
			}
		}
		.progress {
			display: flex;
			align-items: baseline;
			.process-line {
				flex: 1;
				position: relative;
				height: 39rpx;
				.blue-progress {
					height: 20rpx;
					border-radius: 10rpx;
					position: absolute;
					bottom: 0;
					background: #007aff;
					z-index: 1;
				}
				.gray-progress {
					width: 100%;
					height: 20rpx;
					border-radius: 10rpx;
					background: #eee;
					margin: 20rpx 0;
				}
			}
			.process-text {
				width: 70rpx;
				text-align: right;
			}
		}
		.search-bar {
			display: flex;
			margin-bottom: 24rpx;
			.search-item {
				flex: 1;
				margin-right: 10rpx;
				&:last-child {
					margin-right: 0;
				}
				.uni-searchbar {
					padding: 0;
				}
			}
		}
	}
}
</style>
