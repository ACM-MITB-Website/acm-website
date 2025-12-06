import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AuthButton from '../components/AuthButton';
import { Trash2, Plus, Edit, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('team_mitb');
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState({});
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            fetchData(activeTab);
        }
    }, [user, activeTab]);

    const fetchData = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(items);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert(`Error fetching data: ${error.message}. Check console for details.`);
        }
    };

    const handleAdd = async () => {
        try {
            await addDoc(collection(db, activeTab), newItem);
            setNewItem({});
            fetchData(activeTab);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert(`Error adding item: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteDoc(doc(db, activeTab, id));
                fetchData(activeTab);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await updateDoc(doc(db, activeTab, id), updatedData);
            setIsEditing(null);
            fetchData(activeTab);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("This will add initial data to the database. Continue?")) return;

        const initialTeam = [
            { name: 'Gururaj H.L.', role: 'President', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gururaj', linkedin: '#' },
            { name: 'Shreyas J', role: 'Vice President', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shreyas', linkedin: '#' },
            { name: 'Shivansh Gautam', role: 'Technical Lead', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shivansh', linkedin: '#' },
            { name: 'Medha Udupa', role: 'Events Coordinator', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Medha', linkedin: '#' },
            { name: 'S. P. Bharath', role: 'Treasurer', image: '/assets/sp-bharath.jpg', linkedin: '#' },
            { name: 'Ryan', role: 'Marketing Head', image: '/assets/ryan.jpg', linkedin: '#' },
            { name: 'Saanvie', role: 'Design Lead', image: '/assets/saanvie.jpg', linkedin: '#' },
        ];

        const initialEvents = [
            { date: 'Aug 2024', title: 'Orientation', status: 'completed', type: 'Event' },
            { date: 'Sep 2024', title: 'Tech Talk', status: 'completed', type: 'Seminar' },
            { date: 'Oct 2024', title: 'Hackathon', status: 'completed', type: 'Competition' },
            { date: 'Jan 2025', title: 'Code Sprint', status: 'upcoming', type: 'Contest' },
            { date: 'Apr 2025', title: 'Annual Expo', status: 'upcoming', type: 'Exhibition' },
        ];

        try {
            for (const member of initialTeam) {
                await addDoc(collection(db, 'team_mitb'), member);
            }
            for (const event of initialEvents) {
                await addDoc(collection(db, 'events_mitb'), event);
            }
            alert("Seeding complete!");
            fetchData('team_mitb');
        } catch (error) {
            console.error("Error seeding data: ", error);
            alert(`Error seeding data: ${error.message}`);
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-8">Admin Access Required</h1>
                <AuthButton />
            </div>
        );
    }

    const collections = [
        { id: 'team_mitb', label: 'ACM MITB Team' },
        { id: 'events_mitb', label: 'ACM MITB Events' },
        { id: 'team_sigai', label: 'SIGAI Team' },
        // Add more as needed
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={handleSeed} className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700">Seed Data</button>
                        <span>{user.email}</span>
                        <button onClick={() => signOut(auth)} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
                    </div>
                </div>

                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {collections.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Manage {collections.find(c => c.id === activeTab)?.label}</h2>

                    {/* Add New Item Form - Simplified for generic use, can be customized per collection */}
                    <div className="mb-8 p-4 bg-gray-700 rounded">
                        <h3 className="text-lg mb-2">Add New Item</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {activeTab.includes('team') ? (
                                <>
                                    <input placeholder="Name" className="bg-gray-600 p-2 rounded" value={newItem.name || ''} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                                    <input placeholder="Role" className="bg-gray-600 p-2 rounded" value={newItem.role || ''} onChange={e => setNewItem({ ...newItem, role: e.target.value })} />
                                    <input placeholder="Image URL" className="bg-gray-600 p-2 rounded" value={newItem.image || ''} onChange={e => setNewItem({ ...newItem, image: e.target.value })} />
                                    <input placeholder="LinkedIn URL" className="bg-gray-600 p-2 rounded" value={newItem.linkedin || ''} onChange={e => setNewItem({ ...newItem, linkedin: e.target.value })} />
                                </>
                            ) : (
                                <>
                                    <input placeholder="Title" className="bg-gray-600 p-2 rounded" value={newItem.title || ''} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
                                    <input placeholder="Date" className="bg-gray-600 p-2 rounded" value={newItem.date || ''} onChange={e => setNewItem({ ...newItem, date: e.target.value })} />
                                    <input placeholder="Status (completed/upcoming)" className="bg-gray-600 p-2 rounded" value={newItem.status || ''} onChange={e => setNewItem({ ...newItem, status: e.target.value })} />
                                    <input placeholder="Type" className="bg-gray-600 p-2 rounded" value={newItem.type || ''} onChange={e => setNewItem({ ...newItem, type: e.target.value })} />
                                </>
                            )}
                        </div>
                        <button onClick={handleAdd} className="bg-green-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
                            <Plus size={18} /> Add Item
                        </button>
                    </div>

                    {/* List Items */}
                    <div className="space-y-4">
                        {data.map(item => (
                            <div key={item.id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                                <div>
                                    {activeTab.includes('team') ? (
                                        <>
                                            <h3 className="font-bold">{item.name}</h3>
                                            <p className="text-gray-400">{item.role}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="font-bold">{item.title}</h3>
                                            <p className="text-gray-400">{item.date} - {item.status}</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-2">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {data.length === 0 && <p className="text-gray-500 text-center">No items found.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
