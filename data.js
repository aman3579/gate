// ========================================
// GATE CS Super App - Data Store
// ========================================

// Subjects Database
const SUBJECTS = [
    {
        id: 'os',
        name: 'Operating Systems',
        icon: '💻',
        topics: [
            'Process Management', 'CPU Scheduling', 'Deadlock', 'Memory Management',
            'Virtual Memory', 'File Systems', 'Disk Scheduling', 'Synchronization'
        ],
        weightage: 8
    },
    {
        id: 'dbms',
        name: 'Database Management',
        icon: '🗄️',
        topics: [
            'ER Model', 'Relational Model', 'SQL', 'Normalization',
            'Transactions', 'Indexing', 'Concurrency Control', 'Recovery'
        ],
        weightage: 8
    },
    {
        id: 'networks',
        name: 'Computer Networks',
        icon: '🌐',
        topics: [
            'OSI Model', 'TCP/IP', 'Network Layer', 'Transport Layer',
            'Application Layer', 'Routing', 'Flow Control', 'Error Detection'
        ],
        weightage: 7
    },
    {
        id: 'coa',
        name: 'Computer Organization',
        icon: '🔧',
        topics: [
            'Number Systems', 'Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits',
            'Memory Hierarchy', 'Cache Memory', 'Pipelining', 'I/O Organization'
        ],
        weightage: 9
    },
    {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        icon: '📊',
        topics: [
            'Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees',
            'Graphs', 'Sorting', 'Searching', 'Dynamic Programming'
        ],
        weightage: 12
    },
    {
        id: 'toc',
        name: 'Theory of Computation',
        icon: '🤖',
        topics: [
            'Finite Automata', 'Regular Languages', 'Context Free Grammar', 'Pushdown Automata',
            'Turing Machines', 'Decidability', 'Complexity Classes', 'P vs NP'
        ],
        weightage: 7
    },
    {
        id: 'compiler',
        name: 'Compiler Design',
        icon: '⚙️',
        topics: [
            'Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Intermediate Code',
            'Code Optimization', 'Code Generation', 'Symbol Table', 'Error Handling'
        ],
        weightage: 5
    },
    {
        id: 'digital',
        name: 'Digital Logic',
        icon: '🔌',
        topics: [
            'Logic Gates', 'Boolean Functions', 'K-Maps', 'Combinational Design',
            'Flip-Flops', 'Counters', 'Registers', 'Sequential Design'
        ],
        weightage: 6
    },
    {
        id: 'programming',
        name: 'Programming & DS',
        icon: '💾',
        topics: [
            'C Programming', 'Python', 'OOP Concepts', 'Recursion',
            'Pointers', 'File Handling', 'Data Structures Implementation', 'Complexity Analysis'
        ],
        weightage: 10
    },
    {
        id: 'discrete',
        name: 'Discrete Mathematics',
        icon: '🔢',
        topics: [
            'Set Theory', 'Relations', 'Functions', 'Combinatorics',
            'Graph Theory', 'Probability', 'Mathematical Logic', 'Number Theory'
        ],
        weightage: 8
    }
];

