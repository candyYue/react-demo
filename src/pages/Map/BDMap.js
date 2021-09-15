import { Map, useMap, APILoader } from '@uiw/react-baidu-map';
function BDMap(){
    return (
        <div style={{ width: '100%', height: 'calc(100vh)' }}>
            <APILoader akay="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f">
            <Map
                ref={(props) => {
                if (props && props.map) {
                    // 启用滚轮放大缩小，默认禁用
                    props.map.enableScrollWheelZoom();
                }
                }}
                widget={[
                'GeolocationControl',
                {
                    name: 'OverviewMapControl',
                    options: {
                    isOpen: true,
                    }
                },
                {
                    name: 'CopyrightControl',
                    control: (BMap, map) => {
                    // 设置版权控件位置
                    const cr = new BMap.CopyrightControl({ anchor: 'BMAP_ANCHOR_TOP_RIGHT' });
                    // 返回地图可视区域
                    const bs = map.getBounds();
                    cr.removeCopyright(1);
                    cr.addCopyright({
                        id: 1,
                        content: "<a href='#' style='font-size:20px;background:yellow'>我是自定义版权控件呀</a>",
                        bounds: bs,
                    });
                    return cr;
                    },
                },
                {
                    name: 'NavigationControl',
                    options: (BMap) => {
                    return {
                        offset: new BMap.Size(150, 5),
                        showZoomInfo: false,
                        enableGeolocation: true,
                    }
                    }
                }
                ]}
            />
            </APILoader>
        </div>
    )
}
export default BDMap

