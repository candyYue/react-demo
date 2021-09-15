import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const routeConfig = [
    {
      key:'sub1',
      title:'Navigation One',
      icon: <MailOutlined />,
      MenuItem:[
        {label: 'Option 1',key:1},
        {label: 'Option 2',key:2},
        {label: 'Option 3',key:3},
        {label: 'Option 4',key:4}
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
    {
      key:'sub3',
      title:'Navigation Three',
      icon: <SettingOutlined />,
      MenuItem:[
        {label: 'Option 9',key:9},
        {label: 'Option 10',key:10},
        {label: 'Option 11',key:11},
        {label: 'Option 12',key:12}
      ]
    },
  ]

  export default routeConfig