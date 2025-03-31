const expertiseList = [
  // Programming Languages
  { label: "C++ Programming", category: "Programming" },
  { label: "Java Development", category: "Programming" },
  { label: "Python Scripting", category: "Programming" },
  { label: "JavaScript (ES6+)", category: "Programming" },
  { label: "TypeScript", category: "Programming" },
  { label: "C# Development", category: "Programming" },
  { label: "Go (Golang)", category: "Programming" },
  { label: "Swift (iOS Development)", category: "Programming" },
  { label: "Kotlin (Android Development)", category: "Programming" },
  { label: "Rust Programming", category: "Programming" },
  { label: "Ruby on Rails", category: "Programming" },
  { label: "PHP Development", category: "Programming" },

  // Web Development
  { label: "Full Stack Web Development", category: "Web Development" },
  { label: "Front-end Development", category: "Web Development" },
  { label: "Back-end Development", category: "Web Development" },
  { label: "React.js Development", category: "Web Development" },
  { label: "Vue.js Development", category: "Web Development" },
  { label: "Angular Development", category: "Web Development" },
  { label: "Node.js Development", category: "Web Development" },
  { label: "Next.js Development", category: "Web Development" },
  { label: "GraphQL", category: "Web Development" },
  { label: "RESTful API Design", category: "Web Development" },
  { label: "Tailwind CSS", category: "Web Development" },
  { label: "Bootstrap", category: "Web Development" },
  { label: "WordPress Development", category: "Web Development" },

  // Mobile Development
  { label: "Mobile App Development", category: "Programming" },
  { label: "React Native Development", category: "Mobile Development" },
  { label: "Flutter Development", category: "Mobile Development" },
  { label: "Swift (iOS)", category: "Mobile Development" },
  { label: "Kotlin (Android)", category: "Mobile Development" },

  // AI & Machine Learning
  { label: "Machine Learning", category: "AI" },
  { label: "Deep Learning", category: "AI" },
  { label: "Computer Vision", category: "AI" },
  { label: "Natural Language Processing (NLP)", category: "AI" },
  { label: "Reinforcement Learning", category: "AI" },
  { label: "AI Model Deployment", category: "AI" },
  { label: "MLOps", category: "AI" },
  { label: "Artificial Intelligence Research", category: "AI" },
  { label: "TensorFlow", category: "AI" },
  { label: "PyTorch", category: "AI" },
  { label: "Scikit-Learn", category: "AI" },
  { label: "OpenCV", category: "AI" },

  // Data Science & Big Data
  { label: "Data Science", category: "Data Science" },
  { label: "Data Analysis", category: "Data Science" },
  { label: "Big Data", category: "Data Science" },
  { label: "Data Engineering", category: "Data Science" },
  { label: "Data Warehousing", category: "Data Science" },
  { label: "ETL Pipelines", category: "Data Science" },
  { label: "Data Visualization", category: "Data Science" },
  { label: "SQL & NoSQL Databases", category: "Data Science" },
  { label: "Apache Spark", category: "Data Science" },
  { label: "Hadoop", category: "Data Science" },

  // Cybersecurity
  { label: "Cybersecurity", category: "Security" },
  { label: "Penetration Testing", category: "Security" },
  { label: "Ethical Hacking", category: "Security" },
  { label: "Network Security", category: "Security" },
  { label: "Cloud Security", category: "Security" },
  { label: "Security Compliance & Risk Management", category: "Security" },

  // Cloud & DevOps
  { label: "Cloud Computing", category: "DevOps" },
  { label: "AWS", category: "DevOps" },
  { label: "Google Cloud Platform (GCP)", category: "DevOps" },
  { label: "Microsoft Azure", category: "DevOps" },
  { label: "Docker", category: "DevOps" },
  { label: "Kubernetes", category: "DevOps" },
  { label: "CI/CD Pipelines", category: "DevOps" },
  { label: "Terraform", category: "DevOps" },
  { label: "Ansible", category: "DevOps" },

  // Software Engineering & Architecture
  { label: "Software Architecture", category: "Software Engineering" },
  { label: "Microservices Architecture", category: "Software Engineering" },
  { label: "API Development", category: "Software Engineering" },
  { label: "Agile Methodologies", category: "Software Engineering" },
  { label: "Scrum", category: "Software Engineering" },

  // Blockchain & Cryptography
  { label: "Blockchain Development", category: "Technology" },
  { label: "Solidity Smart Contracts", category: "Technology" },
  { label: "Cryptography", category: "Technology" },

  // Other Technologies
  { label: "Embedded Systems", category: "Technology" },
  { label: "IoT (Internet of Things)", category: "Technology" },
  { label: "Game Development", category: "Technology" },
  { label: "Unity Game Development", category: "Technology" },
  { label: "Unreal Engine", category: "Technology" },
  { label: "Robotics", category: "Technology" },

  // B.Tech in Mechanical Engineering
  {
    label: "Mechanical Engineering Principles",
    category: "B.Tech in Mechanical Engineering",
  },
  { label: "Thermodynamics", category: "B.Tech in Mechanical Engineering" },
  { label: "Fluid Mechanics", category: "B.Tech in Mechanical Engineering" },
  {
    label: "Manufacturing Processes",
    category: "B.Tech in Mechanical Engineering",
  },
  {
    label: "Strength of Materials",
    category: "B.Tech in Mechanical Engineering",
  },
  { label: "Machine Design", category: "B.Tech in Mechanical Engineering" },

  // B.Tech in Computer Science and Engineering
  {
    label: "Computer Science Fundamentals",
    category: "B.Tech in Computer Science and Engineering",
  },
  {
    label: "Data Structures & Algorithms",
    category: "B.Tech in Computer Science and Engineering",
  },
  {
    label: "Operating Systems",
    category: "B.Tech in Computer Science and Engineering",
  },
  {
    label: "Database Management Systems",
    category: "B.Tech in Computer Science and Engineering",
  },
  {
    label: "Software Engineering",
    category: "B.Tech in Computer Science and Engineering",
  },
  {
    label: "Compiler Design",
    category: "B.Tech in Computer Science and Engineering",
  },

  // B.Tech in Civil Engineering
  { label: "Structural Engineering", category: "B.Tech in Civil Engineering" },
  { label: "Building Materials", category: "B.Tech in Civil Engineering" },
  { label: "Surveying", category: "B.Tech in Civil Engineering" },
  { label: "Fluid Mechanics (Civil)", category: "B.Tech in Civil Engineering" },
  {
    label: "Geotechnical Engineering",
    category: "B.Tech in Civil Engineering",
  },

  // B.Tech in Electronics and Computer Engineering
  {
    label: "Electronics Circuits",
    category: "B.Tech in Electronics and Computer Engineering",
  },
  {
    label: "Microprocessors",
    category: "B.Tech in Electronics and Computer Engineering",
  },
  {
    label: "Digital Electronics",
    category: "B.Tech in Electronics and Computer Engineering",
  },
  {
    label: "Embedded Systems",
    category: "B.Tech in Electronics and Computer Engineering",
  },
  {
    label: "Computer Architecture",
    category: "B.Tech in Electronics and Computer Engineering",
  },

  // Bachelor of Engineering in Mechanical Engineering
  {
    label: "Mechanical Design",
    category: "Bachelor of Engineering in Mechanical Engineering",
  },
  {
    label: "Engineering Mechanics",
    category: "Bachelor of Engineering in Mechanical Engineering",
  },
  {
    label: "Vibration Analysis",
    category: "Bachelor of Engineering in Mechanical Engineering",
  },

  // B.Tech in Electronics and Electrical Engineering
  {
    label: "Electrical Circuits",
    category: "B.Tech in Electronics and Electrical Engineering",
  },
  {
    label: "Power Systems",
    category: "B.Tech in Electronics and Electrical Engineering",
  },
  {
    label: "Signal Processing",
    category: "B.Tech in Electronics and Electrical Engineering",
  },
  {
    label: "Control Systems",
    category: "B.Tech in Electronics and Electrical Engineering",
  },

  // B.Tech in Information Technology
  {
    label: "Information Technology Fundamentals",
    category: "B.Tech in Information Technology",
  },
  { label: "Computer Networks", category: "B.Tech in Information Technology" },
  { label: "Web Technologies", category: "B.Tech in Information Technology" },

  // Bachelor of Engineering in Computer Science and Engineering
  {
    label: "Software Development",
    category: "Bachelor of Engineering in Computer Science and Engineering",
  },
  {
    label: "Artificial Intelligence",
    category: "Bachelor of Engineering in Computer Science and Engineering",
  },
  {
    label: "Computer Graphics",
    category: "Bachelor of Engineering in Computer Science and Engineering",
  },

  // B.Tech in Electrical Engineering
  { label: "Power Electronics", category: "B.Tech in Electrical Engineering" },
  {
    label: "Electrical Machines",
    category: "B.Tech in Electrical Engineering",
  },
  { label: "Control Systems", category: "B.Tech in Electrical Engineering" },

  // B.Tech in Artificial Intelligence and Machine Learning
  {
    label: "Machine Learning Algorithms",
    category: "B.Tech in Artificial Intelligence and Machine Learning",
  },
  {
    label: "AI Ethics",
    category: "B.Tech in Artificial Intelligence and Machine Learning",
  },
  {
    label: "Deep Learning Architectures",
    category: "B.Tech in Artificial Intelligence and Machine Learning",
  },

  // B.Tech in Data Sciences
  { label: "Data Analysis", category: "B.Tech in Data Sciences" },
  { label: "Big Data Technologies", category: "B.Tech in Data Sciences" },
  { label: "Data Visualization", category: "B.Tech in Data Sciences" },
  {
    label: "Machine Learning for Data Science",
    category: "B.Tech in Data Sciences",
  },

  // Bachelor of Engineering in Data Sciences
  {
    label: "Data Science Techniques",
    category: "Bachelor of Engineering in Data Sciences",
  },
  {
    label: "Data Engineering",
    category: "Bachelor of Engineering in Data Sciences",
  },
  {
    label: "Artificial Intelligence & Data Science",
    category: "Bachelor of Engineering in Data Sciences",
  },

  // B.Tech in BioTechnology
  { label: "Biotechnology Fundamentals", category: "B.Tech in BioTechnology" },
  { label: "Genetic Engineering", category: "B.Tech in BioTechnology" },
  { label: "Bioprocess Engineering", category: "B.Tech in BioTechnology" },

  // B.Tech in Chemical Engineering
  {
    label: "Chemical Process Engineering",
    category: "B.Tech in Chemical Engineering",
  },
  { label: "Heat Transfer", category: "B.Tech in Chemical Engineering" },
  { label: "Mass Transfer", category: "B.Tech in Chemical Engineering" },

  // Bachelor of Engineering in Computer Engineering
  {
    label: "Computer Systems",
    category: "Bachelor of Engineering in Computer Engineering",
  },
  {
    label: "Software Design & Development",
    category: "Bachelor of Engineering in Computer Engineering",
  },
  {
    label: "Network Security",
    category: "Bachelor of Engineering in Computer Engineering",
  },

  // Bachelor of Engineering in Electronics and Telecom Engineering
  {
    label: "Telecommunication Systems",
    category: "Bachelor of Engineering in Electronics and Telecom Engineering",
  },
  {
    label: "Analog Electronics",
    category: "Bachelor of Engineering in Electronics and Telecom Engineering",
  },
  {
    label: "Digital Communication",
    category: "Bachelor of Engineering in Electronics and Telecom Engineering",
  },
];

export default expertiseList;
