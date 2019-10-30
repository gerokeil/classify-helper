import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col } from '@trendmicro/react-grid-system';
// eslint-disable-next-line no-unused-vars
import { TextField, Label, ChoiceGroup, IChoiceGroupOption, CompoundButton, Stack, DocumentCard, ImageFit, DocumentCardImage, DocumentCardLocation, DocumentCardActivity } from 'office-ui-fabric-react';
import { PageHeader } from '../shared/page-header.component';
import { useUploadingFilesFacade } from '../../store/ui/ui.facade';
import { ExtractHostname } from '../../common';

export const UploaderComponent: React.FC = () => {
    const onDrop = useCallback(() => { }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const { uploadingFilesState, setUploadingFiles, uploadingFileStatus } = useUploadingFilesFacade();
    const initialState = {
        mode: 'urls',
    } as UploaderComponentState;
    const [state, mutate] = useState<UploaderComponentState>(initialState);

    const onUrlChange = (ev: any, newText?: string): void => {
        setUploadingFiles(newText!);
    };

    const isURLMode = () => state.mode === initialState.mode;
    return (
        <Container layout="flexbox">
            <Row>
                <Col><PageHeader text="Upload Images" /></Col>
            </Row>
            <Row>
                <Col>
                    <Stack horizontal tokens={{ childrenGap: 40 }}>
                        <ChoiceGroup
                            label="Upload Mode"
                            defaultSelectedKey={state.mode}
                            options={[
                                {
                                    key: 'files',
                                    iconProps: { iconName: 'OpenFile' },
                                    text: 'Local File',
                                    disabled: true,
                                },
                                {
                                    key: 'urls',
                                    iconProps: { iconName: 'PageLink' },
                                    text: 'URL',
                                },
                            ]}
                            onChange={(evt, option: IChoiceGroupOption | undefined) => mutate((currentState) => ({ ...currentState, mode: option!.key }))}
                        />
                    </Stack>
                    <Container fluid layout="flexbox">
                        {!isURLMode() ? (
                            <div>
                                <Row>
                                    <Label>Upload images from your device</Label>
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
                        {isURLMode() ? (
                            <Row>
                                <div style={{ width: '100%' }}>
                                    <TextField
                                        onChange={onUrlChange}
                                        autoAdjustHeight
                                        label="Image URLs (one on each line)"
                                        multiline
                                        resizable={false}
                                    />
                                </div>
                            </Row>
                        ) : null}
                    </Container>
                    <Stack style={{ paddingTop: 15, paddingBottom: 15 }}>
                        <CompoundButton
                            primary
                            style={{ maxWidth: 190 }}
                            secondaryText="Upload these images for classification."
                            disabled={uploadingFilesState.uploadingFiles.length === 0}
                        >
                            Upload
                        </CompoundButton>
                    </Stack>
                    <Stack horizontal style={{ gridGap: 10 }}>
                        {uploadingFilesState.uploadingFiles.map((uploadingFile) => (
                            <DocumentCard
                                style={{ cursor: 'auto' }}
                            >
                                <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={uploadingFile.name} />
                                <DocumentCardLocation
                                    location={uploadingFile.name}
                                    locationHref={uploadingFile.name}
                                />
                                <DocumentCardActivity
                                    activity={uploadingFileStatus(uploadingFile)}
                                    people={[{ name: ExtractHostname(uploadingFile.name), profileImageSrc: '' }]}
                                />
                            </DocumentCard>
                        ))}
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export interface UploaderComponentState {
    mode: string,
}
