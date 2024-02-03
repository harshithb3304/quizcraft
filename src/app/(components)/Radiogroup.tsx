// CustomRadio.tsx
import React from "react";
import { useRadio, VisuallyHidden, cn } from "@nextui-org/react";

interface CustomRadioProps {
    value: string;
    checked: boolean;
    onChange: () => void;
    children: React.ReactNode;
    description?: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
                                                     value,
                                                     checked,
                                                     onChange,
                                                     children,
                                                     description,
                                                 }) => {
    const { Component, getBaseProps, getWrapperProps, getInputProps, getLabelProps, getLabelWrapperProps, getControlProps } = useRadio({ value, checked, onChange });

    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
                "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
                "data-[selected=true]:border-primary",
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
                {description && (
                    <span className="text-small text-foreground opacity-70">{description}</span>
                )}
            </div>
        </Component>
    );
};

export default CustomRadio;
