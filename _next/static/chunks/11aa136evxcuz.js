(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,t=>{"use strict";var e=t.i(43476),i=t.i(71645);let n=[{topic:"crc",category:"error detection",content:"Cyclic Redundancy Check detects errors using polynomial division.",code:`// CRC (basic example for CRC-4)
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
}`},{topic:"hamming code",category:"error correction",content:"Hamming code detects and corrects single-bit errors.",code:`// Hamming Code (7,4) - basic implementation
#include <stdio.h>

int calculateParity(int data[], int parityPos) {
    int parity = 0;
    for (int i = parityPos - 1; i < 7; i += parityPos * 2) {
        for (int j = 0; j < parityPos && i + j < 7; j++) {
            if (i + j != parityPos - 1) {
                parity ^= data[i + j];
            }
        }
    }
    return parity;
}

void encodeHamming(int data[4], int encoded[7]) {
    // Positions: 1 2 3 4 5 6 7
    // Data bits:   d1 d2 d3
    // Parity: p1   p2   p4
    encoded[2] = data[0]; // d1
    encoded[4] = data[1]; // d2
    encoded[5] = data[2]; // d3
    encoded[6] = data[3]; // d4

    encoded[0] = calculateParity(encoded, 1); // p1
    encoded[1] = calculateParity(encoded, 2); // p2
    encoded[3] = calculateParity(encoded, 4); // p4
}

int main() {
    int data[4] = {1, 0, 1, 1}; // 4 data bits
    int encoded[7] = {0};
    encodeHamming(data, encoded);
    printf("Encoded: ");
    for (int i = 0; i < 7; i++) printf("%d", encoded[i]);
    printf("\\n");
    return 0;
}`},{topic:"tcp server",category:"socket programming",content:"Basic TCP server using sockets in C.",code:`// TCP Server
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  printf("Server created");
}`},{topic:"tcp client",category:"socket programming",content:"Basic TCP client using sockets.",code:`// TCP Client
#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>

int main() {
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  printf("Client created");
}`},{topic:"tcp math server client",category:"lab programs",content:"Client sends numbers, server performs operations.",code:`// Simplified logic
// send numbers -> server calculates -> returns result`},{topic:"tcp chat program",category:"lab programs",content:"Two-way communication between client and server.",code:"// Chat using send() and recv()"},{topic:"dijkstra algorithm",category:"routing",content:"Finds shortest path using greedy approach.",code:`#include <stdio.h>
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
}`},{topic:"bellman ford",category:"routing",content:"Handles negative weights unlike Dijkstra.",code:`#include <stdio.h>

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
}`},{topic:"stop and wait",category:"flow control",content:"Sender waits for ACK before sending next frame.",code:"No code required, concept-based"},{topic:"sliding window",category:"flow control",content:"Multiple frames sent before acknowledgment.",code:"Used in TCP"},{topic:"wireshark",category:"tools",content:"Packet analyzer used to inspect network traffic.",code:"Steps: capture → filter → analyze packets"},{topic:"ip address",category:"networking basics",content:"IPv4 is 32-bit, divided into network and host parts.",code:"Example: 192.168.1.1"},{topic:"packet tracer",category:"tools",content:"Cisco simulation tool to design networks.",code:"Used for topology + routing simulation"}];t.s(["default",0,function(){let[t,c]=(0,i.useState)(""),o=n.filter(e=>(e.topic+" "+e.category+" "+e.content).toLowerCase().includes(t.toLowerCase()));return(0,e.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[(0,e.jsx)("h1",{className:"text-6xl font-bold text-blue-500 mb-10",children:"CN Hub"}),(0,e.jsx)("input",{type:"text",placeholder:"Search networking topics...",className:"w-1/2 p-3 rounded-full border border-gray-300 text-lg",onChange:t=>c(t.target.value)}),(0,e.jsx)("div",{className:"mt-8 w-1/2",children:o.map((t,i)=>(0,e.jsxs)("div",{className:"bg-white p-4 rounded-xl mb-4 shadow",children:[(0,e.jsx)("h2",{className:"text-xl font-semibold",children:t.topic.toUpperCase()}),(0,e.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:t.category}),(0,e.jsx)("p",{children:t.content}),t.code&&(0,e.jsx)("pre",{className:"bg-black text-green-400 p-3 mt-3 rounded overflow-x-auto text-sm",children:(0,e.jsx)("code",{children:t.code})})]},i))})]})}])}]);