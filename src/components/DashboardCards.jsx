import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Bot
} from "lucide-react";

import { getStats } from "../api/api";

function DashboardCards() {

  const [stats, setStats] = useState({
    users: 0,
    words: 0,
    lessons: 0,
    chatbot: 0
  });

  const loadStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      icon: <Users />,
      number: stats.users,
      label: "Users"
    },
    {
      icon: <BookOpen />,
      number: stats.words,
      label: "Dictionary Words"
    },
    {
      icon: <GraduationCap />,
      number: stats.lessons,
      label: "Lessons"
    },
    {
      icon: <Bot />,
      number: stats.chatbot,
      label: "Chatbot Responses"
    }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card-grid">
        {cards.map((item, i) => (
          <div className="card" key={i}>
            <div className="card-icon">{item.icon}</div>

            <div>
              <h2>{item.number}</h2>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;