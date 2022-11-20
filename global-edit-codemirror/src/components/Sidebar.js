import React from "react";
import { useEffect, useState } from "react";
import {Heading,Box,Input,InputLeftElement,InputRightElement,InputGroup,Button,Text,Flex, Spacer, InputLeftAddon } from '@chakra-ui/react'
import "./Sidebar.css";



const Side = () => {
    const [name, setName] = useState("default");
    const [color, setColor] = useState("#000000");

    // name button stuff
    const nameClick = () => {
        var tempInput = document.getElementById('input').value;
        if (tempInput.length != 0) {
            document.getElementById('input').value = '';
            setName(tempInput);
            window.binding.awareness.setLocalStateField("user", {
                name: tempInput,
                color: color
            });
            console.log(window.binding.awareness.getLocalState())
        }  else {
            alert("No input on name field!")
        }
    }
    
    return (
        <Flex className="sidebar" minWidth='max-content' direction='column' alignItems='center' gap='1'>
            <Box p='2'>
                <Heading w='270px' backgroundColor="chakra-subtle-bg" size='md' align="center">My Info</Heading>
                <Text align='center' fontWeight='bold'>   
                Name: {name}
                </Text>

            </Box>
            <Box p='2'>
            <Heading w='270px' backgroundColor="chakra-subtle-bg" size='md' align="center">Settings</Heading>
            </Box>
            <InputGroup w='270px' align='center' className="name" size='md'>
                <Input
                    id="input"
                    pr='4.5rem'
                    type="text"
                    placeholder='Change username'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' width='3.8rem' size='sm' onClick={nameClick}>
                    Confirm
                    </Button>
                </InputRightElement>
            </InputGroup>
            <InputGroup w='270px' align='center' className="color" size='md'>
                <InputLeftAddon children='Change color'/>
                <Input
                    className="inputColor"
                    value={color}
                    id="inputcol"
                    type="color"
                    onChange={(p) => {
                        setColor(p.target.value)
                        window.binding.awareness.setLocalStateField("user", {
                            name: name,
                            color: p.target.value
                        });
                        console.log(window.binding.awareness.getLocalState())
                    }}                   
                />
            </InputGroup>
            <Box p='2'>
            <Heading w='270px' backgroundColor="chakra-subtle-bg" size='md' align="center">User List</Heading>
            </Box>
        </Flex>
    );
  };
  
  export default Side;