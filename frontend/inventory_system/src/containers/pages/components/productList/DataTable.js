import React, { useState, useEffect } from 'react'
import { Table, Statistic, Button } from 'antd';
import axios from '../../../../config/axios'

function DataTable(props) {
    const data = props.data;
    const [subData, setSubData] = useState('')
    const [id, setId] = useState(0)

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'product name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ellipsis: true,
        },
        {
            title: 'Price (Baht)',
            dataIndex: 'price',
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
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt'
        },
        {
            render: product => <Button onClick={()=>pushTo(product.id)}>Detail</Button>
        }
    ]
    const expandData = async () => {
        const res = await axios.get(`/products/${id}`)
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
        setId(id)
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
