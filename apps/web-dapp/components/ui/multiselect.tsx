'use client'

import * as React from 'react'
import Select, { StylesConfig } from 'react-select'

import { cn } from '@/lib/utils'

export interface MultiSelectProps {
    className?: string
    options: Array<{ value: string; label: string }>
    placeholder?: string
    value?: Array<{ value: string; label: string }>
    onChange?: (value: Array<{ value: string; label: string }>) => void
}

const customStyles: StylesConfig = {
    control: baseStyles => ({
        ...baseStyles,
        borderColor: '#E7E5E4',
        borderRadius: '0.375em'
    }),
    multiValue: styles => ({
        ...styles,
        borderRadius: '9999px',
        padding: '2px 3px'
    }),
    multiValueLabel: styles => ({
        ...styles,
        color: '#000',
        fontSize: '0.75rem',
        fontWeight: 500
    }),
    multiValueRemove: styles => ({
        ...styles,
        ':hover': {
            ...styles[':hover'],
            backgroundColor: 'transparent'
        }
    })
}

const MultiSelect = React.forwardRef<React.ElementRef<typeof Select>, MultiSelectProps>(
    ({ className, options, placeholder, value, onChange, ...props }: MultiSelectProps, ref) => {
        return (
            <Select
                ref={ref}
                className={cn('placeholder:text-muted-foreground text-sm', className)}
                closeMenuOnSelect={false}
                isMulti
                defaultValue={options.map(option => option.value)}
                onChange={onChange as (value: unknown) => void}
                options={options}
                placeholder={placeholder}
                styles={customStyles}
                value={value}
                theme={theme => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary25: '#E7E5E4',
                        primary: '#000',
                        primary50: '#ccc'
                    }
                })}
                {...props}
            />
        )
    }
)
MultiSelect.displayName = 'MultiSelect'

export { MultiSelect }
