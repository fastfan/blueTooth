// 初始化蓝牙：uni.openBluetoothAdapter 
// 开启搜寻功能：uni.startBluetoothDevicesDiscovery
// 监听搜寻到新设备：uni.onBluetoothDeviceFound
// 获取设备ID：根据 uni.onBluetoothDeviceFound 回调，拿到设备ID
// 连接设备：使用设备ID进行连接 uni.createBLEConnection
// 停止搜索：uni.stopBluetoothDevicesDiscovery
// 获取蓝牙设备服务：uni.getBLEDeviceServices
// 获取特征值：uni.getBLEDeviceCharacteristics
// 开启消息监听：uni.notifyBLECharacteristicValueChange
// 接收消息监听传来的数据：uni.onBLECharacteristicValueChange

// ArrayBuffer转16进度字符串示例
export const ab2hex = function(buffer) {
	const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
		return ('00' + bit.toString(16)).slice(-2)
	})
	return hexArr.join('')
}
// 将16进制的内容转成我们看得懂的字符串内容
export const hexCharCodeToStr = function(hexCharCodeStr) {
	var trimedStr = hexCharCodeStr.trim()
	var rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
	var len = rawStr.length
	if (len % 2 !== 0) {
		alert('存在非法字符!')
		return ''
	}
	var curCharCode
	var resultStr = []
	for (var i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16)
		resultStr.push(String.fromCharCode(curCharCode))
	}
	return resultStr.join('')
}
export const bluetoothInitCode = new Map([
	[10000, '未初始化蓝牙适配器'],
	[10001, '当前蓝牙适配器不可用'],
	[10002, '没有找到指定设备'],
	[10003, '连接失败'],
	[10004, '没有找到指定服务'],
	[10005, '没有找到指定特征值'],
	[10006, '当前连接已断开'],
	[10007, '当前特征值不支持此操作'],
	[10008, '其余所有系统上报的异常'],
	[10009, '系统版本低于 4.3 不支持 BLE'],
	[10010, '已连接'],
	[10011, '配对设备需要配对码'],
	[10012, '连接超时'],
	[10013, '连接 deviceId 为空或者是格式不正确']
])