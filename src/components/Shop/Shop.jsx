import React, { useEffect, useState } from "react";
import {  Input, Space, Layout, Menu, theme  } from 'antd';
import ForSale from "./ForSale";
import { BiCategory } from "react-icons/bi";
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

const items = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Categories', 'sub1', <BiCategory />, [
      getItem('Men', '1'),
      getItem('Women', '2'),
      getItem('Kids', '3'),
    ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
  ];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Shop = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <>
            <Layout style={{overflow: 'auto'}} >
                <Sider
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    // onCollapse={(collapsed, type) => {
                    //     console.log(collapsed, type);
                    // }}
                    width = '300'
                >
                    <div  className="demo-logo-vertical">
                        <Search 
                            style={{
                                width: 290,
                                margin: '10px auto',
                                display: 'block', 
                            }}
                            placeholder="input search text" 
                            onSearch={onSearch} 
                            enterButton 
                        />
                    </div>
                    <Menu 
                        style={{
                            marginTop: '20px' 
                        }}
                        theme="dark" 
                        mode="inline" 
                        defaultSelectedKeys={['1']} 
                        items={items} 
                    />
                </Sider>

                <Layout>
                    {/* <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    
                    /> */}
                        <Content
                            style={{
                                margin: '24px 16px 0',
                                overflow: 'auto',
                                
                                height: 'calc(100vh - 25vh)', // Adjust the height as needed
                            }}
                            >
                            <div
                                style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                }}
                            >
                                <ForSale />
                            </div>
                        </Content>

                    <Footer
                    style={{
                        textAlign: 'center',
                    }}
                    >
                    dShop ©{new Date().getFullYear()} Created by 
                    </Footer>
                </Layout>
            </Layout>

        </>
    );
}

export default Shop