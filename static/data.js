export const orderList = [{
		value: "AT+PDTS",
		text: "Start Test"
	},
	{
		value: "AT+RSTSP",
		text: "Restore Factory"
	},
	{
		value: "AT+REBOOT",
		text: "Reboot Device"
	},
	{
		value: "AT+PWSWST=0",
		text: "Shutdown Device"
	},
	{
		value: "AT+WRPID=?",
		text: "PID Query"
	},
	{
		value: "AT+DEVEUI=?",
		text: "ID Query"
	},
	{
		value: "AT+DEVINFO=?",
		text: "Firmware Query"
	},
	{
		value: "AT+ICCID=?",
		text: "ICCID Query"
	},
	{
		value: "AT+DATETIME=?",
		text: "RTC Query"
	},
	{
		value: "AT+BATVOL=?",
		text: "Voltage Query"
	},
	{
		value: "AT+ACCTHRE=?",
		text: "Threshold Query"
	},
	{
		value: "AT+STATUS=?",
		text: "Network Query"
	},
	{
		text: 'Enable Blinking',
		value: 'AT+DEVFD'
	},
	{
		text: 'Disable Blinking',
		value: 'AT+DEVFDAB'
	},
	{
		text: 'Activate Buzzer',
		value: 'AT+BUZZER=1'
	},
	{
		text: 'Deactivate Buzzer',
		value: 'AT+BUZZER=0'
	},
	{
		value: "AT+WFFCONF=?",
		text: "WiFi Query"
	},
	{
		value: "AT+WFFCONF=4,2,-91",
		text: "WiFi Setup"
	},
	{
		value: "AT+ENNBRP",
		text: "Enable Network"
	},
	{
		value: "AT+ENGNBRP",
		text: "Enable Positioning"
	},
	{
		value: "AT+SPTAR=0,3,60,2",
		text: "Real-time Mode"
	},
	{
		value: "AT+SPTAR=1,3,60,2",
		text: "Normal Mode"
	},
	{
		value: "AT+SPTAR=2,3,60,2",
		text: "Tracking Mode"
	},
	{
		value: "AT+SPTAR=0,3,1300,2",
		text: "5-minute Mode"
	},
	{
		value: "AT+SPTAR=0,3,1800,2",
		text: "Power-saving Mode"
	},
	{
		value: "AT+SPTAR=0,1,60,2",
		text: "GPS-only Mode"
	},
	{
		value: "AT+SPTAR=0,2,60,2",
		text: "WiFi-only Mode"
	},
	{
		value: "AT+SPTAR=4,3,1800,2",
		text: "30-minute Mode"
	},
	{
		value: "AT+RAULOG",
		text: "Read Logs"
	},
	{
		value: "AT+ENFPRT=1",
		text: "Enable Logs"
	},
	{
		value: "AT+RAULOG=2",
		text: "Clear Logs"
	},
	{
		value: "AT+ENFPRT=0",
		text: "Disable Logs"
	},
	{
		value: "AT+WRPKPS=?",
		text: "PK Query"
	},
	{
		value: "AT+NBATCMD=AT+QGMR",
		text: "Firmware Query"
	},
	{
		value: "AT+NBATCMD=AT+CSQ",
		text: "CATM Signal"
	},
	{
		value: "AT+NETSEL=?",
		text: "CATM Network"
	},
	{
		value: "AT+APNCONF=?",
		text: "APN Config"
	},
	{
		value: "AT+IOTSER=?",
		text: "Data Center"
	},
	{
		value: "AT+NBATCMD=AT+QIOTCFG=\"server\"",
		text: "Server Config"
	},
	{
		value: "AT+NBATCMD=AT+QIOTCFG=\"productinfo\"",
		text: "View Key"
	},
	{
		value: "AT+NETSEL=0",
		text: "Search Priority"
	},
	{
		value: "AT+NETSEL=?",
		text: "Network Mode"
	},
	{
		value: "AT+NETSEL=1",
		text: "NB Mode"
	},
	{
		value: "AT+NETSEL=2",
		text: "CATM Mode"
	},
	{
		value: "AT+IOTSER=1",
		text: "China Region"
	},
	{
		value: "AT+IOTSER=2",
		text: "Europe Region"
	},
	{
		value: "AT+IOTSER=3",
		text: "USA Region"
	},
	{
		value: "AT+NBATCMD=AT+CGDCONT?",
		text: "View APN"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"iotopmode\"",
		text: "Mode Query"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanmode\",0",
		text: "Scan Mode"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanseq\"",
		text: "Scan Query"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanseq\",020301",
		text: "CATM/NB/2G"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanseq\",030102",
		text: "NB/2G/CATM"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanseq\",010203",
		text: "2G/CATM/NB"
	},
	{
		value: "AT+NBATCMD=AT+QCFG=\"nwscanseq\",00",
		text: "Auto"
	}
]


