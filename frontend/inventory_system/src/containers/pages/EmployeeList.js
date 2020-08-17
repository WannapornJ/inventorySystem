import React, { useState, useEffect } from 'react'
import { Breadcrumb, Row, Col } from 'antd'
import DataTable from './components/employeelist/DataTable'
import axios from '../../config/axios'
import './css/productlist.css'

function EmployeeList(props) {
    
    const receiveRoute = props.route
    const [data, setData] = useState('')
    const [id, setId] = useState([])

    const fetchData = async () => {
        const response = await axios.get('/users/all')
        setData(response.data)
        setId(response.data.map(obj => obj.id))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Row style={{ width: '100vw' }}>
            <Col style={{ width: '100vw' }}>
                <Row justify="start">
                    <div>
                        <Breadcrumb separator="">
                            <Breadcrumb.Item>{receiveRoute}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
                <Row>
                    <DataTable data={data} id={id}></DataTable>
                </Row>
            </Col>
        </Row>
    )
}

export default EmployeeList
