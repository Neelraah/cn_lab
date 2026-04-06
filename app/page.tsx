"use client";

import { useState } from "react";

const data = [

  // ---------------- ERROR DETECTION ----------------
  {
    topic: "crc",
    category: "error detection",
    content: "Cyclic Redundancy Check detects errors using polynomial division.",
    code: `// CRC (basic example for CRC-4)
#include <stdio.h>
#include <string.h>

#define POLYNOMIAL 0x3  // x^3 + x + 1

unsigned char crc4(unsigned char data) {
    unsigned char crc = 0;
    crc ^= data;
    for (int i = 0; i < 8; i++) {
        if (crc & 0x8) {
            crc = (crc << 1) ^ POLYNOMIAL;
        } else {
            crc <<= 1;
        }
    }
    return crc & 0xF;
}

int main() {
    unsigned char data = 0xA;  // 1010
    unsigned char crc = crc4(data);
    printf("Data: 0x%X, CRC: 0x%X\\n", data, crc);
    return 0;
}`
  },

  // ---------------- ERROR CORRECTION ----------------
  {
    topic: "hamming code",
    category: "error correction",
    content: "Hamming code detects and corrects single-bit errors.",
    code: `// Hamming Code (basic idea)
#include <stdio.h>

int main() {
  printf("Hamming code concept implementation");
}`
  },

  // ---------------- SOCKET PROGRAMMING ----------------
  {
    topic: "tcp server",
    category: "socket programming",
    content: "Basic TCP server using sockets in C.",
    code: `// TCP Server
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  printf("Server created");
}`
  },

  {
    topic: "tcp client",
    category: "socket programming",
    content: "Basic TCP client using sockets.",
    code: `// TCP Client
#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>

int main() {
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  printf("Client created");
}`
  },

  // ---------------- TCP PROGRAMS ----------------
  {
    topic: "tcp math server client",
    category: "lab programs",
    content: "Client sends numbers, server performs operations.",
    code: `// Simplified logic
// send numbers -> server calculates -> returns result`
  },

  {
    topic: "tcp chat program",
    category: "lab programs",
    content: "Two-way communication between client and server.",
    code: `// Chat using send() and recv()`
  },

  // ---------------- ROUTING ----------------
  {
    topic: "dijkstra algorithm",
    category: "routing",
    content: "Finds shortest path using greedy approach.",
    code: `#include <stdio.h>
#define V 4

int minDistance(int dist[], int sptSet[]) {
  int min = 999, min_index;
  for (int v = 0; v < V; v++)
    if (!sptSet[v] && dist[v] <= min)
      min = dist[v], min_index = v;
  return min_index;
}

void dijkstra(int graph[V][V], int src) {
  int dist[V];
  int sptSet[V];

  for (int i = 0; i < V; i++)
    dist[i] = 999, sptSet[i] = 0;

  dist[src] = 0;

  for (int count = 0; count < V - 1; count++) {
    int u = minDistance(dist, sptSet);
    sptSet[u] = 1;

    for (int v = 0; v < V; v++)
      if (!sptSet[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v])
        dist[v] = dist[u] + graph[u][v];
  }

  for (int i = 0; i < V; i++)
    printf("%d -> %d\\n", i, dist[i]);
}`
  },

  {
    topic: "bellman ford",
    category: "routing",
    content: "Handles negative weights unlike Dijkstra.",
    code: `#include <stdio.h>

struct Edge {
  int src, dest, weight;
};

void bellmanFord(struct Edge edges[], int V, int E, int src) {
  int dist[V];
  
  for (int i = 0; i < V; i++)
    dist[i] = 999;

  dist[src] = 0;

  for (int i = 1; i <= V - 1; i++)
    for (int j = 0; j < E; j++)
      if (dist[edges[j].src] + edges[j].weight < dist[edges[j].dest])
        dist[edges[j].dest] = dist[edges[j].src] + edges[j].weight;

  for (int i = 0; i < V; i++)
    printf("%d\\n", dist[i]);
}`
  },

  // ---------------- FLOW CONTROL ----------------
  {
    topic: "stop and wait",
    category: "flow control",
    content: "Sender waits for ACK before sending next frame.",
    code: "No code required, concept-based"
  },

  {
    topic: "sliding window",
    category: "flow control",
    content: "Multiple frames sent before acknowledgment.",
    code: "Used in TCP"
  },

  // ---------------- WIRESHARK ----------------
  {
    topic: "wireshark",
    category: "tools",
    content: "Packet analyzer used to inspect network traffic.",
    code: "Steps: capture → filter → analyze packets"
  },

  // ---------------- IP ADDRESS ----------------
  {
    topic: "ip address",
    category: "networking basics",
    content: "IPv4 is 32-bit, divided into network and host parts.",
    code: "Example: 192.168.1.1"
  },

  // ---------------- PACKET TRACER ----------------
  {
    topic: "packet tracer",
    category: "tools",
    content: "Cisco simulation tool to design networks.",
    code: "Used for topology + routing simulation"
  }

];

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = data.filter(item =>
    (item.topic + " " + item.category + " " + item.content)
      .toLowerCase()
      .includes(query.toLowerCase())
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
            
            <h2 className="text-xl font-semibold">
              {item.topic.toUpperCase()}
            </h2>

            <p className="text-sm text-gray-500 mb-1">
              {item.category}
            </p>

            <p>{item.content}</p>

            {item.code && (
              <pre className="bg-black text-green-400 p-3 mt-3 rounded overflow-x-auto text-sm">
                <code>{item.code}</code>
              </pre>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}