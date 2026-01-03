import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />,
    };

    const bgColors = {
        success: 'bg-gray-800 border-green-500/50',
        error: 'bg-gray-800 border-red-500/50',
        info: 'bg-gray-800 border-blue-500/50',
    };

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transform transition-all duration-300 animate-in slide-in-from-bottom-5 ${bgColors[type]}`}>
            {icons[type]}
            <p className="text-sm text-gray-200 font-medium">{message}</p>
            <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    );
};

export default Toast;
