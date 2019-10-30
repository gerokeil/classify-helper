import { Nav } from 'office-ui-fabric-react/lib/Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.component.sass'
import { handleNavClick, routeChange } from '../../App';
import { DefaultButton, ContextualMenuItemType } from 'office-ui-fabric-react';
import { Container } from '@trendmicro/react-grid-system';
import { URLs } from '../../constants';

export const NavComponent: React.FC = () => {
    return (
        <Container layout="flexbox">
            <Nav
                ariaLabel="Nav example similiar to one found in this demo page"
                onRenderLink={(link: any) => <Link to={link.url} >{link.name}</Link>}
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

export const NavMobileComponent: React.FC = () => {

    return (
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
};
