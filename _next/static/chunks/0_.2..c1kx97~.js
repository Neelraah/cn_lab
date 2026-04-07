(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let n=[{topic:"vrc",category:"error detection",content:"Vertical Redundancy Check adds a parity bit to detect single-bit errors.",code:`// VRC (Parity Check)
#include <stdio.h>

int main() {
    int data[4] = {1, 0, 1, 1};
    int parity = 0;

    for(int i = 0; i < 4; i++)
        parity ^= data[i];

    printf("Parity bit: %d\\n", parity);
}`},{topic:"lrc",category:"error detection",content:"Longitudinal Redundancy Check uses parity across rows (block check).",code:`// LRC Example
#include <stdio.h>

int main() {
    int data[3][4] = {
        {1,0,1,1},
        {0,1,0,1},
        {1,1,1,0}
    };

    int lrc[4] = {0};

    for(int j = 0; j < 4; j++) {
        for(int i = 0; i < 3; i++) {
            lrc[j] ^= data[i][j];
        }
    }

    printf("LRC: ");
    for(int i = 0; i < 4; i++)
        printf("%d ", lrc[i]);
}`},{topic:"checksum",category:"error detection",content:"Checksum adds data segments and sends the complement for error detection.",code:`// Checksum Example
#include <stdio.h>

int main() {
    int data[] = {100, 200, 300};
    int sum = 0;

    for(int i = 0; i < 3; i++)
        sum += data[i];

    int checksum = ~sum;

    printf("Checksum: %d\\n", checksum);
}`},{topic:"crc full",category:"error detection",content:"CRC uses binary division with a generator polynomial to detect burst errors.",code:`// CRC Full Example
#include <stdio.h>
#include <string.h>

void xor(char *a, char *b) {
    for(int i = 1; i < strlen(b); i++)
        a[i] = (a[i] == b[i]) ? '0' : '1';
}

void crc(char *data, char *key) {
    int k = strlen(key);
    char temp[20];
    strncpy(temp, data, k);

    for(int i = k; i < strlen(data); i++) {
        if(temp[0] == '1')
            xor(temp, key);
        else {
            char zeros[k];
            for(int j = 0; j < k; j++) zeros[j] = '0';
            xor(temp, zeros);
        }

        memmove(temp, temp+1, k-1);
        temp[k-1] = data[i];
    }

    printf("CRC Remainder: %s\\n", temp);
}

int main() {
    char data[20] = "11010011101100";
    char key[20] = "1011";

    crc(data, key);
}`},{topic:"hamming code",category:"error correction",content:"Hamming code detects and corrects single-bit errors.",code:`// Hamming Code (7,4) - basic implementation
#include <stdio.h>
#include <math.h>

// Function to calculate parity bits
int calculateParity(int data[], int n, int parityPos) {
    int parity = 0;
    for (int i = 1; i <= n; i++) {
        if (i & parityPos) {
            parity ^= data[i];
        }
    }
    return parity;
}

int main() {
    int choice;

    printf("1. Sender
2. Receiver
Enter choice: ");
    scanf("%d", &choice);

    // ---------------- SENDER ----------------
    if (choice == 1) {
        int m;
        printf("Enter number of data bits: ");
        scanf("%d", &m);

        int r = 0;
        while (pow(2, r) < (m + r + 1))
            r++;

        int n = m + r;
        int data[50];

        printf("Enter data bits:
");
        for (int i = 1; i <= m; i++) {
            scanf("%d", &data[i]);
        }

        int hamming[50];
        int j = 1, k = 1;

        // Place data and parity positions
        for (int i = 1; i <= n; i++) {
            if (i == pow(2, j - 1)) {
                hamming[i] = 0;
                j++;
            } else {
                hamming[i] = data[k++];
            }
        }

        // Calculate parity bits
        for (int i = 0; i < r; i++) {
            int pos = pow(2, i);
            hamming[pos] = calculateParity(hamming, n, pos);
        }

        printf("Encoded Hamming Code:
");
        for (int i = 1; i <= n; i++) {
            printf("%d ", hamming[i]);
        }
        printf("
");
    }

    // ---------------- RECEIVER ----------------
    else if (choice == 2) {
        int n;
        printf("Enter number of bits received: ");
        scanf("%d", &n);

        int data[50];
        printf("Enter received bits:
");
        for (int i = 1; i <= n; i++) {
            scanf("%d", &data[i]);
        }

        int r = 0;
        while (pow(2, r) <= n)
            r++;

        int errorPos = 0;

        // Check parity
        for (int i = 0; i < r; i++) {
            int pos = pow(2, i);
            int parity = calculateParity(data, n, pos);
            if (parity != 0) {
                errorPos += pos;
            }
        }

        if (errorPos == 0) {
            printf("No error detected.
");
        } else {
            printf("Error detected at position: %d
", errorPos);

            // Correct the error
            data[errorPos] ^= 1;

            printf("Corrected data:
");
            for (int i = 1; i <= n; i++) {
                printf("%d ", data[i]);
            }
            printf("
");
        }
    }

    else {
        printf("Invalid choice
");
    }

    return 0;
}`},{topic:"tcp math server",category:"socket programming",content:"Server performs arithmetic operations based on client input.",code:`// TCP Math Server
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sockfd, newsockfd;
    struct sockaddr_in server, client;
    socklen_t len;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr*)&server, sizeof(server));
    listen(sockfd, 5);

    len = sizeof(client);
    newsockfd = accept(sockfd, (struct sockaddr*)&client, &len);

    int a, b, result;
    char op;

    recv(newsockfd, &a, sizeof(a), 0);
    recv(newsockfd, &b, sizeof(b), 0);
    recv(newsockfd, &op, sizeof(op), 0);

    switch(op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = (b != 0) ? a / b : 0; break;
    }

    send(newsockfd, &result, sizeof(result), 0);

    close(newsockfd);
    close(sockfd);
}`},{topic:"tcp math client",category:"socket programming",content:"Client sends numbers and operator to server and receives result.",code:`// TCP Math Client
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sockfd;
    struct sockaddr_in server;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = inet_addr("127.0.0.1");

    connect(sockfd, (struct sockaddr*)&server, sizeof(server));

    int a, b;
    char op;

    scanf("%d %d", &a, &b);
    scanf(" %c", &op);

    send(sockfd, &a, sizeof(a), 0);
    send(sockfd, &b, sizeof(b), 0);
    send(sockfd, &op, sizeof(op), 0);

    int result;
    recv(sockfd, &result, sizeof(result), 0);

    printf("Result: %d\\n", result);

    close(sockfd);
}`},{topic:"tcp chat server",category:"socket programming",content:"Server handles two-way communication with client.",code:`// TCP Chat Server
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sockfd, newsockfd;
    struct sockaddr_in server, client;
    socklen_t len;
    char buffer[1024];

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr*)&server, sizeof(server));
    listen(sockfd, 5);

    len = sizeof(client);
    newsockfd = accept(sockfd, (struct sockaddr*)&client, &len);

    while (1) {
        recv(newsockfd, buffer, sizeof(buffer), 0);
        printf("Client: %s\\n", buffer);

        if (strncmp(buffer, "exit", 4) == 0)
            break;

        fgets(buffer, sizeof(buffer), stdin);
        send(newsockfd, buffer, strlen(buffer), 0);
    }

    close(newsockfd);
    close(sockfd);
}`},{topic:"tcp chat client",category:"socket programming",content:"Client sends and receives messages from server.",code:`// TCP Chat Client
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int sockfd;
    struct sockaddr_in server;
    char buffer[1024];

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = inet_addr("127.0.0.1");

    connect(sockfd, (struct sockaddr*)&server, sizeof(server));

    while (1) {
        fgets(buffer, sizeof(buffer), stdin);
        send(sockfd, buffer, strlen(buffer), 0);

        if (strncmp(buffer, "exit", 4) == 0)
            break;

        recv(sockfd, buffer, sizeof(buffer), 0);
        printf("Server: %s\\n", buffer);
    }

    close(sockfd);
}`},{topic:"stop and wait arq",category:"flow control",content:"Stop-and-Wait sends one frame at a time and waits for ACK. Retransmits on loss.",code:`// Stop-and-Wait ARQ (Simulation using sockets)
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <time.h>

int main() {
    int sockfd, newsockfd;
    struct sockaddr_in server, client;
    socklen_t len;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr*)&server, sizeof(server));
    listen(sockfd, 5);

    len = sizeof(client);
    newsockfd = accept(sockfd, (struct sockaddr*)&client, &len);

    int frames;
    printf("Enter number of frames: ");
    scanf("%d", &frames);

    send(newsockfd, &frames, sizeof(frames), 0);

    srand(time(0));

    for(int i = 1; i <= frames; i++) {
        printf("Sending frame %d\\n", i);

        int loss = rand() % 2;

        if(loss) {
            printf("Frame %d lost. Retransmitting...\\n", i);
            i--; // resend
        } else {
            printf("Frame %d received. ACK sent\\n", i);
        }
    }

    close(newsockfd);
    close(sockfd);
}`},{topic:"go back n arq",category:"flow control",content:"Go-Back-N sends multiple frames. On error, retransmits from lost frame.",code:`// Go-Back-N ARQ
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int frames, window;

    printf("Enter number of frames: ");
    scanf("%d", &frames);

    printf("Enter window size: ");
    scanf("%d", &window);

    srand(time(0));

    int i = 1;

    while(i <= frames) {
        for(int j = 0; j < window && i + j <= frames; j++) {
            printf("Sending frame %d\\n", i + j);
        }

        int ack = rand() % window;

        if(ack == 0) {
            printf("Error occurred. Retransmitting from frame %d\\n", i);
        } else {
            printf("ACK received till frame %d\\n", i + ack - 1);
            i = i + ack;
        }
    }
}`},{topic:"selective repeat arq",category:"flow control",content:"Selective Repeat retransmits only the lost frames.",code:`// Selective Repeat ARQ
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int frames, window;

    printf("Enter number of frames: ");
    scanf("%d", &frames);

    printf("Enter window size: ");
    scanf("%d", &window);

    int received[100] = {0};

    srand(time(0));

    for(int i = 1; i <= frames; i++) {
        int loss = rand() % 2;

        if(loss) {
            printf("Frame %d lost\\n", i);
        } else {
            printf("Frame %d received\\n", i);
            received[i] = 1;
        }
    }

    printf("Retransmitting lost frames:\\n");

    for(int i = 1; i <= frames; i++) {
        if(!received[i]) {
            printf("Retransmitting frame %d\\n", i);
        }
    }
}`},{topic:"dijkstra algorithm",category:"routing",content:"Finds shortest path using greedy approach.",code:`#include <stdio.h>
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
}`},{topic:"stop and wait",category:"flow control",content:"Sender waits for ACK before sending next frame.",code:"No code required, concept-based"},{topic:"sliding window",category:"flow control",content:"Multiple frames sent before acknowledgment.",code:"Used in TCP"},{topic:"wireshark general steps",category:"network tools",content:`
Wireshark is a packet analyzer used to capture and analyze network traffic.

Basic Steps:
1. Open Wireshark
2. Select network interface (Wi-Fi / Ethernet)
3. Start packet capture
4. Perform network activity (open website, ping, etc.)
5. Stop capture
6. Apply filters to analyze specific packets
7. Inspect packet details (headers, flags, data)
8. Use statistics tools for deeper analysis
`,code:"Tool-based procedure"},{topic:"wireshark filters",category:"network tools",content:`
Common Filters:

tcp → TCP packets  
udp → UDP packets  
icmp → ICMP packets  
arp → ARP packets  
dns → DNS packets  
http → HTTP traffic  

tcp.flags.syn == 1 → SYN packets  
tcp.flags.fin == 1 → FIN packets  
tcp.flags.reset == 1 → RST packets  

tcp.stream == N → specific TCP conversation
`,code:"Filter reference"},{topic:"wireshark tcp analysis",category:"network tools",content:`
Steps to analyze TCP:

1. Capture packets
2. Apply filter: tcp
3. Identify 3-way handshake:
   SYN → SYN-ACK → ACK
4. Identify termination:
   FIN → ACK → FIN → ACK
5. Use "Follow TCP Stream" to see full communication
6. Check sequence and acknowledgement numbers
`,code:"Procedure"},{topic:"wireshark tools",category:"network tools",content:`
Important Wireshark Tools:

Statistics → Conversations (traffic summary)  
Statistics → Flow Graph (packet flow visualization)  
Statistics → I/O Graph (traffic over time)  
Follow → TCP Stream (full session data)  
Protocol Hierarchy (protocol distribution)
`,code:"Features"},{topic:"ip format conversion",category:"ip addressing",content:"Convert IPv4 between binary, decimal, and hexadecimal formats.",code:`// IPv4 Format Conversion
#include <stdio.h>
#include <stdlib.h>

void decimalToBinary(int n) {
    for(int i = 7; i >= 0; i--)
        printf("%d", (n >> i) & 1);
}

int main() {
    int a, b, c, d;
    printf("Enter IPv4 (decimal format a.b.c.d): ");
    scanf("%d.%d.%d.%d", &a, &b, &c, &d);

    printf("Binary: ");
    decimalToBinary(a); printf(".");
    decimalToBinary(b); printf(".");
    decimalToBinary(c); printf(".");
    decimalToBinary(d);

    printf("\\nHexadecimal: %X.%X.%X.%X\\n", a, b, c, d);
}`},{topic:"subnet calculation",category:"ip addressing",content:"Calculates subnet details for classful and classless addressing.",code:`#include <stdio.h>
#include <math.h>

int main() {
    int ip[4], maskBits, subnets;

    printf("Enter IP (a.b.c.d): ");
    scanf("%d.%d.%d.%d", &ip[0], &ip[1], &ip[2], &ip[3]);

    printf("Enter subnet mask bits (CIDR): ");
    scanf("%d", &maskBits);

    printf("Enter number of subnets: ");
    scanf("%d", &subnets);

    int totalHosts = pow(2, (32 - maskBits));
    int hostsPerSubnet = totalHosts / subnets;

    printf("\\nTotal Addresses: %d\\n", totalHosts);
    printf("Hosts per subnet: %d\\n", hostsPerSubnet);

    printf("\\nSubnet Details:\\n");

    for(int i = 0; i < subnets; i++) {
        printf("\\nSubnet %d:\\n", i+1);

        printf("Network ID: %d.%d.%d.%d\\n", ip[0], ip[1], ip[2], ip[3] + i*hostsPerSubnet);
        printf("First Address: %d.%d.%d.%d\\n", ip[0], ip[1], ip[2], ip[3] + i*hostsPerSubnet + 1);
        printf("Last Address: %d.%d.%d.%d\\n", ip[0], ip[1], ip[2], ip[3] + (i+1)*hostsPerSubnet - 2);
        printf("Broadcast: %d.%d.%d.%d\\n", ip[0], ip[1], ip[2], ip[3] + (i+1)*hostsPerSubnet - 1);
    }
}`},{topic:"ip class identification",category:"ip addressing",content:`
Class A: 0-127  
Class B: 128-191  
Class C: 192-223  
Class D: 224-239 (Multicast)  
Class E: 240-255 (Reserved)
`,code:`// Class Identification
#include <stdio.h>

int main() {
    int first;
    printf("Enter first octet: ");
    scanf("%d", &first);

    if(first <= 127) printf("Class A");
    else if(first <= 191) printf("Class B");
    else if(first <= 223) printf("Class C");
    else if(first <= 239) printf("Class D");
    else printf("Class E");
}`},{topic:"classless addressing",category:"ip addressing",content:`
Classless (CIDR): uses flexible subnet masks (/24, /26, etc.)  
Classful: fixed classes (A, B, C)

Subnet mask: defines network vs host bits  
Network ID: identifies network  
Host ID: identifies device  
Broadcast: last address in subnet
`,code:"Theory"},{topic:"packet tracer basic commands",category:"network tools",content:`
Basic router/switch CLI commands used in Cisco Packet Tracer.
`,code:`enable
configure terminal

hostname Router1

interface g0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

interface g0/1
ip address 192.168.2.1 255.255.255.0
no shutdown
exit

show ip interface brief
show running-config
`},{topic:"packet tracer static routing",category:"routing",content:"Configure static routes between networks.",code:`ip route 192.168.2.0 255.255.255.0 192.168.1.2

// Format:
ip route <destination_network> <subnet_mask> <next_hop_ip>`},{topic:"rip routing commands",category:"routing",content:"Configure RIP (Routing Information Protocol).",code:`router rip
version 2
network 192.168.1.0
network 192.168.2.0
no auto-summary`},{topic:"ospf routing commands",category:"routing",content:"Configure OSPF routing protocol.",code:`router ospf 1
network 192.168.1.0 0.0.0.255 area 0
network 192.168.2.0 0.0.0.255 area 0`},{topic:"vlan configuration",category:"switching",content:"Create VLAN and assign ports.",code:`vlan 10
name SALES

interface fa0/1
switchport mode access
switchport access vlan 10

show vlan brief`},{topic:"vlan configuration",category:"switching",content:"Create VLAN and assign ports.",code:`vlan 10
name SALES

interface fa0/1
switchport mode access
switchport access vlan 10

show vlan brief`},{topic:"packet tracer testing commands",category:"network tools",content:"Commands used to verify connectivity.",code:`ping 192.168.1.2
tracert 192.168.2.1

show ip route
show ip protocols`},{topic:"packet tracer testing commands",category:"network tools",content:"Commands used to verify connectivity.",code:`ping 192.168.1.2
tracert 192.168.2.1

show ip route
show ip protocols`},{topic:"packet tracer workflow",category:"network tools",content:`
1. Create topology (routers, switches, PCs)
2. Assign IP addresses
3. Configure interfaces (no shutdown)
4. Add routing (static / RIP / OSPF)
5. Test using ping
6. Debug using show commands
`,code:"Procedure"}];e.s(["default",0,function(){let[e,r]=(0,i.useState)(""),s=n.filter(t=>(t.topic+t.category+t.content+t.code).toLowerCase().includes(e.toLowerCase()));return(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[(0,t.jsx)("h1",{className:"text-6xl font-bold text-blue-500 mb-10",children:"CN Hub"}),(0,t.jsx)("input",{type:"text",placeholder:"Search networking topics...",className:"w-1/2 p-3 rounded-full border border-gray-300 text-lg",onChange:e=>r(e.target.value)}),(0,t.jsx)("div",{className:"mt-8 w-1/2",children:s.map((e,i)=>(0,t.jsxs)("div",{className:"bg-white p-4 rounded-xl mb-4 shadow",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:e.topic.toUpperCase()}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:e.category}),(0,t.jsx)("p",{children:e.content}),e.code&&(0,t.jsx)("pre",{className:"bg-black text-green-400 p-3 mt-3 rounded overflow-x-auto text-sm",children:(0,t.jsx)("code",{children:e.code})})]},i))})]})}])}]);