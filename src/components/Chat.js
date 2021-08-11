import React, { Component } from 'react';
import '../chat.css';
import io from 'socket.io-client';
import {connect} from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      messages: [], //array of objects =>  {content: 'Some message' , self: true}
      typedMessage: '',
      check:false,
      heightToBe:400
      
    };

    this.socket = io.listen(process.env.PORT || 3000);
    this.userEmail = props.user.email;

    
    this.setupConnections();
    
    
  }

  setupConnections = () =>{
      const socketConnection = this.socket;
      const self = this;

      this.socket.on('connect', function(){
          console.log('CONNECTION ESTABLISHED');

          socketConnection.emit('join_room', {
              user_email: this.userEmail,
              chatroom: 'codeial'
          });

          socketConnection.on('user_joined',function(data){
              console.log('NEW USER JOINED', data);

              
          })
      })

      this.socket.on('receive_message', function(data){
          //Add Message To State
          const {messages} = self.state;

          const messageObject = {};
          messageObject.content = data.message

          if (data.user_email === self.userEmail){
              messageObject.self=true;
          }

          self.setState({
              messages: [...messages, messageObject],
              typedMessage:''

          });

      })

  }

  handleSubmit = () => {
      const {typedMessage} = this.state
      if (typedMessage){
          this.socket.emit('send_message',{
              message: typedMessage,
              user_email:this.userEmail,
              chatroom: 'codeial',
          })
      }

  }
  minimize = () => {

    const {check} = this.state;

    if (check==false){
      this.setState({
        heightToBe:50,
        check:true,
      })
    }

    else if (check==true){
      this.setState({
        heightToBe:400,
        check:false,
      })

    }
    
    

}

  render() {
    const { typedMessage, messages,heightToBe,check } = this.state;

    return (
      
      <div className="chat-container" style={{height:`${heightToBe}px`}} >
        
        <div className="chat-header">
          Chat
          {check? (<img
            src="https://image.flaticon.com/icons/png/512/271/271239.png"
            alt=""
            height={20}
            id="icon-chat"
            onClick={this.minimize}
            
          />):(<img
            src="https://image.flaticon.com/icons/png/512/1828/1828778.png"
            alt=""
            height={20}
            id="icon-chat"
            onClick={this.minimize}
            
          />)}
          
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            placeholder="Aa"
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}){
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(Chat);
