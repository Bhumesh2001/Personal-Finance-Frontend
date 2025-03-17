import { useState, useEffect } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../api";
import { Container, Table, Button, Card, Modal, Form } from "react-bootstrap";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState({
        _id: "",
        amount: "",
        date: "",
        description: "",
        category: "Food",
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const res = await getTransactions();
        setTransactions(res.data.data);
    };

    const handleAddTransaction = async (transaction) => {
        await addTransaction(transaction);
        fetchTransactions();
    };

    const handleEditClick = (transaction) => {
        setCurrentTransaction(transaction);
        setShowEditModal(true);
    };

    const handleUpdateTransaction = async () => {
        await updateTransaction(currentTransaction._id, currentTransaction);
        setShowEditModal(false);
        fetchTransactions();
    };

    const handleDeleteTransaction = async (id) => {
        await deleteTransaction(id);
        fetchTransactions();
    };

    return (
        <Container fluid className="transactions-container">
            <h2 className="transactions-title">📒 Manage Transactions</h2>

            {/* Styled Card for Transaction Form */}
            <Card className="transaction-card mx-3">
                <Card.Body>
                    <h5 className="text-primary">➕ Add New Transaction</h5>
                    <TransactionForm onSubmit={handleAddTransaction} />
                </Card.Body>
            </Card>

            {/* Styled Card for Transactions Table */}
            <Card className="transaction-table-card mx-3">
                <Card.Body>
                    <h5 className="text-primary">📜 Transaction History</h5>
                    <Table striped bordered hover responsive className="transaction-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((txn) => (
                                    <tr key={txn._id} className="transaction-row">
                                        <td>{txn.description}</td>
                                        <td className="text-danger">₹{txn.amount}</td>
                                        <td>{txn.category}</td>
                                        <td>{new Date(txn.date).toLocaleDateString()}</td>
                                        <td>
                                            <Button variant="info" size="sm" className="me-2" onClick={() => handleEditClick(txn)}>
                                                ✏ Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteTransaction(txn._id)}>
                                                ❌ Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Edit Transaction Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>✏ Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={currentTransaction.amount}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={currentTransaction.date}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, date: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={currentTransaction.description}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={currentTransaction.category}
                                onChange={(e) => setCurrentTransaction({ ...currentTransaction, category: e.target.value })}
                            >
                                <option>Food</option>
                                <option>Rent</option>
                                <option>Utilities</option>
                                <option>Entertainment</option>
                                <option>Others</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTransaction}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