// Practice Questions Bank
const PRACTICE_QUESTIONS = [
    // Operating Systems
    {
        id: 1,
        subject: 'os',
        question: 'In a system with 4GB RAM and page size of 4KB, how many entries are needed in a single-level page table?',
        options: [
            '2^20 entries',
            '2^10 entries',
            '2^18 entries',
            '2^16 entries'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: '4GB = 2^32 bytes, Page size = 4KB = 2^12 bytes. Number of pages = 2^32 / 2^12 = 2^20 entries needed.'
    },
    {
        id: 2,
        subject: 'os',
        question: 'Which scheduling algorithm can lead to starvation?',
        options: [
            'First Come First Serve (FCFS)',
            'Round Robin',
            'Priority Scheduling',
            'Shortest Job First (SJF)'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'Priority Scheduling can lead to starvation as low priority processes may never get CPU time if high priority processes keep arriving.'
    },
    {
        id: 3,
        subject: 'os',
        question: 'What is the banker\'s algorithm used for?',
        options: [
            'Memory management',
            'Deadlock avoidance',
            'Process scheduling',
            'File allocation'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Banker\'s algorithm is used for deadlock avoidance by ensuring the system never enters an unsafe state.'
    },
    {
        id: 4,
        subject: 'os',
        question: 'In demand paging, a page fault occurs when:',
        options: [
            'A page is not in main memory',
            'A page is corrupted',
            'Memory is full',
            'CPU is idle'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: 'Page fault occurs when a program tries to access a page that is not currently in main memory.'
    },
    {
        id: 5,
        subject: 'os',
        question: 'Which of the following is true about semaphores?',
        options: [
            'They can only have binary values',
            'They are used for process synchronization',
            'They prevent all deadlocks',
            'They are faster than mutex locks'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'Semaphores are synchronization tools used to control access to shared resources in concurrent programming.'
    },

    // DBMS
    {
        id: 6,
        subject: 'dbms',
        question: 'A relation in 3NF is always in:',
        options: [
            '1NF and 2NF',
            'Only 1NF',
            'BCNF',
            'None of these'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: '3NF is a stronger form than 2NF, which is stronger than 1NF. So a relation in 3NF must be in both 1NF and 2NF.'
    },
    {
        id: 7,
        subject: 'dbms',
        question: 'Which SQL clause is used to remove duplicates?',
        options: [
            'UNIQUE',
            'DISTINCT',
            'REMOVE',
            'DELETE'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'The DISTINCT keyword is used in SQL SELECT statements to return only distinct (different) values.'
    },
    {
        id: 8,
        subject: 'dbms',
        question: 'The ACID properties in DBMS stand for:',
        options: [
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Completeness, Integrity, Dependency',
            'Association, Consistency, Independence, Durability',
            'Atomicity, Completeness, Isolation, Dependency'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: 'ACID are key properties that guarantee database transactions are processed reliably: Atomicity, Consistency, Isolation, Durability.'
    },
    {
        id: 9,
        subject: 'dbms',
        question: 'In a B+ tree of order m, the maximum number of keys in a leaf node is:',
        options: [
            'm',
            'm-1',
            'm+1',
            '2m'
        ],
        correct: 1,
        difficulty: 'hard',
        solution: 'In a B+ tree of order m, each leaf node can contain at most m-1 keys and m pointers.'
    },
    {
        id: 10,
        subject: 'dbms',
        question: 'Which normal form eliminates transitive dependency?',
        options: [
            '1NF',
            '2NF',
            '3NF',
            'BCNF'
        ],
        correct: 2,
        difficulty: 'medium',
        solution: '3NF (Third Normal Form) eliminates transitive dependencies where non-key attributes depend on other non-key attributes.'
    },

    // Computer Networks
    {
        id: 11,
        subject: 'networks',
        question: 'What is the subnet mask for a /24 network?',
        options: [
            '255.255.255.0',
            '255.255.0.0',
            '255.0.0.0',
            '255.255.255.255'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: '/24 means 24 bits are used for network portion, leaving 8 bits for hosts. This gives 255.255.255.0'
    },
    {
        id: 12,
        subject: 'networks',
        question: 'Which layer of OSI model handles routing?',
        options: [
            'Transport Layer',
            'Network Layer',
            'Data Link Layer',
            'Session Layer'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'The Network Layer (Layer 3) is responsible for routing packets across networks.'
    },
    {
        id: 13,
        subject: 'networks',
        question: 'TCP uses a _____ handshake for connection establishment.',
        options: [
            'Two-way',
            'Three-way',
            'Four-way',
            'One-way'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'TCP uses a three-way handshake: SYN, SYN-ACK, ACK to establish a connection.'
    },
    {
        id: 14,
        subject: 'networks',
        question: 'The maximum window size in TCP with 16-bit window field is:',
        options: [
            '2^16 bytes',
            '2^15 bytes',
            '2^32 bytes',
            '2^8 bytes'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: 'With a 16-bit window field, the maximum window size is 2^16 = 65,536 bytes.'
    },
    {
        id: 15,
        subject: 'networks',
        question: 'Which protocol is used for error reporting in IP?',
        options: [
            'ARP',
            'ICMP',
            'DHCP',
            'DNS'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'ICMP (Internet Control Message Protocol) is used for error reporting and diagnostic functions.'
    },

    // Computer Organization & Architecture
    {
        id: 16,
        subject: 'coa',
        question: 'Convert decimal 25 to binary:',
        options: [
            '11001',
            '10101',
            '11011',
            '10011'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: '25 in binary is 11001 (16+8+1 = 25)'
    },
    {
        id: 17,
        subject: 'coa',
        question: 'A 32-bit machine with 4GB RAM needs how many address bits?',
        options: [
            '32 bits',
            '30 bits',
            '28 bits',
            '24 bits'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: '4GB = 2^32 bytes. Therefore, 32 address bits are needed to address each byte.'
    },
    {
        id: 18,
        subject: 'coa',
        question: 'Cache memory is placed between:',
        options: [
            'CPU and Main Memory',
            'Main Memory and Secondary Storage',
            'CPU and Registers',
            'I/O and CPU'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: 'Cache memory is a small, fast memory placed between CPU and main memory to reduce access time.'
    },
    {
        id: 19,
        subject: 'coa',
        question: 'In a 5-stage pipeline, the speedup factor compared to non-pipelined execution is approximately:',
        options: [
            '5',
            '4',
            '3',
            '2'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: 'Ideal speedup in k-stage pipeline is k. So 5-stage pipeline gives approximately 5x speedup.'
    },
    {
        id: 20,
        subject: 'coa',
        question: 'The 2\'s complement of -5 in 8-bit representation is:',
        options: [
            '11111011',
            '10101010',
            '11111010',
            '00000101'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: '5 in binary is 00000101. 1\'s complement is 11111010. Adding 1 gives 11111011.'
    },

    // Data Structures & Algorithms
    {
        id: 21,
        subject: 'dsa',
        question: 'Time complexity of Binary Search is:',
        options: [
            'O(log n)',
            'O(n)',
            'O(n log n)',
            'O(1)'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: 'Binary search divides the search space in half each time, giving O(log n) complexity.'
    },
    {
        id: 22,
        subject: 'dsa',
        question: 'Which data structure uses LIFO principle?',
        options: [
            'Queue',
            'Stack',
            'Array',
            'Tree'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Stack uses Last In First Out (LIFO) principle - the last element added is the first one removed.'
    },
    {
        id: 23,
        subject: 'dsa',
        question: 'The height of a balanced BST with n nodes is:',
        options: [
            'O(log n)',
            'O(n)',
            'O(n log n)',
            'O(1)'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: 'A balanced Binary Search Tree maintains height of O(log n) by keeping the tree balanced.'
    },
    {
        id: 24,
        subject: 'dsa',
        question: 'Quick Sort has worst case time complexity of:',
        options: [
            'O(n^2)',
            'O(n log n)',
            'O(log n)',
            'O(n)'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: 'Quick Sort has O(n^2) worst case when the pivot is always the smallest or largest element, though average case is O(n log n).'
    },
    {
        id: 25,
        subject: 'dsa',
        question: 'Which traversal of BST gives sorted order?',
        options: [
            'Preorder',
            'Inorder',
            'Postorder',
            'Level order'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Inorder traversal (Left-Root-Right) of a BST gives elements in sorted ascending order.'
    },

    // Theory of Computation
    {
        id: 26,
        subject: 'toc',
        question: 'Regular languages are closed under:',
        options: [
            'Union only',
            'Union, Intersection, and Complement',
            'Intersection only',
            'None of these'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'Regular languages are closed under union, intersection, complement, concatenation, and Kleene star.'
    },
    {
        id: 27,
        subject: 'toc',
        question: 'Which automaton accepts context-free languages?',
        options: [
            'Finite Automaton',
            'Pushdown Automaton',
            'Turing Machine',
            'Linear Bounded Automaton'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Pushdown Automaton (PDA) with a stack can recognize context-free languages.'
    },
    {
        id: 28,
        subject: 'toc',
        question: 'The language {a^n b^n | n >= 0} is:',
        options: [
            'Regular',
            'Context-Free but not Regular',
            'Context-Sensitive',
            'None of these'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'This language requires counting, which can be done with a stack (PDA) but not with finite memory (FA). It\'s context-free but not regular.'
    },
    {
        id: 29,
        subject: 'toc',
        question: 'The halting problem is:',
        options: [
            'Decidable',
            'Undecidable',
            'Semi-decidable',
            'NP-Complete'
        ],
        correct: 1,
        difficulty: 'hard',
        solution: 'The halting problem (determining if a program will halt on a given input) is undecidable - there is no algorithm that can solve it for all cases.'
    },
    {
        id: 30,
        subject: 'toc',
        question: 'Pumping lemma is used to prove a language is:',
        options: [
            'Regular',
            'Not regular',
            'Context-free',
            'Recursive'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'Pumping lemma is primarily used to prove that a language is NOT regular by showing it violates the pumping property.'
    },

    // Compiler Design
    {
        id: 31,
        subject: 'compiler',
        question: 'Which phase of compiler generates tokens?',
        options: [
            'Syntax Analyzer',
            'Lexical Analyzer',
            'Semantic Analyzer',
            'Code Generator'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Lexical Analyzer (Scanner) breaks the source code into tokens - the smallest meaningful units.'
    },
    {
        id: 32,
        subject: 'compiler',
        question: 'First and Follow sets are used in:',
        options: [
            'Lexical Analysis',
            'Parsing',
            'Code Optimization',
            'Code Generation'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'First and Follow sets are used in parsing to construct LL(1) and other predictive parsers.'
    },
    {
        id: 33,
        subject: 'compiler',
        question: 'Three address code is an example of:',
        options: [
            'Source code',
            'Intermediate code',
            'Machine code',
            'Assembly code'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'Three address code is a form of intermediate representation used between parsing and code generation.'
    },
    {
        id: 34,
        subject: 'compiler',
        question: 'Dead code elimination is a type of:',
        options: [
            'Lexical Analysis',
            'Syntax Analysis',
            'Code Optimization',
            'Error Handling'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'Dead code elimination removes code that will never be executed, which is a code optimization technique.'
    },
    {
        id: 35,
        subject: 'compiler',
        question: 'Which parser is top-down?',
        options: [
            'LR Parser',
            'LL Parser',
            'SLR Parser',
            'LALR Parser'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'LL parser is a top-down parser (reads Left-to-right, produces Leftmost derivation). LR parsers are bottom-up.'
    },

    // Digital Logic
    {
        id: 36,
        subject: 'digital',
        question: 'How many input combinations does a 3-input AND gate have?',
        options: [
            '4',
            '6',
            '8',
            '16'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'With 3 inputs, there are 2^3 = 8 possible input combinations.'
    },
    {
        id: 37,
        subject: 'digital',
        question: 'A flip-flop has:',
        options: [
            '1 stable state',
            '2 stable states',
            '3 stable states',
            'No stable state'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'A flip-flop is a bistable device with 2 stable states (0 and 1), used for storing one bit of information.'
    },
    {
        id: 38,
        subject: 'digital',
        question: 'The minimum number of NAND gates required to implement A+B is:',
        options: [
            '2',
            '3',
            '4',
            '5'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'A+B = (A\'.B\')\'  - requires 3 NAND gates (two to invert A and B, one to NAND the results).'
    },
    {
        id: 39,
        subject: 'digital',
        question: 'A 4-to-1 multiplexer has how many select lines?',
        options: [
            '1',
            '2',
            '3',
            '4'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'A 4-to-1 MUX needs 2 select lines to choose among 4 inputs (2^2 = 4).'
    },
    {
        id: 40,
        subject: 'digital',
        question: 'Which of the following is a universal gate?',
        options: [
            'AND',
            'OR',
            'NAND',
            'XOR'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'NAND and NOR are universal gates - any Boolean function can be implemented using only NAND or only NOR gates.'
    },

    // Programming
    {
        id: 41,
        subject: 'programming',
        question: 'In C, the size of a pointer is:',
        options: [
            'Always 4 bytes',
            'Depends on the system architecture',
            'Always 8 bytes',
            'Depends on the data type'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'Pointer size depends on system architecture: 4 bytes on 32-bit systems, 8 bytes on 64-bit systems.'
    },
    {
        id: 42,
        subject: 'programming',
        question: 'Which of the following is not an OOP principle?',
        options: [
            'Encapsulation',
            'Polymorphism',
            'Compilation',
            'Inheritance'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'The main OOP principles are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is not an OOP principle.'
    },
    {
        id: 43,
        subject: 'programming',
        question: 'Time complexity of recursive Fibonacci is:',
        options: [
            'O(n)',
            'O(log n)',
            'O(2^n)',
            'O(n^2)'
        ],
        correct: 2,
        difficulty: 'medium',
        solution: 'Recursive Fibonacci has O(2^n) complexity due to redundant calculations. Each call branches into two more calls.'
    },
    {
        id: 44,
        subject: 'programming',
        question: 'In Python, which is mutable?',
        options: [
            'Tuple',
            'String',
            'List',
            'Integer'
        ],
        correct: 2,
        difficulty: 'easy',
        solution: 'Lists are mutable in Python - you can modify their contents. Tuples, strings, and integers are immutable.'
    },
    {
        id: 45,
        subject: 'programming',
        question: 'What is a dangling pointer?',
        options: [
            'A pointer that points to NULL',
            'A pointer that points to freed memory',
            'A pointer that has no value',
            'A pointer to a constant'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'A dangling pointer points to memory that has been freed/deallocated, which can lead to undefined behavior if accessed.'
    },

    // Discrete Mathematics
    {
        id: 46,
        subject: 'discrete',
        question: 'The number of permutations of n distinct objects is:',
        options: [
            'n',
            'n!',
            '2^n',
            'n^2'
        ],
        correct: 1,
        difficulty: 'easy',
        solution: 'The number of ways to arrange n distinct objects is n! (n factorial).'
    },
    {
        id: 47,
        subject: 'discrete',
        question: 'A graph with n vertices has at most how many edges (simple graph)?',
        options: [
            'n',
            'n^2',
            'n(n-1)/2',
            '2n'
        ],
        correct: 2,
        difficulty: 'medium',
        solution: 'In a simple undirected graph with n vertices, maximum edges = nC2 = n(n-1)/2.'
    },
    {
        id: 48,
        subject: 'discrete',
        question: 'The probability of getting at least one head in 3 coin tosses is:',
        options: [
            '7/8',
            '1/2',
            '3/4',
            '1/4'
        ],
        correct: 0,
        difficulty: 'medium',
        solution: 'P(at least one head) = 1 - P(no heads) = 1 - (1/2)^3 = 1 - 1/8 = 7/8.'
    },
    {
        id: 49,
        subject: 'discrete',
        question: 'A relation R on set A is transitive if:',
        options: [
            '(a,b) ∈ R implies (b,a) ∈ R',
            '(a,b) ∈ R and (b,c) ∈ R implies (a,c) ∈ R',
            '(a,a) ∈ R for all a',
            'None of these'
        ],
        correct: 1,
        difficulty: 'medium',
        solution: 'Transitivity means if aRb and bRc, then aRc must also hold.'
    },
    {
        id: 50,
        subject: 'discrete',
        question: 'In how many ways can you select 2 items from 5?',
        options: [
            '10',
            '20',
            '5',
            '25'
        ],
        correct: 0,
        difficulty: 'easy',
        solution: '5C2 = 5!/(2! × 3!) = (5 × 4)/(2 × 1) = 10 ways.'
    }
];

// Formulas Database
const FORMULAS = [
    {
        subject: 'os',
        category: 'Memory Management',
        formulas: [
            {
                name: 'Page Table Size',
                formula: 'Page Table Size = (Virtual Address Space / Page Size) × Entry Size',
                example: 'For 4GB virtual memory, 4KB pages, 4B entries: (2^32 / 2^12) × 4 = 4MB'
            },
            {
                name: 'Effective Access Time',
                formula: 'EAT = (1-p) × TLB_Time + p × (TLB_Time + Page_Fault_Time)',
                example: 'p = page fault rate, higher p means slower access'
            }
        ]
    },
    {
        subject: 'dbms',
        category: 'Normalization',
        formulas: [
            {
                name: 'Number of Super Keys',
                formula: 'If candidate key has n attributes and relation has m attributes: 2^(m-n)',
                example: 'Relation with 5 attributes, candidate key with 2: 2^(5-2) = 8 super keys'
            }
        ]
    },
    {
        subject: 'networks',
        category: 'IP Addressing',
        formulas: [
            {
                name: 'Number of Hosts',
                formula: 'Number of Hosts = 2^(host bits) - 2',
                example: 'For /24 network: 2^8 - 2 = 254 usable hosts'
            },
            {
                name: 'Efficiency',
                formula: 'Efficiency = (Useful Data / Total Transmission) × 100',
                example: 'For 1000B data with 20B overhead: (1000/1020) × 100 = 98%'
            }
        ]
    },
    {
        subject: 'coa',
        category: 'Performance',
        formulas: [
            {
                name: 'CPI (Cycles Per Instruction)',
                formula: 'CPI = Total Cycles / Instruction Count',
                example: 'If 1000 instructions take 5000 cycles: CPI = 5'
            },
            {
                name: 'Speedup',
                formula: 'Speedup = Time_without_enhancement / Time_with_enhancement',
                example: 'If task takes 10s without cache, 2s with cache: Speedup = 5x'
            },
            {
                name: 'Cache Hit Ratio',
                formula: 'Hit Ratio = Cache Hits / Total Accesses',
                example: '900 hits in 1000 accesses: 90% hit ratio'
            }
        ]
    },
    {
        subject: 'dsa',
        category: 'Time Complexity',
        formulas: [
            {
                name: 'Master Theorem',
                formula: 'T(n) = aT(n/b) + f(n)',
                example: 'Merge Sort: T(n) = 2T(n/2) + O(n) = O(n log n)'
            }
        ]
    },
    {
        subject: 'discrete',
        category: 'Combinatorics',
        formulas: [
            {
                name: 'Permutations',
                formula: 'P(n,r) = n! / (n-r)!',
                example: 'P(5,2) = 5!/3! = 20'
            },
            {
                name: 'Combinations',
                formula: 'C(n,r) = n! / (r! × (n-r)!)',
                example: 'C(5,2) = 5!/(2!×3!) = 10'
            },
            {
                name: 'Pigeonhole Principle',
                formula: 'If n items in m containers, at least ⌈n/m⌉ in one container',
                example: '13 people, 12 months: at least 2 share birthday month'
            }
        ]
    }
];

// Previous Year Questions
const PYQ_QUESTIONS = [
    {
        year: 2024,
        subject: 'os',
        question: 'Consider a system with 2GB physical memory and 4KB page size. What is the number of frames?',
        options: ['2^19', '2^18', '2^20', '2^21'],
        correct: 0,
        marks: 2
    },
    {
        year: 2024,
        subject: 'dbms',
        question: 'Which of the following schedules is conflict serializable?',
        options: ['T1:R(A) T2:W(A) T1:W(A)', 'T1:W(A) T2:R(A) T1:R(B)', 'T1:R(A) T1:W(A) T2:R(A)', 'T1:R(A) T2:W(B) T1:W(B)'],
        correct: 2,
        marks: 2
    },
    {
        year: 2023,
        subject: 'dsa',
        question: 'The minimum number of comparisons required to find both maximum and minimum of n numbers is:',
        options: ['n', '2n-2', '3n/2-2', 'n-1'],
        correct: 2,
        marks: 2
    },
    {
        year: 2023,
        subject: 'networks',
        question: 'In a network with bandwidth 1 Mbps and RTT 100ms, what is the bandwidth-delay product?',
        options: ['100 Kb', '10 Kb', '1000 Kb', '12.5 KB'],
        correct: 3,
        marks: 1
    },
    {
        year: 2022,
        subject: 'coa',
        question: 'A 16-bit instruction has opcode, two register fields, and an immediate field. If there are 8 registers, what is the maximum immediate value?',
        options: ['2^7-1', '2^8-1', '2^9-1', '2^10-1'],
        correct: 2,
        marks: 2
    },
    {
        year: 2022,
        subject: 'toc',
        question: 'Which of the following languages is NOT context-free?',
        options: ['{a^n b^n | n>=0}', '{a^n b^n c^n | n>=0}', '{ww^R | w ∈ {a,b}*}', '{a^n | n is prime}'],
        correct: 1,
        marks: 1
    }
];
