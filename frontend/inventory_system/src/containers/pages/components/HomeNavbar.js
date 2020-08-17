import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

function HomeNavbar() {
    return (
        <Row justify="space-around" style={{ width: '20vw', padding: '10px' }}>
            <Col>
                <Link to='/login'>
                    <Button>Sign In</Button>
                </Link>
            </Col>
            <Col>
                <Link to='/register'>
                    <Button type='primary'>Sign up</Button>
                </Link>
            </Col>
        </Row>

    )
}

export default HomeNavbar
