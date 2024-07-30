import { useEffect, useRef, useState } from "react"
import React from "react"
import "../styles/Dropdown.css"

export default function Dropdown({ items, onChange}: { items: string[] | { name: string; abbreviation: string }[], onChange:(value:string) => void }) {
    //state
    const isObjectArray = typeof items[0] === 'object';
    const options = isObjectArray ? (items as { name: string; abbreviation: string }[]).map(item => item.name) : (items as string[]);
    const abbreviations = isObjectArray ? (items as { name: string; abbreviation: string }[]).map(item => item.abbreviation) : [];
    const optionsSort = [...options].sort();
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dropDownValue, setDropDownValue] = useState(optionsSort[selectedIndex]);
    const [typedKeys, setTypedKeys] = useState("");


    //Comportements
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const optionClick = (option: string, index: number) => {
        setDropDownValue(option);
        setSelectedIndex(index);
        setIsOpen(false);
        console.log('Option clicked:', option);
        console.log('Value to send to onChange by click:', option);
        onChange(option);
    }

    const handleKeyDownList = (e: React.KeyboardEvent<HTMLUListElement>) => {
        const abbreviationKey = e.key.toUpperCase();
        switch (e.key) {
            case "ArrowDown":
                setSelectedIndex((prevIndex) => (prevIndex + 1) % optionsSort.length);
                e.preventDefault();
                break;
            case "ArrowUp":
                setSelectedIndex((prevIndex) => (prevIndex - 1 + optionsSort.length) % optionsSort.length);
                e.preventDefault();
                break;
            case "Enter":
                setDropDownValue(optionsSort[selectedIndex]);
                setIsOpen(false);
                console.log('Value to send to onChange by enter:', optionsSort[selectedIndex]);
                onChange(optionsSort[selectedIndex]);
                break;
            case "Escape":
                setIsOpen(false)
                break;
            default:
                if (abbreviationKey.length === 1 && /^[A-Z]$/.test(abbreviationKey)) {
                    const newTypedKeys = typedKeys.length === 1 ? typedKeys + abbreviationKey : abbreviationKey;
                    setTypedKeys(newTypedKeys);
                    console.log(typedKeys)

                    const index = abbreviations.findIndex(abbreviation => abbreviation.startsWith(newTypedKeys));
                    if (index !== -1) {
                        setSelectedIndex(index);
                        setDropDownValue(optionsSort[index]);
                        setIsOpen(true);
                    }
                    setTimeout(() => setTypedKeys(""), 700);
                }
                break;
        }
    }

    const handleKeyDownDropDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowDown":
                console.log("down")
                setSelectedIndex((prevIndex) => (prevIndex + 1) % optionsSort.length);
                setDropDownValue(optionsSort[selectedIndex])
                e.preventDefault();
                break;
            case "ArrowUp":
                console.log("up")
                setSelectedIndex((prevIndex) => (prevIndex - 1 + optionsSort.length) % optionsSort.length);
                setDropDownValue(optionsSort[selectedIndex])
                e.preventDefault();
                break;
        }
    }

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            dropdownRef.current.focus();
        }
    }, [isOpen]);

    const handleMouseEnter = (index: number) => {
        setSelectedIndex(index);
    }

    //Affichage
    return (
            <div className="dropdown-container">
                <div className="value-container" onClick={handleClick} tabIndex={0} onKeyDown={handleKeyDownDropDown}>{dropDownValue}<span className="icon">&#9662;</span></div>
                {isOpen &&
                    <ul className="options-container" onKeyDown={handleKeyDownList} tabIndex={-1} ref={dropdownRef}>
                        {optionsSort.map((option, index) =>
                            <li className={selectedIndex === index ? "selected" : ""} key={index} onClick={() => optionClick(option, index)} onMouseEnter={() => handleMouseEnter(index)}>{option}</li>)}
                    </ul>}
            </div>
    )
}