import React from "react";
import { useEffect, useState } from "react";
import {startName,editorInstance} from "./Editor";
import language from '../resources/languagesMap.json'
import {Divider,Icon,Avatar,Select, Heading,Box,Input,InputLeftElement,InputRightElement,InputGroup,Button,Text,Flex, Spacer, InputLeftAddon, Stack } from '@chakra-ui/react'
import "./Sidebar.css";
import CodeMirror from "codemirror";

import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/python/python.js';

import { ChakraProvider } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

//icons for users
import { FiTrash2, FiUser } from "react-icons/fi";


/*
// Render a list of usernames next to the editor whenever new information is available from the awareness instance
awareness.on('change', () => {
  // Map each awareness state to a dom-string
  const strings = []
  awareness.getStates().forEach(state => {
    console.log(state)
    if (state.user) {
      strings.push(`<div style="color:${state.user.color};">• ${state.user.name}</div>`)
    }
    document.querySelector('#users').innerHTML = strings.join('')
  })
})
*/


const Side = () => {
    const [name, setName] = useState(startName);
    const [color, setColor] = useState("#000000");
    const [lang, setLang] = useState("Javascript");
    const [users, setUsers] = useState([]);

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

    const handleChangeLanguage = (val) => {
        setLang(val);
        editorInstance.setOption('mode',val);
        console.log(editorInstance);
        CodeMirror.signal("refresh");
    }    

    const updateUsers = () => {
        const tempArr = [];
        window.binding.awareness.getStates().forEach(state => {
            console.log(state)
            if (state.user) {
                tempArr.push([state.user.name,state.user.color]);
            }
        })
        console.log(tempArr)
        setUsers(tempArr);
    }
    
    return (
        <Flex className="sidebar" minWidth='max-content' direction='column' alignItems='center' gap='1'>
            <Box p='2'>
                <Heading 
                    w='270px' 
                    backgroundColor="AppWorkspace" 
                    size='md' 
                    align="center"
                    border='4px' 
                    borderColor="chakra-subtle-bg"
                >
                    Name: {name}
                </Heading>

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
            <Select  
                w='270px' 
                align='center'
                onChange={event => handleChangeLanguage(event.target.value)}
            >
                {
                    language.map(l => (
                        <option key={l.name} value={l.value}>
                            {l.name}
                        </option>
                    ))
                }
            </Select>
            <Box p='2'>
                <Flex id="userheader" minWidth='max-content' alignItems='center'>
                    <Heading w='230px' backgroundColor="chakra-subtle-bg" size='md' align="center">User List</Heading>
                    <Button  border='1px' w='40px' height='25px' iconSpacing="-0.5" rightIcon={<RepeatIcon />} variant='solid' onClick={updateUsers}>
                    </Button>
                </Flex>
                <Box height="2xl">
                    {users.map.length > 0 &&
                        users.map((item) => 
                        <Flex height="l" direction="column" gap='2'> 
                            <Spacer />
                            <Flex minWidth='max-content' alignItems='center' gap='2' direction="row">             
                                <Avatar color="white" backgroundColor={item[1]} size="sm" name={item[0]} src='https://bit.ly/broken-link' />
                                <Spacer />
                                <Text >{item[0]}</Text>
                            </Flex>
                            <Divider  orientation='horizontal' />
                            
                        </Flex>
                    )}
                </Box>
            </Box>
            
        </Flex>
    );
  };
  
  export default Side;