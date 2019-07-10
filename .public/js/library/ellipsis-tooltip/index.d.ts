import { PureComponent } from 'react';
export interface EllipsisTooltipProps {
    title?: any;
}
declare class EllipsisTooltip extends PureComponent<EllipsisTooltipProps, any> {
    state: {
        visible: boolean;
    };
    container: any;
    handleVisibleChange: (visible: boolean) => void;
    render(): JSX.Element;
}
export default EllipsisTooltip;
