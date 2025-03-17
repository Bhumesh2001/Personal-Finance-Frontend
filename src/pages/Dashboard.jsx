import { useState, useEffect } from "react";
import { getTransactions } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const categories = ["Food", "Rent", "Utilities", "Entertainment", "Others"];
    const colors = ["#6a67ce", "#ff6b6b", "#ff9f43", "#54a0ff", "#1dd1a1"];

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const res = await getTransactions();
        setTransactions(res.data.data);
    };

    const categoryWiseData = categories.map((cat, index) => ({
        name: cat,
        value: transactions.filter((txn) => txn.category === cat).reduce((sum, txn) => sum + txn.amount, 0),
        color: colors[index],
    }));

    const totalSpent = transactions.reduce((sum, txn) => sum + txn.amount, 0);

    return (
        <Container fluid className="dashboard-container">
            <h2 className="dashboard-title">📊 Finance Dashboard</h2>

            <Row className="mb-4 mx-2">
                <Col md={6} lg={3} className="mb-md-0 mb-4">
                    <Card className="summary-card">
                        <Card.Body>
                            <h5>Total Expenses</h5>
                            <h3 className="text-danger">₹{totalSpent.toLocaleString()}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="summary-card">
                        <Card.Body>
                            <h5>Categories Tracked</h5>
                            <h3>{categories.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="gy-4 mx-2">
                <Col md={6}>
                    <Card className="chart-card">
                        <Card.Body>
                            <h5 className="text-primary">📈 Monthly Expenses</h5>
                            <BarChart width={400} height={300} data={categoryWiseData}>
                                <XAxis dataKey="name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip />
                                <Bar dataKey="value" fill="rgba(255,99,132,0.8)" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="chart-card">
                        <Card.Body>
                            <h5 className="text-primary">📊 Category Breakdown</h5>
                            <PieChart width={400} height={300}>
                                <Pie data={categoryWiseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                                    {categoryWiseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
