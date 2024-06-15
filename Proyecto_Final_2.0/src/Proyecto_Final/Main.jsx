import React from 'react';
import './Main.css'; // 

const Main = () => {
    return (
        <div className="main-container">
            <header className="header">
                <h1>Bienvenidos a la Veterinaria "NEGRIS"</h1>
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCv01NPMem1jyf0Ow6XX7h6zwypIedPQetQ&s.png" 
                    alt="Veterinaria"
                    className="header-image"
                />
            </header>
        </div>
    );
};

export default Main;
