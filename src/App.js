import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import './App.css';
import Spline from '@splinetool/react-spline';

// SVG Icon Components
const HomeIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const ToolIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const BriefcaseIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Project Icons
const ChartIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const TargetIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const AirplaneIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9l-8.2-1.8c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-5 2v6l2-4 4-2 4.5 4.5c.4.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
  </svg>
);

const NetworkIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <line x1="6" y1="9" x2="6" y2="12" />
    <line x1="18" y1="9" x2="18" y2="12" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="12" y1="12" x2="12" y2="15" />
  </svg>
);

const ShoppingCartIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const BrainIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const BlockchainIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <line x1="10" y1="6.5" x2="14" y2="6.5" />
    <line x1="10" y1="17.5" x2="14" y2="17.5" />
    <line x1="6.5" y1="10" x2="6.5" y2="14" />
    <line x1="17.5" y1="10" x2="17.5" y2="14" />
  </svg>
);

const DatabaseIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);

const GameIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <circle cx="8" cy="10" r="1" />
    <circle cx="16" cy="10" r="1" />
    <path d="M14 8h2v4h-2z" />
    <path d="M12 6v4" />
  </svg>
);

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/selin-bardakci' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/selin-bardakci' },
  { name: 'Email', url: 'mailto:selin.bardakci520@gmail.com' },
];

const navLinks = [
  { name: 'Home', to: '/', icon: HomeIcon },
  { name: 'About', to: '/about', icon: UserIcon },
  { name: 'Projects', to: '/projects', icon: CodeIcon },
  { name: 'Experience', to: '/experience', icon: BriefcaseIcon },
  { name: 'Contact', to: '/contact', icon: MailIcon },
];

