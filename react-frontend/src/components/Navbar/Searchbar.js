import React from 'react'
import{useState} from 'react'
import styled from 'styled-components'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import './Searchbar.css'

const SearchContainer = styled.div`
    position: relative;
    width: ${(props) => (props.isSearching ? 360 : 48)}px;
    height: 40px;
    top: 25.06px;
    background: #f2f2f2;
    border-radius: ${(props) => (props.isSearching ? 0 : 200)}%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    translate: all 0.3s ease;
`;

const SearchInput = styled.input`
    padding-left: 48px;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;
    
    &:focus {
        border-color: rgba(0, 0, 0, 0.3)
    }
`;

const IconButton = styled.button`
    position: relative;
    height: 36px;
    width: 36px;
    border: none;
    z-index: 1;
    cursor: pointer;
    background: none;
    
    &:hover {
        color: white;
        &::after {
            opacity: 1;
            transform: scale(1);
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 50%;
        z-index: -1;
        background: #000;
        transistion: 0.2s ease;
        transform: scale(0.6);
        opacity: 0;
    }
`;

export default function Searchbar() {
    const [isActive, setIsActive] = useState(false);
    // const [searchText, setSearchText] = useState("");

    const toggle_search = () => {
        setIsActive(!isActive);
    };

    // const get_input = () => {
    //     var input = document.getElementById("search_input").value;
    //     setSearchText(input);
    //     console.log(input);
    // }

    return (
        <SearchContainer isSearching={isActive}>
        <IconButton onClick={toggle_search}> 
            {isActive ? (
                <AiOutlineClose size={18}/>
            ) : (
                <AiOutlineSearch size={22}/>
            )}
        </IconButton>
        <SearchInput id="search_input"/>
        </SearchContainer>
    );
}