export const orderList2 = [{
		text: '启动产测',
		value: 'AT+PDTS'
	},
	{
		text: '恢复出厂',
		value: 'AT+RSTSP'
	},
	{
		text: '设备重启',
		value: 'AT+REBOOT'
	},
	{
		text: '设备关机',
		value: 'AT+PWSWST=0'
	},
	{
		text: 'PID 查询',
		value: 'AT+WRPID=?'
	},
	{
		text: 'ID 查询',
		value: 'AT+DEVEUI=?'
	},
	{
		text: '固件查询',
		value: 'AT+DEVINFO=?'
	},
	{
		text: 'ICCID查询',
		value: 'AT+ICCID=?'
	},
	{
		text: 'RTC查询',
		value: 'AT+DATETIME=?'
	},
	{
		text: '电压查询',
		value: 'AT+BATVOL=?'
	},
	{
		text: '门限查询',
		value: 'AT+ACCTHRE=?'
	},
	{
		text: '网络查询',
		value: 'AT+STATUS=?'
	},
	{
		text: '闪灯',
		value: 'AT+DEVFD'
	},
	{
		text: '关灯',
		value: 'AT+DEVFDAB'
	},
	{
		text: '响铃',
		value: 'AT+BUZZER=1'
	},
	{
		text: '关闭',
		value: 'AT+BUZZER=0'
	},
	{
		text: 'wifi查询',
		value: 'AT+WFFCONF=?'
	},
	{
		text: 'wifi设置',
		value: 'AT+WFFCONF=4,2,-91'
	},
	{
		text: '联网',
		value: 'AT+ENNBRP'
	},
	{
		text: '定位',
		value: 'AT+ENGNBRP'
	},
	{
		text: '实时模式',
		value: 'AT+SPTAR=0,3,60,2'
	},
	{
		text: '普通模式',
		value: 'AT+SPTAR=1,3,60,2'
	},
	{
		text: '紧跟模式',
		value: 'AT+SPTAR=2,3,60,2'
	},
	{
		text: '5分钟',
		value: 'AT+SPTAR=0,3,300,2'
	},
	{
		text: '省电模式',
		value: 'AT+SPTAR=0,3,1800,2'
	},
	{
		text: '纯GPS',
		value: 'AT+SPTAR=0,1,60,2'
	},
	{
		text: '纯wifi',
		value: 'AT+SPTAR=0,2,60,2'
	},
	{
		text: '固定30分',
		value: 'AT+SPTAR=4,3,1800,2'
	},
	{
		text: '读取日志',
		value: 'AT+RAULOG'
	},
	{
		text: '日志开启',
		value: 'AT+ENFPRT=1'
	},
	{
		text: '日志清理',
		value: 'AT+RAULOG=2'
	},
	{
		text: '日志关闭',
		value: 'AT+ENFPRT=0'
	},
	{
		text: 'PK 查询',
		value: 'AT+WRPKPS=?'
	},
	{
		text: '固件查询',
		value: 'AT+NBATCMD=AT+QGMR'
	},
	{
		text: 'CATM 信号',
		value: 'AT+NBATCMD=AT+CSQ'
	},
	{
		text: 'CATM 网络',
		value: 'AT+NETSEL=?'
	},
	{
		text: 'APN 配置',
		value: 'AT+APNCONF=?'
	},
	{
		text: '数据选择',
		value: 'AT+IOTSER=?'
	},
	{
		text: '服务器',
		value: 'AT+NBATCMD=AT+QIOTCFG="server"'
	},
	{
		text: '查看秘钥',
		value: 'AT+NBATCMD=AT+QIOTCFG="productinfo"'
	},
	{
		text: '搜网顺序',
		value: 'AT+NETSEL=0'
	},
	{
		text: '网络查询',
		value: 'AT+NETSEL=?'
	},
	{
		text: 'NB 模式',
		value: 'AT+NETSEL=1'
	},
	{
		text: 'CATM模式',
		value: 'AT+NETSEL=2'
	},
	{
		text: '国内',
		value: 'AT+IOTSER=1'
	},
	{
		text: '欧洲',
		value: 'AT+IOTSER=2'
	},
	{
		text: '美国',
		value: 'AT+IOTSER=3'
	},
	{
		text: '查看APN',
		value: 'AT+NBATCMD=AT+CGDCONT?'
	},
	{
		text: '模式查询',
		value: 'AT+NBATCMD=AT+QCFG="iotopmode"'
	},
	{
		text: '搜网模式',
		value: 'AT+NBATCMD=AT+QCFG="nwscanmode",0'
	},
	{
		text: '搜网查询',
		value: 'AT+NBATCMD=AT+QCFG="nwscanseq"'
	},
	{
		text: '搜网顺序',
		value: 'AT+NBATCMD=AT+QCFG="nwscanseq",020103、AT+NBATCMD=AT+QCFG="nwscanseq",010203'
	}
]