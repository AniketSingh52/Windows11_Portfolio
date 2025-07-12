import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  FileText, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Download,
  Calendar,
  MapPin,
  Phone,
  Award,
  Star,
  Zap,
  Menu,
  X,
  Search,
  Settings,
  Power,
  Folder,
  Chrome,
  Monitor,
  Volume2,
  Wifi,
  Battery,
  Minimize2,
  Maximize2,
  Home,
  Image,
  Music,
  Video,
  Play,
  ArrowLeft,
  Box,
  Palette,
  Gamepad2,
  Database,
  Globe,
  Server,
  Terminal,
  Layers,
  Hash,
  FileCode,
  Braces,
  Code2,
  Instagram,
  BatteryFull,
  Languages,
  GraduationCap,
  Link,
  ArrowRightCircle,
  GlobeLock,
  Send,
  Codesandbox
} from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  isOpen, 
  isMinimized, 
  isMaximized, 
  onClose, 
  onMinimize, 
  onMaximize, 
  children, 
  icon 
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        // Prevent window from going above taskbar area and keep title bar visible
        const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y));
        
        setPosition({
          x: newX,
          y: newY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      className={`fixed bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col ${
        isMaximized ? 'inset-0 rounded-none' : 'min-w-96 min-h-64'
      }`}
      style={
        isMaximized
          ? {}
          : {
              left: position.x,
              top: position.y,
              width: '900px',
              height: '650px'
            }
      }
    >
      {/* Window Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 rounded-t-lg cursor-move flex-shrink-0"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-800">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={onMaximize}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white rounded"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<{[key: string]: {isOpen: boolean, isMinimized: boolean, isMaximized: boolean}}>({});
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowId: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { isOpen: true, isMinimized: false, isMaximized: false }
    }));
    setIsStartMenuOpen(false);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false }
    }));
    if (windowId === 'projects') {
      setSelectedProject(null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true }
    }));
  };

  const maximizeWindow = (windowId: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMaximized: !prev[windowId]?.isMaximized }
    }));
  };

  const restoreWindow = (windowId: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: false }
    }));
  };

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: <User size={32} className="text-blue-600" />, type: 'folder' },
    { id: 'projects', name: 'Projects', icon: <Box size={32} className="text-green-600" />, type: 'folder' },
    { id: 'experience', name: 'Education', icon: <GraduationCap size={32} className="text-purple-600" />, type: 'folder' },
    { id: 'contact', name: 'Contact', icon: <Mail size={32} className="text-red-600" />, type: 'folder' },
    { id: 'resume', name: 'Resume', icon: <FileText size={32} className="text-orange-600" />, type: 'file' },
    { id: 'browser', name: 'Portfolio Website', icon: <Chrome size={32} className="text-blue-500" />, type: 'app', url: 'https://aniketmacfolio.vercel.app/' }
  ];

  const projects = [
    {
      id: 1,
      title: "Sci-Fi Environment",
      description: "A futuristic cityscape created in Blender with detailed lighting and atmospheric effects. Features procedural textures and advanced material nodes.",
      tech: ["Blender", "Cycles Renderer", "Substance Painter"],
      thumbnail: "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
      images: [
        "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      details: "This project showcases advanced 3D modeling techniques with a focus on creating atmospheric sci-fi environments. The scene includes detailed architecture, volumetric lighting, and post-processing effects."
    },
    {
      id: 2,
      title: "Character Animation",
      description: "Rigged and animated character model with facial expressions and realistic movement cycles created in Maya.",
      tech: ["Maya", "Arnold Renderer", "ZBrush"],
      thumbnail: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600",
      images: [
        "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      details: "Complete character pipeline from sculpting to animation. Features advanced rigging with custom controllers and realistic skin shading."
    },
    {
      id: 3,
      title: "Architectural Visualization",
      description: "Photorealistic interior design visualization with accurate lighting and material representation.",
      tech: ["3ds Max", "V-Ray", "Photoshop"],
      thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      details: "High-end architectural visualization focusing on realistic materials, global illumination, and post-production techniques."
    },
    {
      id: 4,
      title: "Game Asset Creation",
      description: "Low-poly game assets optimized for real-time rendering in Unreal Engine with PBR materials.",
      tech: ["Blender", "Unreal Engine", "Substance Designer"],
      thumbnail: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600",
      images: [
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      details: "Game-ready assets with optimized topology and PBR texturing workflow. Includes LOD models and collision meshes."
    }
  ];

  const experiences = [
    {
      title: "Senior 3D Artist",
      company: "Digital Dreams Studio",
      duration: "2022 - Present",
      location: "Los Angeles, CA",
      description: "Leading 3D art production for AAA game titles. Specializing in environment design, character modeling, and technical art direction."
    },
    {
      title: "3D Generalist",
      company: "Creative Visions Inc.",
      duration: "2020 - 2022",
      location: "San Francisco, CA",
      description: "Created 3D assets for advertising campaigns and architectural visualizations. Worked with clients to deliver high-quality renders and animations."
    },
    {
      title: "Junior 3D Artist",
      company: "Pixel Perfect Studios",
      duration: "2019 - 2020",
      location: "Austin, TX",
      description: "Developed 3D models and textures for mobile games. Collaborated with game designers to create engaging visual experiences."
    }
  ];

  const programmingLanguages = [
    { name: "C", icon: <Code size={24} className="text-blue-600" /> },
    { name: "C++", icon: <Code2 size={24} className="text-blue-700" /> },
    { name: "C#", icon: <Hash size={24} className="text-purple-600" /> },
    { name: "Java", icon: <FileCode size={24} className="text-orange-600" /> },
    { name: "Python", icon: <Terminal size={24} className="text-green-600" /> },
    { name: "JavaScript", icon: <Braces size={24} className="text-yellow-500" /> },
    { name: "PHP", icon: <Server size={24} className="text-indigo-600" /> },
    { name: "HTML", icon: <Globe size={24} className="text-orange-500" /> },
    { name: "Tailwind CSS", icon: <Palette size={24} className="text-cyan-500" /> },
    { name: "Node.js", icon: <Server size={24} className="text-green-500" /> },
    { name: "React", icon: <Layers size={24} className="text-blue-500" /> },
    { name: "TypeScript", icon: <FileCode size={24} className="text-blue-600" /> },
    { name: "GSAP", icon: <Zap size={24} className="text-green-400" /> }
  ];

  const databases = [
    { name: "MySQL", icon: <Database size={24} className="text-blue-600" /> },
    { name: "MongoDB", icon: <Database size={24} className="text-green-600" /> },
    { name: "PostgreSQL", icon: <Database size={24} className="text-blue-800" /> }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Desktop Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/image2.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080')`
        }}
      />
      
       {/* Desktop Icons */}
       <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-10">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center p-2 rounded hover:bg-white/20 cursor-pointer transition-colors group"
            onDoubleClick={() => {
              if (icon.type === 'app' && icon.url) {
                window.open(icon.url, '_blank');
              } else {
                openWindow(icon.id);
              }
            }}
          >
            {icon.icon}
            <span className="text-white text-xs mt-1 text-center max-w-16 group-hover:bg-blue-600 px-1 rounded">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

{/* About me */}

      {/* Windows */}
      <Window
        id="about"
        title="About Me"
        icon={<User size={16} className="text-blue-600" />}
        isOpen={openWindows.about?.isOpen || false}
        isMinimized={openWindows.about?.isMinimized || false}
        isMaximized={openWindows.about?.isMaximized || false}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onMaximize={() => maximizeWindow('about')}
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-100 shadow-md rounded-full mx-auto mb-4 flex items-center justify-center">
              <User size={48} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Aniket Singh</h1>
            <p className="text-xl text-gray-600">Software Engineer & 3D Artist</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {/* I'm a passionate 3D artist with over 5 years of experience creating stunning visual experiences 
              across games, films, and architectural visualization. I specialize in Blender, Maya, and Unreal Engine, 
              bringing creative visions to life through cutting-edge 3D technology. */}
              👋 Hi, I'm Aniket Singh — a passionate programmer and VFX artist who loves blending creativity with technology. I enjoy building unique web experiences, experimenting with design, and constantly learning new tools and frameworks.
            </p>
            <p className="text-gray-600 leading-relaxed">
              My expertise spans from Full Stack Development, Web Development, character modeling and animation to environment design and technical art. 
              I love pushing the boundaries of what's possible and constantly learning new techniques.
            </p>
          </div>
{/* 
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Box className="text-blue-600 mx-auto mb-2" size={32} />
              <h4 className="text-xl font-bold text-gray-800">100+</h4>
              <p className="text-gray-600 text-sm">3D Projects</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Star className="text-green-600 mx-auto mb-2" size={32} />
              <h4 className="text-xl font-bold text-gray-800">5+</h4>
              <p className="text-gray-600 text-sm">Years Experience</p>
            </div>
          </div> */}

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Programming Languages</h3>
            <div className="grid grid-cols-3 gap-4">
              {programmingLanguages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ">
                  {lang.icon}
                  <span className="text-gray-700 font-medium text-sm">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Databases</h3>
            <div className="grid grid-cols-3 gap-4">
              {databases.map((db, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 ">
                  {db.icon}
                  <span className="text-gray-700 font-medium text-sm">{db.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">3D Software Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Box className="text-orange-600" size={24} />
                <span className="text-gray-700">Blender</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Palette className="text-blue-600" size={24} />
                <span className="text-gray-700">Maya</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Gamepad2 className="text-purple-600" size={24} />
                <span className="text-gray-700">Unreal Engine</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Monitor className="text-green-600" size={24} />
                <span className="text-gray-700">Adobe After Effects</span>
              </div>
            </div>
          </div>
        </div>
      </Window>

      <Window
        id="projects"
        title="Projects"
        icon={<Box size={16} className="text-green-600" />}
        isOpen={openWindows.projects?.isOpen || false}
        isMinimized={openWindows.projects?.isMinimized || false}
        isMaximized={openWindows.projects?.isMaximized || false}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onMaximize={() => maximizeWindow('projects')}
      >
        <div className="space-y-6 pb-12">
          {!selectedProject ? (
            <a>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 ">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">

{/* 1st Project Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all ">
                {/* Image Section */}
                <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden cursor-pointer">
                                   {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-green-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm z-10 hover:scale-105 transition-all duration-300 hover:bg-green-100 hover:text-green-800">
      Completed
    </div>
                  <img 
                    src="/assets/VazeLMPr1.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Vaze College Leave Management System</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                    A web-based leave management system with role-based access, multi-level approval, and a streamlined application process for faculty, HODs, and administrators for managing their leaves.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Php</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#Mysql</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#Jquery</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="https://github.com/NitinSingh0/vaze-leave-management"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 cursor-pointer group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                       
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group opacity-50 transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600   "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>

{/* 2nd Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                                   {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-green-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm z-10 hover:scale-105 transition-all duration-300 hover:bg-green-100 hover:text-green-800">
      Completed
    </div>
                  <img 
                    src="/assets/VMS2.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Volunteer Management System</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                    A Social Welfare System for community building, Bringing Volunteers and Organizations on a single platform allowing streamlining of community service Programs and campaigns. With features like event creation, messaging, Posts , volunteer tracking, and user management.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Php</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#Mysql</span>
                      {/* <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110">#Html</span> */}
                      {/* <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110">#Jquery</span> */}
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-orange-800 hover:text-white">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110 hover:bg-green-800 hover:text-white">#Ratchet</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a 
                        href="https://github.com/AniketSingh52/Volunteer_Managment_System"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 cursor-pointer group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        href="https://volunteermanagement.42web.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 cursor-pointer group hover:scale-105  transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600  hover:bg-blue-700 "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>

{/* 3rd Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-green-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm z-10 hover:scale-105 transition-all duration-300 hover:bg-green-100 hover:text-green-800">
      Completed
    </div>
                  <img 
                    src="/assets/VMSAP.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Volunteer Management Admin Panel</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                  Admin dashboard for Monitoring & managing user activities, Status, Posts, Events, Admin Role Management,Access privileges and moderation the VolunteerHub platform.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Php</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#Mysql</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#Jquery</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/AniketSingh52/Volunteer_Managment_System"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        href="https://volunteermanagement.42web.io/main/pages/admin/login_in2.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600  hover:bg-blue-700 "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>

 {/* 4th Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all">
                {/* Image Section */}
                <div className="h-64  cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-purple-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 hover:scale-105 transition-all duration-300 hover:bg-purple-100 hover:text-purple-800">
      Designing
    </div>
                  <img 
                    src="/assets/WholesaleG.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Wholesale Grocery Store For Sanjay Trading Company</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                 Wholesale Grocery Store for Sanjay Trading Company a web-based platform built to streamline bulk grocery sales and inventory management, allowing Sanjay Trading Company to manage products, handle wholesale orders, and serve retailers efficiently. Tailored for B2B grocery operations.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Vite</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#React</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#Typescript</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/Aniket52777/wholesale-grocer-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group opacity-50 transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600  "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>
                          
 {/* 5th Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all ">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-yellow-500/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 hover:scale-105 transition-all duration-300 hover:bg-orange-100 hover:text-orange-800">
      In Progress
    </div>
                  <img 
                    src="/assets/UnderConstruction.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Vaze College Official Website</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                Working on an official website for V.G. Vaze College, designed to provide an intuitive and informative digital presence for students and faculty. Features include announcements, academic resources, and event updates.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Php</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#Mysql</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#Jquery</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/rushiii3/KETS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                       
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group   transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600 opacity-50 "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>
              
 {/* 6th Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-yellow-500/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 hover:scale-105 transition-all duration-300 hover:bg-orange-100 hover:text-orange-800">
      In Progress
    </div>
                  <img 
                    src="/assets/UnderConstruction.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Vaze Supervision Website</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
               A streamlined Faculty Allotment Exam System designed for efficient professor allocation during exams. Features an intuitive dashboard for administrators to manage and track assignments seamlessly.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Php</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#Mysql</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#Jquery</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/NitinSingh0/Examination"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group opacity-50 transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600   "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>

  {/* 7th Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all ">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-purple-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 hover:scale-105 transition-all duration-300 hover:bg-purple-100 hover:text-purple-800">
    Designing
    </div>
                  <img 
                    src="/assets/CyberTerminal.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Cyber Terminal Portfolio View</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
               A stunning Kali Linux-inspired portfolio website that captures the essence of cybersecurity and hacking aesthetics, With feature Like a dark terminal theme, Matrix-style effects, and professional sections showcasing One's Programing expertise.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Vite</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#React</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#TypeScript</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/Aniket52777/cyber-portfolio-terminal-view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        // href="https://yourliveprojectlink.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group opacity-50  transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600   "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>

  {/* 8th Project Card */}
<div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transition-all ">
                {/* Image Section */}
                <div className="h-64 cursor-pointer rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {/* Completed Badge */}
    <div className="absolute top-4 right-4 bg-purple-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10 hover:scale-105 transition-all duration-300 hover:bg-purple-100 hover:text-purple-800">
    Designing
    </div>
                  <img 
                    src="/assets/image.png"
                    alt="Sci-Fi Environment"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Github className="text-white" size={32} />
                  </div>
                </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">DronHub - For Buying and Selling Drones</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                      DronHub is an online platform designed for buying and selling drones. It connects drone enthusiasts, sellers, and buyers through a streamlined marketplace. The system includes product listings, user accounts, and various Other features tailored for the drone industry. A stunning Kali Linux-inspired portfolio website that captures the essence of cybersecurity and hacking aesthetics, With feature Like a dark terminal theme, Matrix-style effects, and professional sections showcasing One's Programing expertise.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-purple-800 hover:text-white">#Vite</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-red-800 hover:text-white">#React</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-blue-800 hover:text-white">#Html</span>
                      <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-lg text-xs font-medium hover:scale-110 hover:bg-sky-800 hover:text-white">#TypeScript</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-medium hover:scale-110 hover:bg-teal-800 hover:text-white">#TailwindCss</span>
                      {/* <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium hover:scale-110">#Redis</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:scale-110">#Ratchet</span> */}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/Aniket52777/drone-hub-aero-market"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group hover:scale-105  transition-all duration-300 text-center px-2 py-2 rounded-lg text-sm font-medium text-white bg-gray-800  hover:bg-gray-900 "
                      >
                      <Github className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        GitHub
                      </a>
                      <a
                        // href="https://yourliveprojectlink.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group opacity-50  transition-all duration-300 text-center px-2 py-2 text-sm  rounded-lg font-medium text-white bg-blue-600   "
                      >
                        <Link className="inline mr-1 group-hover:scale-110 transition-all duration-300" size={16} />
                        Live Demo
                      </a>
                    </div>
                  </div>
      </div>
              

                {/* {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <ArrowRightCircle className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))} */}


                
              </div>
            </a>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back to Projects
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tech.map((tech: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Project Details</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{selectedProject.details}</p>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.images.map((image: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={image} 
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Project Video</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="text-gray-400 mx-auto mb-2" size={48} />
                      <p className="text-gray-500">Video Preview</p>
                      <p className="text-gray-400 text-sm">Click to play demonstration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Window>

      <Window
        id="experience"
        title="Education"
        icon={<GraduationCap size={16} className="text-purple-600" />}
        isOpen={openWindows.experience?.isOpen || false}
        isMinimized={openWindows.experience?.isMinimized || false}
        isMaximized={openWindows.experience?.isMaximized || false}
        onClose={() => closeWindow('experience')}
        onMinimize={() => minimizeWindow('experience')}
        onMaximize={() => maximizeWindow('experience')}
      >
        
      {/* <div className="h-full overflow-y-auto px-6 py-8 bg-white rounded-b-xl text-gray-800 space-y-8"> */}

{/* Header */}
{/* <div className="text-center">
  <Briefcase size={48} className="text-purple-600 mx-auto mb-4" />
  <h2 className="text-3xl font-bold">Work Experience</h2>
  <p className="text-gray-600 mt-2 max-w-xl mx-auto">
    A curated timeline of my professional journey in visual effects, design, and creative technology.
  </p>
</div> */}

{/* Experience Cards */}
{/* <div className="space-y-6">
  {experiences.map((exp, index) => (
    <div
      key={index}
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600 hover:border-blue-500 transition hover:scale-[1.01] duration-200 hover:shadow-lg hover:bg-gray-50"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
        <span className="text-sm text-gray-500 flex items-center gap-1 mt-1 md:mt-0">
          <Calendar size={14} />
          {exp.duration}
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
        <h4 className="text-md text-purple-700 font-medium">{exp.company}</h4>
        <span className="text-sm text-gray-500 flex items-center gap-1 mt-1 md:mt-0">
          <MapPin size={14} />
          {exp.location}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm">{exp.description}</p>
    </div>
  ))}
</div> */}
{/* </div> */}


<div className="h-full overflow-y-auto px-2 py-4 bg-white rounded-b-xl text-gray-800 space-y-6">

  {/* Header */}
  <div className="text-center">
    <GraduationCap size={48} className="text-purple-600 mx-auto mb-4" />
    <h2 className="text-3xl font-bold">Educational Journey</h2>
    <p className="text-gray-600 mt-2 max-w-xl mx-auto">
      A timeline of my academic path, highlighting achievements, key skills, and extracurricular involvement.
    </p>
  </div>

  {/* Education Timeline */}
  <div className="relative">
    {/* Vertical timeline line */}
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-400 z-0"></div>

    <div className="space-y-12">
      
      {/* Entry - Bachelor’s */}
      <div className="relative">
        {/* Timeline Dot + Pulse */}
        <div className="absolute left-8 top-3 -translate-x-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-600 rounded-full z-20"></div>
            <div className="absolute w-8 h-8 border-2 border-purple-300 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="pl-20">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <span className="text-purple-600 font-semibold text-sm">April 2022 - Present</span>
              <img src="/assets/image3.png" alt="University of Mumbai" className="w-12 h-12 rounded-md bg-white p-1 shadow-md" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Bachelor of Science in Information Technology</h3>
            <h4 className="text-purple-700 font-medium mb-3">University of Mumbai</h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Achieved a 9.98 SGPA while gaining expertise in software development, databases, and web technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Entry - HSC */}
      <div className="relative">
        <div className="absolute left-8 top-3 -translate-x-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-600 rounded-full z-20"></div>
            <div className="absolute w-8 h-8 border-2 border-purple-300 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="pl-20">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <span className="text-purple-600 font-semibold text-sm">April 2021 - March 2022</span>
              <img src="/assets/image2.png" alt="Ramanand Arya DAV College" className="w-12 h-12 rounded-md bg-white p-1 shadow-md" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Higher Secondary Education (HSC - 12th Grade)</h3>
            <h4 className="text-purple-700 font-medium mb-3">Ramanand Arya DAV College</h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Focused on foundational programming, problem-solving, and mathematics.
            </p>
          </div>
        </div>
      </div>

      {/* Entry - SSC */}
      <div className="relative">
        <div className="absolute left-8 top-3 -translate-x-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 bg-purple-600 rounded-full z-20"></div>
            <div className="absolute w-8 h-8 border-2 border-purple-300 rounded-full animate-ping"></div>
          </div>
        </div>

        <div className="pl-20">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <span className="text-purple-600 font-semibold text-sm">April 2019 - March 2020</span>
              <img src="/assets/image1.png" alt="St Pius X High School" className="w-12 h-12 rounded-md bg-white p-1 shadow-md" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Secondary School Education (SSC - 10th Grade)</h3>
            <h4 className="text-purple-700 font-medium mb-3">St Pius X High School</h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Built a strong academic foundation in science and mathematics with early exposure to computer programming.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


      </Window>

      <Window
  id="contact"
  title="Contact"
  icon={<Mail size={16} className="text-red-600" />}
  isOpen={openWindows.contact?.isOpen || false}
  isMinimized={openWindows.contact?.isMinimized || false}
  isMaximized={openWindows.contact?.isMaximized || false}
  onClose={() => closeWindow('contact')}
  onMinimize={() => minimizeWindow('contact')}
  onMaximize={() => maximizeWindow('contact')}
>
  <div className="space-y-6 text-gray-800">

    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-6">
      Let's Connect
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Contact Info */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-2 rounded-full">
              <Mail className="text-red-600" size={18} />
            </div>
            <a href="mailto:walfra52777@gmail.com" className="text-gray-700 font-medium">Walfra52777@gmail.com</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <GlobeLock className="text-green-600" size={18} />
            </div>
            <a href='https://aniketmacfolio.vercel.app' target='_blank' className="text-gray-700 font-medium">Aniketmacfolio.vercel.app</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="text-blue-600" size={18} />
            </div>
            <span className="text-gray-700 font-medium">Mumbai, India</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <a href="https://github.com/Aniket52777" target="_blank" className="text-gray-600 hover:text-black transition-transform transform hover:scale-125">
            <Github size={22} />
          </a>
          <a href="#" target="_blank" className="text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-125">
            <Linkedin size={22} />
          </a>
          <a  href="https://www.instagram.com/aniket_singh52/" target="_blank" className="text-gray-600 hover:text-pink-500 transition-transform transform hover:scale-125">
            <Instagram size={22} />
          </a>
        </div>
      </div>

      {/* Right: Contact Form */}
      <div className="backdrop-blur-lg bg-white/80 border border-gray-200 rounded-xl p-6 shadow-lg">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ajay"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="xyz@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-600 flex items-center justify-center gap-2 font-medium shadow-md"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</Window>


      <Window
        id="resume"
        title="Resume"
        icon={<FileText size={16} className="text-orange-600" />}
        isOpen={openWindows.resume?.isOpen || false}
        isMinimized={openWindows.resume?.isMinimized || false}
        isMaximized={openWindows.resume?.isMaximized || false}
        onClose={() => closeWindow('resume')}
        onMinimize={() => minimizeWindow('resume')}
        onMaximize={() => maximizeWindow('resume')}
      >
        {/* <div className="text-center space-y-6">
          <FileText className="text-orange-600 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800">Resume</h2>
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
            Download my resume to learn more about my 3D art experience, technical skills, and professional achievements.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
            <Download size={20} />
            Download Resume
          </button>
        </div> */}
        
        <div className="h-full overflow-y-auto px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-b-xl text-white space-y-12 rounded-lg">

{/* Header */}
<div className="text-center space-y-6">
  <FileText className="text-orange-400 mx-auto mb-4 animate-bounce" size={64} />
  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
    Resume
  </h2>
  <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
    Download my resume to explore my professional experience and creative skills.
  </p>
<a
  href="Resume.pdf"
  download="Aniket_Singh_Resume.pdf"
  className="bg-gradient-to-r text-center w-1/3 from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mx-auto group"
>
  <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
  Download Resume
</a>

</div>

{/* Sections */}
<div className="space-y-10">

  {/* Certifications */}
  {/* <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-700/20 shadow-lg transition hover:shadow-cyan-500/20">
    <h2 className="text-2xl font-semibold mb-4 flex items-center text-cyan-400">
      <Award className="mr-2 text-cyan-400" size={24} />
      Certifications
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        "Adobe Certified Expert - After Effects",
        "Houdini Certified Artist",
        "Autodesk Maya Professional",
        "Foundry Nuke Certified Compositor"
      ].map((cert, index) => (
        <div key={index} className="flex items-center space-x-3 text-gray-300 hover:text-white transition">
          <Star size={16} className="text-cyan-400" />
          <span>{cert}</span>
        </div>
      ))}
    </div>
  </div> */}

  {/* Awards */}
  {/* <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-700/20 shadow-lg transition hover:shadow-yellow-500/20">
    <h2 className="text-2xl font-semibold mb-4 flex items-center text-cyan-400">
      <Award className="mr-2 text-yellow-400" size={24} />
      Awards & Recognition
    </h2>
    <div className="space-y-3">
      {[
        "VES Award - Outstanding VFX in Commercial (2023)",
        "Canadian Screen Award - Best VFX (2022)",
        "3D World Excellence Award (2021)",
        "Motion Graphics Excellence - Gold (2020)"
      ].map((award, index) => (
        <div key={index} className="flex items-center space-x-3 text-gray-300 hover:text-white transition">
          <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
          <span>{award}</span>
        </div>
      ))}
    </div>
  </div> */}

  {/* Languages */}
  {/* <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-700/20 shadow-lg transition hover:shadow-blue-500/20">
    <h2 className="text-2xl font-semibold mb-4 flex items-center text-cyan-400">
      <Languages className="mr-2 text-blue-400" size={24} />
      Languages
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
      {[
        { language: "English", level: "Native" },
        { language: "French", level: "Conversational" },
        { language: "Spanish", level: "Basic" }
      ].map((lang, index) => (
        <div key={index} className="hover:scale-105 transition-all">
          <div className="text-lg font-semibold text-white">{lang.language}</div>
          <div className="text-sm text-cyan-400">{lang.level}</div>
        </div>
      ))}
    </div>
  </div> */}

  {/* Professional Summary */}
  <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/50 border border-cyan-700/30 rounded-xl p-6 shadow-inner">
    <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Professional Summary</h2>
    <p className="text-gray-300 leading-relaxed">
      A proficient programmer, with a strong command of web development and automation tools, enabling seamless integration of technology into creative workflows. Passionate about pushing the boundaries of visual storytelling through cutting-edge technology and creative vision. 
      Also Highly skilled VFX Artist with 5+ years of experience in creating photorealistic visual effects for feature films, commercials, and digital content. 
    </p>
  </div>

</div>
</div>



        
      </Window>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md border-t border-gray-600 flex items-center justify-between px-2 z-50">
        {/* Start Button */}
        <button
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="h-10 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-2 transition-colors"
        >
          {/* <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
          </div> */}
          <Codesandbox className="text-white w-6 h-6 " size={24} />
          <span className="text-sm font-medium">Start</span>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Type here to search"
              className="w-full h-8 pl-10 pr-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>

        {/* Open Windows */}
        <div className="flex items-center gap-1">
          {Object.entries(openWindows).map(([windowId, window]) => {
            if (!window.isOpen) return null;
            const icon = desktopIcons.find(i => i.id === windowId);
            return (
              <button
                key={windowId}
                onClick={() => window.isMinimized ? restoreWindow(windowId) : minimizeWindow(windowId)}
                className={`h-8 px-3 rounded flex items-center gap-2 text-white text-xs transition-colors ${
                  window.isMinimized ? 'bg-gray-600' : 'bg-blue-600'
                }`}
              >
                {React.cloneElement(icon?.icon as React.ReactElement, { size: 14 })}
                <span className="max-w-20 truncate">{icon?.name}</span>
              </button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 text-white">
          <Wifi size={16} />
          <Volume2 size={16} />
          <BatteryFull size={18} />
          <div className="text-xs text-center">
            <div>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className="absolute bottom-12 left-0 w-96 h-96 bg-black/90 backdrop-blur-md rounded-t-lg border border-gray-600 z-50">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-white font-medium">Aniket Singh</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {desktopIcons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => openWindow(icon.id)}
                  className="flex flex-col items-center p-3 rounded hover:bg-white/10 transition-colors"
                >
                  {React.cloneElement(icon.icon as React.ReactElement, { size: 24 })}
                  <span className="text-white text-xs mt-1 text-center">{icon.name}</span>
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-600 pt-3 flex justify-between">
              <button className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded transition-colors">
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </button>
              <button className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded transition-colors">
                <Power size={16} />
                <span className="text-sm">Power</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;