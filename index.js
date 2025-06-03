const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const projectRoutes = require('./routes/projectRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const Project = require('./models/Project');
const Expense = require('./models/Expense');

const app = express();

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Project and Expense Management API' });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to database and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();








// Sample project data
// const projects = [
//     {
//         id: "PROJ001",
//         ProjectName: "Website Redesign",
//         Customer: "TechCorp Inc",
//         Site: "New York",
//         Name: "John Smith",
//         email: "john@techcorp.com",
//         description: "Complete website redesign and development",
//         startDate: new Date("2024-01-01"),
//         endDate: new Date("2024-06-30"),
//         status: "In Progress",
//         ContactInformation: {
//             phone: "+1-555-0123",
//             address: "123 Tech Street, NY"
//         },
//         PeopleInfo: ["Project Manager", "Lead Developer", "UI Designer"]
//     },
//     {
//         id: "PROJ002",
//         ProjectName: "Mobile App Development",
//         Customer: "StartUpX",
//         Site: "San Francisco",
//         Name: "Sarah Johnson",
//         email: "sarah@startupx.com",
//         description: "iOS and Android app development",
//         startDate: new Date("2024-02-01"),
//         endDate: new Date("2024-08-31"),
//         status: "Planning",
//         ContactInformation: {
//             phone: "+1-555-0124",
//             address: "456 Startup Ave, SF"
//         },
//         PeopleInfo: ["Product Manager", "Mobile Developer", "QA Engineer"]
//     },
//     {
//         id: "PROJ003",
//         ProjectName: "E-commerce Platform",
//         Customer: "RetailPlus",
//         Site: "Chicago",
//         Name: "Mike Brown",
//         email: "mike@retailplus.com",
//         description: "B2B e-commerce platform development",
//         startDate: new Date("2024-03-01"),
//         endDate: new Date("2024-09-30"),
//         status: "Not Started",
//         ContactInformation: {
//             phone: "+1-555-0125",
//             address: "789 Retail Blvd, Chicago"
//         },
//         PeopleInfo: ["Business Analyst", "Backend Developer", "Frontend Developer"]
//     },
//     {
//         id: "PROJ004",
//         ProjectName: "Cloud Migration",
//         Customer: "DataTech",
//         Site: "Seattle",
//         Name: "Lisa Chen",
//         email: "lisa@datatech.com",
//         description: "Legacy system migration to cloud",
//         startDate: new Date("2024-04-01"),
//         endDate: new Date("2024-10-31"),
//         status: "Planning",
//         ContactInformation: {
//             phone: "+1-555-0126",
//             address: "321 Cloud Way, Seattle"
//         },
//         PeopleInfo: ["Cloud Architect", "DevOps Engineer", "Security Specialist"]
//     },
//     {
//         id: "PROJ005",
//         ProjectName: "AI Integration",
//         Customer: "SmartSolutions",
//         Site: "Boston",
//         Name: "David Wilson",
//         email: "david@smartsolutions.com",
//         description: "AI integration into existing systems",
//         startDate: new Date("2024-05-01"),
//         endDate: new Date("2024-11-30"),
//         status: "Not Started",
//         ContactInformation: {
//             phone: "+1-555-0127",
//             address: "654 AI Street, Boston"
//         },
//         PeopleInfo: ["AI Engineer", "Data Scientist", "ML Engineer"]
//     }
// ];

// // Sample expense data
// const expenses = [
//     {
//         Date: new Date("2024-01-15"),
//         Description: "Development Tools License",
//         Category: "Software",
//         Person: "John Smith",
//         Amount: 1200.00,
//         Receipt: "https://example.com/receipts/dev-tools-001",
//         Actions: ["Approved", "Paid"],
//         created_at: new Date("2024-01-15")
//     },
//     {
//         Date: new Date("2024-02-01"),
//         Description: "Team Building Event",
//         Category: "Team Activities",
//         Person: "Sarah Johnson",
//         Amount: 2500.00,
//         Receipt: "https://example.com/receipts/team-event-001",
//         Actions: ["Pending Approval"],
//         created_at: new Date("2024-02-01")
//     },
//     {
//         Date: new Date("2024-02-15"),
//         Description: "Cloud Services",
//         Category: "Infrastructure",
//         Person: "Mike Brown",
//         Amount: 3500.00,
//         Receipt: "https://example.com/receipts/cloud-001",
//         Actions: ["Approved", "Paid"],
//         created_at: new Date("2024-02-15")
//     },
//     {
//         Date: new Date("2024-03-01"),
//         Description: "Training Workshop",
//         Category: "Education",
//         Person: "Lisa Chen",
//         Amount: 1800.00,
//         Receipt: "https://example.com/receipts/training-001",
//         Actions: ["Approved"],
//         created_at: new Date("2024-03-01")
//     },
//     {
//         Date: new Date("2024-03-15"),
//         Description: "Office Supplies",
//         Category: "Supplies",
//         Person: "David Wilson",
//         Amount: 500.00,
//         Receipt: "https://example.com/receipts/supplies-001",
//         Actions: ["Pending Approval"],
//         created_at: new Date("2024-03-15")
//     }
// ];


// const seedDatabase = async () => {
//     try {
//         // Clear existing data
//         await Project.deleteMany({});
//         await Expense.deleteMany({});

//         // Insert projects
//         const insertedProjects = await Project.insertMany(projects);
//         console.log('Projects seeded successfully');

//         // Add project references to expenses
//         const expensesWithProjects = expenses.map((expense, index) => ({
//             ...expense,
//             Projectid: insertedProjects[index]._id
//         }));

//         // Insert expenses
//         await Expense.insertMany(expensesWithProjects);
//         console.log('Expenses seeded successfully');

//         console.log('Database seeded successfully');
//         process.exit(0);
//     } catch (error) {
//         console.error('Error seeding database:', error);
//         process.exit(1);
//     }
// };

// seedDatabase(); 