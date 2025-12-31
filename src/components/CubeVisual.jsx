import React from 'react';

const CubeVisual = () => {
    return (
        <div className="loader-container">
            <div className="cube-wrapper">
                {/* Cube 1: Top */}
                <div className="cube cube-1">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
                {/* Cube 2: Left */}
                <div className="cube cube-2">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
                {/* Cube 3: Right */}
                <div className="cube cube-3">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face left"></div>
                    <div className="face right"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                </div>
            </div>

            <style jsx>{`
                .loader-container {
                    transform: scale(2.5);
                    perspective: 1000px;
                }
                .cube-wrapper {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    transform-style: preserve-3d;
                    animation: spinMain 2.5s linear infinite;
                }

                @keyframes spinMain {
                    0% { transform: rotateX(25deg) rotateY(0deg); }
                    100% { transform: rotateX(25deg) rotateY(360deg); }
                }

                .cube {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    transform-style: preserve-3d;
                }

                .face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    background: rgba(0, 255, 204, 0.2);
                    border: 1px solid #00ffcc;
                    box-shadow: 0 0 10px #00ffcc, inset 0 0 5px #00ffcc;
                }
                
                .front  { transform: translateZ(10px); }
                .back   { transform: rotateY(180deg) translateZ(10px); }
                .left   { transform: rotateY(-90deg) translateZ(10px); }
                .right  { transform: rotateY(90deg) translateZ(10px); }
                .top    { transform: rotateX(90deg) translateZ(10px); }
                .bottom { transform: rotateX(-90deg) translateZ(10px); }

                /* Positioning & Individual Animations */
                .cube-1 {
                    /* Top Center */
                    top: -15px; left: 10px;
                    animation: floatVertical 1.5s ease-in-out infinite alternate;
                }
                .cube-2 {
                    /* Bottom Left */
                    top: 20px; left: -10px;
                    animation: floatHorizontal 1.8s ease-in-out infinite alternate-reverse;
                }
                .cube-3 {
                    /* Bottom Right */
                    top: 20px; left: 30px;
                    animation: floatDiagonal 1.6s ease-in-out infinite alternate;
                }

                @keyframes floatVertical {
                    from { transform: translateY(0); }
                    to { transform: translateY(-5px) rotateY(10deg); }
                }
                @keyframes floatHorizontal {
                    from { transform: translateX(0); }
                    to { transform: translateX(-5px) rotateX(10deg); }
                }
                @keyframes floatDiagonal {
                    from { transform: translate(0, 0); }
                    to { transform: translate(5px, 5px) rotateZ(10deg); }
                }
            `}</style>
        </div>
    );
};

export default CubeVisual;
