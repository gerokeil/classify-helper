import React from "react";
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';

export const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    return <div 
    style={{ fontSize: FontSizes.size28, padding: '0px 0px 20px 10px' }}>
        {props.text}
    </div>;
}
export interface PageHeaderProps {
    text: string
}