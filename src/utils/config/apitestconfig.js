import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const routeConfig = [
    {
      key:'sub1',
      title:'Navigation One',
      icon: <MailOutlined />,
      MenuItem:[
        {
          label: '热门视频',
          apiname:'getHotVideo',
          key:1, 
          url:'http://apis.juhe.cn/juheapi/fapig/douyin/billboard',
          defaultparams: [
            {
              key: 'key',
              value: '259f32a384e02f36cf4e83d0745993f1',
              required:true
            },
            {
              key: 'type',
              value: 'hot_video',
              required:false
            },
          ]
        },
        {
          label: '驾照题库',
          apiname:'getDrivingTest',
          key:2,
          url:'http://v.juhe.cn/juheapi2/jztk/query',
          defaultparams: [
            {
              key: 'key',
              value: '9efba767fb119364e2ebe8b3677c1cac',
              required:true
            },
            {
              key: 'subject',
              value: 1,
              inputType:'select',
              required:true
            },
            {
              key: 'model',
              value: 'c1',
              inputType:'select',
              required:true
            },
            {
              key: 'testType',
              value: 'rand',
              required:false
            },
          ]
        },
      ]
    },
    {
      key:'sub2',
      title:'Navigation Two',
      icon: <AppstoreOutlined />,
      MenuItem:[
        {label: 'Option 5',key:5},
        {label: 'Option 6',key:6},
        {label: 'Option 7',key:7},
        {label: 'Option 8',key:8}
      ]
    },
  ]

  export default routeConfig