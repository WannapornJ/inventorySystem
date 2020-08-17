import React from 'react'
import { Breadcrumb } from 'antd'

function EmployeeDetail(props) {
    
    const receiveRoute = props.route
    
    return (
        <div>
            <Breadcrumb separator="">
                <Breadcrumb.Item>{receiveRoute}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default EmployeeDetail
