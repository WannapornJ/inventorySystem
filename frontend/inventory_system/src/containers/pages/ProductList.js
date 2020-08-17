import React, { useState, useEffect } from 'react'
import { Breadcrumb, Row, Col, Button, Modal, Input } from 'antd'
import DataTable from './components/productList/DataTable'
import axios from '../../config/axios'
import './css/productlist.css'
import Form from 'antd/lib/form/Form'
import reqwest from 'reqwest'

function ProductList(props) {

    const receiveRoute = props.route
    const [data, setData] = useState('')
    const [id, setId] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const response = await axios.get('/products')
        setData(response.data)
        setId(response.data.map(obj => obj.id))
    }
    useEffect(() => {
        fetchData()
    }, [])

    const newModal = () => {
        setVisible(true)
    }

    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setVisible(false)
            setLoading(false)
        }, 2000);
    };
    const handleCancel = () => {
        setVisible(false)
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Row style={{ width: '100vw' }}>
            <Col style={{ width: '80vw' }}>
                <Row justify="start">
                    <div>
                        <Breadcrumb separator="">
                            <Breadcrumb.Item>{receiveRoute}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
                <Row justify='end'>
                    <Button onClick={newModal}>+new product</Button>
                    <Modal
                        visible={visible}
                        title="Create new product"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                create
                            </Button>,
                        ]}
                    >
                        <Form
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Input placeholder="name" />
                            <Input placeholder="category" />
                            <Input placeholder="description" />
                            <Input placeholder="price" />
                        </Form>
                        {/* <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Form> */}
                    </Modal>
                </Row>
                <Row>
                    <DataTable data={data} id={id}></DataTable>
                </Row>
            </Col>
        </Row>
    )
}

export default ProductList
