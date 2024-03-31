const baseUrl="http://192.168.95.1:8083";

const request=(option={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: '',
			data: {},
			header: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			},
			method: '3|GET,POST|',
			sslVerify: 4|true,false|,
			success: ({ data, statusCode, header }) => {},
			fail: (error) => {}
		})
	})
}