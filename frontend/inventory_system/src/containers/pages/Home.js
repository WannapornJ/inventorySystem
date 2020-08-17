import React from 'react'
import HomeNavbar from './components/HomeNavbar'
import { Row, Col } from 'antd'
import bg from './components/Inventory-Management-02.png'

function Home() {

    return (
        <Row>
            <Col style={{ width: '100vw' }}>
                <Row justify='end' style={{ position: 'sticky', backgroundColor: 'silver' }}>
                    <HomeNavbar></HomeNavbar>
                </Row>
                <Row justify='end' align='middle'>
                    <Col>
                        <h1>Inventory System</h1>
                        <p style={{fontSize: '18px'}}>Business inventory manage operation</p>
                    </Col>
                    <img
                        src={bg}
                        alt="cover"
                        style={{ height: '50vh' }}
                    ></img>
                </Row>
            </Col>
        </Row>
    )
}

export default Home
