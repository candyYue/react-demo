import React, {Component, useContext, useEffect, useState} from 'react';
import * as echarts from 'echarts'
import 'echarts/map/js/china';
import geoJson from '../../utils/china.json';
import {geoCoordMap,provienceData,provienceObj} from "../../utils/geo";
import {getRisk,getRiskArea} from '../../request/action'
import {context} from '../../App'

function EchartMap(){
    const [ provienceData ,setprovienceData] = useState([])


    const {maptype,state,dispatch} = useContext(context)

    
    
    useEffect(()=>{
        getRisk().then(res=>{
            const chinadata = JSON.parse(res.data)
            chinadata.areaTree[0].children.forEach(v => {
                v.area = provienceObj[v.name]
            });
            console.log(chinadata)
            // setlastUpdateTime(chinadata.lastUpdateTime)
            setprovienceData(chinadata.areaTree[0].children)
            dispatch({type:'updatetime',time:chinadata.lastUpdateTime})
            dispatch({type:'updatechinadata',chinadata:chinadata})
            getRiskArea(res=>{
                console.log(res)
            })
        })
    }, [])// eslint-disable-line

    useEffect(()=>{
        initalECharts()
    }, [provienceData,maptype])// eslint-disable-line

    const setMapColor = ()=>{
        const data = provienceData;
        if(maptype === 2){
            for(let item of data){
                if(0 <= item.total.confirm && item.total.confirm< 10){
                    item.itemStyle = {
                        normal: {
                            areaColor: "#FFE4E1",
                        },
                        emphasis: {
                            areaColor: "#FFE4E1",
                        }
                    }
                }else if(10<=item.total.confirm&& item.total.confirm<100){
                    item.itemStyle = {
                        normal: {
                            areaColor: "#FA8072",
                        },
                        emphasis: {
                            areaColor: "#FA8072",
                        }
                    }
                }else if(100<=item.total.confirm&& item.total.confirm<500){
                    item.itemStyle = {
                        normal: {
                            areaColor: "#FF7F50",
                        },
                        emphasis: {
                            areaColor: "#FF7F50",
                        }
                    }
                }else if(500<=item.total.confirm&& item.total.confirm<1000){
                    item.itemStyle = {
                        normal: {
                            areaColor: "#FF0000",
                        },
                        emphasis: {
                            areaColor: "#FF0000",
                        }
                    }
                }else if(1000<=item.total.confirm&& item.total.confirm<5000){
                    item.itemStyle = {
                        normal: {
                            areaColor: "#B22222",
                        },
                        emphasis: {
                            areaColor: "#B22222",
                        }
                    }
                }else{
                    item.itemStyle = {
                        normal: {
                            areaColor: "#640202",
                        },
                        emphasis: {
                            areaColor: "#640202",
                        }
                    }
                }
            }
        }else{
            for(let item of data){
                // console.log(item)
                switch (item.area) {
                    case '华北地区':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#FFE4E1",
                            },
                            emphasis: {
                                areaColor: "#FFE4E1",
                            }
                        }
                        break;
                    case '东北地区':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#FFE4E1",
                            },
                            emphasis: {
                                areaColor: "#FFE4E1",
                            }
                        }
                        break;
                        case '华东地区':
                            item.itemStyle = {
                                normal: {
                                    areaColor: "#99d5f7",
                                },
                                emphasis: {
                                    areaColor: "#99d5f7",
                                }
                            }
                            break;
                            case '中南地区':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#FFE4B5",
                            },
                            emphasis: {
                                areaColor: "#FFE4B5",
                            }
                        }
                        break;
                        case '西南地区':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#bebeed",
                            },
                            emphasis: {
                                areaColor: "#bebeed",
                            }
                        }
                        break;
                        case '西北地区':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#F4A460",
                            },
                            emphasis: {
                                areaColor: "#F4A460",
                            }
                        }
                        break;
                        case '其他':
                        item.itemStyle = {
                            normal: {
                                areaColor: "#A9A9A9",
                            },
                            emphasis: {
                                areaColor: "#A9A9A9",
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const initalECharts = ()=> {
        const data = provienceData;
        echarts.registerMap('zhongguo', geoJson);
        setMapColor()
        const myChart = echarts.init(document.getElementById('mainMap'));
        myChart.setOption({
                tooltip: {
                    show: false,       //不显示提示标签
                    formatter: '{b}',      //提示标签格式
                    backgroundColor:"#ff7f50",//提示标签背景颜色
                    textStyle:{color:"#fff"} //提示标签字体颜色
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true
                },
                geo: {
                    map: 'china',
                    roam: false,
                    zoom: 1.2,
                    tooltip: {
                        show: false,       //不显示提示标签
                    },
                    label: {
                        normal: {
                            show: false,//显示省份标签
                            textStyle:{color:"#c71585"}//省份标签字体颜色
                        },
                        emphasis: {//对应的鼠标悬浮效果
                            show: false,
                            textStyle:{color:"#800080"}
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5,//区域边框宽度
                            borderColor: '#fff',//区域边框颜色
                            areaColor:"#ffefd5",//区域颜色
                            label:{show:false}
                        },
                        emphasis: {
                            show: false,
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor: "#ffdead",
                        }
                    },
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: 10,
                        symbolRotate: 35,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        tooltip: {
                            show: true,       //不显示提示标签
                            // formatter: '{c}',      //提示标签格式
                            formatter: function (params) {
                                return  `今日新增${params.data.today.confirm}，总计确诊${params.data.total.confirm}`
                            },
                            backgroundColor: "#fff",//提示标签背景颜色
                            borderColor: '#ccc',
                            borderWidth: .5,
                            textStyle:{color:"#000"} //提示标签字体颜色
                        },
                        itemStyle: {
                            normal: {
                                color: '#000',
                                opacity:0.7
                            }
                        }
                    },
                    {
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        zoom: 1.2,
                        tooltip: {
                            show: false,       //不显示提示标签
                        },
                        label: {
                            normal: {
                                show: false    //显示省份标签
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: .5,      //区域边框宽度
                                borderColor: '#fff',  //区域边框颜色
                                label:{show:false}
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        // geoIndex: 0,
                        // tooltip: {show: false},
                        data:provienceData,
                    }
                ],
        })
    }
    const convertData = (data) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].area),
                    area: data[i].area,
                    type: data[i].type,
                    number:geoCoord.number||0,
                    today:data[i].today,
                    total:data[i].total,
                });
            }
        }
        return res;
    }

    return (
        <div className="XGMap">
            {
                maptype ===1?
                (
                   <div>
                        <p>更新时间：{state.time}</p>
                        <p>新增确诊：{state.chinadata.chinaAdd.confirm}</p>
                        <p>现存确诊：{state.chinadata.chinaTotal.nowConfirm}</p>
                    </div>
                ):''
            }
            <div id="mainMap" style={{width:'100vm',height:'600px'}}></div>
        </div>
    );
}
export default EchartMap;