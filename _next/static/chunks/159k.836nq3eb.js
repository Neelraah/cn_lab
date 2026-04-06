(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let n=[{topic:"crc",category:"error detection",content:"Cyclic Redundancy Check detects errors using polynomial division.",code:`// CRC (basic example)
#include <stdio.h>
#include <string.h>

void xor(char *a, char *b) {
  for(int i = 1; i < strlen(b); i++)
    a[i] = (a[i] == b[i]) ? '0' : '1';
}

int main() {
  char data[20] = "1101";
  char key[20] = "1011";
  printf("CRC logic demo");
}`},{topic:"hamming code",category:"error correction",content:"Hamming code detects and corrects single-bit errors.",code:`// Hamming Code (basic idea)
#include <stdio.h>

int main() {
  printf("Hamming code concept implementation");
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
}`},{topic:"stop and wait",category:"flow control",content:"Sender waits for ACK before sending next frame.",code:"No code required, concept-based"},{topic:"sliding window",category:"flow control",content:"Multiple frames sent before acknowledgment.",code:"Used in TCP"},{topic:"wireshark",category:"tools",content:"Packet analyzer used to inspect network traffic.",code:"Steps: capture → filter → analyze packets"},{topic:"ip address",category:"networking basics",content:"IPv4 is 32-bit, divided into network and host parts.",code:"Example: 192.168.1.1"},{topic:"packet tracer",category:"tools",content:"Cisco simulation tool to design networks.",code:"Used for topology + routing simulation"}];e.s(["default",0,function(){let[e,o]=(0,i.useState)(""),s=n.filter(t=>(t.topic+" "+t.category+" "+t.content).toLowerCase().includes(e.toLowerCase()));return(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[(0,t.jsx)("h1",{className:"text-6xl font-bold text-blue-500 mb-10",children:"CN Hub"}),(0,t.jsx)("input",{type:"text",placeholder:"Search networking topics...",className:"w-1/2 p-3 rounded-full border border-gray-300 text-lg",onChange:e=>o(e.target.value)}),(0,t.jsx)("div",{className:"mt-8 w-1/2",children:s.map((e,i)=>(0,t.jsxs)("div",{className:"bg-white p-4 rounded-xl mb-4 shadow",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:e.topic.toUpperCase()}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:e.category}),(0,t.jsx)("p",{children:e.content}),e.code&&(0,t.jsx)("pre",{className:"bg-black text-green-400 p-3 mt-3 rounded overflow-x-auto text-sm",children:(0,t.jsx)("code",{children:e.code})})]},i))})]})}])}]);