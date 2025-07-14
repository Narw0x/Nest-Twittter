// components/layout/index.tsx
import React from "react";
import { Layout, Menu, theme } from "antd";
import { UserOutlined, TwitterOutlined, HomeOutlined } from "@ant-design/icons";
import { useMenu, useNavigation } from "@refinedev/core";
import { useLocation } from "react-router";

const { Header, Sider, Content } = Layout;

interface RefineLayoutProps {
    children: React.ReactNode;
}

export const RefineLayout: React.FC<RefineLayoutProps> = ({ children }) => {
    const { menuItems } = useMenu();
    const { push } = useNavigation();
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Custom menu items with icons
    const customMenuItems = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => push("/"),
        },
        {
            key: "/users",
            icon: <UserOutlined />,
            label: "Users",
            onClick: () => push("/users"),
        },
        {
            key: "/twits",
            icon: <TwitterOutlined />,
            label: "Twits",
            onClick: () => push("/twits"),
        },
    ];

    // Determine selected key based on current path
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path.startsWith("/users")) return "/users";
        if (path.startsWith("/twits")) return "/twits";
        if (path === "/") return "/";
        return "";
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                width={250}
                style={{
                    background: colorBgContainer,
                    borderRight: "1px solid #f0f0f0",
                }}
            >
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #f0f0f0",
                        marginBottom: 16,
                    }}
                >
                    <h2 style={{ margin: 0, color: "#1890ff" }}>My App</h2>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    style={{ borderRight: 0 }}
                    items={customMenuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "0 24px",
                        background: colorBgContainer,
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <h1 style={{ margin: 0, lineHeight: "64px" }}>
                        {location.pathname === "/" && "Dashboard"}
                        {location.pathname.startsWith("/users") && "User Management"}
                        {location.pathname.startsWith("/twits") && "Twit Management"}
                    </h1>
                </Header>
                <Content
                    style={{
                        margin: "24px",
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: 8,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};