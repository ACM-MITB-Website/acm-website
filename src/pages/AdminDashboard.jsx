import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AuthButton from '../components/AuthButton';
import Toast from '../components/Toast';
import { Trash2, Plus, Edit, Save, X, Loader2, Database, LogOut, User } from 'lucide-react';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('team_mitb');
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState({});
    const [isEditing, setIsEditing] = useState(null);
    const [toast, setToast] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

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

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    const handleFirestoreError = (error) => {
        console.error("Firestore Error:", error);
        if (error.code === 'permission-denied') {
            showToast("Permission Denied. Check Firestore Rules.", "error");
        } else if (error.code === 'not-found' || error.message.includes("NOT_FOUND")) {
            showToast("Database not found. Please create it in Firebase Console.", "error");
        } else {
            showToast(`Error: ${error.message}`, "error");
        }
    };

    const fetchData = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(items);
        } catch (error) {
            handleFirestoreError(error);
        }
    };

    const handleAdd = async () => {
        if (Object.keys(newItem).length === 0) {
            showToast("Please fill in the fields.", "error");
            return;
        }
        setActionLoading(true);
        try {
            await addDoc(collection(db, activeTab), newItem);
            showToast("Item added successfully!", "success");
            setNewItem({});
            fetchData(activeTab);
        } catch (error) {
            handleFirestoreError(error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await deleteDoc(doc(db, activeTab, id));
            showToast("Item deleted successfully.", "success");
            fetchData(activeTab);
        } catch (error) {
            handleFirestoreError(error);
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("This will add initial data to the database. Continue?")) return;
        setActionLoading(true);

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
            showToast("Seeding complete!", "success");
            fetchData('team_mitb');
        } catch (error) {
            handleFirestoreError(error);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Database className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
                    <p className="text-gray-400 mb-8">Sign in to manage ACM Website content</p>
                    <AuthButton />
                </div>
            </div>
        );
    }

    const collections = [
        { id: 'team_mitb', label: 'ACM MITB Team' },
        { id: 'events_mitb', label: 'ACM MITB Events' },
        { id: 'team_sigai', label: 'SIGAI Team' },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 font-sans">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Database className="w-6 h-6 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSeed}
                            disabled={actionLoading}
                            className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-all disabled:opacity-50 text-sm font-medium"
                        >
                            {actionLoading ? 'Seeding...' : 'Seed Data'}
                        </button>

                        <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{user.email}</span>
                        </div>

                        <button
                            onClick={() => signOut(auth)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {collections.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all font-medium text-sm ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add New Item Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-8">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-blue-500" />
                                Add New Item
                            </h2>

                            <div className="space-y-4">
                                {activeTab.includes('team') ? (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Name</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.name || ''}
                                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Role</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.role || ''}
                                                onChange={e => setNewItem({ ...newItem, role: e.target.value })}
                                                placeholder="e.g. President"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Image URL</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.image || ''}
                                                onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LinkedIn</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.linkedin || ''}
                                                onChange={e => setNewItem({ ...newItem, linkedin: e.target.value })}
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Title</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.title || ''}
                                                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                                placeholder="e.g. Hackathon 2024"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Date</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.date || ''}
                                                onChange={e => setNewItem({ ...newItem, date: e.target.value })}
                                                placeholder="e.g. Oct 2024"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Status</label>
                                            <select
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-300"
                                                value={newItem.status || ''}
                                                onChange={e => setNewItem({ ...newItem, status: e.target.value })}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="upcoming">Upcoming</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Type</label>
                                            <input
                                                className="w-full bg-gray-950 border border-gray-800 p-3 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                                value={newItem.type || ''}
                                                onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                                                placeholder="e.g. Competition"
                                            />
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={handleAdd}
                                    disabled={actionLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                    {actionLoading ? 'Adding...' : 'Add Item'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* List Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-800">
                                <h2 className="text-lg font-semibold">
                                    Current Items <span className="text-gray-500 text-sm font-normal ml-2">({data.length})</span>
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                                {data.map(item => (
                                    <div key={item.id} className="p-4 hover:bg-gray-800/50 transition-colors flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                            {activeTab.includes('team') && item.image && (
                                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                                            )}
                                            <div>
                                                {activeTab.includes('team') ? (
                                                    <>
                                                        <h3 className="font-medium text-gray-200">{item.name}</h3>
                                                        <p className="text-sm text-gray-500">{item.role}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="font-medium text-gray-200">{item.title}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                                                }`}>
                                                                {item.status}
                                                            </span>
                                                            <span className="text-xs text-gray-500">• {item.date}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                {data.length === 0 && (
                                    <div className="p-12 text-center text-gray-500">
                                        <Database className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No items found in this collection.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
