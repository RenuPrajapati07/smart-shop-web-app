import React from 'react'
import Chatbot from 'react-simple-chatbot'
import { Segment } from 'semantic-ui-react'
import Cart from '../../cart/Cart'
import './chattalk.css'

const ChatTalk = () => {

  const steps = [
    {
      id:'Greet',
      message:'Hello, welcome to our shop',
      trigger: 'Ask Name'
    },
    {
      id: 'Ask Name',
      message: 'Please enter your name',
      trigger: 'waiting1'
    },
    {
      id:'waiting1',
      user:true,
      trigger:'Name'
    },
    {
      id:'Name',
      message:'Hi {previousValue}, Please select the option to start a deal',
      trigger:'deal'
    },
    {
      id:'deal',
      options:[
        {value: 'Deal',label:'Start negotiation', trigger: 'Deal'},
        {value: 'No Deal',label:'No Negotiaton', trigger: 'NoDeal'},
      ],
    },
    {
      id:'Deal',
      message: 'Make your offer',
      trigger: 'offer'
    },
    {
      id:'NoDeal',
      message: 'Deals ends here',
      end: true,
    },
    {
      id:'offer',
      user: true,
      trigger:'lessprice',
    },
    {
      id: 'lessprice',
      message: '{previousValue} ,this is to less.',
      trigger: 'negotiate',
    },
    {
      id:'negotiate',
      user: true,
      trigger: 'negotiate2',
    },
    {
      id: 'negotiate2',
      message:'{previousValue},Still you have chance make better offer that I cant reject',
      trigger: 'negotiate3',
    },
    {
      id:'negotiate3',
      user: true,
      trigger: 'negotiate4',
    },
    {
      id: 'negotiate4',
      message: 'this is great. At this price {previousValue} you get the deal',
      trigger: 'enddeal',
    },
    {
      id: 'enddeal',
      message:'Thanyou for the offer, you made it.',
      end: true,
    }
  ];

  return (
    <div>
    <div className='chat-div'> 
    <Segment floated="left">
        <Chatbot steps={steps} />
    </Segment>
    </div>
    </div>
  )
}

export default ChatTalk
