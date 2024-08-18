import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import ChatList from '../../components/Chats';
import CourseList from '../../components/Courses';
import InputWithButton from '../../components/InputWithButton';
import AddChatModal from '../../components/AddChatModal';
import SelectedChat from '../../components/Chat';
import io from 'socket.io-client';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Default to showing courses
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [view, setView] = useState('courses'); // Define 'view'

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
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },
          { chatId: 1, name: 'Chat1', lastMessage: 'FUCK' },

          // Other chats...
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
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          { id: 1, name: 'Course 1', progress: '100%' },
          // Other courses...
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

  const handleSendToAI = () => {
    setIsModalOpen(true);
  };

  const addCourse = () => {
    console.log('yey');
  };

  const addChat = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHomeClick = () => {
    setView('courses'); // Show courses list
    setIsMenuOpen(false); // Hide menu
  };

  const handleMessagesClick = () => {
    setView('chats'); // Show chat list
    setIsMenuOpen(true); // Open menu
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
    <div className="flex flex-col h-screen bg-dark overflow-hidden">
      <div className="w-full flex justify-center sm:w-auto">
        <Navbar 
          onHomeClick={() => {
            handleHomeClick();
            setSelectedChat(null); // Reset selectedChat when home is clicked
          }} 
          onMessagesClick={() => {
            handleMessagesClick();
            setSelectedChat(null); // Reset selectedChat when messages is clicked
          }} 
          onUserClick={() => {
            handleUserClick();
            setSelectedChat(null); // Reset selectedChat when user is clicked
          }} 
        />
      </div>
  
      <div className="flex flex-grow h-full w-full relative overflow-hidden">
        {/* Sidebar containing ChatList or CourseList */}
        <div
          className={`flex flex-col ${
            selectedChat ? 'hidden sm:flex sm:w-1/5' : 'w-full sm:w-1/5'
          } bg-dark p-4 overflow-hidden`}
        >
          {view === 'chats' ? (
            <div className="flex flex-col flex-grow overflow-hidden">
              <ChatList chats={chats} onAddChat={addChat} onChatSelect={setSelectedChat} />
            </div>
          ) : (
            <CourseList courses={courses} onAddCourse={addCourse} />
          )}
        </div>
  
        {/* SelectedChat and InputWithButton container */}
        <div
          className={`flex flex-col flex-grow ${
            selectedChat ? 'w-full sm:w-4/5' : 'hidden'
          } overflow-hidden bg-dark px-4 py-2 relative`}
        >
          {/* Messages and Selected Chat */}
          {selectedChat && (
            <div className="flex-grow overflow-y-auto">
              <SelectedChat 
                selectedChat={selectedChat} 
                messages={messages} 
                onBackClick={() => setSelectedChat(null)} 
              />
            </div>
          )}
  
          {/* InputWithButton container at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-dark">
            <InputWithButton 
              onSubmit={selectedChat ? handleSendMessage : handleSendToAI} 
            />
          </div>
        </div>
      </div>
  
      <AddChatModal isOpen={isModalOpen} onRequestClose={closeModal} setChats={setChats} />
    </div>
  );
  
  
};

export default App;
