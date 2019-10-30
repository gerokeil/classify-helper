import { Col, Container, Row } from '@trendmicro/react-grid-system';
import React from 'react';
import { PageHeader } from '../shared/page-header.component';

export const ClassifiedImagesComponent: React.FC = () => (
        <Container layout="flexbox">
            <Row>
                <Col><PageHeader text="Classified Images" /></Col>
            </Row>
        </Container>
    );
