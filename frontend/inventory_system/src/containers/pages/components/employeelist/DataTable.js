import React, { useState, useEffect } from 'react'
import { Table, Statistic, Button } from 'antd';
import axios from '../../../../config/axios'

function DataTable(props) {
    const data = props.data;
    const userId = props.id
    const [subData, setSubData] = useState('')

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'salary (Baht)',
            dataIndex: 'salary',
            render: currency => <Statistic value={currency} precision={2}></Statistic>,
            ellipsis: true,
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            render: theImageUrl => <img src={theImageUrl} alt={theImageUrl}></img>,
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            ellipsis: true,
        },
        {
            render: user => <Button onClick={() => pushTo(user.id)}>Detail</Button>
        }
    ]
    const expandData = async (id) => {
        const res = await axios.get(`/users/${id}`)
        setSubData(res.data)
    }

    console.log(subData)

    useEffect(() => {
        expandData()
    })

    const show = () => {
        return 'All Product'
    }

    const pushTo = (id) => {
    }

    return (
        <Table
            title={() => show()}
            dataSource={data}
            columns={columns}
            tableLayout='auto'
            className="components-table-demo-nested"
        >
        </Table>
    )
}

export default DataTable
