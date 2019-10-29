import { Nav } from 'office-ui-fabric-react/lib/Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.component.sass'
import { handleNavClick } from '../../App';
import { CommandBar, IButtonProps, CommandBarButton } from 'office-ui-fabric-react';
import { DirectionalHint } from 'office-ui-fabric-react/lib/components/Tooltip';

const NavComponent: React.FC = () => {
    return <Nav
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
                            url: '/home',
                            iconProps: {
                                iconName: 'ViewDashboard'
                            },
                        },
                        {
                            name: 'Upload Images',
                            key: 'upload-images',
                            url: '/upload',
                            iconProps: {
                                iconName: 'Upload'
                            },
                        },
                    ]
                },
            ]}
    />
}
const NavMobileComponent: React.FC = () => {

    const customButton = (props: IButtonProps) => {
        const buttonOnMouseClick = () => alert(`${props.text} clicked`);
        return (
            <CommandBarButton
                {...props}
                onClick={buttonOnMouseClick}
                styles={{
                    ...props.styles,
                    textContainer: { fontSize: 18 },
                    icon: { color: '#E20000' }
                }}
            />
        );
    };

    return (<CommandBar
        buttonAs={customButton}
        items={[
            {
                key: 'dashboard',
                name: 'Dashboard',
                cacheKey: 'dashboard', // changing this key will invalidate this item's cache
                iconProps: {
                    iconName: 'ViewDashboard'
                },
            }
        ]}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
    />);
}
export default NavComponent;