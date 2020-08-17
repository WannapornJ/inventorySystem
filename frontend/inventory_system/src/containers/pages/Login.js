import React from "react";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import LocalStorageService from '../../services/LocalStorage';

const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

function Login(props) {
    function onFinish({ username, password }) {
        axios.post("/users/login", { username, password })
            .then(res => {
                LocalStorageService.setToken(res.data.accessToken);
                props.setRole("user");
                notification.success({
                    message: "login successfully"
                });
            })
            .catch(err => {
                notification.error({
                    message: err.response?.data?.message || "login failed"
                });
            });
    }

    return (
        <Row style={{ height: "100vh" }} justify="center" align="middle">
            <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
                <Form onFinish={onFinish} {...formItemLayout}>
                    <Row>
                        <Form.Item
                            style={{ width: "100%" }}
                            label="Username"
                            name="username"
                            rules={[
                                { required: true, message: "please fill this form" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            style={{ width: "100%" }}
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "please fill this form" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Row>
                    <Row justify="space-between">
                        <Col>
                            <Link to="/register">
                                <Button type="link">Create account?</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button htmlType="submit" type="primary">
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col xs={0} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            <Col xs={15} sm={7} md={9} lg={7} xl={6} xxl={5}>
                <img
                    style={{ width: "70%" }}
                    alt="logo"
                    src="https://icon-library.com/images/inventory-icon-png/inventory-icon-png-3.jpg"
                />
            </Col>
        </Row>
    )
}

export default Login
