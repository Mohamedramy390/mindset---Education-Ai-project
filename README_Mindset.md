# 🧠 Mindset – Education AI Project

**Mindset** is a collaborative AI-driven educational platform that integrates **Generative AI** with modern web technologies to make learning more intelligent, interactive, and accessible.

Teachers can create rooms, share materials, and manage schedules — while students can explore resources, join communities, and interact with an integrated **AI tutor** powered by **Gemini 2.5 Pro** and **Hugging Face embeddings**.

---

## 🚀 Features

- 🤖 **AI-Powered Assistant:** Provides instant answers and explanations using Gemini 2.5 Pro and Hugging Face embeddings.  
- 👩‍🏫 **Teacher Dashboard:** Create rooms, manage schedules, and share resources.  
- 🧑‍🎓 **Student Dashboard:** Join classrooms, access learning materials, and chat with AI.  
- 🔒 **Authentication System:** Secure login and signup using **JWT** (JSON Web Tokens).  
- 💬 **Community System:** Enables interactive communication and collaboration.  
- ⚙️ **Scalable Architecture:** Clean separation between frontend (React), backend (Node.js), and AI (Python).  

---

## 🏗️ System Architecture

```
Frontend (React.js)  <——>  Backend (Node.js + Express)  <——>  AI Layer (Python)
```

### 🧩 Frontend – React.js
- Component-based structure for modular and maintainable UI.
- Organized views:
  - **Teacher Side:** CreateRoom, Schedule, Resource Management.
  - **Student Side:** EnrolledRooms, Resources, Community, AI Chat.
- Styling handled with **CSS** for responsive design.

### ⚙️ Backend – Node.js (Express)
- Acts as a bridge between frontend and AI layer.
- Handles API routes for:
  - Authentication (JWT)
  - Room & User management
  - AI query forwarding
- Uses **bcrypt/JWT** for password hashing and secure session management.

### 🧠 AI Layer – Python
- Uses **Gemini 2.5 Pro** (Generative AI) for context-based question answering.
- Integrates **Hugging Face embeddings** for semantic understanding.
- Exposes endpoints to the Node.js backend for natural language queries.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, CSS |
| Backend | Node.js, Express, JWT |
| AI Layer | Python, Gemini 2.5 Pro, Hugging Face |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
mindset/
│
├── askAiModel/                  # Python AI module
│   ├── ai.py                    # Gemini + Hugging Face logic
│   └── askAi.py                 # AI endpoint for Node.js integration
│
├── frontEnd/                    # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── LoginSignup/     # Login and signup components
│   │   │   ├── StudentSide/     # Student UI (AI chat, resources, etc.)
│   │   │   └── TeacherSide/     # Teacher UI (room management)
│   │   └── api/apis.js          # Backend communication
│   ├── package.json
│   └── README.md
│
└── backend/                     # Node.js backend (if separate folder)
    ├── index.js
    ├── routes/
    ├── controllers/
    └── utils/
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mohamedramy390/mindset---Education-Ai-project.git
cd mindset
```

### 2️⃣ Frontend Setup
```bash
cd frontEnd
npm install
npm start
```

### 3️⃣ Backend Setup
```bash
cd backend
npm install
node index.js
```

### 4️⃣ AI Module Setup
Make sure Python 3.9+ is installed.

```bash
cd askAiModel
pip install -r requirements.txt
python ai.py
```

> 🧩 Ensure the backend server and Python AI module are running before using the app.

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
JWT_SECRET=your_secret_key
AI_SERVER_URL=http://localhost:5001
```

---

## 🧑‍💻 Team & Collaboration

This project was developed collaboratively by our team at **Egypt-Japan University for Science and Technology (E-JUST)**, combining expertise in:
- Frontend Development (React.js)
- Backend Engineering (Node.js)
- AI Integration (Python, Gemini 2.5 Pro, Hugging Face)

We built Mindset to explore how **AI can revolutionize modern education** and make learning more personalized and engaging.

---

## 🚧 Future Enhancements

- 🧩 Add real-time chat between students and teachers  
- 📊 Analytics dashboard for student progress  
- 🧠 Expand AI with multilingual support and voice features  
- ☁️ Deploy backend and AI modules to cloud (e.g., AWS or Render)  

---

## 🪪 License
This project is open-source under the [MIT License](LICENSE).

---

## 🌟 Contribute
We welcome contributions!  
Feel free to open issues, suggest enhancements, or submit pull requests.

---

### 📬 Contact
If you'd like to collaborate, contribute, or learn more about the project:
👉 [GitHub Repository](https://github.com/Mohamedramy390/mindset---Education-Ai-project)

---

**Together, we’re shaping how AI transforms education — making learning more interactive, accessible, and intelligent.**
