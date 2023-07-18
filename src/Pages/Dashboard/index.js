import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Typography, Space, Card, Statistic, Table } from "antd";
import { useState, useEffect } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import{ Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function Dashboard() {
     const [orders, setOrders] = useState(0);
     const [inventory, setInventory] = useState(0);
     const [customers, setCustomers] = useState(0);
     const [reveneu, setReveneu] = useState(0);

     useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total);
            setReveneu(res.discountedTotal);
        });
        getInventory().then(res => {
            setInventory(res.total);
        });
        getCustomers().then(res => {
            setCustomers(res.total);
        });
     },[])

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Recent Orders</Typography.Title>
      <Space direaction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 12,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Orders"
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 12,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Inventory"
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 12,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Customer"
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 12,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Revenue"
          value={reveneu}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashBoardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direaction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      getOrders().then(res => {
        setDataSource(res.products.splice(0, 3));
        setLoading(false);
      })
    }, [])
    

  return (
    <Table
      columns={[
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
        },
        {
          title: "Price",
          dataIndex: "discountedPrice",
        },
      ]}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    ></Table>
  );
}

function DashBoardChart() {

    const [reveneuData, setReveneuData] = useState({
        labels:[],
        datasets:[]
    })

    useEffect(() => {
        getRevenue().then((res) => {
            const labels = res.carts.map((cart) => {
                return `User-${cart.userId}`
            });
            const data = res.carts.map((cart) => {
                return cart.discountedTotal;
            });

        const dataSource = {
            labels,
            datasets: [
                {
                label: 'Revenue',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        setReveneuData(dataSource);
    });
    },[]);
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Order Revenue',
          },
        },
      };
    return (
        <Card style={{width: 500, height: 400}}>
            <Bar options={options} data={reveneuData} />
        </Card>
    )
}

export default Dashboard;
