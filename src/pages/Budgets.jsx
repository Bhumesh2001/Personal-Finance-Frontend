import { useState, useEffect } from "react";
import { getBudgets, addBudget, getBudgetSummary } from "../api";
import { Container, Table, Card, ProgressBar, Form, Button, Row, Col } from "react-bootstrap";

export default function Budgets() {
    const [summary, setSummary] = useState([]);
    const [newBudget, setNewBudget] = useState({
        category: "Food",
        amount: "",
        month: new Date().toLocaleString("default", { month: "long", year: "numeric" }) // Default: Current Month
    });

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        const res = await getBudgetSummary();
        setSummary(res.data.data);
    };

    const handleBudgetChange = (e) => {
        setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
    };

    const handleSetBudget = async (e) => {
        e.preventDefault();
        await addBudget(newBudget);
        fetchSummary();
        setNewBudget({ ...newBudget, amount: "" }); // Reset amount after adding
    };

    return (
        <Container fluid className="budgets-container">
            <h2 className="budgets-title">📊 Budget Overview</h2>

            {/* Set Budget Form */}
            <Card className="budget-card mx-3">
                <Card.Body>
                    <h5 className="text-primary">💰 Set Monthly Budget</h5>
                    <Form onSubmit={handleSetBudget} className="budget-form">
                        <Row className="g-3">
                            <Col md={4}>
                                <Form.Select
                                    name="category"
                                    value={newBudget.category}
                                    onChange={handleBudgetChange}
                                >
                                    <option>Food</option>
                                    <option>Rent</option>
                                    <option>Utilities</option>
                                    <option>Entertainment</option>
                                    <option>Others</option>
                                </Form.Select>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder="Budget Amount (₹)"
                                    value={newBudget.amount}
                                    onChange={handleBudgetChange}
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type="text"
                                    name="month"
                                    placeholder="Month (e.g., March 2024)"
                                    value={newBudget.month}
                                    onChange={handleBudgetChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Button variant="success" type="submit" className="mt-3">
                            Set Budget
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Budget Table */}
            <Card className="budget-card mx-3">
                <Card.Body>
                    <h5 className="text-primary">📜 Budget vs Spending</h5>
                    <Table striped bordered hover responsive className="budget-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Budgeted (₹)</th>
                                <th>Spent (₹)</th>
                                <th>Status</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.length > 0 ? (
                                summary.map((item) => {
                                    const percentageSpent = (item.spent / item.budgeted) * 100;
                                    return (
                                        <tr key={item.category} className="budget-row">
                                            <td>{item.category}</td>
                                            <td>₹{item.budgeted}</td>
                                            <td className="text-danger">₹{item.spent}</td>
                                            <td className={item.difference >= 0 ? "text-success" : "text-danger"}>
                                                {item.difference >= 0 ? "Under Budget" : "Over Budget"}
                                            </td>
                                            <td>
                                                <ProgressBar
                                                    now={percentageSpent}
                                                    label={`${percentageSpent.toFixed(0)}%`}
                                                    variant={percentageSpent > 100 ? "danger" : "success"}
                                                    className="progress-bar-custom"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No budget data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};
