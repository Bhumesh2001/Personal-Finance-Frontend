import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function TransactionForm({ onSubmit }) {
    const [transaction, setTransaction] = useState({
        amount: "",
        date: "",
        description: "",
        category: "Food",
    });

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transaction.amount && transaction.date && transaction.description) {
            onSubmit(transaction);
            setTransaction({ amount: "", date: "", description: "", category: "Food" });
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="transaction-form">
            <Row className="g-3">
                <Col md={3}>
                    <Form.Floating>
                        <Form.Control
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={transaction.amount}
                            onChange={handleChange}
                            required
                        />
                        <label>Amount (₹)</label>
                    </Form.Floating>
                </Col>
                <Col md={3}>
                    <Form.Floating>
                        <Form.Control
                            type="date"
                            name="date"
                            value={transaction.date}
                            onChange={handleChange}
                            required
                        />
                        <label>Date</label>
                    </Form.Floating>
                </Col>
                <Col md={3}>
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={transaction.description}
                            onChange={handleChange}
                            required
                        />
                        <label>Description</label>
                    </Form.Floating>
                </Col>
                <Col md={3}>
                    <Form.Select name="category" value={transaction.category} onChange={handleChange}>
                        <option>Food</option>
                        <option>Rent</option>
                        <option>Utilities</option>
                        <option>Entertainment</option>
                        <option>Others</option>
                    </Form.Select>
                </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
                Add Transaction
            </Button>
        </Form>
    );
};