const projects = [
  {
    title: "WaveRiders – Boat/Yacht Rental Web & Mobile Application",
    description: "Full-stack boat/yacht rental platform with user dashboards, real-time booking, and admin verification.",
    detailedDescription: "WaveRiders is a full-featured web and mobile platform designed for renting boats and yachts. The system supports two types of users—customers and business owners. Customers can explore listings, book rentals, and manage favorites, while business owners can upload listings, verify documents, and track rental statistics through dedicated dashboards. The platform includes an admin panel for manual verification of uploaded documents and integrates cloud services for scalability and security. The platform integrates cloud technologies for scalable deployment.",
    tech: ["React", "Node.js,", "MySQL (AWS RDS)", "AWS S3/EC2", "React Native"],
    category: "academic statistical",
    link: "#",
    images: [
      "waveridersMainPhoto.png",
      "waveriders1.png",
      "waveriders2.png",
      "waveriders3.png",
      "waveriders4.png",
      "waveriders5.png"
    ],
    features: [
      "User authentication and role-based access",
      "Multi-step listing creation with document uploads",
      "Real-time rental booking and listing search",
      "Admin panel for license verification",
      "Admin panel for license verification"
    ],
    challenges: "The main challenge was implementing handling secure document uploads and verification via AWS S3.",
    outcome: "Successfully delivered a scalable and user-friendly rental platform used for simulated testing. Implemented a working admin flow, real-time listing updates, and AWS-based deployment infrastructure."
  },
  {
    title: "AirClass – Interactive Classroom System",
    description: "Integrated classroom solution combining gesture-based control, desktop management, and real-time student interaction via mobile.",
    detailedDescription: "AirClass is a modular smart classroom system built to enhance interactivity between instructors and students. It features a hardware module that uses MediaPipe and Raspberry Pi for real-time face and gesture tracking, a Qt-based desktop application for managing presentations, attendance, and communication, and a React Native mobile app for students to join sessions, scan QR codes for attendance, and send speak requests. Designed for scalability and real-time responsiveness, AirClass bridges traditional teaching with advanced human-computer interaction.",
    tech: ["Raspberry Pi", "Qt (C++)", "React Native", "MediaPipe", "Machine Learning", "Computer Vision", "WebSockets"],
    category: "academic interactive",
    link: "#",
    images: [
      "airclassMainPhoto.png",
      "airclass2.png",
      "airclass3.png"
    ],
    features: [
      "Gesture-based slide navigation and zooming",
      "Real-time hand tracking and face-following camera control",
      "PDF and PPTX presentation support with annotation tools",
      "Mobile QR-based attendance tracking and speak requests",
      "Cross-module communication between hardware, desktop, and mobile apps"
    ],
    challenges: "Achieving real-time gesture recognition on Raspberry Pi under CPU constraints, ensuring stable multi-device communication, and training a robust gesture model with minimal overfitting were key technical hurdles.",
    outcome: "Successfully deployed in simulated classroom tests with stable performance, 95% gesture recognition accuracy, and real-time interactivity across 50+ student devices. Validated as a scalable and modular education platform."
  },
  {
    title: "GTU-C312 OS Simulator",
    description: "Custom CPU and operating system simulation with cooperative multitasking and thread scheduling.",
    detailedDescription: "GTU-C312 OS Simulator is a low-level educational tool that emulates a fictional CPU and a cooperative operating system. Built to demonstrate core OS principles, the simulator executes a custom assembly-like instruction set and manages multiple user-mode threads through a round-robin scheduler. Features include system call handling, thread context switching, memory protection enforcement, and performance monitoring. It enables students to understand CPU cycles, thread states, and user-kernel mode interactions at the instruction level.",
    tech: ["C++", "Operating Systems", "CPU Simulation", "Assembly-Like Language", "Thread Scheduling"],
    category: "academic systems",
    link: "#",
    images: [
      "OSsimulator.png"
    ],
    features: [
      "Custom CPU with 20+ unique instructions including SYSCALL, PUSH, and CPYI",
      "Memory protection between user and kernel space",
      "Round-robin thread scheduler with full context switching",
      "Instruction execution tracking and per-thread statistics",
      "Multi-threaded program execution with cooperative multitasking"
    ],
    challenges: "Simulating instruction-by-instruction thread execution and ensuring correct memory isolation required designing a robust virtual CPU with custom logic for PC, SP, and syscall handling.",
    outcome: "Created a hypothetic CPU and simulation of a CPU with round-robin scheduling."
  },
  {
    title: "Distributed Chat and File Server",
    description: "Multi-threaded TCP chat and file-sharing server with room support, private messaging, and controlled upload queue.",
    detailedDescription: "The Distributed Chat and File Server is a multi-client communication system built in C using POSIX threads and TCP sockets. It allows users to join rooms, send private messages, broadcast to groups, and transfer files. File uploads are regulated via a semaphore-controlled queue to simulate limited server resources, and all interactions are timestamp-logged. The system supports color-coded command responses, graceful signal handling (SIGINT), and concurrency-safe operations across threads.",
    tech: ["C", "POSIX Threads", "TCP Sockets", "Semaphores", "Mutexes", "Signal Handling"],
    category: "academic networking",
    link: "#",
    images: [
      "distributedChat.png"
    ],
    features: [
      "Room-based chat with real-time broadcast and private messaging",
      "File transfer system with semaphore-controlled upload queue",
      "Thread-safe logging with timestamps for all user actions",
      "Color-coded command-based client interface",
      "Graceful SIGINT handling and client disconnection support"
    ],
    challenges: "Synchronizing file uploads across multiple threads while enforcing queue limits and ensuring non-blocking I/O for chat messages required careful coordination of mutexes, semaphores, and condition variables.",
    outcome: "Successfully passed concurrency and functionality tests with 15+ clients and dynamic file uploads. Demonstrated robust multithreaded architecture with clear separation of networking, file handling, and synchronization logic."
  },
  {
    title: "G++ Language Interpreter & Lexer (Lisp and C/C++)",
    description: "Custom interpreter for a toy programming language with lexical and syntax analysis in both C and Lisp.",
    detailedDescription: "This project involves building a dual-language interpreter for G++, a simplified, Lisp-inspired programming language. It includes a hand-written recursive-descent parser in Common Lisp and a lexer/parser pair using Flex and Yacc in C. The interpreter handles expressions, conditional statements, and token classification (keywords, identifiers, numbers) while generating parse trees and reporting syntax or lexical errors. Both implementations read user input interactively or from file, mimicking REPL behavior.",
    tech: ["Common Lisp", "C", "Flex", "Yacc", "Compiler Design", "Language Parsing"],
    category: "academic compilers",
    link: "#",
    images: [
      "languageinterpreterMainPhoto.png"
    ],
    features: [
      "Dual interpreter implementations in Lisp and C",
      "Lexical analysis using Flex with token recognition (keywords, IDs, numbers)",
      "Syntax analysis using Yacc for CFG parsing of expressions and `if` statements",
      "Recursive-descent parser built from scratch in Common Lisp",
      "Interactive mode and file input support with parse tree generation"
    ],
    challenges: "Creating a robust parser in Lisp without parser generators required manual implementation of grammar rules and recursive descent logic. Ensuring consistency across two language implementations also added debugging complexity.",
    outcome: "Delivered two fully functioning interpreters with accurate tokenization and parsing. Successfully executed G++ programs with branching logic and expressions, and received full credit in coursework for demonstrating core compiler principles."
  },

  {
    title: "Vaultify – Time-Locked Ethereum Vaults",
    description: "Web3 platform to send ETH and messages to a recipient that can only be accessed after a time lock expires.",
    detailedDescription: "Vaultify is a secure, Ethereum-based platform that lets users create one-time time-locked vaults containing ETH and personal messages. Each vault is linked to a unique QR code. The vault remains sealed until the expiration time, after which the recipient can claim the ETH and view the message by scanning the QR code. It ensures a trustless handoff of digital assets using blockchain and decentralized storage.",
    tech: ["Solidity", "Hardhat", "IPFS/Filecoin", "React", "Ethereum", "Web3.js"],
    category: "hackathon web3",
    link: "#",
    images: [
      "vaultifyMainPhoto.png"
    ],
    features: [
      "Time-locked vault creation with ETH and data",
      "QR code-based retrieval for recipients",
      "Smart contract-enforced lock and claim logic",
      "Decentralized file storage using IPFS/Filecoin",
      "WorldCoin MiniKit SDK integration for identity verification"
    ],
    challenges: "Coordinating smart contract logic with file uploads to IPFS and ensuring vaults could not be accessed before expiry required strict timing control and off-chain metadata management.",
    outcome: "Successfully demoed at ETH Prague 2025 hackathon. Recognized for its unique use of time-locks, decentralized storage, and identity-aware access control. Used by multiple teams as a reference for secure asset handoff."
  },

  {
    title: "Object-Oriented Shell Simulator",
    description: "Simulated operating system shell with persistent virtual file system and polymorphic file types.",
    detailedDescription: "This project is a C++ shell simulation that supports common Unix-like file operations (`ls`, `mkdir`, `cp`, `link`, `cd`, `cat`) over a virtual file system. The design uses a base abstract `File` class with derived types for `Directory`, `SoftLinkFile`, and `RegularFile`, each implementing a custom iterator. The shell maintains a simulated 10MB disk that persists between runs, mirroring basic OS-level file management behaviors. All file interactions follow object-oriented principles and utilize C++11 features.",
    tech: ["C++11", "Object-Oriented Design", "File System Simulation", "Iterators", "Virtual Classes"],
    category: "academic systems",
    link: "#",
    images: [
      "oopShell.png"
    ],
    features: [
      "Supports `ls`, `mkdir`, `cp`, `link`, `cd`, `cat` commands",
      "Virtual persistent disk with 10MB capacity",
      "Abstract base file class with polymorphic behavior",
      "Custom iterators per file type (regular, directory, soft link)",
      "Simulates real shell behavior and command hierarchy"
    ],
    challenges: "Designing a consistent and extendable file abstraction hierarchy while ensuring accurate state persistence between runs and recursive directory handling pushed the limits of object-oriented C++ design.",
    outcome: "Successfully simulated a simplified shell and virtual file system. Strengthened understanding of class hierarchies, polymorphism, iterator design, and Unix-like shell command execution in C++."
  },

  {
    title: "iRender – Decentralized GPU Rendering Marketplace",
    description: "Blockchain-based platform connecting users with idle GPU resources for AI, ML, and 3D rendering tasks.",
    detailedDescription: "iRender is a cutting-edge decentralized platform that democratizes access to high-performance GPU computing by connecting clients with GPU providers through a trustless blockchain protocol. It supports AI/ML workloads, 3D rendering, gaming, and medical imaging by leveraging idle GPU resources. The platform ensures transparency, optimal performance, and energy-efficient task scheduling through smart contracts, staking mechanisms, and a token-based economy.",
    tech: ["Solidity", "Blockchain", "AI Scheduling", "GPU Computing", "IPFS", "$IRD Token"],
    category: "web3 infrastructure",
    link: "#",
    images: [
      "irender1.png",
      "irender2.png",
      "irender3.png"
    ],
    features: [
      "Decentralized GPU compute resource matching via AI",
      "IRD token-based incentive and staking system",
      "Task scheduler with real-time job distribution",
      "User and provider dashboards for seamless interaction",
      "Custom blockchain layer for high-throughput task processing"
    ],
    challenges: "Designing a scalable, secure scheduler that dynamically assigns computationally intensive jobs to distributed GPU nodes while managing fair compensation through tokenomics was a key technical challenge.",
    outcome: "Developed a fully-documented protocol with architectural and economic viability. Whitepaper published outlining the roadmap to a custom blockchain layer optimized for AI/ML workloads and 3D rendering tasks."
  },

  {
    title: "FTake – Decentralized Freelancer Platform",
    description: "Blockchain-based platform for freelancers and employers with secure payments, skill verification, and NFT-based certifications.",
    detailedDescription: "FTake is a decentralized platform designed to facilitate secure and transparent collaboration between freelancers and employers. It leverages smart contracts for safe cryptocurrency-based payments, eliminating the need for centralized intermediaries. The platform includes built-in skill assessments and issues NFT-based certificates to validate user abilities. These certificates serve as verifiable proof of expertise, enhancing trust and credibility. Personal data is securely stored on a blockchain, ensuring privacy and ownership over user information. FTake reimagines the freelancer economy by integrating secure payments, identity, and reputation management into a trustless, decentralized system.",
    tech: ["Solidity", "Ethereum", "Smart Contracts", "NFT", "Blockchain", "React"],
    category: "web3 freelance",
    link: "#",
    images: [
      "ftakeMainPhoto.png",
      "ftake2.png",
      "ftake3.png"
    ],
    features: [
      "Secure cryptocurrency payments via smart contracts",
      "Skill evaluation through on-platform surveys and tests",
      "NFT-based certification to document user skills",
      "Decentralized storage of personal and professional data",
      "Privacy-focused identity and achievement documentation"
    ],
    challenges: "Integrating verifiable skill certification with decentralized data privacy required careful design of NFT issuance, secure survey infrastructure, and user-controlled data management on-chain.",
    outcome: "Successfully conceptualized and documented as a decentralized alternative to Web2 freelancing platforms, with an emphasis on transparency, proof of skill, and data sovereignty."
  }

];

