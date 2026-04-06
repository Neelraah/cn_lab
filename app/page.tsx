"use client";

import { useState } from "react";

const data = [
  {
    topic: "tcp",
    content: "TCP is connection-oriented, reliable, uses 3-way handshake.",
    link: "https://en.wikipedia.org/wiki/Transmission_Control_Protocol"
  },
  {
    topic: "udp",
    content: "UDP is connectionless, faster but unreliable.",
    link: "https://en.wikipedia.org/wiki/User_Datagram_Protocol"
  },
  {
    topic: "osi model",
    content: "7 layers: Physical → Application.",
    link: "https://en.wikipedia.org/wiki/OSI_model"
  },
  {
    topic: "dns",
    content: "Resolves domain names to IP addresses.",
    link: "https://en.wikipedia.org/wiki/Domain_Name_System"
  },
  {
    topic: "subnetting",
    content: "Dividing a network into smaller subnets.",
    link: "https://en.wikipedia.org/wiki/Subnetwork"
  }
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = data.filter(item =>
    item.topic.includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-6xl font-bold text-blue-500 mb-10">
        CN Hub
      </h1>

      <input
        type="text"
        placeholder="Search networking topics..."
        className="w-1/2 p-3 rounded-full border border-gray-300 text-lg"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-8 w-1/2">
        {filtered.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl mb-4 shadow">
            <h2 className="text-xl font-semibold">{item.topic.toUpperCase()}</h2>
            <p>{item.content}</p>
            <a
              href={item.link}
              target="_blank"
              className="text-blue-500"
            >
              Read more
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}