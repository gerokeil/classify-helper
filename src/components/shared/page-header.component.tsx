import React from 'react';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { Container, Row, Col, Visible, Hidden } from '@trendmicro/react-grid-system';
import Helmet from 'react-helmet';
import { NavMobileComponent } from '../navigation/nav.component';

export const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => (
    <div>
        <Helmet><title>{props.text}</title></Helmet>
        <Visible md sm xs>
            <Container colums={24} layout="flexbox">
                <div style={{ padding: '10px 0px' }}>
                    <Row>
                        <Col md={1} lg={1}>
                            <NavMobileComponent />
                        </Col>
                        <Col pull={{ lg: 1 }} push={{ md: 1 }}>
                            <div style={{ fontSize: FontSizes.size24 }}>
                                {props.text}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Visible>
        <Hidden md sm xs>
            <div style={{ fontSize: FontSizes.size24, padding: '20px 0px' }}>
                {props.text}
            </div>
        </Hidden>
    </div>
);
export interface PageHeaderProps {
    text: string
}
