import React, { useState, useEffect } from 'react';
import Navbar from './components/NavbarOptimized';
import Footer from './components/Footer';
import AuthButton from './components/AuthButton';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';
import ImageUpload from './components/ui/ImageUpload';

const TownhallApp = () => {
    const [user, setUser] = useState(null);
    const [isTownhall, setIsTownhall] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('sponsors');

    // Data States
    const [sponsors, setSponsors] = useState([]);
    const [events, setEvents] = useState([]);
    const [stories, setStories] = useState([]);
    const [news, setNews] = useState([]);

    // Logic to check access
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists() && userSnap.data().townhall === true) {
                        setIsTownhall(true);
                    } else {
                        setIsTownhall(false);
                    }
                } catch (error) {
                    console.error("Error verifying townhall access:", error);
                }
            } else {
                setIsTownhall(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Data Fetching
    useEffect(() => {
        if (!isTownhall) return;

        const unsubSponsors = onSnapshot(collection(db, "sponsors"), (snap) => {
            setSponsors(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        const unsubEvents = onSnapshot(collection(db, "events"), (snap) => {
            setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        const unsubStories = onSnapshot(collection(db, "stories"), (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort by date descending
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setStories(data);
        });
        const unsubNews = onSnapshot(collection(db, "news"), (snap) => {
            setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => {
            unsubSponsors();
            unsubEvents();
            unsubStories();
            unsubNews();
        };
    }, [isTownhall]);

    // Generic CRUD Actions
    const handleAdd = async (collectionName, data) => {
        try {
            await addDoc(collection(db, collectionName), data);
            alert("Added successfully!");
        } catch (e) {
            console.error("Error adding:", e);
            alert("Error adding: " + e.message);
        }
    };

    const handleDelete = async (collectionName, id) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (e) {
            console.error("Error deleting:", e);
            alert("Error deleting: " + e.message);
        }
    };

    const handleUpdate = async (collectionName, id, data) => {
        try {
            await updateDoc(doc(db, collectionName, id), data);
            alert("Updated successfully!");
        } catch (e) {
            console.error("Error updating:", e);
            alert("Error updating: " + e.message);
        }
    };

    // Render Logic
    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Access...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
                <Navbar />
                <h1 className="text-4xl font-bold">Townhall Access</h1>
                <p>Please login to verify your credentials.</p>
                <div className="scale-150"><AuthButton /></div>
            </div>
        );
    }

    if (!isTownhall) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
                <Navbar />
                <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
                <p>You do not have Townhall privileges.</p>
                <div className="scale-150"><AuthButton /></div>
                <p className="text-gray-500 text-sm mt-4">Contact admin to add 'townhall: true' to your user ID: {user.uid}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto pb-20">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
                        Townhall Admin
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">Welcome, {user.displayName}</span>
                        <AuthButton />
                    </div>
                </div>

                {/* Tags Navigation */}
                <div className="flex space-x-2 overflow-x-auto mb-8 border-b border-white/10 pb-2">
                    {['sponsors', 'events', 'stories', 'news'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-t-lg font-bold tracking-wide uppercase transition-colors ${activeTab === tab ? 'bg-white/10 text-acm-teal border-b-2 border-acm-teal' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px]">
                    {activeTab === 'sponsors' && <SponsorsManager data={sponsors} onAdd={(d) => handleAdd('sponsors', d)} onDelete={(id) => handleDelete('sponsors', id)} />}
                    {activeTab === 'events' && <EventsManager data={events} onAdd={(d) => handleAdd('events', d)} onDelete={(id) => handleDelete('events', id)} onUpdate={(id, d) => handleUpdate('events', id, d)} />}
                    {activeTab === 'stories' && <StoriesManager data={stories} onAdd={(d) => handleAdd('stories', d)} onDelete={(id) => handleDelete('stories', id)} />}
                    {activeTab === 'news' && <NewsManager data={news} onAdd={(d) => handleAdd('news', d)} onDelete={(id) => handleDelete('news', id)} />}
                </div>
            </div>
            <Footer />
        </div>
    );
};

// --- Sub-Managers ---

const SponsorsManager = ({ data, onAdd, onDelete }) => {
    const [form, setForm] = useState({ name: '', logo: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.logo) return alert("Please upload a logo.");
        onAdd(form);
        setForm({ name: '', logo: '' });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Sponsors</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-black/20 p-6 rounded-xl border border-white/5">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Sponsor Name</label>
                    <input
                        placeholder="Enter Name First"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-white focus:border-acm-teal focus:outline-none"
                        required
                    />
                    <p className="text-xs text-gray-500">Enter name strictly before uploading logo.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Sponsor Logo (Drag & Drop)</label>
                    <ImageUpload
                        folder="sponsors"
                        customName={form.name} // Pass name for filename
                        onUpload={(url) => setForm(prev => ({ ...prev, logo: url }))}
                        className={!form.name ? 'opacity-50 pointer-events-none' : ''}
                    />
                    {form.logo && <p className="text-xs text-green-400 break-all">Uploaded: {form.logo}</p>}
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-acm-teal text-black font-bold p-3 rounded-lg hover:bg-white transition flex items-center justify-center gap-2">
                        <Plus size={20} /> ADD SPONSOR
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.map(item => (
                    <div key={item.id} className="relative group bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center">
                        <button onClick={() => onDelete(item.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                        <img src={item.logo} alt={item.name} className="h-16 object-contain mb-2" />
                        <span className="text-sm font-mono truncate w-full text-center">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const EventsManager = ({ data, onAdd, onDelete, onUpdate }) => {
    const [form, setForm] = useState({ title: '', date: '', description: '', image: '', link: '', status: 'upcoming' });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            onUpdate(editingId, form);
            setEditingId(null);
        } else {
            onAdd(form);
        }
        setForm({ title: '', date: '', description: '', image: '', link: '', status: 'upcoming' });
    };

    const startEdit = (item) => {
        setForm(item);
        setEditingId(item.id);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-black/20 p-6 rounded-xl border border-white/5">
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />
                <input placeholder="Date (e.g. Oct 2025)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />

                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white">
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                </select>

                <input placeholder="Event Link (https://...)" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" />

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm text-gray-400">Event Image</label>
                    <ImageUpload
                        folder="images/events"
                        onUpload={(url) => setForm(prev => ({ ...prev, image: url }))}
                    />
                    {form.image && <p className="text-xs text-green-400 break-all">Uploaded: {form.image}</p>}
                </div>

                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white md:col-span-2 h-24" required />

                <div className="flex gap-2 md:col-span-2">
                    <button type="submit" className="flex-1 bg-acm-teal text-black font-bold p-3 rounded-lg hover:bg-white transition">{editingId ? 'UPDATE EVENT' : 'ADD EVENT'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', date: '', description: '', image: '', link: '', status: 'upcoming' }) }} className="bg-red-500 text-white p-3 rounded-lg"><X /></button>}
                </div>
            </form>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 gap-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded bg-white/10" />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.date} • {item.status}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => startEdit(item)} className="p-2 bg-blue-600/50 rounded hover:bg-blue-600"><Edit2 size={16} /></button>
                            <button onClick={() => onDelete(item.id)} className="p-2 bg-red-600/50 rounded hover:bg-red-600"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const StoriesManager = ({ data, onAdd, onDelete }) => {
    const [form, setForm] = useState({ title: '', description: '', iconName: 'Users', chapters: [], image: '', link: '', date: '' });

    const handleChapterChange = (chapter) => {
        if (form.chapters.includes(chapter)) {
            setForm({ ...form, chapters: form.chapters.filter(c => c !== chapter) });
        } else {
            setForm({ ...form, chapters: [...form.chapters, chapter] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm({ title: '', description: '', iconName: 'Users', chapters: [], image: '', link: '', date: '' });
    };

    const chaptersList = ['acm-mitb', 'sigai', 'sigsoft', 'acm-w'];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage Moments / Stories</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-black/20 p-6 rounded-xl border border-white/5">
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />

                <input placeholder="Date (e.g., Fri Jan 17 2025)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />

                <input placeholder="Link (https://...)" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" />

                <div className="md:col-span-1 space-y-2">
                    <label className="text-sm text-gray-400">Moment Image (Optional)</label>
                    <ImageUpload
                        folder="images/stories"
                        onUpload={(url) => setForm(prev => ({ ...prev, image: url }))}
                    />
                    {form.image && <p className="text-xs text-green-400 break-all">Uploaded: {form.image}</p>}
                </div>

                <select value={form.iconName} onChange={e => setForm({ ...form, iconName: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white">
                    <option value="Users">Users (Community)</option>
                    <option value="Lightbulb">Lightbulb (Learn)</option>
                    <option value="Target">Target (Industry)</option>
                </select>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm text-gray-400">Chapters (Select at least one)</label>
                    <div className="flex gap-4 flex-wrap">
                        {chaptersList.map(chap => (
                            <label key={chap} className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                                <input
                                    type="checkbox"
                                    checked={form.chapters.includes(chap)}
                                    onChange={() => handleChapterChange(chap)}
                                    className="rounded border-gray-600 text-acm-teal focus:ring-acm-teal"
                                />
                                <span className="text-sm uppercase tracking-wider">{chap}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white md:col-span-2 h-24" required />
                <button type="submit" disabled={form.chapters.length === 0} className="bg-acm-teal text-black font-bold p-3 rounded-lg hover:bg-white transition md:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed">ADD MOMENT</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map(item => (
                    <div key={item.id} className="relative group bg-white/5 p-6 rounded-xl border border-white/10">
                        <button onClick={() => onDelete(item.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                        )}
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                        {item.date && <p className="text-xs text-gray-500 mb-2">Date: {item.date}</p>}
                        {item.link && <p className="text-xs text-blue-400 mb-2 break-all">Link: {item.link}</p>}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.chapters && item.chapters.map(c => (
                                <span key={c} className="text-xs font-mono bg-blue-900/40 text-blue-300 px-2 py-1 rounded">{c}</span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-600 mt-2 block">Icon: {item.iconName}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const NewsManager = ({ data, onAdd, onDelete }) => {
    const [form, setForm] = useState({ title: '', excerpt: '', date: '', category: '', image: '', author: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm({ title: '', excerpt: '', date: '', category: '', image: '', author: '' });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Manage News</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-black/20 p-6 rounded-xl border border-white/5">
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />
                <input placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />
                <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />
                <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white" required />

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm text-gray-400">Article Image</label>
                    <ImageUpload
                        folder="images/news"
                        onUpload={(url) => setForm(prev => ({ ...prev, image: url }))}
                    />
                    {form.image && <p className="text-xs text-green-400 break-all">Uploaded: {form.image}</p>}
                </div>

                <textarea placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="bg-black/40 border border-white/10 p-3 rounded-lg text-white md:col-span-2 h-24" required />
                <button type="submit" className="bg-acm-teal text-black font-bold p-3 rounded-lg hover:bg-white transition md:col-span-2">ADD NEWS</button>
            </form>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.id} className="flex items-start justify-between bg-white/5 p-4 rounded-xl border border-white/10 gap-4">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded bg-white/10" />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.date} | {item.category}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.excerpt}</p>
                        </div>
                        <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={20} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TownhallApp;
