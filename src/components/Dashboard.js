import { Box, Card, CardContent, Grid, Paper, Table, TableHead, TableRow, TableCell, TextField, Typography, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, FormControl, InputLabel, MenuItem, Select, LinearProgress } from '@mui/material';
import React, { useState } from 'react'
import Chart from 'react-google-charts';
import { Bar, Line, Pie } from 'react-chartjs-2';

import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
// Salesforce Authentication Setup

const Dashboard = () => {
    // Dummy Data
    const salesData = [
        ["Month", "Sales"],
        ["Jan", 1000],
        ["Feb", 15000],
        ["Mar", 20000],
        ["Apr", 25000],
    ];

    const leadsData = [
        { name: "New Leads", value: 30 },
        { name: "Converted", value: 10 },
        { name: "Opportunities", value: 5 },
    ];

    const recentInteractions = [
        { customer: "John Doe", activity: "Meeting Scheduled", date: "2024-11-22" },
        { customer: "Jane Smith", activity: "Follow-up Call", date: "2024-11-23" },
        { customer: "Acme Corp.", activity: "Proposal Sent", date: "2024-11-24" },
    ];

    const [customers, setCustomers] = useState([
        {
            id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", notes: "VIP Customer",
            interactions: [
                { type: "Call", date: "2024-11-22", details: "Discussed project scope." },
                { type: "Email", date: "2024-11-23", details: "Sent proposal." },
            ],
        },
        {
            id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", notes: "Interested in upgrades",
            interactions: [{ type: "Meeting", date: "2024-11-24", details: "Product demo." }],
        },
    ]);

    const [leads, setLeads] = useState([
        { id: 1, name: "Acme Corp", stage: "Initial Contact", rep: "John Doe", lastUpdated: "2024-11-20" },
        { id: 2, name: "Tech Solutions", stage: "Negotiation", rep: "Jane Smith", lastUpdated: "2024-11-22" },
    ]);

    const [tasks, setTasks] = useState([
        { id: 1, name: "Prepare Proposal", assignedTo: "John Doe", deadline: "2024-11-26", progress: 50 },
        { id: 2, name: "Follow up with Tech Solutions", assignedTo: "Jane Smith", deadline: "2024-11-27", progress: 20 },
    ]);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [teamMembers] = useState([
        { id: 1, name: "John Doe", role: "Manager" },
        { id: 2, name: "Jane Smith", role: "Sales Representative" },
    ]);

    const [roles] = useState(["Manager", "Sales Representative", "Analyst"]);

    const [customerSatisfaction, setCustomerSatisfaction] = useState({
        satisfied: 80,
        neutral: 15,
        unsatisfied: 5,

    });

    const [salesPerformance, setSalesPerformance] = useState({
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        sales: [12000, 15000, 10000, 18000, 14000, 16000],
    });

    // Chart Data for Sales Performance
    const salesChartData = {
        labels: salesPerformance.months,
        datasets: [
            {
                label: "Monthly Sales ($)",
                data: salesPerformance.sales,
                backgroundColor: "#42a5f5",
            },
        ],
    };

    // Chart Data for customer Satisfaction
    const satisfactionChartData = {
        labels: ["Satisfied", "Neutral", "Unsatisfied"],
        datasets: [
            {
                label: "Customer Satisfaction",
                data: [
                    customerSatisfaction.satisfied,
                    customerSatisfaction.neutral,
                    customerSatisfaction.unsatisfied,
                ],
                backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
            },
        ],
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: comments.length + 1, text: newComment }]);
            setNewComment("");
        }
    };

    const [newTask, setNewTask] = useState({
        name: "",
        assignedTo: "",
        deadline: "",
        progress: 0,
    });

    const stages = ["Initial Contact", "Qualification", "Proposal", "Negotiation", "Closed"];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", notes: "" });
    /*const [newInteraction, setNewInteraction] = useState({
        type: "",
        date: "",
        details: "",
    });*/

    const [newLead, setNewLead] = useState({
        name: "",
        stage: "Initial Contact",
        rep: "",
    });

    // Search and Filter
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add New Task
    const handleAddTask = () => {
        setTasks([
            ...tasks,
            { id: tasks.length + 1, ...newTask, progress: 0 },
        ]);
        setNewTask({ name: "", assignedTo: "", deadline: "", progress: 0 });
        setTaskDialogOpen(false);
    }

    //Add New Interaction
    /*const handleAddInteraction = () => {
        if (selectedCustomer && newInteraction.type && newInteraction.date && newInteraction.details) {
            setCustomers((prevCustomers) => 
            prevCustomers.map((customer) => 
            customer.id === selectedCustomer.id
        ? {
            ...customer,
            interactions: [...customer.interactions, newInteraction],
        }
        : customer
        )
            );
            setNewInteraction({ type: "", date: "", details: ""});
        }
    };*/

    // Add New Lead
    const handleAddLead = () => {
        setLeads([
            ...leads,
            { id: leads.length + 1, ...newLead, lastUpdated: new Date().toISOString().split("T")[0] },
        ]);
        setNewLead({ name: "", stage: "Initial Contact", rep: "" });
        setDialogOpen(false)
    }

    // CRUD Operations
    const handleAddCustomer = () => {
        setCustomers([
            ...customers,
            { id: customers.length + 1, ...newCustomer },
        ]);
        setNewCustomer({ name: "", email: "", phone: "", notes: "" });
        setDialogOpen(false);
    };

    const handleDeleteCustomer = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <Box sx={{ padding: "16px", backgroundColor: "#f4f5f7" }}>
            <Typography variant='h4' sx={{ marginBottom: "16px" }}>
                CRM Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Sales Stats */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Sales Stats
                            </Typography>
                            <Chart
                                chartType='LineChart'
                                data={salesData}
                                width="100%"
                                height="250px"
                                options={{ title: "Monthly Sales", curveType: "function" }}
                            />
                            <Box sx={{ height: "250px", textAlign: "center", padding: "16px", border: "1px dashed #ddd" }}>
                                Sales Stats Chart Placeholder
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Leads Overview */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Leads Overview
                            </Typography>
                            <Grid container spacing={2}>
                                {leadsData.map((item, index) => (
                                    <Grid item xs={4} key={index}>
                                        <Paper
                                            sx={{
                                                textAlign: "center",
                                                padding: "16px",
                                                backgroundColor: "#e3f2fd",
                                            }}
                                        >
                                            <Typography variant='h5'>{item.value}</Typography>
                                            <Typography variant='subtitle1'>{item.name}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lead Management */}
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Lead Management
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Lead Name</TableCell>
                                        <TableCell>Stage</TableCell>
                                        <TableCell>Sales Representative</TableCell>
                                        <TableCell>Last Updated</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leads.map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell>{lead.name}</TableCell>
                                            <TableCell>{lead.stage}</TableCell>
                                            <TableCell>{lead.rep}</TableCell>
                                            <TableCell>{lead.lastUpdated}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => setSelectedLead(lead)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: "16px" }}
                                onClick={() => setDialogOpen(true)}
                            >
                                Add New Lead
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Add Lead Dialog */}
                <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Lead Name"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newLead.name}
                            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                        />
                        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                            <InputLabel>Stage</InputLabel>
                            <Select
                                value={newLead.stage}
                                onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })}
                            >
                                {stages.map((stage) => (
                                    <MenuItem key={stage} value={stage}>
                                        {stage}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Sales Representative"
                            variant="outlined"
                            fullWidth
                            value={newLead.rep}
                            onChange={(e) => setNewLead({ ...newLead, rep: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddLead} color="primary">
                            Add
                        </Button>
                        <Button onClick={() => setDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Reporting & Analytics */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Sales Performance
                            </Typography>
                            <Bar data={salesChartData} options={{ responsive: true }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Customer Satisfaction
                            </Typography>
                            <Pie data={satisfactionChartData} options={{ responsive: true }} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Task Management */}
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Task Management
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task</TableCell>
                                        <TableCell>Assigned To</TableCell>
                                        <TableCell>Deadline</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.assignedTo}</TableCell>
                                            <TableCell>{task.deadline}</TableCell>
                                            <TableCell>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={task.progress}
                                                    sx={{ width: "100%" }}
                                                />
                                                {task.progress}%
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => alert(`View details for task: ${task.name}`)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: "16px" }}
                                onClick={() => setTaskDialogOpen(true)}
                            >
                                Add New Task
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Team Collaboration */}
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Team Collaboration
                            </Typography>
                            <Typography variant="subtitle1">Team Members</Typography>
                            <List>
                                {teamMembers.map((member) => (
                                    <ListItem key={member.id}>
                                        <ListItemText primary={member.name} secondary={`Role: ${member.role}`} />
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="subtitle1" sx={{ marginTop: "16px" }}>
                                Comments
                            </Typography>
                            <List>
                                {comments.map((comment) => (
                                    <ListItem key={comment.id}>
                                        <ListItemText primary={comment.text} />
                                    </ListItem>
                                ))}
                            </List>
                            <TextField
                                label="Add a comment"
                                variant="outlined"
                                fullWidth
                                sx={{ marginTop: "8px" }}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: "8px" }}
                                onClick={handleAddComment}
                            >
                                Add Comment
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add Task Dialog */}
                <Dialog open={isTaskDialogOpen} onClose={() => setTaskDialogOpen(false)}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        />
                        <TextField
                            label="Assigned To"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newTask.assignedTo}
                            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                        />
                        <TextField
                            label="Deadline"
                            variant="outlined"
                            type="date"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            InputLabelProps={{ shrink: true }}
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddTask} color="primary">
                            Add
                        </Button>
                        <Button onClick={() => setTaskDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Customer ManageMent */}
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Customer Management
                            </Typography>
                            {/* Search and Filter */}
                            <Box sx={{ marginBottom: "16px" }}>
                                <TextField
                                    label="Search Customers"
                                    variant='outlined'
                                    fullWidth
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                            {/* Customer Table */}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant='outlined'
                                                    color='primary'
                                                    onClick={() => setSelectedCustomer(customer)}
                                                >
                                                    View
                                                </Button>{" "}
                                                <Button
                                                    variant='outlined'
                                                    color='secondary'
                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ marginTop: "16px" }}
                                onClick={() => setDialogOpen(true)}
                            >
                                Add New Customer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Customer Details Dialog */}
                <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)}>
                    <DialogTitle>Customer Details</DialogTitle>
                    <DialogContent>
                        {selectedCustomer && (
                            <Box>
                                <Typography variant='body1'>
                                    <strong>Name:</strong> {selectedCustomer.name}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Email:</strong> {selectedCustomer.email}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Phone:</strong> {selectedCustomer.phone}
                                </Typography>
                                <Typography variant='body1'>
                                    <strong>Notes:</strong> {selectedCustomer.notes}
                                </Typography>
                                <Typography variant='h6' sx={{ marginTop: "16px" }}>
                                    Activity TimeLine
                                </Typography>
                                <List>
                                    {selectedCustomer.interactions.map((interaction, index) => (
                                        <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                                            <ListItemText
                                                primary={`${interaction.type} - ${interaction.date}`}
                                                secondary={interaction.details}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedCustomer(null)} color='primary'>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>



                {/* Add Customer Dialog */}
                <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                        <TextField
                            label="Email"
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newCustomer.email}
                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        />
                        <TextField
                            label="Phone"
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newCustomer.phone}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        />
                        <TextField
                            label="Notes"
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            value={newCustomer.notes}
                            onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddCustomer} color='primary'>
                            Add
                        </Button>
                        <Button onClick={() => setDialogOpen(false)} color='secondary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/*Add Interaction Dialog*/}
                {/*<Dialog open={!!selectedCustomer}>
                    <DialogTitle>Add Interaction</DialogTitle>
                    <DialogContent>
                        <TextField
                        label="Interaction Type (e.g., Call, Email, meeting)"
                        variant='outlined'
                        fullWidth
                        sx={{ marginBottom: "16px" }}
                        value={newInteraction.type}
                        onChange={(e) => setNewInteraction({ ...newInteraction, type: e.target.value})}
                        />
                        <TextField
                        label="Date"
                        variant='outlined'
                        type='date'
                        fullWidth
                        sx={{ marginBottom: "16px" }}
                        InputLabelProps={{ shrink: true }}
                        value={newInteraction.date}
                        onChange={(e) => setNewInteraction({ ...newInteraction, date: e.target.value})}
                        />
                        <TextField
                        label="Details"
                        variant='outlined'
                        fullWidth
                        sx={{ marginBottom: "16px" }}
                        value={newInteraction.date}
                        onChange={(e) => setNewInteraction({ ...newInteraction, details: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddInteraction} color='primary'>
                            Add
                        </Button>
                        <Button onClick={() => setSelectedCustomer(null)} color='secondary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>*/}

                {/*Recent Interactions */}
                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: "#ffffff" }}>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Recent Interactions
                            </Typography>
                            <Paper>
                                <Box sx={{ padding: "16px" }}>
                                    {recentInteractions.map((interaction, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "8px",
                                                padding: "8px",
                                                borderBottom: "1px solid #ddd",
                                            }}
                                        >
                                            <Typography variant='body1'>
                                                {interaction.customer}
                                            </Typography>
                                            <Typography variant='body2'>{interaction.activity}</Typography>
                                            <Typography variant='body3'>{interaction.date}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;