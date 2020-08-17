import React from 'react'
import { Breadcrumb } from 'antd'

function ProductDetail(props) {
    
    const receiveRoute = props.route
    
    console.log(props)
    

    return (
        <div>
            <Breadcrumb separator="">
                <Breadcrumb.Item>{receiveRoute}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default ProductDetail
