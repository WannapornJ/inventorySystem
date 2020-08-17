import React from 'react'
import { Row, Col, Form, Input, Button, notification } from 'antd';
import axios from '../../config/axios';
import { withRouter } from 'react-router-dom';


const formLayout = {
    labelCol: { xs: 24, sm: 24, md: 5, lg: 7, xl: 7 },
    wrapperCol: { xs: 24, sm: 24, md: 19, lg: 17, xl: 17 },
};


function Register(props) {

    const onFinish = async (values) => {
        try {
            await axios.post("/users/register", {
                username: values.username,
                password: values.password,
                name: values.name,
                surname: values.surname,
                image_url: ""
            });

            props.history.push("/");
            notification.success({
                message: "successfully register"
            });
        } catch (error) {
            notification.error({
                message: error.response?.data?.message || "something went wrong"
            });
        }
    };

    const login = () => {
        props.history.push('/login');
    }

    return (
        <div>
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                <Col xs={23} sm={20} md={20} lg={12} xl={10}>
                    <Row justify="center">
                        <h1>Create new account</h1>
                    </Row>
                    <Form {...formLayout} onFinish={onFinish}>
                        <Row justify="center" style={{ margin: "20px" }}>
                            <Col>
                            </Col>
                            <img
                                style={{ width: "100%", maxWidth: "250px" }}
                                alt="logo"
                                src="https://icon-library.com/images/inventory-icon-png/inventory-icon-png-3.jpg"
                            />
                        </Row>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                { required: true, message: "please enter this form" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: "please enter this form" }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: "please re enter password" },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("password not match");
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                { required: true, message: "please enter this form" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="surname"
                            label="Surname"
                            rules={[
                                { required: true, message: "please enter this form" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Row justify="space-between">
                            <Col>
                                <Button onClick={login} type="link">Sign in?</Button>
                            </Col>
                            <Col>
                                <Button type="primary" htmlType="submit">Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row >
        </div>
    )
}

export default withRouter(Register);
