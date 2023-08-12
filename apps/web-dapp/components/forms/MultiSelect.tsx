import Fuse from 'fuse.js'
import React, { useState } from 'react'

import { Badge } from '../ui/badge'

type MultiSelectProps = {
    onChange: (selectedItems: Set<string>) => void
    placeholder: string
    languageMapping: {
        search: string
        term: string
    }[]
}

const fuseOptions = {
    keys: ['search'],
    threshold: 0.3
}

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
    ({ onChange, placeholder, languageMapping }, ref) => {
        const [inputValue, setInputValue] = useState('')
        const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
        const [suggestions, setSuggestions] = useState<Set<string>>(new Set())

        const fuse = new Fuse(languageMapping, fuseOptions)

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)

            if (e.target.value) {
                const results = fuse.search(e.target.value)
                setSuggestions(new Set(results.map(res => res.item.term)))
            } else {
                setSuggestions(new Set())
            }
        }

        const addSelectedItem = (item: string) => {
            setSelectedItems(prev => {
                const updated = new Set(prev)
                updated.add(item)
                onChange(updated)
                return updated
            })
            setInputValue('')
            setSuggestions(new Set())
        }

        const removeSelectedItem = (item: string) => {
            setSelectedItems(prev => {
                const newSelected = new Set(prev)
                newSelected.delete(item)
                onChange(newSelected)
                return newSelected
            })
        }

        return (
            <div ref={ref}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid gray', padding: '5px' }}>
                    {Array.from(selectedItems).map(item => (
                        <Badge key={item} onClick={() => removeSelectedItem(item)}>
                            {item}
                        </Badge>
                    ))}
                    <input
                        value={inputValue}
                        onChange={onInputChange}
                        placeholder={placeholder}
                        style={{ flexGrow: 1, border: 'none', outline: 'none' }}
                    />
                </div>
                {Array.from(suggestions).map((suggestion, i) => (
                    <div key={`${suggestion}${i}`} onClick={() => addSelectedItem(suggestion)}>
                        {suggestion}
                    </div>
                ))}
            </div>
        )
    }
)

MultiSelect.displayName = 'MultiSelect'
