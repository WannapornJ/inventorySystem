import React, { useState, useEffect } from 'react'
import { Breadcrumb, Row, Col } from 'antd'
import DataTable from './components/dashboard/DataTable'
import axios from '../../config/axios'


function Dashboard(props) {
    const [data, setData] = useState('')
    const [importQ, setImportQ] = useState([])
    const [exportQ, setExportQ] = useState([])

    const fetchData = async () => {
        const response = await axios.post("products/existQuantity")
        let d = response.data;

        for (let i = 0; i < d.length; i++) {
            importQ.push(d[i].Imports)
            exportQ.push(d[i].Exports)
        }
        
        setData(response.data)
    }

    console.log(data)
    useEffect(() => {
        fetchData()
    }, []);
    const receiveRoute = props.route

    return (
        <Row>
            <Col>
                <Row>
                    <div>
                        <Breadcrumb separator="">
                            <Breadcrumb.Item>{receiveRoute}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
                <Row>
                    <DataTable data={data} import={importQ} export={exportQ} />
                </Row>
            </Col>
        </Row>
    )
}
export default Dashboard
