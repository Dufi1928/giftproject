import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig'; // Assure-toi que le chemin est correct

const GiftLists = () => {
    const [giftLists, setGiftLists] = useState([]);

    useEffect(() => {
        const fetchGiftLists = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/gift_listss`);
                // Accès à `response.data['hydra:member']` pour obtenir les listes de cadeaux
                setGiftLists(response.data['hydra:member']);
            } catch (error) {
                console.error("Erreur lors de la récupération des listes de cadeaux:", error);
            }
        };

        fetchGiftLists();
    }, []);

    return (
        <div>
            <h2>Listes de Cadeaux</h2>
            <ul>
                {giftLists.map((list) => (
                    <li key={list.id}>
                        <h3>{list.title}</h3>
                        <p>{list.description}</p>
                        <p>Date de création : {new Date(list.creation_date).toLocaleDateString()}</p>
                        {/* Afficher plus de détails ici si nécessaire */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiftLists;
