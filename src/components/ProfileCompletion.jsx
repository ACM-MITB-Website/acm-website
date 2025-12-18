import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const DEPARTMENTS = [
    { value: "CSE Core", label: "Computer Science & Engineering (Core)" },
    { value: "AI", label: "Artificial Intelligence & Machine Learning" },
    { value: "DS", label: "Data Science" },
    { value: "Cybersec", label: "Cybersecurity" },
    { value: "ECE", label: "Electronics & Communication Engineering" },
    { value: "ECM", label: "Electronics & Computer Engineering" },
    { value: "VLSI", label: "VLSI Design & Technology" },
    { value: "IT", label: "Information Technology" },
    { value: "Others", label: "Others" }
];

const ProfileCompletion = ({ user, onComplete }) => {
    const [formData, setFormData] = useState({
        name: user.displayName || '',
        regNo: '',
        studentEmail: '',
        year: '',
        department: DEPARTMENTS[0].value,
        customDepartment: '',
        dob: '',
        phone: '',
        townhall: false
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
        // Format: name.mitblr20XX@learner.manipal.edu
        const regex = /^[a-zA-Z]+\.mitblr20\d{2}@learner\.manipal\.edu$/;
        if (!regex.test(email)) {
            return "Email format must be name.mitblr20XX@learner.manipal.edu";
        }
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
            if (!formData.dob) throw new Error("Please enter your Date of Birth.");
            if (!formData.phone || formData.phone.length < 10) throw new Error("Please enter a valid 10-digit phone number.");

            // Validate custom department if Others is selected
            const finalDepartment = formData.department === 'Others'
                ? formData.customDepartment.trim()
                : formData.department;

            if (formData.department === 'Others') {
                if (!formData.customDepartment.trim()) {
                    throw new Error("Please specify your department.");
                }
                if (formData.customDepartment.length > 25) {
                    throw new Error("Department name must be 25 characters or less.");
                }
            }

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
                year: parseInt(formData.year),
                department: finalDepartment,
                dob: formData.dob,
                phone: formData.phone,
                townhall: false, // Default - hidden attribute
                createdAt: new Date().toISOString()
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
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-linear-to-r from-blue-900/20 to-purple-900/20 p-4 border-b border-white/10 shrink-0">
                    <h2 className="text-xl font-bold text-white">Complete Your Profile</h2>
                    <p className="text-gray-400 text-xs mt-1">Please provide your details to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-3 overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">FULL NAME</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-mono text-gray-400 mb-1">REGISTRATION NO.</label>
                            <input
                                type="text"
                                placeholder="2XXXXXXXX"
                                value={formData.regNo}
                                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                                maxLength={9}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-gray-400 mb-1">ACADEMIC YEAR</label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">STUDENT EMAIL</label>
                        <input
                            type="email"
                            placeholder="name.mitblr20XX@learner.manipal.edu"
                            value={formData.studentEmail}
                            onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">DEPARTMENT</label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value, customDepartment: '' })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        >
                            {DEPARTMENTS.map(dept => (
                                <option key={dept.value} value={dept.value} className="text-black">{dept.label}</option>
                            ))}
                        </select>
                    </div>

                    {formData.department === 'Others' && (
                        <div>
                            <label className="block text-[10px] font-mono text-gray-400 mb-1">CUSTOM DEPARTMENT (MAX 25 CHARS)</label>
                            <input
                                type="text"
                                value={formData.customDepartment}
                                onChange={(e) => setFormData({ ...formData, customDepartment: e.target.value })}
                                maxLength={25}
                                placeholder="Enter your department"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                            <p className="text-[10px] text-gray-500 mt-1">{formData.customDepartment.length}/25 characters</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-mono text-gray-400 mb-1">DATE OF BIRTH</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-gray-400 mb-1">PHONE NUMBER</label>
                            <input
                                type="tel"
                                placeholder="Mobile"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                maxLength={10}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <><CheckCircle size={16} /> COMPLETE REGISTRATION</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletion;
