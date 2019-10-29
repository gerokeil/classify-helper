import React, { Component } from 'react'
import { Card } from '@uifabric/react-cards';
import { IconButton } from 'office-ui-fabric-react';
import './uploader.component.css';
import { PageHeader } from '../shared/page-header.component';

export class UploaderComponent extends Component {

    render() {
        return (
            <div>
                <PageHeader text="Upload Images" />
                <div className="dropzone">
                    <Card horizontal tokens={{ childrenMargin: 12 }}>
                        <Card.Item>
                            <IconButton iconProps={{ iconName: 'Upload' }} title="Upload images" ariaLabel="Upload imagess" />
                        </Card.Item>
                    </Card>
                </div>
            </div>
        );
    }
}

export default UploaderComponent;
