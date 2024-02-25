import React, { useEffect, useState } from "react";
import {  Input, Space, Layout, Menu, theme  } from 'antd';
import { BiCategory } from "react-icons/bi";
import CartProducts from "./CartProducts";
import Checkout from "./Checkout";
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

const MyCart = () => {
    
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <>
            <Layout  >
                
                <Layout style={{overflow: 'auto'}}>
                        <Content
                            style={{
                                margin: '24px 16px 0',
                                // overflow: 'auto',
                                // maxHeight: '75vh'
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
                                <CartProducts/>
                            </div>
                        </Content>
                </Layout>

                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    width = '500'
                    style={{
                        overflow: 'auto',
                        height: '78vh', // Set the maximum height you want
                        // position: 'fixed',
                        // left: 0,
                      }}
                >
                    <div  className="demo-logo-vertical">
                        <Checkout />
                    </div>
                    
                </Sider>

            </Layout>

        </>
    );
}

export default MyCart