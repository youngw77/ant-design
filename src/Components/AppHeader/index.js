import { MailOutlined, BellFilled } from '@ant-design/icons'
import { Badge, Image, Typography, Space } from "antd";

function AppHeader() {
    return<div className="AppHeader">
    <Image 
    width={40}
    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    ></Image>
    <Typography.Title> Jerry Dashboard</Typography.Title>
    <Space>
        <Badge count={10} dot>
        <MailOutlined style={{fontSize:24}}/>
        </Badge>
        <Badge count={20}>
        <BellFilled style={{fontSize:24}}/>
        </Badge>
    </Space>
    </div>
}
export default AppHeader;