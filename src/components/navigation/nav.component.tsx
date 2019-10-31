import { Nav } from 'office-ui-fabric-react/lib/Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.component.sass';
import { DefaultButton, ContextualMenuItemType } from 'office-ui-fabric-react';
import { Container } from '@trendmicro/react-grid-system';
import { handleNavClick, routeChange } from '../../App';
import { URLs } from '../../constants';
import { useClassifiedImagesFacade } from '../classified-images/classified-images.facade';
import { useUploaderFacade } from '../uploader/uploader.facade';

export /**
 * Navigation for desktops and large resolutions.
 * @returns Renders the <NavComponent /> for desktops.
 */
const NavComponent: React.FC = () => {
    const classifiedImagesFacade = useClassifiedImagesFacade();
    const uploaderFacade = useUploaderFacade();
    return (
        <Container layout="flexbox">
            <Nav
                ariaLabel="Nav example similiar to one found in this demo page"
                onRenderLink={(link: any) => (
                    <Link to={link.url}>
                        {link.name}
                        {link.url === URLs.ROUTES.CLASSIFIED_IMAGES
                            ? <p className="badge">{classifiedImagesFacade.state.classifiedImages.length}</p>
                            : null}
                        {link.url === URLs.ROUTES.UPLOAD
                            ? <p className="badge">{uploaderFacade.state.uploadingFiles.length}</p>
                            : null}
                    </Link>
                )}
                onLinkClick={handleNavClick}
                groups={
                    [
                        {
                            name: 'Classification',
                            links: [
                                {
                                    name: 'Dashboard',
                                    key: 'classification-dashboard',
                                    url: URLs.ROUTES.DASHBAORD,
                                    iconProps: { iconName: 'ViewDashboard' },
                                },
                                {
                                    name: 'Upload Images',
                                    key: 'upload-images',
                                    url: URLs.ROUTES.UPLOAD,
                                    iconProps: {
                                        iconName: 'Upload',
                                    },
                                },
                                {
                                    name: 'Classified Images',
                                    key: 'classified-images',
                                    url: URLs.ROUTES.CLASSIFIED_IMAGES,
                                    iconProps: { iconName: 'EngineeringGroup' },
                                },
                            ],
                        },
                    ]
                }
            />
        </Container>
    );
};

export /**
 * Navigation for mobiles and tablets.
 * @returns Renders the <NavMobileComponent /> for desktops.
 */
const NavMobileComponent: React.FC = () => (
    <DefaultButton
        iconProps={{ iconName: 'CollapseMenu' }}
        menuProps={{
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'classification',
                    itemType: ContextualMenuItemType.Header,
                    text: 'Classification',
                },
                {
                    key: 'dashboard',
                    iconProps: { iconName: 'ViewDashboard' },
                    text: 'Dashboard',
                    title: 'Dashboard',
                    onClick: () => routeChange(URLs.ROUTES.DASHBAORD),
                },
                {
                    key: 'upload',
                    iconProps: { iconName: 'Upload' },
                    text: 'Upload Images',
                    title: 'Upload Images',
                    onClick: () => routeChange(URLs.ROUTES.UPLOAD),
                },
                {
                    key: 'classified-images',
                    iconProps: { iconName: 'EngineeringGroup' },
                    text: 'Classified Images',
                    title: 'Classified Images',
                    onClick: () => routeChange(URLs.ROUTES.CLASSIFIED_IMAGES),
                },
            ],
        }}
    />
);
