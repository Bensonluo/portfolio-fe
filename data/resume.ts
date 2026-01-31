import { Resume } from '@/types/common';

export const resume: Resume = {
  name: 'Peng (Benson) Luo',
  title: 'Senior ML/LLM Engineer & MLOps Specialist',
  bio: `Passionate Senior LLM Engineer with 7+ years experience developing production AI/LLM systems.
  Proven expertise in developing LLMs GenAI services, and building ML infrastructure.`,
  email: 'Luopengllpp@hotmail.com',
  location: 'China',
  phone: '19521338577',
  experience: [
    {
      id: '1',
      company: 'Paypal India (Contractor)',
      position: 'Senior LLM Engineer',
      startDate: 'Nov 2024',
      endDate: 'Aug 2025',
      description: `Mainly responsible for the development of LLM GenAI services, LLM toolchains, as well as LLM Ops work.
      Regular engineering work for RAG-based conversational chatbots service.
      Customer service agents exploring and developments, MCP tooling.
      Building a evaluation pipeline service by airflow for LLM service.
      Performance optimizations by prompt engineering, code/arch refinement and model fine-tuning, reduced the P95 latency by 20%.`,
      technologies: ['Python', 'Flask', 'FastAPI', 'Airflow', 'JAVA Spring', 'OpenAI SDK', 'HuggingFace Transformers', 'PEFT', 'GCS', 'BigQuery', 'Milvus', 'Docker', 'K8s', 'CrewAI', 'MCP'],
    },
    {
      id: '2',
      company: 'H1 Technology',
      position: 'Senior Software Engineer (Part-time)',
      startDate: 'June 2023',
      endDate: 'Oct 2024',
      description: `Designed data storage architecture for IoT energy management systems.
      E2E ML algorithms and solution for smart device control.
      Developed data pipelines and APIs for energy scheduling algorithms.`,
      technologies: ['Python', 'IoT', 'Smart Energy', 'Data Architecture'],
    },
    {
      id: '3',
      company: 'EcarX',
      position: 'Senior Software Engineer/ML Ops Engineer',
      startDate: 'Dec 2021',
      endDate: 'Mar 2023',
      description: `Principle developer of internal Machine Learning toolchain, ML platforms.
      Image annotation system for ADAS.
      Algorithm evaluation/testing platform.
      Developed and maintained ML toolchains, HPC monitoring, data pipelines, database schema designs, and data api design/development.
      Development work for the Map Data Platform.`,
      technologies: ['Python', 'Java', 'Spring', 'Flask', 'Airflow', 'Kafka', 'Redis', 'MongoDB', 'PostgreSQL', 'CICD', 'Kubernetes', 'Docker', 'TypeScript', 'ReactJS'],
    },
    {
      id: '4',
      company: 'Apple (Contractor)',
      position: 'Software Engineer/ML Ops Engineer',
      startDate: 'Sep 2020',
      endDate: 'Dec 2021',
      description: `Applying machine learning to Apple's manufacturing process.
      Full-stack development of internal tools, AI/ML platforms.
      Service for data collection, data quality evaluation, dataset management.
      Platform for ML model evaluation/testing.
      Designed and delivered end-to-end AI/ML solutions to manufacturing line.
      ML ops: Maintenance of data pipeline, model deployment, model performance optimization, monitoring.`,
      technologies: ['Python', 'Flask', 'MySQL', 'PostgreSQL', 'React', 'Airflow', 'Docker', 'K8S', 'Apple Cloud Services'],
    },
    {
      id: '5',
      company: 'Jumbo Interactive',
      position: 'Software Engineer',
      startDate: 'Mar 2019',
      endDate: 'Feb 2020',
      description: `Core admin management platform dev team responsible for new feature development.`,
      technologies: ['React', 'TypeScript', 'Gerrit', 'Git', 'Ansible', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka', 'ElasticSearch'],
    },
    {
      id: '6',
      company: 'SMG',
      position: 'Fullstack Software Engineer',
      startDate: 'Feb 2018',
      endDate: 'Feb 2019',
      description: `Developed a health lifestyle app using Apache Cordova, deployed on iOS and Android.
      Managed AWS infrastructure, including ECS, S3, DynamoDB, and RDS.
      Implemented a machine learning recommendation system to enhance user engagement.`,
      technologies: ['PHP', 'Laravel', 'Ext.js', 'AWS', 'Apache Cordova'],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'The University of Queensland',
      degree: 'Master of Information Technology',
      startDate: '2017',
      endDate: '2017',
      coursework: [
        'Algorithm & Data Structure',
        'Java/Python',
        'Data Mining',
        'Machine Learning',
        'Service Oriented Architecture',
        'Web Design and Web Information System',
      ],
    },
    {
      id: '2',
      institution: 'Hebei Normal University of Science and Technology',
      degree: 'Bachelor of Civil Engineering',
      startDate: '2013',
      endDate: '2013',
      gpa: '81%',
    },
    {
      id: '3',
      institution: 'Navitas Professional, Brisbane',
      degree: 'IT professional Career Development Program (Certificate IV in Business)',
      startDate: '2018',
      endDate: '2018',
    },
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'SQL'],
    },
    {
      category: 'LLM Technologies',
      skills: ['RAG Chatbot', 'Agentic Solutions', 'Hugging Face', 'Prompt Engineering', 'OpenAI API', 'ONNX'],
    },
    {
      category: 'AI/ML',
      skills: ['PyTorch', 'Classic ML Algorithms', 'End-to-End ML Solutions'],
    },
    {
      category: 'Cloud',
      skills: ['Google GCP', 'Azure', 'AWS'],
    },
    {
      category: 'Data Systems',
      skills: ['PostgreSQL', 'BigQuery', 'MySQL', 'MongoDB', 'Kafka', 'Redis'],
    },
    {
      category: 'DevOps',
      skills: ['Kubernetes', 'Git', 'Docker', 'CI/CD', 'Airflow', 'Unit Testing', 'TDD'],
    },
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/peng-luo-92b789a0/',
      icon: 'Linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/PengLuo-TR',
      icon: 'Github',
    },
    {
      name: 'Email',
      url: 'mailto:Luopengllpp@hotmail.com',
      icon: 'Mail',
    },
  ],
  stats: {
    yearsExperience: '7+',
    projectsCompleted: '10+',
    openSourceContributions: 'Active',
  },
};
