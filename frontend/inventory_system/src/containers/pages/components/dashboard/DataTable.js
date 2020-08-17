import React from 'react'
import { Table } from 'antd'

function DataTable(props) {
    const data = props.data
    
    const columns = [
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Exist Quantity',
            dataIndex: '',
            key: 'quantity'
        },
        {
            title: 'Last Updated',
            key: 'lastUpdated',
            render: data => {
                let date = new Date(data.updatedAt)
                return new Intl.DateTimeFormat('en-US').format(date)
            }
        },
    ]

    return (
        <Table title='' dataSource={data} columns={columns}></Table>
    )
}

export default DataTable
