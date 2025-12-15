import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const COURSES = [
    "Computer Science & Engineering (Core)",
    "Artificial Intelligence & Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Electronics & Computer Engineering",
    "VLSI Design & Technology"
];

const ProfileCompletion = ({ user, onComplete }) => {
    const [formData, setFormData] = useState({
        name: user.displayName || '',
        regNo: '',
        studentEmail: '',
        year: '',
        course: COURSES[0],
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validateRegNo = (regNo) => {
        if (!/^\d{9}$/.test(regNo)) return "Registration Number must be 9 digits.";

        const prefix = parseInt(regNo.substring(0, 2));
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // 0-11. May is 4.

        const validPrefixes = [22, 23, 24, 25];
        if (currentYear > 2026 || (currentYear === 2026 && currentMonth >= 4)) validPrefixes.push(26);
        if (currentYear > 2027 || (currentYear === 2027 && currentMonth >= 4)) validPrefixes.push(27);

        if (!validPrefixes.includes(prefix)) {
            return `Invalid Year Prefix. Allowed: ${validPrefixes.join(', ')}`;
        }
        return null;
    };

    const validateStudentEmail = (email) => {
        // Structure: name.mitblr(year)@learner.manipal.edu
        // Regex: something.mitblr20XX@learner.manipal.edu
        // Note: The user said "name.mitblr(year of join)". Assuming year of join is 2022, 2023 etc.
        const regex = /^[a-zA-Z0-9.]+@learner\.manipal\.edu$/;
        if (!regex.test(email)) return "Must be a valid @learner.manipal.edu email.";

        if (!email.includes(".mitblr20")) return "Email format should be name.mitblrYYYY@learner.manipal.edu";

        return null;
    };

    const checkUniqueness = async () => {
        const usersRef = collection(db, "users");

        // Check RegNo
        const regQuery = query(usersRef, where("regNo", "==", formData.regNo));
        const regSnap = await getDocs(regQuery);
        if (!regSnap.empty) return "Registration Number already registered.";

        // Check Phone
        const phoneQuery = query(usersRef, where("phone", "==", formData.phone));
        const phoneSnap = await getDocs(phoneQuery);
        if (!phoneSnap.empty) return "Phone Number already registered.";

        // Check Student Email
        const emailQuery = query(usersRef, where("studentEmail", "==", formData.studentEmail));
        const emailSnap = await getDocs(emailQuery);
        if (!emailSnap.empty) return "Student Email already registered.";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Local Validation
            const regError = validateRegNo(formData.regNo);
            if (regError) throw new Error(regError);

            const emailError = validateStudentEmail(formData.studentEmail);
            if (emailError) throw new Error(emailError);

            if (!formData.year) throw new Error("Please select your year.");
            if (!formData.phone || formData.phone.length < 10) throw new Error("Please enter a valid phone number.");

            // Database Uniqueness Check
            const uniqueError = await checkUniqueness();
            if (uniqueError) throw new Error(uniqueError);

            // Save to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                authEmail: user.email,
                name: formData.name,
                regNo: formData.regNo,
                studentEmail: formData.studentEmail,
                year: formData.year,
                course: formData.course,
                phone: formData.phone,
                townhall: false, // Default
                createdAt: new Date()
            });

            onComplete(); // Callback to parent to close modal/refresh state

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
                    <p className="text-gray-400 text-sm mt-1">Please provide your details to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-mono text-gray-400 mb-1">FULL NAME</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-1">REGISTRATION NO.</label>
                            <input
                                type="text"
                                placeholder="2XXXXXXXX"
                                value={formData.regNo}
                                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                                maxLength={9}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-1">ACADEMIC YEAR</label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="" className="text-black">Select Year</option>
                                <option value="1" className="text-black">1st Year</option>
                                <option value="2" className="text-black">2nd Year</option>
                                <option value="3" className="text-black">3rd Year</option>
                                <option value="4" className="text-black">4th Year</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-gray-400 mb-1">STUDENT EMAIL</label>
                        <input
                            type="email"
                            placeholder="name.mitblr20XX@learner.manipal.edu"
                            value={formData.studentEmail}
                            onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-gray-400 mb-1">COURSE / BRANCH</label>
                        <select
                            value={formData.course}
                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        >
                            {COURSES.map(c => (
                                <option key={c} value={c} className="text-black">{c}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-gray-400 mb-1">PHONE NUMBER</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={20} /> COMPLETE REGISTRATION</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletion;
