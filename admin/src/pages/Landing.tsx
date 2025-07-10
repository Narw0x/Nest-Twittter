import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, TwitterOutlined } from '@ant-design/icons';
import { useNavigation } from '@refinedev/core';

const { Title, Paragraph } = Typography;

export const LandingPage = () => {
    const { push } = useNavigation();

    const handleNavigate = (path: string) => {
        push(path);
    };

    return (
        <div style={{
            padding: '40px 24px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Title level={1} style={{
                        fontSize: '3rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px'
                    }}>
                        Welcome to Dashboard
                    </Title>
                    <Paragraph style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Manage your users and tweets efficiently with our comprehensive dashboard
                    </Paragraph>
                </div>

                {/* Navigation Cards */}
                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            hoverable
                            style={{
                                textAlign: 'center',
                                border: 'none',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)'
                            }}
                            bodyStyle={{ padding: '40px 20px' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                            }}>
                                <UserOutlined style={{ fontSize: '32px', color: 'white' }} />
                            </div>
                            <Title level={3} style={{ marginBottom: '16px', color: '#1f2937' }}>
                                Users Management
                            </Title>
                            <Paragraph style={{ color: '#6b7280', marginBottom: '24px' }}>
                                View, edit, and manage all registered users in your system
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => handleNavigate('/users')}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    padding: '0 32px',
                                    height: '48px'
                                }}
                            >
                                Go to Users
                            </Button>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={8}>
                        <Card
                            hoverable
                            style={{
                                textAlign: 'center',
                                border: 'none',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)'
                            }}
                            bodyStyle={{ padding: '40px 20px' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                boxShadow: '0 8px 20px rgba(240, 147, 251, 0.3)'
                            }}>
                                <TwitterOutlined style={{ fontSize: '32px', color: 'white' }} />
                            </div>
                            <Title level={3} style={{ marginBottom: '16px', color: '#1f2937' }}>
                                Twits Management
                            </Title>
                            <Paragraph style={{ color: '#6b7280', marginBottom: '24px' }}>
                                Monitor, moderate, and manage all twits and social content
                            </Paragraph>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => handleNavigate('/twits')}
                                style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    padding: '0 32px',
                                    height: '48px'
                                }}
                            >
                                Go to Twits
                            </Button>
                        </Card>
                    </Col>
                </Row>

                {/* Quick Stats Section */}
                <div style={{ marginTop: '80px' }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={8}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    border: 'none',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <TeamOutlined style={{ fontSize: '32px', color: '#667eea', marginBottom: '12px' }} />
                                <Title level={4} style={{ margin: '0 0 8px', color: '#1f2937' }}>
                                    User Analytics
                                </Title>
                                <Paragraph style={{ margin: 0, color: '#6b7280' }}>
                                    Track user engagement and growth
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    border: 'none',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <MessageOutlined style={{ fontSize: '32px', color: '#f5576c', marginBottom: '12px' }} />
                                <Title level={4} style={{ margin: '0 0 8px', color: '#1f2937' }}>
                                    Content Insights
                                </Title>
                                <Paragraph style={{ margin: 0, color: '#6b7280' }}>
                                    Analyze tweet performance and reach
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    border: 'none',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <UserOutlined style={{ fontSize: '32px', color: '#764ba2', marginBottom: '12px' }} />
                                <Title level={4} style={{ margin: '0 0 8px', color: '#1f2937' }}>
                                    Admin Tools
                                </Title>
                                <Paragraph style={{ margin: 0, color: '#6b7280' }}>
                                    Comprehensive management features
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};