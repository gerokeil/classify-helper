import { Col, Container, Row } from '@trendmicro/react-grid-system';
import React from 'react';
import { DocumentCardImage, ImageFit, DocumentCard, Stack, Text, CompoundButton } from 'office-ui-fabric-react';
import { PageHeader } from '../shared/page-header.component';
import { useClassifiedImagesFacade } from './classified-images.facade';

export /**
 * A list of the classified images uploaded.
 * @returns Renders the <ClassifiedImagesComponent /> component.
 */
const ClassifiedImagesComponent: React.FC = () => {
    const classifiedImagesFacade = useClassifiedImagesFacade();

    return (
        <Container layout="flexbox">
            <Row>
                <Col><PageHeader text="Classified Images" /></Col>
            </Row>
            <Row>
                {classifiedImagesFacade.state.classifiedImages.length === 0
                    ? (
                        <Stack horizontalAlign="center" horizontal grow>
                            <Text styles={{ root: { width: '100%' } }} variant="large">No Images have been classified. Use the Upload Images page to begin uploading.</Text>
                        </Stack>
                    )
                    : null}
                <Stack horizontal style={{ gridGap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                    {classifiedImagesFacade.state.classifiedImages.map((image) => (
                        <DocumentCard
                            key={image.name}
                            style={{ cursor: 'auto' }}
                        >
                            <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={image.name} />
                            <Stack horizontalAlign="space-between" horizontal>
                                <Text style={{ padding: 5 }} variant="medium">
                                    {classifiedImagesFacade.getFormalLabelName(image.bestPrediction)}
                                </Text>
                                <Text style={{ padding: 5, alignItems: 'center', display: 'flex' }} variant="xSmall" styles={{ root: { color: '#605e5c' } }}>
                                    {`${parseFloat(image.bestPrediction.score.toFixed(3)) * 100}% confidence`}
                                </Text>
                            </Stack>
                        </DocumentCard>
                    ))}
                </Stack>
            </Row>
            {classifiedImagesFacade.state.classifiedImages.length > 0
                ? (
                    <Stack horizontal style={{ gridGap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                        <CompoundButton
                            primary
                            secondaryText="Clear the classified Images."
                            onClick={classifiedImagesFacade.clearList}
                        >
                            Clear
                        </CompoundButton>
                    </Stack>
                )
                : null}
        </Container>
    );
};
