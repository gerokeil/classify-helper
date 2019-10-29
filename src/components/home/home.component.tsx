import React from "react";
import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardLogo,
    IDocumentCardStyles
} from 'office-ui-fabric-react/lib/DocumentCard';
import { routeChange } from "../../App";
import { PageHeader } from "../shared/page-header.component";

export const HomeComponent: React.FC = () => {
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, width: 320 }
    };
    return (
        <div>
            <PageHeader text="Getting Started" />
            <div>
                <DocumentCard styles={cardStyles}
                    onClick={(e: any) => routeChange('./upload')}
                >
                    <div>
                        <DocumentCardLogo {...{ logoIcon: 'Upload' }} />
                        <DocumentCardTitle title="Upload Images" shouldTruncate />
                        <DocumentCardTitle title="Upload images of rooms classify then into specific parts of the home." shouldTruncate showAsSecondaryTitle />
                    </div>
                </DocumentCard>
                <DocumentCard styles={cardStyles}
                    onClick={(e: any) => routeChange('./upload')}
                >
                    <div>
                        <DocumentCardLogo {...{ logoIcon: 'Upload' }} />
                        <DocumentCardTitle title="Upload Images" shouldTruncate />
                        <DocumentCardTitle title="Upload images of rooms classify then into specific parts of the home." shouldTruncate showAsSecondaryTitle />
                    </div>
                </DocumentCard>
            </div>
        </div>
    );
}