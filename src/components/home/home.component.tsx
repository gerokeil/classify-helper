import React from 'react';
// eslint-disable-next-line no-unused-vars
import { DocumentCard, DocumentCardTitle, DocumentCardLogo, IDocumentCardStyles } from 'office-ui-fabric-react/lib/DocumentCard';
import { Container, Row, Col } from '@trendmicro/react-grid-system';
import { routeChange } from '../../App';
import { URLs } from '../../constants';
import { PageHeader } from '../shared/page-header.component';

export /**
 * The Home component shows a dashboard of the links in the application.
 * @returns Renders the <HomeComponent />.
 */
const HomeComponent: React.FC = () => {
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, width: 320 },
    };
    return (
        <Container colums={24} layout="flexbox">
            <Row>
                <Col><PageHeader text="Getting Started" /></Col>
            </Row>
            <Row>
                <Col>
                    <Container colums={24} layout="flexbox">
                        <DocumentCard
                            styles={cardStyles}
                            onClick={() => routeChange(URLs.ROUTES.UPLOAD)}
                        >
                            <div>
                                <DocumentCardLogo {...{ logoIcon: 'Upload' }} />
                                <DocumentCardTitle title="Upload Images" shouldTruncate />
                                <DocumentCardTitle title="Upload images of rooms classify then into specific parts of the home." shouldTruncate showAsSecondaryTitle />
                            </div>
                        </DocumentCard>
                        <DocumentCard
                            styles={cardStyles}
                            onClick={() => routeChange(URLs.ROUTES.CLASSIFIED_IMAGES)}
                        >
                            <div>
                                <DocumentCardLogo {...{ logoIcon: 'EngineeringGroup' }} />
                                <DocumentCardTitle title="Classified Images" shouldTruncate />
                                <DocumentCardTitle title="Classified images uploaded during this session." shouldTruncate showAsSecondaryTitle />
                            </div>
                        </DocumentCard>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
