import React, {Component, useEffect, useState} from 'react';
import * as echarts from 'echarts'
import 'echarts/map/js/china';
import geoJson from '../../utils/china.json';
import {geoCoordMap,provienceData,provienceObj} from "../../utils/geo";
import {getHotVideo,getRisk} from '../../request/action'


class EchartMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provienceData:[]
        }
        this.getRisk = getRisk.bind(this)
    }
    componentDidMount() {
        this.getRisk().then(res=>{
            const chinadata = JSON.parse(res.data).areaTree[0]
            chinadata.children.forEach(v => {
                v.area = provienceObj[v.name]
            });
            this.setState({
                provienceData:chinadata.children
            },()=>{
                this.initalECharts()
            })
        })

    }
    initalECharts() {
        const data = this.state.provienceData;
        echarts.registerMap('zhongguo', geoJson);
        for(let item of data){
            if(item.area === '东北大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#3CA2FC",
                    },
                    emphasis: {
                        areaColor: "#3CA2FC",
                    }
                }
            }else if(item.area === '华北大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#6CAFBE",
                    },
                    emphasis: {
                        areaColor: "#6CAFBE",
                    }
                }
            }else if(item.area === '华中大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#ADD03C",
                    },
                    emphasis: {
                        areaColor: "#ADD03C",
                    }
                }
            }else if(item.area === '华东大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#6666FF",
                    },
                    emphasis: {
                        areaColor: "#6666FF",
                    }
                }
            }else if(item.area === '华西大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFBA00",
                    },
                    emphasis: {
                        areaColor: "#FFBA00",
                    }
                }
            }else if(item.area === '华南大区'){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFD300",
                    },
                    emphasis: {
                        areaColor: "#FFD300",
                    }
                }
                }else if(item.area === '南海诸岛'){
                  item.itemStyle = {
                    normal: {
                      borderColor: '#fff',//区域边框颜色
                      areaColor:"#fff",//区域颜色
                    },
                    emphasis: {
                      show: false,
                      // borderColor: '#fff',
                      // areaColor:"#fff",
                    }
                  }
            }else{
                item.itemStyle = {
                    normal: {
                        areaColor: "#D9D9D9",
                    },
                    emphasis: {
                        areaColor: "#D9D9D9",
                    }
                }
            }
        }
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
                        data: this.convertData(data),
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
                                color: '#f40'
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
                        data:this.state.provienceData,
                    }
                ],
        })
    }
    convertData(data) {
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
        console.log(res)
        return res;
    }
    render() {
        return (
            <div className="XGMap">
                <div id="mainMap" style={{width:'100vm',height:'100vh'}}></div>
            </div>
        );
    }
}
export default EchartMap;