import React from "react";
import { Container, Col, Row } from 'react-bootstrap'

export default () => {

    return (
      <Container style={{marginTop:'2%'}}>
        <Row>
          <Col md='4' style={{color: '#649D66'}}>
            <h1> Title </h1>
            <h6> Player:  </h6><br/>
          </Col>
          <Col md='4'>
          </Col>
          <Col md='4'>
            Timer 5 menit
          </Col>
        </Row>
        <Row>
          <Col md='6'>
          </Col>
          <Col md='6'>
            Timer 30 detik
          </Col>
        </Row>
          <Row>
            <Col md='6'>
              cerita
            </Col>
            <Col md='6'>
              <textarea rows='15' cols='60' style={{borderColor:'#649D66'}}/>
            </Col>
          </Row>
      </Container>
    );
};
