import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col } from '@trendmicro/react-grid-system';
// eslint-disable-next-line no-unused-vars
import { TextField, Label, ChoiceGroup, IChoiceGroupOption, CompoundButton, Stack, DocumentCard, ImageFit, DocumentCardImage, DocumentCardLocation, DocumentCardActivity, ProgressIndicator, TeachingBubble, DirectionalHint } from 'office-ui-fabric-react';
import { PageHeader } from '../shared/page-header.component';
import { ExtractHostname } from '../../common';
import { useUploaderFacade } from './uploader.facade';
import UiService from '../../store/ui/ui.service';

export /**
 * Uploader component for uploading the images for classification.
 * @returns Renders the <UploaderComponent />
 */
const UploaderComponent: React.FC = () => {
    const onDrop = useCallback(() => { }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const uploaderFacade = useUploaderFacade();

    let _localDeviceComboOption: HTMLElement;
    const onUrlsChange = (ev: any, newText?: string): void => {
        uploaderFacade.setUploadingFiles(newText!);
    };
    return (
        <Container layout="flexbox">
            <Row>
                <Col><PageHeader text="Upload Images" /></Col>
            </Row>
            <Row>
                <Col>
                    <Stack horizontal horizontalAlign="space-between" tokens={{ childrenGap: 40 }}>
                        <ChoiceGroup
                            label="Upload Mode"
                            defaultSelectedKey={uploaderFacade.state.mode}
                            options={[
                                {
                                    key: 'files',
                                    iconProps: { iconName: 'OpenFile' },
                                    text: 'Local File',
                                },
                                {
                                    key: 'urls',
                                    iconProps: { iconName: 'PageLink' },
                                    text: 'URL',
                                },
                            ]}
                            onChange={(evt, option: IChoiceGroupOption | undefined) => uploaderFacade.setState((currentState) => ({ ...currentState, mode: option!.key }))}
                            // eslint-disable-next-line no-return-assign
                            componentRef={(option: any) => _localDeviceComboOption = option!}
                        />
                        <CompoundButton
                            primary
                            style={{ maxWidth: 190, height: 100, marginTop: 25 }}
                            secondaryText="Upload these images for classification."
                            disabled={uploaderFacade.state.uploadingFiles.length === 0 || uploaderFacade.state.uploadingFiles.some((file) => file.isUploading)}
                            onClick={UiService.UploadFiles}
                        >
                            Upload
                        </CompoundButton>
                    </Stack>
                    <Stack style={{ paddingTop: 15, paddingBottom: 15 }}>
                        {!uploaderFacade.isComponentURLMode() ? (
                            <div>
                                <Row>
                                    <Label>Upload images from your device</Label>
                                    <TeachingBubble
                                        calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
                                        isWide
                                        target={_localDeviceComboOption!}
                                        headline="Local file upload is still in development"
                                    >
                                        We are sorry for the inconvenience but only classifiying URL images is now supported.
                                    </TeachingBubble>
                                </Row>
                                <Row>
                                    <div
                                        {...getRootProps()}
                                        style={{
                                            cursor: 'pointer',
                                            border: '3px dashed lightgray',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: 'grid',
                                            height: 400,
                                            width: '100%',
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive
                                                ? <p>Drop the files here ...</p>
                                                : <p>Drag `&apos;` drop some files here, or click to select files</p>
                                        }
                                    </div>
                                </Row>
                            </div>
                        ) : null}
                        {uploaderFacade.isComponentURLMode() ? (
                            <Row>
                                <div style={{ width: '100%' }}>
                                    <TextField
                                        onChange={onUrlsChange}
                                        autoAdjustHeight
                                        label="Image URLs (one on each line)"
                                        multiline
                                        defaultValue={uploaderFacade.state.urlsText}
                                        resizable={false}
                                    />
                                </div>
                            </Row>
                        ) : null}
                    </Stack>
                    <Container fluid layout="flexbox">
                        <Stack horizontal style={{ gridGap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                            {uploaderFacade.state.uploadingFiles.map((uploadingFile, index) => (
                                <DocumentCard
                                    key={uploadingFile.name}
                                    style={{ cursor: 'auto' }}
                                >
                                    <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={uploadingFile.name} />
                                    <DocumentCardLocation
                                        location={uploadingFile.name}
                                        locationHref={uploadingFile.name}
                                    />
                                    <ProgressIndicator progressHidden={!uploadingFile.isUploading} />
                                    <DocumentCardActivity
                                        activity={uploaderFacade.uploadingFileStatus(uploadingFile)}
                                        people={[{ name: ExtractHostname(uploadingFile.name), profileImageSrc: '', initials: `${index + 1}` }]}
                                    />
                                </DocumentCard>
                            ))}
                        </Stack>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
