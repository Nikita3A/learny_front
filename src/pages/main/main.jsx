import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import ChatList from '../../components/ChatList';
import CourseList from '../../components/CourseList';
import AddChatModal from '../../components/AddChatModal';
import ChatWindow from '../../components/ChatWindow';
import Profile from '../../components/Profile';
import io from 'socket.io-client';

const App = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatList, setChatList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [socketConnection, setSocketConnection] = useState(null);
  const [isAddChatModalOpen, setIsAddChatModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('courses');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isAIChatVisible, setIsAIChatVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3000/chat');
    setSocketConnection(socket);

    socket.on('chatToClient', (receivedMessages) => {
      setMessageList((prevMessages) => {
        const newMessages = receivedMessages.filter(
          (message) => !prevMessages.some((prevMessage) => prevMessage.id === message.id)
        );
        return [...prevMessages, ...newMessages];
      });
    });

    const loadChats = async () => {
      try {
        const mockChatData = [
          { chatId: 1, name: 'Chat1', lastMessage: 'Hello' },
        ];
        setChatList(mockChatData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    const loadCourses = async () => {
      try {
        const mockCourseData = [
          { id: 1, name: 'Course 1', progress: '100%' },
        ];
        setCourseList(mockCourseData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    loadChats();
    loadCourses();

    return () => socket.close();
  }, [currentUser]);

  useEffect(() => {
    if (activeChat) {
      const chatSocket = io('http://localhost:3000/chat', {
        query: { chatId: activeChat.id },
      });

      chatSocket.emit('joinChat', activeChat.id);
      chatSocket.emit('requestMessages', activeChat.id);

      chatSocket.on('chatToClient', (receivedMessages) => {
        setMessageList(receivedMessages);
      });

      setSocketConnection(chatSocket);
      setMessageList([]);

      return () => chatSocket.emit('leaveChat', activeChat.id);
    }
  }, [activeChat]);

  const handleSendMessage = (messageText) => {
    if (socketConnection && messageText.trim() !== '') {
      socketConnection.emit('sendMessage', {
        text: messageText,
        userId: currentUser.user.id,
        chatId: activeChat ? activeChat.id : 'ai',
      });

      socketConnection.on('newMessage', (newMessage) => {
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  };

  const toggleAddChatModal = () => {
    setIsAddChatModalOpen(!isAddChatModalOpen);
  };

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    setIsSidebarOpen(false);
    setIsProfileVisible(false);
  };

  const switchToAIView = () => {
    setCurrentView('ai');
    setActiveChat(null);
    setIsAIChatVisible(true);
    setIsSidebarOpen(!isMobile);
    setIsProfileVisible(false);
  };

  const switchToChatsView = () => {
    setCurrentView('chats');
    setActiveChat(null);
    setIsAIChatVisible(false);
    setIsSidebarOpen(true);
    setIsProfileVisible(false);
  };

  const switchToCoursesView = () => {
    setCurrentView('courses');
    setActiveChat(null);
    setIsAIChatVisible(false);
    setIsSidebarOpen(true);
    setIsProfileVisible(false);
  };

  const switchToProfileView = () => {
    setIsProfileVisible(true);
    setActiveChat(null);
    setIsSidebarOpen(false);
    setIsAIChatVisible(false);
  };

  const handleBackClick = () => {
    setActiveChat(null);
    setIsSidebarOpen(true);
    setIsAIChatVisible(false);
    setIsProfileVisible(false);
  };

  return (
    <div className="flex flex-col h-screen bg-dark overflow-hidden">
      <Navbar
        onHomeClick={switchToCoursesView}
        onMessagesClick={switchToChatsView}
        onAiClick={switchToAIView}
        onProfileClick={switchToProfileView}
      />

      <div className="flex flex-grow h-full w-full overflow-hidden">
        {isProfileVisible ? (
          <div className="flex flex-col flex-grow bg-dark p-0 sm:p-4">
            <Profile user={currentUser} />
          </div>
        ) : (
          <>
            <div
              className={`flex flex-col bg-dark p-4 overflow-hidden ${
                isSidebarOpen ? 'w-full sm:w-1/5' : 'hidden sm:flex sm:w-1/5'
              }`}
            >
              {currentView === 'chats' ? (
                <ChatList chats={chatList} onAddChat={toggleAddChatModal} onChatSelect={handleChatSelect} />
              ) : (
                <CourseList courses={courseList} onAddCourse={() => {}} />
              )}
            </div>

            <div
              className={`flex flex-col flex-grow overflow-hidden bg-dark px-4 py-2 relative ${
                activeChat || (currentView === 'ai' && (!isMobile || isAIChatVisible)) ? 'w-full sm:w-4/5' : 'hidden'
              }`}
            >
              {activeChat ? (
                <ChatWindow
                  chat={activeChat}
                  messages={messageList}
                  onBackClick={handleBackClick}
                  onSubmitMessage={handleSendMessage}
                />
              ) : currentView === 'ai' && (!isMobile || isAIChatVisible) ? (
                <ChatWindow
                  chat={{ name: 'AI Chat' }}
                  messages={messageList}
                  onBackClick={handleBackClick}
                  onSubmitMessage={handleSendMessage}
                />
              ) : null}
            </div>

            {currentView === 'courses' && !isMobile && (
              <div className="flex flex-col w-full p-4 bg-dark">
                <ChatWindow
                  chat={{ name: 'AI Chat' }}
                  messages={messageList}
                  onBackClick={() => {}}
                  onSubmitMessage={handleSendMessage}
                />
              </div>
            )}
          </>
        )}
      </div>
      <AddChatModal isOpen={isAddChatModalOpen} onRequestClose={toggleAddChatModal} setChats={setChatList} />
    </div>
  );
};

export default App;
