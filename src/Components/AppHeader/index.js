import { MailOutlined, BellFilled } from '@ant-design/icons'
import { Badge, Image, Typography, Space, Drawer, List } from "antd";
import { useEffect, useState } from 'react';
import { getComments, getOrders } from '../../API';

function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    useEffect(() => {
        getComments().then(res => {
            setComments(res.comments);
        });
        getOrders().then(res => {
            setOrders(res.products);
        });
    },[])

    return<div className="AppHeader">
    <Image 
    width={40}
    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    ></Image>
    <Typography.Title> Jerry Dashboard</Typography.Title>
    <Space>
        <Badge count={comments.length} dot>
        <MailOutlined style={{fontSize:24}} onClick={() =>{
            setCommentsOpen(true);
        }}/>
        </Badge>
        <Badge count={orders.length}>
        <BellFilled style={{fontSize:24}}onClick={() =>{
            setNotificationOpen(true);
        }}/>
        </Badge>
    </Space>
    <Drawer title="Comments" open={commentsOpen} onClose={() => {
        setCommentsOpen(false);
    }}
    maskClosable
    >
    <List dataSource={comments} renderItem={(item) => {
        return <List.Item>{item.body}</List.Item>
    }}></List>
    </Drawer>
    <Drawer title="Notifications" open={notificationOpen} onClose={() => {
        setNotificationOpen(false);
    }}
    maskClosable
    >
    <List dataSource={orders} renderItem={(item) => {
        return <List.Item>
            <Typography.Paragraph strong>{item.title}</Typography.Paragraph>
            has been ordered
            </List.Item>
    }}></List>
    </Drawer>
    </div>
}
export default AppHeader;