import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbarMobile';
import AddChatModal from '../../components/addModalChat';
import ChatList from '../../components/chats';
import CourseList from '../../components/courses';
import io from 'socket.io-client';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Default to showing courses
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const socket = io('http://localhost:3000/chat');
    setSocket(socket);

    socket.on('chatToClient', (messagesArray) => {
      setMessages((prevMessages) => {
        let newMessages = [...prevMessages];
        for (let message of messagesArray) {
          if (!prevMessages.some((prevMessage) => prevMessage.id === message.id)) {
            newMessages.push(message);
          }
        }
        return newMessages;
      });
    });

    const fetchChats = async () => {
      try {
        const data = [
          { chatId: 1, name: 'Chat1' },
          { chatId: 2, name: 'Chat2' },
        ];
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const data = [
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 2, name: 'Course 2', progress: '80%' },
        ];
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchChats();
    fetchCourses();

    return () => socket.close();
  }, [currentUser]);

  useEffect(() => {
    if (selectedChat) {
      const chatSocket = io('http://localhost:3000/chat', {
        query: { chatId: selectedChat.id },
      });

      chatSocket.emit('joinChat', selectedChat.id);
      chatSocket.emit('requestMessages', selectedChat.id);

      chatSocket.on('chatToClient', (messages) => {
        setMessages(messages);
      });

      setSocket(chatSocket);
      setMessages([]);

      return () => chatSocket.emit('leaveChat', selectedChat.id);
    }
  }, [selectedChat]);

  const addChat = () => {
    setIsModalOpen(true);
  };

  const addCourse = () => {
    console.log('yey');
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHomeClick = () => {
    setIsMenuOpen(false); // Show courses list
  };

  const handleMessagesClick = () => {
    setIsMenuOpen(true); // Show chat list
  };

  const handleUserClick = () => {
    // Handle user icon click (e.g., show user profile)
  };

  const handleSendMessage = (text) => {
    if (socket && text.trim() !== '') {
      socket.emit('sendMessage', {
        text: text,
        userId: currentUser.user.id,
        chatId: selectedChat.id,
      });
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-darkGray">
      <Navbar 
        onHomeClick={handleHomeClick} 
        onMessagesClick={handleMessagesClick} 
        onUserClick={handleUserClick} 
      />
      <div className="flex flex-col bg-dark h-screen w-full">
        <div className="flex justify-between items-center px-4 py-2 bg-dark">
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">
              {isMenuOpen ? 'Chats' : 'Courses'}
            </div>
          </div>
        </div>
        {!selectedChat && isMenuOpen && (
          <ChatList chats={chats} onAddChat={addChat} onChatSelect={setSelectedChat} />
        )}
        {!selectedChat && !isMenuOpen && (
          <CourseList courses={courses} onAddCourse={addCourse} />
        )}
        {selectedChat && (
          <div className="flex-grow w-full bg-dark px-4 py-2">
            <div className="flex items-center justify-between bg-darkGray rounded-lg p-2 text-white">
              <div className="text-xl font-bold">{selectedChat.name}</div>
              <button onClick={() => setSelectedChat(null)} className="text-white">
                Back
              </button>
            </div>
            <div className="flex-grow overflow-y-auto px-4 py-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    message.type === 'received' ? 'bg-mediumGray' : 'bg-green text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 py-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 rounded-lg bg-darkGray text-white"
                placeholder="Type a message..."
              />
              <button onClick={() => handleSendMessage(newMessage)} className="text-green">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <AddChatModal isOpen={isModalOpen} onRequestClose={closeModal} setChats={setChats} />
    </div>
  );
};

export default ChatPage;