const skills = {
  "Programming Languages": ["C", "C++", "C#", "Python", "Java", "JavaScript", "TypeScript", "Solidity"],
  "Frameworks & Libraries": ["React", "React Native", "Node.js", "Flutter", "Quartus Prime"],
  "Embedded Systems": ["Raspberry Pi", "Real-time Systems", "Gesture Recognition"],
  "Database & Cloud": ["MySQL", "AWS", "Docker"],
  "DevOps & Tools": ["Git", "Unit Testing", "Product Security", "RESTful APIs"],
  "Design & Collaboration": ["Figma", "Slack", "Jira"]
};

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div className="navbar-links">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                <IconComponent />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Add new point to trail
        setTrail(prev => {
          const newTrail = [...prev, { x, y, id: Date.now() }];
          // Keep only last 30 points for more prominent trail
          return newTrail.slice(-30);
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Enhanced mouse trail effect with multiple purple tones */}
      {trail.map((point, index) => {
        const opacity = (index / trail.length) * 1.2;
        const scale = 1 - (index / trail.length) * 0.3;
        const size = 8 - (index / trail.length) * 4;

        return (
          <div
            key={point.id}
            style={{
              position: 'absolute',
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(128, 43, 177, ${opacity}) 0%, rgba(128, 43, 177, ${opacity * 0.5}) 50%, transparent 100%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              opacity: opacity,
              transform: `scale(${scale})`,
              transition: 'all 0.05s ease',
              zIndex: 1000,
              boxShadow: `0 0 ${20 + size * 2}px rgba(128, 43, 177, ${opacity * 0.8}), 0 0 ${40 + size * 3}px rgba(128, 43, 177, ${opacity * 0.4})`,
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}

      {/* Hero section: Text left, Spline robot right */}
      <div className="hero-flex-row">
        <div className="hero-intro-text">
          <p style={{
            fontSize: '18px',
            color: 'var(--primary-light)',
            marginBottom: '16px',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: '1',
            transition: 'color 0.3s ease'
          }}>Hello, I'm</p>

          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: '0.9',
            letterSpacing: '-0.04em',
            position: 'relative',
            zIndex: '1',
            transition: 'color 0.3s ease'
          }}>Selin Bardakci</h1>

          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: 'var(--dark-text-secondary)',
            marginBottom: '24px',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: '1',
            transition: 'color 0.3s ease',
            background: 'linear-gradient(135deg, var(--primary-light), #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Computer Engineer</h2>

          <p style={{
            fontSize: '18px',
            color: 'var(--dark-text-muted)',
            marginBottom: '20px',
            fontWeight: '400',
            letterSpacing: '0.01em',
            position: 'relative',
            zIndex: '1',
            transition: 'color 0.3s ease'
          }}>Computer Engineering Student at Gebze Technical University</p>

          <p style={{
            fontSize: '16px',
            color: 'var(--dark-text-secondary)',
            maxWidth: '500px',
            marginBottom: '40px',
            lineHeight: '1.7',
            position: 'relative',
            zIndex: '1'
          }}>
            Computer Engineering student with expertise in embedded systems, full-stack development, and blockchain technologies. Bringing cross-cultural adaptability and hands-on experience managing 
            global tech projects and investor relations across diverse markets.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: '1' }}>
            <Link to="/projects" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--primary)',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(128, 43, 177, 0.3)'
            }}>View My Work</Link>

            <Link to="/about" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}>About Me</Link>
          </div>

        </div>

        <div className="spline-robot-container">
          <Spline
            scene="https://prod.spline.design/vafxFtpLvR5krn-Z/scene.splinecode"
            style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Technical Skills Section */}
      <section style={{
        padding: '80px 0',
        position: 'relative',
        zIndex: '2',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '32px',
        paddingRight: '32px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>Technical Skills</h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--dark-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Technologies and tools I work with to build innovative solutions
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} style={{
              background: 'var(--dark-card-bg)',
              border: '1px solid var(--dark-card-border)',
              borderRadius: '16px',
              padding: '32px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'var(--accent-gradient)',
                borderRadius: '16px 16px 0 0'
              }} />

              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}>{category}</h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {skillList.map((skill, index) => (
                  <span key={index} style={{
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--primary-light)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Multiple purple ray effects */}
      <div
        style={{
          position: 'absolute',
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(128, 43, 177, 0.4) 0%, rgba(128, 43, 177, 0.2) 30%, rgba(128, 43, 177, 0.1) 60%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999,
          filter: 'blur(2px)',
          animation: 'pulse 2s infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(128, 43, 177, 0.3) 0%, rgba(128, 43, 177, 0.15) 40%, rgba(128, 43, 177, 0.05) 80%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 998,
          filter: 'blur(3px)',
        }}
      />

      {/* Enhanced parallax background elements with purple tones */}
      <div
        style={{
          position: 'absolute',
          left: mousePosition.x * 0.03,
          top: mousePosition.y * 0.03,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(128, 43, 177, 0.2) 0%, rgba(128, 43, 177, 0.1) 40%, rgba(128, 43, 177, 0.05) 70%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(4px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: mousePosition.x * -0.02,
          bottom: mousePosition.y * -0.02,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(128, 43, 177, 0.15) 0%, rgba(128, 43, 177, 0.08) 50%, rgba(128, 43, 177, 0.03) 80%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(5px)',
        }}
      />

      {/* Additional purple light rays */}
      <div
        style={{
          position: 'absolute',
          left: mousePosition.x * 0.01,
          top: mousePosition.y * -0.01,
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(128, 43, 177, 0.25) 0%, rgba(128, 43, 177, 0.12) 35%, rgba(128, 43, 177, 0.06) 65%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(3px)',
        }}
      />
    </div>
  );
}

function About() {
  return (
    <section style={{ padding: '160px 0 120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>About Me</h2>
          <p style={{ fontSize: '18px', color: 'var(--dark-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Passionate about solving complex engineering problems through innovative software solutions
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '100px', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '140px', textAlign: 'center' }}>
            <div style={{
              width: '240px',
              height: '240px',
              borderRadius: '16px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              margin: '0 auto 40px auto'
            }}>
              <img
                src="profilePhoto.png"
                alt="Selin Bardakci"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>Selin Bardakci</h2>
              <p style={{ fontSize: '18px', color: 'var(--dark-text-secondary)', marginBottom: '32px', fontWeight: '300' }}>Computer Engineering Student</p>



              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-muted)' }}>
                  <MailIcon />
                  <span style={{ marginLeft: '12px' }}>selin.bardakci520@gmail.com</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ marginLeft: '12px' }}>Istanbul, Turkey</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span style={{ marginLeft: '12px' }}>linkedin.com/in/selin-bardakci</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span style={{ marginLeft: '12px' }}>github.com/selin-bardakci</span>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--dark-text-secondary)' }}>
            <p style={{ marginBottom: '32px' }}>
              I am a third-year Computer Engineering student at Gebze Technical University with a strong interest in developing scalable, high-performance software systems. My experience spans embedded systems, full-stack web development, and blockchain technologies, with a focus on applying solid engineering principles to real-world challenges.
            </p>
            <p style={{ marginBottom: '32px' }}>
              Through projects such as a real-time gesture recognition system using Raspberry Pi and a decentralized time-locked vault on Ethereum, I have gained practical experience in system design, object-oriented programming, and collaborative development. My ongoing part-time role at Wibesoft further strengthens my backend development skills and has provided firsthand exposure to Agile methodologies and global team coordination.
            </p>
            <p style={{ marginBottom: '32px' }}>
              I am particularly motivated by opportunities that combine hands-on coding, data-driven design, and impactful applications—especially in high-integrity fields such as aerospace. With a strong foundation in data structures, algorithm design, and software lifecycle practices, I am eager to contribute to next-generation engineering solutions while continuously learning from experienced teams in a dynamic and respectful environment.
            </p>
            <p style={{ marginBottom: '32px' }}>
              Having completed my high school education in an international setting and developed fluency in multiple languages, I am especially drawn to global organizations. I value the diversity, cross-cultural collaboration, and broad perspective that come with working in an international team—qualities I believe are deeply reflected in GE Aerospace’s mission and culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setFullScreenImage(null);
    document.body.style.overflow = 'unset';
  };

  const openFullScreenImage = (imageSrc) => {
    setFullScreenImage(imageSrc);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  // Cleanup effect to ensure scroll is restored if component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedProject]);

  return (
    <>
      <section style={{ padding: '160px 0 120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <h2 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Featured Projects</h2>
            <p style={{ fontSize: '18px', color: 'var(--dark-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              A curated collection of academic research and personal projects showcasing technical expertise. Click on any project to see detailed information.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '40px' }}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => openModal(project)}
                style={{
                  background: 'var(--dark-card-bg)',
                  border: '1px solid var(--dark-card-border)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  height: '240px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(128, 43, 177, 0.3), rgba(0, 0, 0, 0.2))',
                    zIndex: 1
                  }} />
                </div>
                <div style={{ padding: '40px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--dark-text)', marginBottom: '16px', letterSpacing: '-0.01em' }}>{project.title}</h3>
                  <p style={{ fontSize: '16px', color: 'var(--dark-text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                    {project.tech.map((tech) => (
                      <span key={tech} style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--dark-text)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '400',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{
                    background: 'rgba(128, 43, 177, 0.1)',
                    border: '1px solid rgba(128, 43, 177, 0.2)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    textAlign: 'center',
                    color: 'var(--primary-light)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Click to view details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className={`project-modal ${selectedProject ? 'active' : ''}`} onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="project-modal-header">
              <img
                src={selectedProject.images[0]}
                alt={`${selectedProject.title} header`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(128, 43, 177, 0.4), rgba(0, 0, 0, 0.3))',
                zIndex: 1
              }} />
            </div>

            <div className="project-modal-body">
              <h2 className="project-modal-title">{selectedProject.title}</h2>

              <div className="project-modal-description">
                {selectedProject.detailedDescription}
              </div>

              <div className="project-modal-details">
                <h4>Key Features</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} style={{
                      fontSize: '16px',
                      color: 'var(--dark-text-secondary)',
                      marginBottom: '8px',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: 'var(--primary)'
                      }}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-modal-details">
                <h4>Technical Challenges</h4>
                <p>{selectedProject.challenges}</p>
              </div>

              <div className="project-modal-details">
                <h4>Project Outcome</h4>
                <p>{selectedProject.outcome}</p>
              </div>

              <div className="project-modal-tech">
                {selectedProject.tech.map((tech) => (
                  <span key={tech} className="project-modal-tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-modal-images">
                {(() => {
                  // Projects that should skip the first image in screenshots
                  const projectsToSkipFirstImage = [
                    "GTU-C312 OS Simulator",
                    "Distributed Chat and File Server", 
                    "G++ Language Interpreter & Lexer (Lisp and C/C++)",
                    "Object-Oriented Shell Simulator",
                    "Vaultify – Time-Locked Ethereum Vaults"
                  ];
                  
                  const shouldSkipFirst = projectsToSkipFirstImage.includes(selectedProject.title);
                  const imagesToShow = shouldSkipFirst ? selectedProject.images.slice(1) : selectedProject.images;
                  
                  // Only show the section if there are images to display
                  if (imagesToShow.length === 0) return null;
                  
                  return (
                    <>
                      <h4>Project Screenshots</h4>
                      <div className="project-modal-image-grid">
                        {imagesToShow.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            className="project-modal-image"
                            onClick={() => openFullScreenImage(image)}
                            style={{ cursor: 'pointer' }}
                          />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="project-modal-links">
                <button
                  className="project-modal-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(selectedProject.link, '_blank');
                  }}
                  style={{ border: 'none' }}
                >
                  View Live Demo
                </button>
                <button
                  className="project-modal-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(selectedProject.link, '_blank');
                  }}
                  style={{ border: 'none' }}
                >
                  View Source Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Image Viewer */}
      {fullScreenImage && (
        <div 
          className="fullscreen-image-overlay"
          onClick={closeFullScreenImage}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(5px)'
          }}
        >
          <button
            onClick={closeFullScreenImage}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              fontSize: '32px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              zIndex: 10001
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ×
          </button>
          <img
            src={fullScreenImage}
            alt="Full screen view"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              textAlign: 'center'
            }}
          >
            Click anywhere outside the image to close
          </div>
        </div>
      )}
    </>
  );
}

function Tools() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Tools & Skills</h2>
          <p style={{ fontSize: '18px', color: 'var(--dark-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Comprehensive toolkit for modern software development and data analysis
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} style={{
              background: 'var(--dark-card-bg)',
              border: '1px solid var(--dark-card-border)',
              borderRadius: '16px',
              padding: '40px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--dark-text)', marginBottom: '24px', letterSpacing: '-0.01em' }}>{category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {skillList.map((skill) => (
                  <span key={skill} style={{
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--primary-light)',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
 return (
  <section style={{ padding: '160px 0 120px 0' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
          Professional Experience
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--dark-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          A journey through software development, embedded systems, and blockchain innovation.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Wibesoft */}
        <div style={{
          background: 'var(--dark-card-bg)',
          border: '1px solid var(--dark-card-border)',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dark-text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>Software Developer/International Relations</h3>
              <div style={{ fontSize: '16px', color: 'var(--primary-light)', fontWeight: '500', marginBottom: '8px' }}>Wibesoft</div>
              <div style={{ fontSize: '14px', color: 'var(--dark-text-muted)' }}>Remote / Part-time</div>
              <div style={{ fontSize: '14px', color: 'var(--dark-text-muted)' }}>Basiskele Teknopark, Kocaeli</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--dark-text)',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Dec 2023 – Ongoing</div>
          </div>
          <p style={{ fontSize: '16px', color: 'var(--dark-text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>
            Working on blockchain-based software projects while leading global relations with international partners and investors.
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Developed backend architecture and smart contract integration for decentralized applications
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Managed communication with global venture capitalists and project stakeholders
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Supported full-stack development for projects like iRender and FTake.io
            </li>
          </ul>
        </div>

        {/* Ziraat Teknoloji */}
        <div style={{
          background: 'var(--dark-card-bg)',
          border: '1px solid var(--dark-card-border)',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dark-text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>Software Developer Intern</h3>
              <div style={{ fontSize: '16px', color: 'var(--primary-light)', fontWeight: '500', marginBottom: '8px' }}>Ziraat Teknoloji</div>
              <div style={{ fontSize: '14px', color: 'var(--dark-text-muted)' }}>Istanbul, Turkey</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--dark-text)',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Aug 2024 – Sep 2025</div>
          </div>
          <p style={{ fontSize: '16px', color: 'var(--dark-text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>
            Interned at Ziraat Teknoloji's financial technology division, contributing to full-stack development of custom applications and strengthening backend/database skills.
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Built a full-stack auction web app using MySQL, React, and Node.js
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Substituted MongoDB for MySQL and optimized relational data handling
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Applied best practices in backend development, testing, and deployment
            </li>
          </ul>
        </div>

        {/* Combined GTU Blockchain Club & ETHGlobal Experience */}
        <div style={{
          background: 'var(--dark-card-bg)',
          border: '1px solid var(--dark-card-border)',
          borderRadius: '20px',
          padding: '48px',
          marginBottom: '40px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--dark-text)', marginBottom: '12px', letterSpacing: '-0.01em' }}>Software Group Member</h3>
              <div style={{ fontSize: '16px', color: 'var(--primary-light)', fontWeight: '500', marginBottom: '8px' }}>Gebze Technical University Blockchain Club</div>
              <div style={{ fontSize: '14px', color: 'var(--dark-text-muted)' }}>Gebze, Turkey</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--dark-text)',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>Ongoing</div>
          </div>
          <p style={{ fontSize: '16px', color: 'var(--dark-text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>
            Active contributor in the Software Group of GTU Blockchain Club, collaborating on blockchain application development and participating in major hackathons to strengthen practical experience with decentralized systems.
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Participated in ETHGlobal Prague 2025 Hackathon, co-developing Lockdrop using Solidity smart contracts and IPFS/Filecoin
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Contributed to React-based frontend development and ensured smooth integration of Web3 features
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Collaborated on blockchain application development and smart contract implementations
            </li>
            <li style={{ position: 'relative', paddingLeft: '32px', marginBottom: '16px', fontSize: '15px', color: 'var(--dark-text-secondary)', lineHeight: '1.6' }}>
              <span style={{ position: 'absolute', left: '0', color: 'var(--primary-light)', fontWeight: '500' }}>→</span>
              Participated in technical sessions and hands-on workshops on blockchain frameworks and emerging technologies
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
);
}

function Contact() {
  return (
    <section style={{ padding: '160px 0 120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', color: 'var(--dark-text)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Get In Touch</h2>
          <p style={{ fontSize: '18px', color: 'var(--dark-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Let's collaborate on innovative software solutions and cutting-edge projects
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'var(--dark-text-secondary)', marginBottom: '40px' }}>
            Email: <a href="mailto:selin.bardakci520@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>selin.bardakci520@gmail.com</a>
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                color: 'var(--primary-light)',
                padding: '12px 24px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;