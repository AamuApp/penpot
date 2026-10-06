import { ReactNode } from 'react';
export declare function useModalClose(): (() => void) | null;
interface ModalProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    children: ReactNode;
    trigger?: ReactNode;
    isDismissable?: boolean;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    className?: string;
}
export declare function Modal({ isOpen, onOpenChange, children, trigger, isDismissable, size, className, }: ModalProps): import("react").JSX.Element;
export {};
