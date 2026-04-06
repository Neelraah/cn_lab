(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let n=[{topic:"crc",category:"error detection",content:"Cyclic Redundancy Check detects errors using polynomial division.",code:`// CRC (basic example for CRC-4)
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
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};
    char *hello = "Hello from server";

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // Bind to port 8080
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // Listen
    if (listen(server_fd, 3) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    // Accept connection
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
        perror("accept failed");
        exit(EXIT_FAILURE);
    }

    // Read and respond
    read(new_socket, buffer, 1024);
    printf("Message: %s\\n", buffer);
    send(new_socket, hello, strlen(hello), 0);

    close(new_socket);
    close(server_fd);
    return 0;
}`},{topic:"tcp client",category:"socket programming",content:"Basic TCP client using sockets.",code:`// TCP Client
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>

#define PORT 8080

int main() {
    int sock = 0;
    struct sockaddr_in serv_addr;
    char *hello = "Hello from client";
    char buffer[1024] = {0};

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        printf("\\n Socket creation error \\n");
        return -1;
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    // Convert IPv4 address from text to binary
    if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
        printf("\\nInvalid address/ Address not supported \\n");
        return -1;
    }

    // Connect
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        printf("\\nConnection Failed \\n");
        return -1;
    }

    // Send and receive
    send(sock, hello, strlen(hello), 0);
    read(sock, buffer, 1024);
    printf("Message from server: %s\\n", buffer);

    close(sock);
    return 0;
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
}

int main() {
  int graph[V][V] = {
    {0, 5, 999, 10},
    {999, 0, 3, 999},
    {999, 999, 0, 1},
    {999, 999, 999, 0}
  };
  dijkstra(graph, 0);
  return 0;
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
}

int main() {
  int V = 5; // Number of vertices
  int E = 8; // Number of edges
  struct Edge edges[] = {
    {0, 1, -1}, {0, 2, 4}, {1, 2, 3}, {1, 3, 2},
    {1, 4, 2}, {3, 2, 5}, {3, 1, 1}, {4, 3, -3}
  };
  bellmanFord(edges, V, E, 0);
  return 0;
}`},{topic:"stop and wait",category:"flow control",content:"Sender waits for ACK before sending next frame.",code:"No code required, concept-based"},{topic:"sliding window",category:"flow control",content:"Multiple frames sent before acknowledgment.",code:"Used in TCP"},{topic:"wireshark",category:"tools",content:"Packet analyzer used to inspect network traffic.",code:"Steps: capture → filter → analyze packets"},{topic:"ip address",category:"networking basics",content:"IPv4 is 32-bit, divided into network and host parts.",code:"Example: 192.168.1.1"},{topic:"packet tracer",category:"tools",content:"Cisco simulation tool to design networks.",code:"Used for topology + routing simulation"}];e.s(["default",0,function(){let[e,r]=(0,i.useState)(""),s=n.filter(t=>(t.topic+" "+t.category+" "+t.content).toLowerCase().includes(e.toLowerCase()));return(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[(0,t.jsx)("h1",{className:"text-6xl font-bold text-blue-500 mb-10",children:"CN Hub"}),(0,t.jsx)("input",{type:"text",placeholder:"Search networking topics...",className:"w-1/2 p-3 rounded-full border border-gray-300 text-lg",onChange:e=>r(e.target.value)}),(0,t.jsx)("div",{className:"mt-8 w-1/2",children:s.map((e,i)=>(0,t.jsxs)("div",{className:"bg-white p-4 rounded-xl mb-4 shadow",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:e.topic.toUpperCase()}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:e.category}),(0,t.jsx)("p",{children:e.content}),e.code&&(0,t.jsx)("pre",{className:"bg-black text-green-400 p-3 mt-3 rounded overflow-x-auto text-sm",children:(0,t.jsx)("code",{children:e.code})})]},i))})]})}])}]);